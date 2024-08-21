from flask import Blueprint,render_template,request,redirect,url_for,jsonify
ciumod = Blueprint('ciudad', __name__)

@ciumod.route('/index')
def index_ciudad():
    return "<h1>¡Bienvenido a la página de ciudad!</h1><p>Esto es una prueba básica.</p>"