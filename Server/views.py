from Server import app
from flask import request, jsonify, render_template
from flask_cors import CORS
from Server import database
from questions import questions
import os
import subprocess
from Server import word_freq

# Enable CORS for requests from different origins
CORS(app)

@app.route('/api', methods=['GET'])
def api():
    '''
    The api endpoint
    :return:
    '''
    freq = database.get_frequencies()
    # return jsonify(response.replace("\"", "'")), 200
    return freq, 200

@app.route('/response', methods=['POST'])
def response():
    response = request.form
    print(response)
    id = database.add_response(response['question'], response['response'], response['zip_code'], response['theme'])
    word_freq.schedule_word_freq()
    return id

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
    except:
        return 'failed'

# @app.route("/frequency", methods=['GET'])
# def frequency():
#     responses = database.get_items()
#     word_freq_dict = word_freq.get_word_freq(responses)
#     return jsonify(word_freq_dict.replace("\"", "'")), 200


