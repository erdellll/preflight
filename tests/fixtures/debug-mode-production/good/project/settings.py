import os

SECRET_KEY = os.environ["SECRET_KEY"]
DEBUG = os.environ.get("DEBUG") == "1"
