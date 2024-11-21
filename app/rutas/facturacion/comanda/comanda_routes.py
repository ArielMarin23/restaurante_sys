from flask import Blueprint,render_template
comandamod = Blueprint('comanda',__name__,template_folder='templates',url_prefix='/comanda')

#vista de formulario de comanda
@comandamod.route('/form-comanda')
def form_comanda():
    return render_template('form-comanda.html')