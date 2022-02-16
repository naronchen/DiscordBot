#Train Data: bag of word -> put into Matrix -> Neuro Network
#Tokenization + Steaming

import nltk
nltk.download('punkt')
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()

def tokenize(sentence):
    return nltk.word_tokenize(sentence)

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, all_words):
    pass


#test stem & tokenize
# words = ["Organize", "organizes", "ogranizing"]
# stemmed_words = [stem(w) for w in words]
# print(stemmed_words)
# a = "Aren't you tall?"
# print(tokenize(a))