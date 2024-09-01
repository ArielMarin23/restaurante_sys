from flask import Blueprint,render_template,request,redirect,url_for,jsonify
from app.dao.referencial.ciudad.CiudadDao import CiudadDao
from flask import flash

ciumod = Blueprint('ciudad',__name__, template_folder='templates')
#Funcion auxiliar convierte tuplas en lista de diccionarios
def convertir_diccionario(lista):
    return[{'id': item[0], 'descripcion': item[1]} for item in lista]
#Vista Principal de ciudad
#Muestra la base datos en el html
@ciumod.route('/index_ciudad')
def index_ciudad():
    cdao = CiudadDao()
    lista = cdao.getCiudades()
    diccionario = convertir_diccionario(lista)
    return render_template('index_ciudad.html',ciudades=diccionario)
#Vista del formulario agregar
@ciumod.route('/agregar_ciudad')
def agregar_ciudad():
    return render_template('agregar_ciudad.html')
#Vista del formulario editar
#Esta funcion trae los datos de la DB y los pasa en el html
@ciumod.route('/editar_ciudad/<id>')
def editar_ciudad(id):
    cdao = CiudadDao()
    ciudadFound = cdao.getCiudadById(id)
    if ciudadFound:
        return render_template('editar_ciudad.html', ciudad=ciudadFound)
    return redirect(url_for('index_ciudad'))

@ciumod.route('/update_ciudad', methods=['POST'])
def update_ciudad():
    cdao = CiudadDao()  # Instancia del Data Access Object (DAO)
    
    idtxtciudad = request.form.get('idtxtciudad')
    txtciudad = request.form.get('txtciudad')
    
    # Verificación básica de los campos
    if not idtxtciudad or not txtciudad.strip():
        return redirect(url_for('ciudad.editar_ciudad', id=idtxtciudad))
    
    # Intentar actualizar la ciudad
    isUpdate = cdao.updateCiudad(idtxtciudad.strip(), txtciudad.strip().upper())
    
    if isUpdate:
        return redirect(url_for('ciudad.index_ciudad',update_status='success'))  # Redirige a la lista de ciudades después de actualizar
    else:
        return redirect(url_for('ciudad.editar_ciudad',update_status='error', id=idtxtciudad))  # Si falla, redirige a la edición