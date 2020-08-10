import sys
import os
CURRENT_FILE = os.path.abspath(__file__)
CURRENT_DIR = os.path.dirname(CURRENT_FILE)
sys.path.append(CURRENT_DIR)
sys.path.append(CURRENT_DIR+'/services/')
sys.path.append(CURRENT_DIR+'/Server/')
sys.path.append(CURRENT_DIR+'/venv/lib/python3.8/site-packages/')

from Server import app
import Server.views
from Server.settings import SERVER_HOST, SERVER_PORT
import Server.settings as ss

# start flask service
if __name__ == "__main__":
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=True, threaded=True)