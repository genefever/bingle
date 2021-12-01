import math
import sys
import time
import metapy
import pytoml
from pathlib import Path

#file_name = "C:\\Users\\14088\\Documents\\Books\\CS410 - TIS\\final_compact_df.csv"

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


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: {} config.toml <query>".format(sys.argv[0]))
        sys.exit(1)
    cfg = sys.argv[1]
    searchPhrase = sys.argv[2]
    searchResults = search(cfg, searchPhrase)
    lookupFile = read_csv_pandas()
    outputFile = pd.DataFrame()
    if len(searchResults) > 0:
        for res in searchResults:
            outputFile = outputFile.append(lookupFile.loc[lookupFile['doc_id'] == res[0]])
        #outputFile.to_csv('searchResults.csv', index=False)




def runSearch(cfg_file):
    # cfg = sys.argv[1]
    cfg = cfg_file
    # query_content = sys.argv[2]
    print('Building or loading index...')
    idx = metapy.index.make_inverted_index(cfg)
    print("number of docs:", idx.num_docs())
    print("unique terms: ", idx.unique_terms())
    print("average doc length: ", idx.avg_doc_length())
    print("total corpus terms: ", idx.total_corpus_terms())
    print()
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
            print("search results", results)
            avg_p = ev.avg_p(results, query_start + query_num, num_results)
            f_bm25.write(str(avg_p))
            f_bm25.write("\n")
            arr_OkapiBM25.append(avg_p)
            print("Query {} average precision: {}".format(query_num + 1, avg_p))
    ev.map()