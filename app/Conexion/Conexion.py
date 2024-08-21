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

    def getConexion(self):
         """Método getConexion, retorna la conexion.

        Si la conexion se realizó en el método constructor de la Clase Conexion,
        se retorna dicha instancia.

        Retorna:
        con -- conexion

        """
        return self.__con