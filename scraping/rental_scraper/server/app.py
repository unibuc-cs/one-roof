from flask import Flask, jsonify
from pymongo import MongoClient
from bson import json_util
import json


def parse_json(data):
    return json.loads(json_util.dumps(data))


app = Flask(__name__)
# client = MongoClient('mongodb://localhost:27017/')
client = MongoClient('mongodb://one-roof-user:w2L38f?Wpy}e@130.61.13.108:27017/one-roof')

db = client['one-roof']
collection = db['listings']


@app.route('/listings', methods=['GET'])
def get_rentals():
    rentals = list(collection.find({}))
    return {'rentals': parse_json(rentals)}


if __name__ == '__main__':
    app.run(port=5001)
