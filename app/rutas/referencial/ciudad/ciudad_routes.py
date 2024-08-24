from flask import Blueprint,render_template,request,redirect,url_for,jsonify
ciumod = Blueprint('ciudad',__name__, template_folder='templates')

@ciumod.route('/index_ciudad')
def index_ciudad():
    return render_template('index_ciudad.html')

@ciumod.route('/editar_ciudad')
def editar_ciudad():
    return render_template('editar_ciudad.html')