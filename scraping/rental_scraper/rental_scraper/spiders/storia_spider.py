import json

import scrapy


class StoriaSpider(scrapy.Spider):
    name = "storia_spider"
    start_urls = [
        'https://www.storia.ro/ro/oferta/garsoniera-linistita-colentina-IDAil1'
    ]

    def parse(self, response):
        title = response.css('h1[data-cy="adPageAdTitle"]::text').get().strip()
        price = response.css('strong[data-cy="adPageHeaderPrice"]::text').get().strip().split()[0]
        address = response.css('div[data-testid="map-link-container"] > a::text').get().strip()
        surface_divs = (response.css(
            'div[aria-label="Suprafață utilă"]>div'))
        surface = surface_divs[1].css('div::text').get().strip().split()[0]

        room_divs = (response.css(
            'div[aria-label="Numărul de camere"]>div'))
        rooms = room_divs[1].css('div::text').get().strip()

        yield {
            'title': title,
            'price': int(price),
            'address': address,
            'surface': int(surface),
            'rooms': int(rooms),
        }
