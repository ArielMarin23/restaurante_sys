from flask import Blueprint,render_template,request,redirect,url_for,jsonify
from app.dao.referencial.ciudad.CiudadDao import CiudadDao

from flask import flash

ciumod = Blueprint('ciudad',__name__, template_folder='templates',url_prefix='/ciudad')
#Vista Principal de ciudad
#Muestra la base datos en el html
@ciumod.route('/index-ciudad')
def index_ciudad():
    cdao = CiudadDao()
    dicc_ciudad = cdao.getCiudades()
    return render_template('index-ciudad.html',ciudades=dicc_ciudad)
#Vista del formulario agregar
@ciumod.route('/agregar-ciudad')
def agregar_ciudad():
    return render_template('agregar-ciudad.html')
#Metodo que guarda
@ciumod.route('/saved-ciudad',methods=['POST'])
def saved_ciudad():
    cdao = CiudadDao()
    txtciudad = request.form.get('txtciudad')
    isSaved = False
    #Verifico que se haya cargado algun valor en txtciudad
    if txtciudad and txtciudad.strip():
        isSaved = cdao.insertCiudad(txtciudad.strip().upper())

    if isSaved:
        return redirect(url_for('ciudad.index_ciudad', update_status='success'))
    else:
        return redirect(url_for('ciudad.agregar_ciudad', update_status='error'))

#Vista del formulario editar
#Esta funcion trae los datos de la DB y los pasa en el html
@ciumod.route('/editar-ciudad/<id>')
def editar_ciudad(id):
    cdao = CiudadDao()
    ciudadFound = cdao.getCiudadById(id)
    if ciudadFound:
        return render_template('editar-ciudad.html', ciudad=ciudadFound)
    return redirect(url_for('index_ciudad'))
#Metodoo UPDATE
@ciumod.route('/update-ciudad', methods=['POST'])
def update_ciudad():
    cdao = CiudadDao()  # Instancia del Data Access Object (DAO)
    idtxtciudad = request.form.get('idtxtciudad')
    txtciudad = request.form.get('txtciudad')
    
    # Verificación básica de los campos
    # Con not verifico que no este vacio los campos
    #si no esta vacio redirigo al formulario
    if not idtxtciudad or not txtciudad.strip():
        return redirect(url_for('ciudad.editar-ciudad', id=idtxtciudad))
    
    # Intentar actualizar la ciudad
    isUpdate = cdao.updateCiudad(idtxtciudad.strip(), txtciudad.strip().upper())
    
    if isUpdate:
        return redirect(url_for('ciudad.index_ciudad',update_status='success',action='update'))  # Redirige a la lista de ciudades después de actualizar
    else:
        return redirect(url_for('ciudad.editar_ciudad',update_status='error', id=idtxtciudad))  # Si falla, redirige a la edición
    #Metodo  Delete
@ciumod.route('/delete-ciudad/<id>')
def delete_ciudad(id):
    cdao = CiudadDao()
    cdao.deleteCiudad(id)
    return redirect(url_for('ciudad.index_ciudad', update_status='advertencia'))