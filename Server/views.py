from Server import app
from flask import request, jsonify, render_template
from Server import database


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
    id = database.add_response(response['question'], response['response'])
    return id

@app.route('/')
def home():
    return render_template('index.html')