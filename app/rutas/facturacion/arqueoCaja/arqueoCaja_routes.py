from flask import Blueprint,render_template
arqueocajamod = Blueprint('arqueocaja',__name__,template_folder='templates',url_prefix='/arqueocaja')
#vista formulario de Cierre de caja
@arqueocajamod.route('/form-arqueo')
def form_arqueo():
    return render_template('form-arqueoCaja.html')