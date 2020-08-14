from Server import app
from flask import request, jsonify, render_template
from Server import database
from questions import questions
import os
import subprocess
from Server import word_freq

@app.route('/api', methods=['GET'])
def api():
    '''
    The api endpoint
    :return:
    '''

    response = database.get_items()
    return jsonify(response.replace("\"", "'")), 200

@app.route('/response', methods=['POST'])
def response():
    response = request.form
    print(response)
    id = database.add_response(response['question'], response['response'], response['zip_code'])
    return id

@app.route('/')
def home():
    return render_template('index.html', questions = questions)

@app.route("/pull")
def pull():
    os.chdir('/home/ubuntu/ny-exhibition')
    subprocess.run(['git', 'reset', '--hard', 'HEAD'])
    response = subprocess.check_output(['git','pull'])
    subprocess.run(['touch', 'htdocs/client.wsgi'])
    return response

@app.route("/frequency", methods=['GET'])
def frequency():
    responses = database.get_items()
    word_freq_dict = word_freq.get_word_freq(responses)
    return jsonify(word_freq_dict.replace("\"", "'")), 200


