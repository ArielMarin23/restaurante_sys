from flask import Blueprint,render_template
clienmod = Blueprint('cliente',__name__, template_folder='templates')

#Vista principal de clientes
@clienmod.route('/agregar-cliente')
def index_cliente():
    return render_template('agregar-cliente.html')    