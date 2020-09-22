import os
import pymongo
from Server import settings as ss
from bson.json_util import dumps
from collections import Counter

DATABASE_ADDRESS = os.environ.get('DATABASE_ADDRESS')
DATABASE_PORT = os.environ.get('DATABASE_PORT')
DATABASE_ADMIN = os.environ.get('DATABASE_ADMIN')
DATABASE_PWD = os.environ.get('DATABASE_PWD')

# Connect to mongodb test database
client = pymongo.MongoClient(
    host=DATABASE_ADDRESS or ss.DATABASE_ADDRESS,
    port=DATABASE_PORT or ss.DATABASE_PORT,
    username=DATABASE_ADMIN or ss.DATABASE_ADMIN,    password=DATABASE_PWD or ss.DATABASE_PWD,
    authMechanism='SCRAM-SHA-256')
db = client.exhibition


def get_responses ():
    '''
    For the API

    :return: List of all the items in response collection in database
    '''
    responses = db.response
    result = []
    for response in responses.find():
        result.append(response)
    return result

def get_frequencies ():
    '''
    For the API

    :return: List of all the items in response collection in database
    '''
    themes = db.frequencies
    result = {}
    print('getting the frequencies')
    for theme in themes.find():
        print(theme)
        result[theme['theme']] = theme['words']
    return result

def add_response (question, response, zip_code, theme):
    collection = db.response
    new_row = {'question': question, 'response': response, 'zip_code': zip_code, 'theme': theme}
    row_id = collection.insert_one(new_row).inserted_id
    return 'success'

def update_frequencies (frequencies):
    collection = db.frequencies
    collection.drop()
    for theme in frequencies:
        _ = collection.insert_one({'theme': theme, 'words': frequencies[theme]}).inserted_id
    return 'success'

def drop_responses():
    db.response.drop()

def drop_frequencies():
    db.frequencies.drop()
