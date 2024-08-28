from flask import Blueprint,render_template
clienmod = Blueprint('cliente',__name__, template_folder='templates')

#Vista principal de clientes
@clienmod.route('/index_cliente')
def index_cliente():
    return render_template('index_cliente.html')    