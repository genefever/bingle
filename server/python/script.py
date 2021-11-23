import json
import sys

# string = sys.argv[1]
# print(string)

wiki_data_list = [("Title1", "This is some text description...", "123"), ("Title2", "This is some other text description...", "123"), ("Title3", "This is another text description...", "123")]
wiki_data_dict = [dict(zip(("title", "description", "link"), x)) for x in wiki_data_list]
wiki_data_json = json.dumps(wiki_data_dict)

print(wiki_data_json)