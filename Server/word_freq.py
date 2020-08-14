from ast import literal_eval as le
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup as soup


def import_data(url = None):
    if url is None: ##this is here in case url changes
        url = 'http://ec2-54-144-45-173.compute-1.amazonaws.com/api'
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urlopen(req).read()
    page_soup=soup(webpage,"html.parser")
    data = page_soup.get_text()
    return le(le(data))


def get_word_freq(responses):
    STOPWORDS = {'herein', 'too', 'there', 'been', 'serious', 'either', "haven't", 'etc', 'everyone', 'towards', 'll', 'though', 'moreover', 'two', 'yours', 'someone', 'thence', 'con', 'nor', 'became', 'was', 'over', 'may', 'only', 'back', 'seems', 'wouldn', 'don', 'please', 'whereby', 'beyond', 'ourselves', 'anyone', 'might', "you'll", 'un', 'eleven', 'fifteen', 'the', 'than', 'five', 'theirs', 'm', 'find', 'so', 'did', "mightn't", 'except', 'whose', 'she', 'whenever', 'you', 'beside', 'almost', "couldn't", 'meanwhile', 'y', 'down', 'herself', 'sometime', 'shouldn', 'just', 'won', 'wherever', "weren't", 'their', 'thick', 'another', 'whereas', 'yet', 'bill', 'cant', 'for', 'your', 'him', 'still', 'both', 'afterwards', 'hereby', 'fifty', 'having', 'next', 'hasn', 'alone', 'on', 'where', 'why', 'our', 'of', 'can', 'had', 'not', 'upon', 'before', 'every', 'amongst', 'other', 'thereafter', 'us', 'detail', "you'd", 'anyway', 'nine', 'ie', 'then', 'doesn', 'hereupon', 'therefore', 'forty', 'neither', 'otherwise', 's', 'must', 'eight', 'front', 'amoungst', 'thereupon', 'ain', 'seeming', 'nevertheless', 'we', "isn't", 'that', 'former', "don't", 'weren', 'are', 'they', 'nothing', "she's", 'co', 'thin', 'top', 'thru', 'as', 'although', 'least', 'mostly', 'his', 'elsewhere', 'call', 'throughout', 'because', 't', 'in', 'some', 'else', 'part', 'would', 'yourself', 'therein', 'also', 'should', 'since', "doesn't", 'enough', 'my', 'three', 'thereby', 'shan', 'hers', 'such', 'how', 'keep', 'all', 'he', 'show', 'cannot', 'am', 'whoever', 'more', 'himself', 'describe', 'at', 'found', 'within', 'me', 'few', 'side', 'anyhow', "that'll", 'becomes', 'indeed', 'whereafter', 'were', 'cry', 'mightn', 'among', "didn't", "shan't", 'third', 'always', 'which', 'again', 'between', 'several', 'without', 'and', 'into', 'system', 'when', 'couldn', 'mine', 'those', 'hasnt', 'together', 'none', 'isn', 'now', 'haven', 'take', 'besides', 'move', 'off', 'a', 'during', 'formerly', 'do', 'mustn', 'rather', 'sometimes', 'amount', "you've", 'made', 'be', 'hadn', 'own', 'have', 'across', 'never', 'does', 'give', 'aren', 'become', 'however', 'see', 'didn', 'any', 'something', 'is', 'toward', 'once', 'ever', 'up', 'by', 'has', 'being', 'o', 'whatever', 'needn', 'name', 'while', 'everywhere', "hasn't", 'nowhere', 'this', 'one', 'beforehand', 'go', 'empty', "needn't", 'put', 'around', 'noone', 'with', 'per', 'becoming', 'below', 'six', 'against', 'under', 'but', 'twelve', 'via', 'full', 'eg', 'hereafter', 'above', 'itself', 'many', 'de', 'each', 'latterly', 'out', "hadn't", 'less', 'ltd', 've', 'from', 'to', 'inc', "wasn't", 'hence', 'an', 'namely', 'until', "you're", 'already', 'these', 'who', 'same', 'anywhere', 'its', 'bottom', 'myself', 'mill', 'no', 're', 'whereupon', 'doing', 'first', 'couldnt', 'i', 'here', 'done', 'd', 'last', 'seem', 'them', 'along', 'could', 'well', 'wasn', 'wherein', "it's", 'whither', "won't", 'hundred', 'latter', 'fill', 'whether', 'whence', 'sixty', 'if', 'seemed', 'fire', 'four', 'her', 'ma', 'due', 'yourselves', 'sincere', 'whom', 'get', 'everything', 'ten', 'nobody', 'behind', 'or', 'others', 'after', "aren't", 'ours', 'through', 'further', 'most', 'whole', 'very', 'will', 'much', 'about', "mustn't", 'what', "should've", 'thus', "shouldn't", 'perhaps', 'onto', 'twenty', 'somehow', 'it', 'themselves', 'even', 'somewhere', "wouldn't", 'often', 'anything', 'interest', 'new', "yorkers'", 'yorkers', "yorker's" "york's","yorks'",'yorks' 'yorker', 'york', 'city'}
    word_freq = {'combined': {}}
    for response in responses:
        question = response['question']
        if not question in word_freq:
            word_freq[question] = {}
        answer = response['response'].lower()
        for p in '.,?!/@#$%^&*()-_+':
            answer = answer.replace(p, '')
        toks = {tok for tok in answer.split() if tok not in STOPWORDS}
        for word in toks:
            if word not in word_freq[question]:
                word_freq[question][word] = 0
            if word not in word_freq['combined']:
                word_freq['combined'][word] = 0
            word_freq[question][word] += 1
            word_freq['combined'][word] +=1
    return {k: sorted([e for e in v.items()], reverse = True, key = lambda x: x[1]) for k, v in word_freq.items()}
    

"""
How to use:
word_frequency_dict = get_word_freq(import_data())
"""