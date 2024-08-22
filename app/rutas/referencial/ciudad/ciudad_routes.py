from flask import Blueprint,render_template,request,redirect,url_for,jsonify
ciumod = Blueprint('ciudad', __name__, template_folder='templates')

@ciumod.route('/indexCiudad')
def index_ciudad():
    return render_template('index-ciudad.html')