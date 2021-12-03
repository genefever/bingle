import os
import boto3
from dotenv import load_dotenv

print("-----> GENE Running startup.py...")
final_compact_df_csv_file = 'final_compact_df.csv'
os.chdir('./python')

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
print("-----> Downloading files...")
s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID , aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
s3.download_file(S3_BUCKET_NAME, final_compact_df_csv_file, final_compact_df_csv_file)
print("-----> startup.py completed!")