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


def get_items ():
    '''
    For the API

    :return: List of all the items in response collection in database
    '''
    responses = db.response
    result = []
    for response in responses.find():
        result.append(response)
    return dumps(result)

def add_response (question, response, zip_code):
    collection = db.response
    new_row = {'question': question, 'response': response, 'zip_code': zip_code}
    row_id = collection.insert_one(new_row).inserted_id
    return 'success'