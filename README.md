# NY Exhibition
Web interface to submit response for NY Exhibition

## Architecture
The backend is in `flask` with a database in `MongoDB`, and the frontend uses `Bootstrap 4` with `jQuery`. Additionally, we use `apscheduler` for scheduling jobs.

## Basic Workflow
When the user submits a response from the frontend, it is stored in the database and a job to process the word frequency with new data is scheduled to be run in 15 minutes. The basic idea for the 15 minute wait is that a user most probably enters response to more than one prompt. So instead of running the script after every single response, waiting for 15 minutes is efficient.

## Endpoints
 - **/**: The web interface to submit responses
 - **/response**:
  `POST`: Add a response to the database
  `GET`: Get all the responses from the database
 - **/question**: get all the questions
 - **/api**: Access the word frequencies processed from the responses in JSON format
 - **/pull**: Pulls the latest changes from this github repo and restart the flask server
 - **/process**: Forces the word frequency script to run without having to wait for 15 minutes

## Installation
Requirements:
- `Python 3`
- `MongoDB`

Install and activate the virtual environment:
`$ python3 -m venv venv`
`$ . venv/bin/activate`

Install dependencies:
`$ pip3 install -r requirements.txt`

### Usage
Run the server:
`$ python3 run.py`
