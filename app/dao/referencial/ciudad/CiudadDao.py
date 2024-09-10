#Importacion de conexion 
from app.conexion.Conexion import ConexionDB
import psycopg2

class CiudadDao:
    def _ejecutarConsulta(self, consulta, params=None, fetch_one=False, fetch_all=False):
        conexion = ConexionDB()
        con = conexion.getConexion()
        cur = con.cursor()
        try:
            cur.execute(consulta,params)
            #Para consultas select
            if fetch_one:
                resultado = cur.fetchone()
                return resultado
            if fetch_all:
                resultado = cur.fetchall()
                return resultado
            #para consultas UPDATE, INSERT, DELETE
            con.commit()
            return True
        except psycopg2.Error as e:
            con.rollback()
            print(f"pgcode = {e.pgcode}, mensaje = {e.pgerror}")
            return False
        finally:
            cur.close()
            con.close()
    #Se obtiene la consulta desde la BD
    #Este metodo de  todas la ciudades en forma de tuplas
    #ya que usa fetch_all=TRUE
    def getCiudades(self):
        ciudadSQL = """
            SELECT id, descripcion 
            FROM ciudades 
            ORDER BY id ASC  -- Ordena  en orden ascendente     
        """
        ciudades = self._ejecutarConsulta(ciudadSQL, fetch_all=True)  # fetch_all para obtener todas las filas
        if ciudades is None:  # Si ocurre un error, maneja el caso
            return []
        return ciudades
    #Este metodo devuelve un diccionario con los campos id y descripcion
    def getCiudadById(self,id):
        ciudadSQL = """
            SELECT id , descripcion
            FROM ciudades WHERE id = %s
        """
        ciudad = self._ejecutarConsulta(ciudadSQL, (id,),fetch_one=True)
        if ciudad:
            return {'id': ciudad[0], 'descripcion': ciudad[1]}
        return None
    #Metodo de Insercion
    def insertCiudad(self, descripcion):
        insertSQL = """
            INSERT INTO ciudades(descripcion) VALUES(%s)
        """
        return self._ejecutarConsulta(insertSQL,(descripcion,))
    #Metodo de Actualizacion(Boton Editar)
    def updateCiudad (self, id, descripcion):
        updateSQL="""
            UPDATE ciudades SET descripcion = %s WHERE id = %s
        """
        return self._ejecutarConsulta(updateSQL,(descripcion,id))
    #Metodo de Borrado
    def deleteCiudad(self, id):
        deleteSQL = """
            DELETE FROM ciudades WHERE  id = %s
        """
        return self._ejecutarConsulta(deleteSQL,(id,))
