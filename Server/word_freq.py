from questions import questions
from apscheduler.schedulers.background import BackgroundScheduler
from Server import database
from datetime import datetime, timedelta
from stopwords import STOPWORDS

# Fetching data directly from database
# Getting the latest word frequency
# Getting the index of last processed response
# Getting the scheduler running

scheduler = BackgroundScheduler()
scheduler.start()

def time_to_schedule():
    '''
    Helper function to get the time when the next batch of scrapping is to be done.
    :return: time after 15 minutes from now
    '''
    return datetime.now() + timedelta(minutes=15)

def schedule_word_freq ():
    '''
    - After a user submits their response, schedule to process the frequency again after 15 minutes
    - If there is already a process scheduled to be run, we don't want to schedule another again. 
      Trying to schedule another one in this case throws an error, which does the job for us
    '''
    try:
        scheduler.add_job(store_word_freq, 'date', run_date=time_to_schedule(), id='word_frequency')
    except:
        print('looks like already running')

def store_word_freq():
    responses = database.get_responses()
    freq = generate_word_freq(responses)
    database.update_frequencies(freq)

def generate_word_freq(responses, word_freq = None):
    """
    Optional parameter to pass in an already filled word_freq, that way 
    we can update a word freq with new entries if necessary.
    """
    if word_freq is None:
        word_freq = {key: {} for key in questions}
        word_freq['combined'] = {}
    for response in responses:
        theme = response['theme']
        answer = response['response'].lower()
        for p in '.,?!/@#$%^&*()-_+':
            answer = answer.replace(p, '')
        toks = {tok for tok in answer.split() if tok not in STOPWORDS}
        for word in toks:
            if word not in word_freq['combined']:
                word_freq['combined'][word] = 0
            
            if word not in word_freq[theme]:
                word_freq[theme][word] = 0
            word_freq[theme][word] += 1
            word_freq['combined'][word] +=1
    return word_freq