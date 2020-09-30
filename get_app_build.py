
import tarfile
import os
import shutil
import requests
from requests.auth import HTTPBasicAuth

build_url = 'https://local--visualize-nyc-2021.netlify.app/build.tar.gz'

def get_app_build():
  # Remove previous builds

  if os.path.isfile('Client/build.tar.gz'):
      os.remove('Client/build.tar.gz')

  if os.path.isdir('static/build'):
    shutil.rmtree('static/build')

  # Download and deploy a new build

  build = requests.get(build_url, allow_redirects=True,
                          auth=HTTPBasicAuth('mitstudents', 'mitstudents'))

  open('Client/build.tar.gz', 'wb').write(build.content)

  tar = tarfile.open('Client/build.tar.gz')
  tar.extractall('static')
  tar.close()
