import psycopg2
class Conexion:
    def __init__(self):
        """
        ESTE METODO CONSTRUYE LA CLASE CONEXION
        El metodo connect obtiene la instancia 
        de la conexion a la base de datos
        """
        self.__con=psycopg2.connect("dbname=db_restaurante user=arielMarin host=localhost password=admin")
        #Solo es un ejemplo se debe remplazar por la base dato real

    def getConexion(self):#Retorna la conexion
        
        return self.__con