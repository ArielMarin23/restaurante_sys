from flask import Blueprint,render_template,jsonify,request,url_for,redirect
from app.dao.referencial.cliente.ClienteDao import ClienteDao
from app.dao.referencial.ciudad.CiudadDao import CiudadDao
from app.dao.referencial.nacionalidad.NacionalidadDao import NacionalidadDao
from app.dao.referencial.tipDocumento.TipDocumentoDao import TipDocumentoDao
clienmod = Blueprint('cliente',__name__, template_folder='templates')

#Vista principal de clientes
@clienmod.route('/index-cliente')
def index_cliente():
    cdao = ClienteDao()
    dicc_cliente = cdao.getClientes()  # Obtiene clientes convertidos en diccionario
    return render_template('index-cliente.html',clientes=dicc_cliente)

@clienmod.route('/ver-cliente/<cod_cliente>', methods=['GET'])
def ver_cliente(cod_cliente):
    cdao = ClienteDao()
    clienteFound = cdao.getClienteById(cod_cliente)
    if clienteFound:
       return jsonify(clienteFound)

@clienmod.route('/agregar-cliente')
def agregar_cliente():
   modo = 'agregar'
   return render_template('agregar-cliente.html', modo=modo)

@clienmod.route('/saved-cliente', methods=['POST'])
def saved_cliente():
    cdao = ClienteDao()
    data = request.get_json()  # Captura los datos enviados en formato JSON
    # Extraer los datos del cliente del JSON
    nom_cliente = data.get('nom_cliente')
    ape_cliente = data.get('ape_cliente')
    tipo_documento = data.get('tipo_documento')
    nro_doc_cliente = data.get('nro_doc_cliente')
    direc_cliente = data.get('direc_cliente')
    ciudad = data.get('ciudad')
    nacionalidad = data.get('nacionalidad')
    nro_telf_cliente = data.get('nro_telf_cliente')
    fecha_nac_cliente = data.get('fecha_nac_cliente')

    # Verificar que todos los campos necesarios tengan valores
    if nom_cliente and ape_cliente and tipo_documento and nro_doc_cliente:
        try:
            # Convertir los campos a los tipos adecuados
            tipo_documento = int(tipo_documento) if tipo_documento else None
            ciudad = int(ciudad) if ciudad else None
            nacionalidad = int(nacionalidad) if nacionalidad else None

            # Convertir fecha_nac_cliente a un objeto datetime si es necesario
            # Siempre verificar el como recibo y envio la fecha a mi servidor
            from datetime import datetime
            fecha_nac_cliente = datetime.strptime(fecha_nac_cliente, '%d/%m/%Y') if fecha_nac_cliente else None
        except ValueError as e:
            return jsonify({'status': 'error', 'message': f'Error en la conversión de datos: {e}'}), 400

        # Llamar al método de inserción del clienteDao
        try:
            isSaved = cdao.insertCliente(
                nom_cliente.strip().upper(),
                ape_cliente.strip().upper(),
                tipo_documento,
                nro_doc_cliente,
                direc_cliente.strip().upper() if direc_cliente else None,
                ciudad,
                nacionalidad,
                nro_telf_cliente,
                fecha_nac_cliente
            )
            if isSaved:
                return jsonify({'status': 'success', 'redirect_url': url_for('cliente.index_cliente')}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Error al guardar el cliente'}), 500
        except Exception as e:
            return jsonify({'status': 'error', 'message': f'Error en la inserción del cliente: {e}'}), 500
    else:
        return jsonify({'status': 'error', 'message': 'Datos incompletos'}), 400
#Esta ruta solo obtiene datos para los select
@clienmod.route('/datos_formulario', methods=['GET'])
def obtener_ciudad():
    ciuDao = CiudadDao()
    nacDao = NacionalidadDao()
    tipDocDao = TipDocumentoDao()
    ciudades = ciuDao.getCiudades()
    nacionalidades = nacDao.getNacionalidades()
    tipos_documentos = tipDocDao.getTipDocumento()
    return jsonify({
        'ciudades': ciudades,
        'nacionalidades': nacionalidades,
        'tipos_documentos': tipos_documentos
    })  # Devolver los datos en formato JSON
# Vista del formulario editar
@clienmod.route('/editar-cliente/<cod_cliente>', methods=['GET'])
def editar_cliente(cod_cliente):
    modo = 'actualizar'
    cdao = ClienteDao()
    clienteFound = cdao.getClienteById(cod_cliente)
    print(clienteFound)
    if clienteFound:
       return render_template('agregar-cliente.html', cliente=clienteFound,modo=modo)

#Metodo para actualizar
@clienmod.route('/update-cliente', methods=['POST'])
def update_cliente():
    cdao = ClienteDao()
    data = request.get_json()#Captura los datos enviados en formato Json
    # Extraer los datos del cliente del JSON
    cod_cliente = data.get('cod_cliente')  # Asegúrate de que el ID del cliente se envíe
    nom_cliente = data.get('nom_cliente')
    ape_cliente = data.get('ape_cliente')
    tipo_documento = data.get('tipo_documento')
    nro_doc_cliente = data.get('nro_doc_cliente')
    direc_cliente = data.get('direc_cliente')
    ciudad = data.get('ciudad')
    nacionalidad = data.get('nacionalidad')
    nro_telf_cliente = data.get('nro_telf_cliente')
    fecha_nac_cliente = data.get('fecha_nac_cliente')

    # Verificar que todos los campos necesarios tengan valores
    if cod_cliente and nom_cliente and ape_cliente and tipo_documento and nro_doc_cliente:
        try:
            # Convertir los campos a los tipos adecuados
            cod_cliente = int(cod_cliente) if cod_cliente else None
            tipo_documento = int(tipo_documento) if tipo_documento else None
            ciudad = int(ciudad) if ciudad else None
            nacionalidad = int(nacionalidad) if nacionalidad else None

            # Convertir fecha_nac_cliente a un objeto datetime si es necesario
            from datetime import datetime
            fecha_nac_cliente = datetime.strptime(fecha_nac_cliente, '%d/%m/%Y') if fecha_nac_cliente else None
        except ValueError as e:
            return jsonify({'status': 'error', 'message': f'Error en la conversión de datos: {e}'}), 400

        # Llamar al método de actualización del clienteDao
        try:
            isUpdated = cdao.updateCliente(
                cod_cliente,  # Asegúrate de pasar el ID del cliente
                nom_cliente.strip().upper(),
                ape_cliente.strip().upper(),
                tipo_documento,
                nro_doc_cliente,
                direc_cliente.strip().upper() if direc_cliente else None,
                ciudad,
                nacionalidad,
                nro_telf_cliente,
                fecha_nac_cliente
            )
            if isUpdated:
                return jsonify({'status': 'success', 'redirect_url': url_for('cliente.index_cliente')}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Error al actualizar el cliente'}), 500
        except Exception as e:
            return jsonify({'status': 'error', 'message': f'Error en la actualización del cliente: {e}'}), 500
    else:
        return jsonify({'status': 'error', 'message': 'Datos incompletos'}), 400

@clienmod.route('/delete-cliente/<cod_cliente>')
def delete_cliente(cod_cliente):
    cdao = ClienteDao()
    cdao.deleteCliente(cod_cliente)
    return redirect(url_for('cliente.index_cliente', update_status='advertencia'))
