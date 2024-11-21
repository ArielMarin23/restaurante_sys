from flask import Blueprint,render_template,jsonify,request,url_for,redirect

cierrecajamod = Blueprint('cierrecaja',__name__,template_folder='templates',url_prefix='/cierrecaja')

#Vista del formulario de Cierre de caja
@cierrecajamod.route('/cierre-caja-form')
def form_cierre():
    return render_template('form-cierreCaja.html')