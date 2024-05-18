from pymongo import MongoClient
from .google_maps import GoogleMapsService


class MongoService:
    def __init__(self, uri='mongodb://localhost:27017/', db_name='one-roof', collection_name='listings'):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]
        self.google_maps_service = GoogleMapsService()

    def insert_apartment(self, apartment_data):
        apartment = {
            'title': apartment_data['title'],
            'price': apartment_data['price'],
            'address': apartment_data['address'],
            'url': apartment_data['url'],
            'size': apartment_data['surface'],
            'numberOfRooms': apartment_data['rooms'],
            'numberOfBathrooms': apartment_data.get('bathrooms', 1),
            'photos': apartment_data['photos'],
            'type': 'apartment',
            'location': {
                'type': 'Point',
                'coordinates': self.google_maps_service.get_coordinates(apartment_data['address']),
            },
            'external': True,
        }
        self.collection.insert_one(apartment)

    def insert_studio(self, title, price, address, surface, photo_urls, url):
        apartment = {
            'title': title,
            'price': price,
            'address': address,
            'url': url,
            'size': surface,
            'photos': photo_urls,
            'type': 'studio'
        }
        self.collection.insert_one(apartment)

    def close_connection(self):
        self.client.close()

