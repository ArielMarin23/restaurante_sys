from flask import Blueprint,render_template,request,redirect,url_for,jsonify
from app.dao.referencial.ciudad.CiudadDao import CiudadDao
ciumod = Blueprint('ciudad',__name__, template_folder='templates')
#Vista Principal de ciudad
@ciumod.route('/index_ciudad')
def index_ciudad():
    cdao = CiudadDao()
    lista = cdao.getCiudades()
    diccionario = convertir_diccionario(lista)
    return render_template('index_ciudad.html',ciudades=diccionario)
#Funcion auxiliar convierte tuplas en lista de diccionarios
def convertir_diccionario(lista):
    return[{'id': item[0], 'descripcion': item[1]} for item in lista]
#Vista del formulario agregar
@ciumod.route('/agregar_ciudad')
def agregar_ciudad():
    return render_template('agregar_ciudad.html')
#Vista del formulario editar
@ciumod.route('/editar_ciudad')
def editar_ciudad():
    return render_template('editar_ciudad.html')