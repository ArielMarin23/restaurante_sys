from flask import Blueprint,render_template
mod = Blueprint('inicio',__name__)

@mod.route("/inicio")
def index():
    return render_template('base.html')