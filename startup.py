import os
import shutil

print("-----> Running startup.py...")
print("-----> Moving downloaded files from AWS S3...")
shutil.move("/app/wikipedia.dat", "/app/python/wikipedia/wikipedia.dat")
shutil.move("/app/final_compact_df.csv", "/app/python/final_compact_df.csv")
print(os.getcwd())
print("-----> Completed startup.py!")
