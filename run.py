import sys
sys.dont_write_bytecode = True #desactiva la creacion del carpeta __pycache__
from app import app
from flask import render_template

if __name__ == '__main__':
    app.run(debug=True)