from flask import Flask, render_template,request
from app import rutas

app = Flask(__name__)
#definir una funcion de procesador de contexto para la aplicacion
@app.context_processor
def inject_activate_page():
    #Obtener la pagina activa usando request.endpoint
    activate_page = request.endpoint
    #devolver un diccionario con la variable active_page
    return dict(activate_page=activate_page)

from app.rutas.inicio.routes import mod

#app.register_blueprint(mod)
app.register_blueprint(rutas.inicio.routes.mod)