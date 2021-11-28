import pandas as pd
import itertools
from collections import Counter
import gensim.downloader as api
from gensim.utils import simple_preprocess
from gensim.corpora import Dictionary
from gensim.models import TfidfModel
from gensim.similarities import WordEmbeddingSimilarityIndex
from gensim.similarities import SparseTermSimilarityMatrix
from gensim.similarities import SoftCosineSimilarity

#filename= "C:\\Users\\14088\\Documents\\Books\\CS410 - TIS\\documents_utf8_filtered_20pageviews.csv"
#chunksize = 10 ** 8
#for chunk in pd.read_csv(filename, chunksize=chunksize):
#    process(chunk)

filename= "C:\\Users\\14088\\Documents\\Books\\CS410 - TIS\\documents_utf8_filtered_20pageviews.csv"
df = pd.read_csv(filename, header = None)

#### to view the column content ####
#  df[df.columns[1]][8]

#### Extracting the Title of the page ####
title_list = []
def find_index(vec):
    for i in range(len(vec)):
        index_ptr = vec[i][1:].index('')
        title_list.append(vec[i][1:(index_ptr + 1)])



df1 = df[df.columns[1]].str.split(' ')
find_index(df1)

d = {'wikiId': df[df.columns[0]], 'title': title_list}
test = pd.DataFrame(data=d)
test.to_csv("C:\\Users\\14088\\Documents\\Books\\CS410 - TIS\\titlepages.csv", index=False)
#title_df = pd.read_csv("C:\\Users\\14088\\Documents\\Books\\CS410 - TIS\\titlepages.csv")


title_flat_list = list(itertools.chain.from_iterable(title_list))

counts = Counter(title_flat_list)
print(counts)
x = counts.most_common(100)


###########################################################

import nltk

# Import and download stopwords from NLTK.
nltk.download('stopwords')  # Download stopwords list.
stopwords = set(nltk.corpus.stopwords.words("english"))

def preprocess(doc):
    return [token for token in simple_preprocess(doc, min_len=0, max_len=float("inf")) if token not in stopwords]

documents = df[df.columns[1]]

query_string = 'fruit and vegetables'
corpus = [preprocess(document) for document in documents]
query = preprocess(query_string)

glove_vectors = api.load('glove-wiki-gigaword-300')
#glove_vectors.most_similar('twitter')

similarity_index = WordEmbeddingSimilarityIndex(glove_vectors)

######################  corpus reduction  ########################
query_terms = [glove_vectors.most_similar(word) for word in query]


##################################################################
# Build the term dictionary, TF-idf model
# The search query must be in the dictionary as well, in case the terms do not overlap with the documents (we still want similarity)
dictionary = Dictionary(corpus+[query])
tfidf = TfidfModel(dictionary=dictionary)

# Create the term similarity matrix.
# The nonzero_limit enforces sparsity by limiting the number of non-zero terms in each column.
# For my application, I got best results by removing the default value of 100
similarity_matrix = SparseTermSimilarityMatrix(similarity_index, dictionary, tfidf)  # , nonzero_limit=None)


query_tf = tfidf[dictionary.doc2bow(query)]

index = SoftCosineSimilarity(
            tfidf[[dictionary.doc2bow(document) for document in corpus]],
            similarity_matrix)

doc_similarity_scores = index[query_tf]


import whoosh.analysis as analysis
import whoosh.highlight as highlight

def test_context_fragment(doc, query):
    #terms = int(frozenset(query))
    terms = query
    print(terms)
    sa = analysis.StandardAnalyzer()
    cf = highlight.ContextFragmenter(terms, surround=6)
    uc = highlight.UppercaseFormatter()
    htext = highlight.highlight(doc, terms, sa, cf, uc)
    #self.assertEqual(htext, "alfa BRAVO charlie...hotel INDIA juliet")
    print(htext)


import numpy as np
sorted_indexes = np.argsort(doc_similarity_scores)[::-1]
for idx in sorted_indexes[:3]:
    print(f'{idx} \t {doc_similarity_scores[idx]:0.3f} \t {title_df.iloc[idx]}')
    #title_df.iloc[idx]
    print(test_context_fragment(df.iloc[idx][df.columns[1]], query))
