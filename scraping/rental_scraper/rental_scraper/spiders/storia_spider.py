import scrapy
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json

class RentalSpider(scrapy.Spider):
    name = "storia_spider"
    start_urls = [
        'https://www.storia.ro/ro/oferta/garsoniera-linistita-colentina-IDAil1'
    ]

    def __init__(self, *args, **kwargs):
        super(RentalSpider, self).__init__(*args, **kwargs)
        geckodriver_path = '/snap/bin/geckodriver'
        self.driver = webdriver.Firefox(service=Service(geckodriver_path))

    def parse(self, response):
        self.driver.get(response.url)
        try:
            accept_cookies_button = WebDriverWait(self.driver, 20).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'button#onetrust-accept-btn-handler'))
            )
            accept_cookies_button.click()
        except Exception as e:
            self.logger.info("No cookie acceptance button found or an error occurred.")

        div = WebDriverWait(self.driver, 5).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'div.image-gallery-swipe'))
        )

        photos = div.find_elements(By.CSS_SELECTOR, 'img.image-gallery-image')
        photo_urls = [img.get_attribute('src') for img in photos]

        title = response.css('h1[data-cy="adPageAdTitle"]::text').get().strip()
        price = response.css('strong[data-cy="adPageHeaderPrice"]::text').get().strip().split()[0]
        address = response.css('div[data-testid="map-link-container"] > a::text').get().strip()
        surface_divs = response.css('div[aria-label="Suprafață utilă"] > div')
        surface = surface_divs[1].css('div::text').get().strip().split()[0]

        room_divs = response.css('div[aria-label="Numărul de camere"] > div')
        rooms = room_divs[1].css('div::text').get().strip()

        yield {
            'title': title,
            'price': int(price),
            'address': address,
            'surface': int(surface),
            'rooms': int(rooms),
            'photo_urls': photo_urls,
        }

    def closed(self, reason):
        self.driver.quit()
