from ast import literal_eval as le
from urllib.request import Request, urlopen
from questions import questions
from apscheduler.schedulers.background import BackgroundScheduler
from Server import database
from datetime import datetime, timedelta


# Fetching data directly from database
# Getting the latest word frequency
# Getting the index of last processed response
# Getting the scheduler running

scheduler = BackgroundScheduler()
scheduler.start()

def time_to_schedule():
    '''
    Helper function to get the time when the next batch of scrapping is to be done.
    :return: time after 10 minutes from now
    '''
    return datetime.now() + timedelta(minutes=1)

def schedule_word_freq ():
    # start scheduler
    print('the jobs', scheduler.print_jobs())
    try:
        scheduler.add_job(store_word_freq, 'date', run_date=time_to_schedule(), id='word_frequency')
    except:
        print('looks like already running')

def store_word_freq():
    responses = database.get_responses()
    freq = generate_word_freq(responses)
    database.update_frequencies(freq['combined'])

def generate_word_freq(responses, word_freq = None):
    """
    Optional parameter to pass in an already filled word_freq, that way 
    we can update a word freq with new entries if necessary.
    """
    if word_freq is None:
        word_freq = {key: {} for key in questions}
        word_freq['combined'] = {}
    STOPWORDS = {'herein', 'too', 'there', 'been', 'serious', 'either', "haven't", 'etc', 'everyone', 'towards', 'll', 'though', 'moreover', 'two', 'yours', 'someone', 'thence', 'con', 'nor', 'became', 'was', 'over', 'may', 'only', 'back', 'seems', 'wouldn', 'don', 'please', 'whereby', 'beyond', 'ourselves', 'anyone', 'might', "you'll", 'un', 'eleven', 'fifteen', 'the', 'than', 'five', 'theirs', 'm', 'find', 'so', 'did', "mightn't", 'except', 'whose', 'she', 'whenever', 'you', 'beside', 'almost', "couldn't", 'meanwhile', 'y', 'down', 'herself', 'sometime', 'shouldn', 'just', 'won', 'wherever', "weren't", 'their', 'thick', 'another', 'whereas', 'yet', 'bill', 'cant', 'for', 'your', 'him', 'still', 'both', 'afterwards', 'hereby', 'fifty', 'having', 'next', 'hasn', 'alone', 'on', 'where', 'why', 'our', 'of', 'can', 'had', 'not', 'upon', 'before', 'every', 'amongst', 'other', 'thereafter', 'us', 'detail', "you'd", 'anyway', 'nine', 'ie', 'then', 'doesn', 'hereupon', 'therefore', 'forty', 'neither', 'otherwise', 's', 'must', 'eight', 'front', 'amoungst', 'thereupon', 'ain', 'seeming', 'nevertheless', 'we', "isn't", 'that', 'former', "don't", 'weren', 'are', 'they', 'nothing', "she's", 'co', 'thin', 'top', 'thru', 'as', 'although', 'least', 'mostly', 'his', 'elsewhere', 'call', 'throughout', 'because', 't', 'in', 'some', 'else', 'part', 'would', 'yourself', 'therein', 'also', 'should', 'since', "doesn't", 'enough', 'my', 'three', 'thereby', 'shan', 'hers', 'such', 'how', 'keep', 'all', 'he', 'show', 'cannot', 'am', 'whoever', 'more', 'himself', 'describe', 'at', 'found', 'within', 'me', 'few', 'side', 'anyhow', "that'll", 'becomes', 'indeed', 'whereafter', 'were', 'cry', 'mightn', 'among', "didn't", "shan't", 'third', 'always', 'which', 'again', 'between', 'several', 'without', 'and', 'into', 'system', 'when', 'couldn', 'mine', 'those', 'hasnt', 'together', 'none', 'isn', 'now', 'haven', 'take', 'besides', 'move', 'off', 'a', 'during', 'formerly', 'do', 'mustn', 'rather', 'sometimes', 'amount', "you've", 'made', 'be', 'hadn', 'own', 'have', 'across', 'never', 'does', 'give', 'aren', 'become', 'however', 'see', 'didn', 'any', 'something', 'is', 'toward', 'once', 'ever', 'up', 'by', 'has', 'being', 'o', 'whatever', 'needn', 'name', 'while', 'everywhere', "hasn't", 'nowhere', 'this', 'one', 'beforehand', 'go', 'empty', "needn't", 'put', 'around', 'noone', 'with', 'per', 'becoming', 'below', 'six', 'against', 'under', 'but', 'twelve', 'via', 'full', 'eg', 'hereafter', 'above', 'itself', 'many', 'de', 'each', 'latterly', 'out', "hadn't", 'less', 'ltd', 've', 'from', 'to', 'inc', "wasn't", 'hence', 'an', 'namely', 'until', "you're", 'already', 'these', 'who', 'same', 'anywhere', 'its', 'bottom', 'myself', 'mill', 'no', 're', 'whereupon', 'doing', 'first', 'couldnt', 'i', 'here', 'done', 'd', 'last', 'seem', 'them', 'along', 'could', 'well', 'wasn', 'wherein', "it's", 'whither', "won't", 'hundred', 'latter', 'fill', 'whether', 'whence', 'sixty', 'if', 'seemed', 'fire', 'four', 'her', 'ma', 'due', 'yourselves', 'sincere', 'whom', 'get', 'everything', 'ten', 'nobody', 'behind', 'or', 'others', 'after', "aren't", 'ours', 'through', 'further', 'most', 'whole', 'very', 'will', 'much', 'about', "mustn't", 'what', "should've", 'thus', "shouldn't", 'perhaps', 'onto', 'twenty', 'somehow', 'it', 'themselves', 'even', 'somewhere', "wouldn't", 'often', 'anything', 'interest', 'new', "yorkers'", 'yorkers', "yorker's" "york's","yorks'",'yorks' 'yorker', 'york', 'city'}
    for response in responses:
        theme = response['theme']
        answer = response['response'].lower()
        for p in '.,?!/@#$%^&*()-_+':
            answer = answer.replace(p, '')
        toks = {tok for tok in answer.split() if tok not in STOPWORDS}
        for word in toks:
            if word not in word_freq['combined']:
                word_freq[theme][word] = 0
                word_freq['combined'][word] = 0
            word_freq[theme][word] += 1
            word_freq['combined'][word] +=1
    return word_freq
    

"""
How to use:
word_frequency_dict = get_word_freq(import_data())
"""