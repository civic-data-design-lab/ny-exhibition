import pymongo
from Server import settings as ss
from bson.json_util import dumps
from collections import Counter

# Connect to mongodb test database
client = pymongo.MongoClient(
    host=ss.DATABASE_ADDRESS,
    port=ss.DATABASE_PORT,
    username=ss.DATABASE_ADMIN,
    password=ss.DATABASE_PWD,
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
    words = db.frequencies
    result = {}
    print('getting the frequencies')
    for word in words.find():
        print(word)
        result[word['word']] = word['frequency']
    return result

def add_response (question, response, zip_code, theme):
    collection = db.response
    new_row = {'question': question, 'response': response, 'zip_code': zip_code, 'theme': theme}
    row_id = collection.insert_one(new_row).inserted_id
    return 'success'

def update_frequencies (frequencies):
    collection = db.frequencies
    collection.drop()
    for word in frequencies:
        _ = collection.insert_one({'word': word, 'frequency': frequencies[word]}).inserted_id
    return 'success'

def drop_responses():
    db.response.drop()