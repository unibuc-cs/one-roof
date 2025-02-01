import json
import logging
import time
import scrapy
import re
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from services import MongoService


class StoriaSpider(scrapy.Spider):
    name = "storia_spider"
    conversion_rate = 0.2  # from RON to EUR
    amenities_list = ["kitchen", "dressing", "terrace", "parking place", "gym", "swimming pool", "no smoking", "ac", "washing machine", "internet", "wi-fi", "elevator", "refrigerator", 'dishwasher', 'washer', 'dryer', 'tv', 'balcony', 'parking space']
    start_urls = [
        'https://www.storia.ro/ro/rezultate/inchiriere/apartament/bucuresti?ownerTypeSingleSelect=ALL&distanceRadius=0&viewType=listing&limit=72&page=1'
    ]

    def __init__(self, *args, **kwargs):
        super(StoriaSpider, self).__init__(*args, **kwargs)
        geckodriver_path = '/snap/bin/geckodriver'
        self.driver = webdriver.Firefox(service=Service(geckodriver_path))
        self.mongo_service = MongoService()
    
    @staticmethod
    def get_element_from_button_list(response, surface = False):

        icon_type = 'M21 10.958h-7.958v-8l-1-1h-9l-1 1v18l1 1H21l1-1v-9l-1-1Zm-1 9h-6.958v-2H11v2H4.042v-7h2v-2h-2v-7h7v7h-2v2H11v2h2.042v-2H20v7Z'
        if surface:
            icon_type = 'M19.983 18.517 5.439 3.973h2.544v-2H2.025V8h2V5.387L18.638 20h-2.614v2h5.959v-6.028h-2v2.544ZM3.996 12.001h-2v2h2v-2ZM1.996 16.001h2v2h-2v-2ZM3.996 20.001h-2v2h2v-2ZM5.997 20.001h2v2h-2v-2ZM11.99 20.001h-2v2h2v-2ZM20.003 10.001h2v2h-2v-2ZM22.003 6.001h-2v2h2v-2ZM20.003 2.001h2v2h-2v-2ZM18.003 2.001h-2v2h2v-2ZM11.989 2.001h2v2h-2v-2Z'

        div = response.xpath("//h4[contains(text(), 'Apartament')]/following-sibling::div[1]")
        button_list = div.css('button')

        for button in button_list:
                icon = button.css('path')
                if icon.css('::attr(d)').get() == icon_type:
                    if surface:
                        return button.css('div:nth-of-type(2)::text').get().strip()[:-2]
                    return button.css('div:nth-of-type(2)::text').get().strip().split()[0]

        
        return None


    @staticmethod
    def process_price(price):
        # if price is in RON, converts it to EUR
        if 'RON' in price:
            cleaned_price = re.sub(r'\s*RON', '', price)
            cleaned_price = cleaned_price.replace(' ', '')
            price_in_ron = int(cleaned_price)
            price_in_eur = price_in_ron * StoriaSpider.conversion_rate
            return price_in_eur
        # otherwise cleans the price and returns it as it is
        else:
            cleaned_price = re.sub(r'\s*€', '', price)
            cleaned_price = cleaned_price.replace(' ', '')
            return int(cleaned_price)

    def parse(self, response):
        # collects all links to listings we want to scrape next
        listing_urls = response.css('a[data-cy="listing-item-link"]::attr(href)').getall()

        for url in listing_urls:
            full_url = response.urljoin(url)
            yield scrapy.Request(full_url, callback=self.parse_listing) 

    def parse_listing(self, response):
        # parse an individual listing
        self.driver.get(response.url)
        try:
            accept_cookies_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'button#onetrust-accept-btn-handler'))
            )
            accept_cookies_button.click()
        except Exception as e:
            self.logger.info("No cookie acceptance button found or an error occurred.")

        div = WebDriverWait(self.driver, 20).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'div.image-gallery-thumbnails'))
        )
        
        photos = div.find_elements(By.TAG_NAME, 'img')
        photo_urls = [img.get_attribute('src').split(';')[0] for img in photos]

        title = response.css('h1[data-cy="adPageAdTitle"]::text').get().strip()
        price = response.css('strong[data-cy="adPageHeaderPrice"]::text').get().strip()
        address = response.css('main a:first-of-type::text').get().strip()
        surface = StoriaSpider.get_element_from_button_list(response, surface = True)
        rooms = StoriaSpider.get_element_from_button_list(response, surface = False) 

        div = WebDriverWait(self.driver, 20).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'div[data-cy="adPageAdDescription"] span'))
        )
        listing_description = div.find_elements(By.TAG_NAME, 'p')[0].text.lower()

        amenities =[]

        for el in self.amenities_list:
            if(el in listing_description):
                amenities.append(el)

        data = {
            'title': title,
            'price': StoriaSpider.process_price(price),
            'address': address,
            'surface': int(surface.split('.')[0]), 
            'rooms': int(rooms),
            'photos': photo_urls,
            'url': response.url,
            'precise': True,
            'amenities': amenities
        }

        self.mongo_service.insert_apartment(data)
        self.logger.info(f'Inserted data: {data}')

        yield data

    def closed(self, reason):
        self.driver.quit()
        self.mongo_service.close_connection()
