import os
import boto3
from botocore.exceptions import ClientError

# Load AWS credentials from Heroku
AWS_ACCESS_KEY_ID=os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY=os.environ['AWS_SECRET_ACCESS_KEY']
S3_BUCKET_NAME=os.environ['S3_BUCKET_NAME']
s3_client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID , aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

def download_dir(prefix, local, bucket, client=s3_client):
    """
    Download file or directory recursively from AWS S3.

    params:
    - prefix: pattern to match in s3
    - local: local path to folder in which to place files
    - bucket: s3 bucket with target contents
    - client: initialized s3 client object
    """
    keys = []
    dirs = []
    next_token = ''
    base_kwargs = {
        'Bucket':bucket,
        'Prefix':prefix,
    }
    print("-----> Retrieving object '%s'..." % prefix)

    while next_token is not None:
        kwargs = base_kwargs.copy()
        if next_token != '':
            kwargs.update({'ContinuationToken': next_token})
        results = client.list_objects_v2(**kwargs)
        contents = results.get('Contents')

        if not contents:
            print("-----> Object '%s' does not exist. Continuing..." % prefix)
            return

        for i in contents:
            k = i.get('Key')
            if k[-1] != '/':
                keys.append(k)
            else:
                dirs.append(k)
        next_token = results.get('NextContinuationToken')
    for d in dirs:
        dest_pathname = os.path.join(local, d)
        if not os.path.exists(os.path.dirname(dest_pathname)):
            os.makedirs(os.path.dirname(dest_pathname))
    for k in keys:
        dest_pathname = os.path.join(local, k)
        if not os.path.exists(os.path.dirname(dest_pathname)):
            os.makedirs(os.path.dirname(dest_pathname))
        try:
            client.download_file(bucket, k, dest_pathname)
            print("-----> Downloaded '%s' successfully!" % k)
        except ClientError as e:
            print("-----> Unexpected error occurred while downloading: %s" % e)
            raise(e)

print("-----> Running startup.py...")
print("-----> Downloading index files from AWS S3...")

os.chdir('./python')

# List of tuples containing files/folders to download from S3
# followed by their destination download path.
files = [('final_compact_df.csv', '.'), ('idx/', '.'), ('wikipedia.dat', 'wikipedia')]

for file, dest in files:
    download_dir(file, dest, S3_BUCKET_NAME)
    
print("-----> Completed startup.py!")
