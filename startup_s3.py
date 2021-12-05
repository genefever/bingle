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



print("Path at terminal when executing this file")
print(os.getcwd() + "\n")

os.chdir('/app/python')
print("Path at terminal after chdir to python")
print(os.getcwd() + "\n")

print("Files before download")
files = os.listdir('.')
# Loop to print each filename separately
for filename in files:
    print(filename)

# print("This file path, relative to os.getcwd()")
# print(__file__ + "\n")

# print("This file full path (following symlinks)")
# full_path = os.path.realpath(__file__)
# print(full_path + "\n")

# print("This file directory and name")
# path, filename = os.path.split(full_path)
# print(path + ' --> ' + filename + "\n")

# print("This file directory only")
# print(os.path.dirname(full_path))



# List of tuples containing files/folders to download from S3
# followed by their destination download path.
files = [('final_compact_df.csv', '/app/python'), ('idx/', '/app/python'), ('wikipedia.dat', '/app/python/wikipedia')]

for file, dest in files:
    download_dir(file, dest, S3_BUCKET_NAME)

print("Files after download")
files = os.listdir('.')
# Loop to print each filename separately
for filename in files:
    print(filename)

print("-----> Completed startup.py!")