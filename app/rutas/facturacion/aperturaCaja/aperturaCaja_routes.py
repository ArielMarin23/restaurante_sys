from flask import Blueprint,render_template,jsonify,request,url_for,redirect

apercajamod = Blueprint('aperturacaja',__name__,template_folder='templates',url_prefix='/aperturacaja')

#Vista formulario de Apertura de Caja
@apercajamod.route('/apertura-index')
def form_apertura():
    return render_template('form-apertura.html')
