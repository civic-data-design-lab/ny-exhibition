from Server import app, database, word_freq
from flask import request, Response, jsonify, render_template
from flask_cors import cross_origin
from bson.json_util import dumps
from questions import questions
import os
import subprocess

@app.route('/api', methods=['GET'])
def api():
    '''
    The api endpoint
    :return:
    '''
    freq = database.get_frequencies()
    # return jsonify(response.replace("\"", "'")), 200
    return freq, 200

@app.route('/response', methods=['GET', 'POST'])
# Enable CORS for requests from different origins
@cross_origin()
def response():
    if request.method == 'POST':
        response = request.form
        print(response)
        id = database.add_response(response['question'], response['response'], response['zip_code'], response['theme'])
        word_freq.schedule_word_freq()
        return id
    else:
        arguments = request.args
        db_responses = database.get_responses()
        if 'threshold' in arguments:
            pass
        if 'groupby' in arguments:
            db_responses = sorted(db_responses, key = lambda x: x[arguments['groupby']])
        response = Response(
            dumps(db_responses),
            status=200,
            mimetype='application/json'
        )
        return response

@app.route('/question', methods=['GET'])
# Enable CORS for requests from different origins
@cross_origin()
def question():
    return jsonify(questions)

@app.route('/')
def home():
    return render_template('index.html', questions = questions)

@app.route("/pull")
def pull():
    os.chdir('/home/ubuntu/ny-exhibition')
    subprocess.run(['git', 'reset', '--hard', 'HEAD'])
    response = subprocess.check_output(['git','pull'])
    subprocess.run(['touch', 'client.wsgi'])
    return response

@app.route("/process")
def process():
    '''
    When you want to force the word frequency to process without having to wait for 15 minutes
    '''
    try:
        word_freq.store_word_freq()
        return 'success'
    except Exception as e:
        return 'failed with exception: %s'%e

@app.route("/most_frequent")
def most_frequent():
    return jsonify(database.get_most_frequent())

# @app.route("/frequency", methods=['GET'])
# def frequency():
#     responses = database.get_items()
#     word_freq_dict = word_freq.get_word_freq(responses)
#     return jsonify(word_freq_dict.replace("\"", "'")), 200
