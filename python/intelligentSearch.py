import pandas as pd
import json
import time
import spacy
import string
import gensim.downloader as api
import math
import sys
import metapy
import pytoml
from pathlib import Path
import os

##################################################################################################
########################     Load Pre-trained 300vector Word Embeddings      #####################
# ######################     trained on 6Bilion Wikipedia pages from Gensim  #####################
##################################################################################################
glove_vectors = api.load('glove-wiki-gigaword-300')


##################################################################################################
########################     Load Spacy for NLP tasks such as lemmatization  #####################
########################     POS tagging, Named Entity Recognition           #####################
##################################################################################################
nlp=spacy.load("en_core_web_sm", disable=['parser'])
all_stopwords = nlp.Defaults.stop_words
    for let in list(string.ascii_lowercase):
        all_stopwords.add(let)

processed_Flag = False

def read_json(filename):
    with open(filename, 'r') as fobj:
        outFile = json.load(fobj)
    return outFile

def write_json(filename, objToWrite):
    with open(filename, 'w') as convert_file:
        convert_file.write(json.dumps(objToWrite))


def writeDocument_processed(doc_term_ind):
    outputList = []
    outputKeys = []
    keys_len = len(doc_term_ind.keys())
    if keys_len > 0 :
        for doc in range(keys_len):
            web_text = " ".join(map(str, doc_term_ind[doc]))
            outputList.append(web_text)
            outputKeys.append(doc)

    alt_df = pd.DataFrame({'did' : outputKeys, 'content': outputList})
    alt_df.to_csv('wikipediaDat.csv')
    output_df = pd.DataFrame(outputList)
    output_df.to_csv('wikipedia.dat', index = False, header=False)

def preprocess_corpus(filename):
    '''
    :param filename: file containing the content of wikipedia pages each of which is refered to as a document
             1. Inverted Index : postings list is calculated
             2. stop word removal,
             3. intelligent url/email removal
             4. POS tagging
             5. Lemmatization of each token
             6. document_term index is calculated
             7. NER : Named Entity Recognition for each document is calculated
    :return: inverted index
    '''

    df = pd.read_csv(filename)
    df_wiki = df.content


    postings_ind = {}
    vocab_list = []
    doc_term_ind = {}
    entity_ind = {}

    for rec in range(len(df_wiki)):
        print(rec)
        doc = nlp(df_wiki[rec].lower())
        position = 0
        for token in doc:
            if not token.text in all_stopwords and not token.is_stop and not token.is_punct and not token.like_email and not token.like_url and token.pos_ not in [
                "SPACE", "PART", "X", "SYM", "PUNCT"]:
                if token.lemma_ in postings_ind.keys():
                    if rec in postings_ind[token.lemma_].keys():
                        postings_ind[token.lemma_][rec].append(position)
                    else:
                        postings_ind[token.lemma_][rec] = [position]
                else:
                    postings_ind[token.lemma_] = {rec: [position]}
                    vocab_list.append([token.lemma_, token.text, token.pos_])

                if rec in doc_term_ind.keys():
                    doc_term_ind[rec].append(token.lemma_)
                else:
                    doc_term_ind[rec] = [token.lemma_]
            position = position + 1
        for entity in doc.ents:
            if rec in entity_ind.keys():
                entity_ind[rec].append([entity.text, entity.label_])
            else:
                entity_ind[rec] = [[entity.text, entity.label_]]
           #    print(entity.text, '--- ', entity.label_)   ###### Entities
    writeDocument_processed(doc_term_ind)
    return postings_ind


def query_expansion(query_string):
    doc = nlp(query_string.lower())
    query_terms = []

    for word in doc:
        query_terms.append(word)
        word_vectors = glove_vectors.most_similar(word.text)
        if len(word_vectors) > 0:
            for i in range(len(word_vectors)):
                if word_vectors[i][1] > 0.6:
                    query_terms.append(word_vectors[i][0])
    query_terms = list(set(query_terms))
    query_terms = " ".join(map(str, query_terms))

    doc = nlp(query_terms.lower())
    final_query_terms = []
    for token in doc:
        if not token.text in all_stopwords and not token.is_stop and not token.is_punct and not token.like_email and not token.like_url and token.pos_ not in ["SPACE", "PART", "X", "SYM", "PUNCT"]:
            final_query_terms.append(token.lemma_)

    #print(list(set(final_query_terms)))
    return " ".join(map(str, list(set(final_query_terms))))


def load_ranker(cfg_file):
    """
    Use this function to return the Ranker object to evaluate,
    The parameter to this function, cfg_file, is the path to a
    configuration file used to load the index.
    """
    return metapy.index.OkapiBM25(k1=1.2, b=0.75, k3=500)


def search(cfg_file, searchPhrase):
    print('Searching for:....', searchPhrase)
    print('Building or loading index...')
    idx = metapy.index.make_inverted_index(cfg_file)
    print("number of docs:", idx.num_docs())
    print("unique terms: ", idx.unique_terms())
    print("average doc length: ", idx.avg_doc_length())
    print("total corpus terms: ", idx.total_corpus_terms())
    print()
    query = metapy.index.Document()
    ranker = load_ranker(cfg_file)
    ev = metapy.index.IREval('config.toml')
    with open('config.toml', 'r') as fin:
        cfg_d = pytoml.load(fin)
    num_results = 3
    query.content(searchPhrase.strip())
    results = ranker.score(idx, query, num_results)
    print("search results", results)
    return results

##### TODO : Add title page check
##### TODO : preprocess and store the small dataset
##### TODO : change the config.toml
##### TODO : add display text appropriate matching

if __name__ == '__main__':
    start = time.time()
    if not processed_Flag:
        idx1 = preprocess_corpus(filename="dataset_context_queryexp.csv")
        processed_Flag = True
    print("Elapsed Time: " + str(time.time() - start) + " secs")

    if len(sys.argv) != 3:
        print("Usage: {} config.toml <query>".format(sys.argv[0]))
        sys.exit(1)
    cfg = sys.argv[1]
    searchPhrase = sys.argv[2]
    searchPhrase_QExp = query_expansion(searchPhrase)
    print(searchPhrase_QExp)
    searchResults = search(cfg, searchPhrase_QExp)
    inputFile = pd.read_csv("dataset_context_queryexp.csv")
    inputFile['new_corpus_text1'] = inputFile['content'].str[:700]

    outputFile = pd.DataFrame()
    if len(searchResults) > 0:
        for res in searchResults:
            outputFile = outputFile.append(inputFile.loc[inputFile['new_doc_id'] == res[0]])
        #outputFile.to_csv('searchResults.csv', index=False)
    records = outputFile[['wikiId', 'title', 'new_corpus_text1']].to_records(index=False)
    result = list(records)
    print("original Query : " + searchPhrase)
    print("Expanded Query: " + searchPhrase_QExp)
    print(result)

















