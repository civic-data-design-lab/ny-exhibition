from Server import app, database, word_freq, static_path
from flask import request, Response, jsonify, render_template, url_for
from flask_cors import cross_origin
from bson.json_util import dumps
from json import loads
import os
import subprocess
from questions import questions
from social import generate_image
import urllib.parse

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
        id = database.add_response(response['question'], response['response'], response['zip_code'], response['theme'])
        word_freq.schedule_word_freq()
        # Dinamically generate Open Graph images
        og_image_name = generate_image(static_path, id, response['response'],
                       response['theme'], response['zip_code'])
        og_image_path = urllib.parse.urljoin(
            request.url_root, url_for('static', filename=og_image_name))

        return jsonify({"id": id, "og_image": og_image_path})
    else:
        arguments = request.args
        db_responses = database.get_responses()
        n_responses = len(db_responses)
        grouped_ = False
        if 'groupby' in arguments:
            groupby = arguments['groupby']
            if groupby not in ['zip_code', 'theme', 'word_freq']:
                return "Groupby %s not allowed" % groupby, 400
            grouped_ = True
            grouped = {}
            if groupby == 'word_freq':
                db_responses = database.get_most_frequent()
            else:
                for response in db_responses:
                    if response[groupby] not in grouped:
                        grouped[response[groupby]] = []
                    grouped[response[groupby]].append(response)
                db_responses = grouped

        if 'threshold' in arguments:
            threshold = int(arguments['threshold'])
            if grouped_:
                for key in db_responses:
                    factor = len(db_responses[key]) / n_responses
                    db_responses[key] = db_responses[key][:round(threshold * factor)+1]
            else:
                db_responses = db_responses[:threshold]
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
    questions = word_freq.get_questions()
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
    return jsonify(dumps(database.get_most_frequent()).replace('\"', "'"))

# @app.route("/frequency", methods=['GET'])
# def frequency():
#     responses = database.get_items()
#     word_freq_dict = word_freq.get_word_freq(responses)
#     return jsonify(word_freq_dict.replace("\"", "'")), 200
