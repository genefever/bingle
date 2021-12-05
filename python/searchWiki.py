import math
import sys
import time
import os
import metapy
import pytoml
from pathlib import Path
import pandas as pd
# import boto3
from dotenv import load_dotenv
import json

def read_csv_pandas(file_name = "final_compact_df.csv"):
    return pd.read_csv(file_name, encoding="ISO-8859-1", engine='python')

def load_ranker(cfg_file):
    """
    Use this function to return the Ranker object to evaluate,
    The parameter to this function, cfg_file, is the path to a
    configuration file used to load the index.
    """
    return metapy.index.OkapiBM25(k1=1.2, b=0.75, k3=500)


def search(cfg_file, searchPhrase):
    #print('Searching for:....', searchPhrase)
    #print('Building or loading index...')
    idx = metapy.index.make_inverted_index(cfg_file)
    #print("number of docs:", idx.num_docs())
    #print("unique terms: ", idx.unique_terms())
    #print("average doc length: ", idx.avg_doc_length())
    #print("total corpus terms: ", idx.total_corpus_terms())
    #print()
    query = metapy.index.Document()
    ranker = load_ranker(cfg_file)
    ev = metapy.index.IREval('config.toml')
    with open('config.toml', 'r') as fin:
        cfg_d = pytoml.load(fin)
    num_results = 3
    query.content(searchPhrase.strip())
    results = ranker.score(idx, query, num_results)
    #print("search results", results)
    return results

def runSearch(cfg_file):
    # cfg = sys.argv[1]
    cfg = cfg_file
    # query_content = sys.argv[2]
    #print('Building or loading index...')
    idx = metapy.index.make_inverted_index(cfg)
    #print("number of docs:", idx.num_docs())
    #print("unique terms: ", idx.unique_terms())
    #print("average doc length: ", idx.avg_doc_length())
    #print("total corpus terms: ", idx.total_corpus_terms())
    #print()
    query = metapy.index.Document()
    ranker = load_ranker(cfg)
    ev = metapy.index.IREval('config.toml')
    with open('config.toml', 'r') as fin:
        cfg_d = pytoml.load(fin)
    query_cfg = cfg_d['query-runner']
    query_start = query_cfg.get('query-id-start', 1)

    num_results = 3
    f_bm25 = open("bm25.avg_p.txt", "w")
    arr_OkapiBM25 = []
    with open('wikipedia-queries.txt') as query_file:
        for query_num, line in enumerate(query_file):
            query.content(line.strip())
            results = ranker.score(idx, query, num_results)
            #print("search results", results)
            avg_p = ev.avg_p(results, query_start + query_num, num_results)
            f_bm25.write(str(avg_p))
            f_bm25.write("\n")
            arr_OkapiBM25.append(avg_p)
            #print("Query {} average precision: {}".format(query_num + 1, avg_p))
    ev.map()

# Main
if __name__ == "__main__":
    os.chdir('./python')
    
    '''
    # List of 3 tuples (title, description, url)
    wiki_data_list = [('a','a','a'), ('b','a','a'), ('c','a','a')]
    # Convert list to dict
    wiki_data_dict = [dict(zip(("url", "title", "description"), x)) for x in wiki_data_list]
    # Convert dict to json object to return
    wiki_data_json = json.dumps(wiki_data_dict)

    # Return to PythonShell in ../api.controller.js
    print(wiki_data_json)

    
    final_compact_df_csv_file = 'final_compact_df.csv'
    # Download 'final_compact_df.csv' if it doesn't exist.
    if not os.path.exists(final_compact_df_csv_file):
        # Load AWS credentials
        is_prod = os.environ.get('IS_HEROKU', None)
        if is_prod:
            # Load from Heroku
            AWS_ACCESS_KEY_ID=os.environ['AWS_ACCESS_KEY_ID']
            AWS_SECRET_ACCESS_KEY=os.environ['AWS_SECRET_ACCESS_KEY']
            S3_BUCKET_NAME=os.environ['S3_BUCKET_NAME']
        else:
            # Load from .env file
            load_dotenv()
            AWS_ACCESS_KEY_ID=os.getenv('AWS_ACCESS_KEY_ID')
            AWS_SECRET_ACCESS_KEY=os.getenv('AWS_SECRET_ACCESS_KEY')
            S3_BUCKET_NAME=os.getenv('S3_BUCKET_NAME')

        # Retrieve index from S3
        s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID , aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
        s3.download_file(S3_BUCKET_NAME, final_compact_df_csv_file, final_compact_df_csv_file)
    '''

    cfg = sys.argv[1]
    searchPhrase = sys.argv[2]
    searchResults = search(cfg, searchPhrase)
    lookupFile = read_csv_pandas()
    outputFile = pd.DataFrame()
    if len(searchResults) > 0:
        for res in searchResults:
            outputFile = outputFile.append(lookupFile.loc[lookupFile['doc_id'] == res[0]])
        #outputFile.to_csv('searchResults.csv', index=False)
    records = outputFile[['wikiId','title','new_corpus_text1']].to_records(index=False)
    
    # List of 3 tuples (title, description, url)
    wiki_data_list = list(records)
    # Convert list to dict
    wiki_data_dict = [dict(zip(("url", "title", "description"), x)) for x in wiki_data_list]
    
    for idx in range(len(wiki_data_dict)):
        # Update url with wikipedia URL
        urlKey = "url"
        urlStr = wiki_data_dict[idx][urlKey]
        urlStr = urlStr.replace('wikipedia-', 'https://en.wikipedia.org/?curid=')
        wiki_data_dict[idx][urlKey] = urlStr

        # Remove redundant title and leading whitespaces from description.
        titleStr = wiki_data_dict[idx]["title"]
        descriptionKey = "description"
        descriptionStr = wiki_data_dict[idx][descriptionKey]
        descriptionStr = descriptionStr.replace(titleStr, "", 1)
        wiki_data_dict[idx][descriptionKey] = descriptionStr.lstrip()

    # Convert dict to json object to return
    wiki_data_json = json.dumps(wiki_data_dict)

    # Return to PythonShell in ../api.controller.js
    print(wiki_data_json)
    