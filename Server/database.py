import os
import pymongo
from Server import settings as ss
from Server import static_path
from bson.json_util import dumps
from bson.objectid import ObjectId
from collections import Counter
import social
from questions import questions

DATABASE_ADDRESS = os.environ.get('DATABASE_ADDRESS')
DATABASE_PORT = os.environ.get('DATABASE_PORT')
DATABASE_ADMIN = os.environ.get('DATABASE_ADMIN')
DATABASE_PWD = os.environ.get('DATABASE_PWD')

# Connect to mongodb test database
client = pymongo.MongoClient(
    host=DATABASE_ADDRESS or ss.DATABASE_ADDRESS,
    port=DATABASE_PORT or ss.DATABASE_PORT,
    username=DATABASE_ADMIN or ss.DATABASE_ADMIN,
    password=DATABASE_PWD or ss.DATABASE_PWD,
    authMechanism='SCRAM-SHA-256')
db = client.exhibition


def get_responses ():
    '''
    For the API

    :return: List of all the items in response collection in database
    '''
    responses = db.response
    cursor = responses.find()

    return list(cursor)

def get_frequencies ():
    '''
    For the API

    :return: List of all the items in response collection in database
    '''
    themes = db.frequencies
    result = {}
    print('getting the frequencies')
    for theme in themes.find():
        result[theme['theme']] = theme['words']
    return result

def get_most_frequent ():
    most_frequent = db.most_frequent
    responses = db.response
    frequent_dict = {}
    for word in most_frequent.find():
        frequent_dict[word['word']] = []
        for doc in word['responses']:
            frequent_dict[word['word']].append(responses.find_one({'_id': ObjectId(doc)}))
    return frequent_dict

def add_response (question, response, zip_code, theme):
    collection = db.response
    new_row = {'question': question, 'response': response, 'zip_code': zip_code, 'theme': theme}
    row_id = collection.insert_one(new_row).inserted_id
    return str(row_id)

def update_frequencies (frequencies):
    collection = db.frequencies
    collection.drop()
    for theme in frequencies:
        _ = collection.insert_one({'theme': theme, 'words': frequencies[theme]}).inserted_id
    return 'success'

def update_most_frequent(frequencies):
    drop_most_frequent()
    frequent = list(frequencies['combined'].items())
    print('frequent', frequent)
    frequent.sort(key = lambda x: x[1], reverse=True)
    print('after sorting', frequent)
    print('length of frequent', len(frequent))
    frequent_words = {x[0]: [] for x in frequent[:min(20, len(frequent))]}
    print('length of frequent_words', len(frequent_words))

    responses = db.response
    most_frequent = db.most_frequent
    for response in responses.find():
        for word in frequent_words:
            if word in response['response'].lower():
                frequent_words[word].append(response['_id'])

    for word in frequent_words:
        _ = most_frequent.insert_one({'word': word, 'responses': frequent_words[word]})

    return 'success'

def drop_responses():
    db.response.drop()

def drop_frequencies():
    db.frequencies.drop()

def drop_most_frequent():
    db.most_frequent.drop()

def delete_responses(ids):
    responses = db.response
    try:
        for id in ids:
            responses.remove(ObjectId(id))
        return 'success'
    except Exception as e:
        return 'error', e

def make_og_image_for_all():
    responses = db.response
    for response in responses.find():
        social.generate_image(static_path, str(response['_id']), response['response'],
                       response['theme'], response['zip_code'])
    return 'success'


def update_responses():
    q_list = set(q['prompt'] for q in questions)
    for response in get_responses():
        if response['question'] not in q_list:
            print('question not found: ', response['question'])