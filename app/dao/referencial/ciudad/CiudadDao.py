#Importacion de conexion 
from app.conexion.Conexion import ConexionDB

class CiudadDao:
    def _ejecutarConsulta(self, consulta, params=None, fecth_one=False):
        conexion = ConexionDB()
        con = conexion.getConexion()
        cur = con.cursor()
        try:
            cur.execute(consulta, params)
            if fecth_one:
                return cur.fetchone()
            return cur.fetchall()
        except con.Error as e:
            print(f"pgcode ={e.pgcode}, mensaje ={e.pgerror}")
        finally:
            cur.close()
            con.close()
    #Se obtiene la consulta desde la BD
    def getCiudades(self):
        ciudadSQL = """
            SELECT id, descripcion 
            FROM ciudades      
        """
        return self._ejecutarConsulta(ciudadSQL)
    def getCiudadById(self,id):
        ciudadSQL = """
            SELECT id , descripcion
            FROM ciudades WHERE id = %s
        """
        ciudad = self._ejecutarConsulta(ciudadSQL, (id),fecth_one=True)
        if ciudad:
            return {'id': ciudad[0], 'descripcion': ciudad[1]}
        return none