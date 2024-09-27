from app.conexion.Conexion import ConexionDB
import psycopg2

class NacionalidadDao:
    def _ejecutarConsulta(self, consulta, params=None ,fetch_one=False, fetch_all=False):
        conexion = ConexionDB()
        con = conexion.getConexion()
        cur = con.cursor()
        try:
            cur.execute(consulta,params)
            if fetch_one:
                resultado = cur.fetchone()
                return resultado
            if fetch_all:
                resultado = cur.fetchall()
                return resultado
            con.commit()
            return True
        except psycopg2.Error as e:
            con.rollback()
            print(f"pgcode = {e.pgcode}, mensaje ={e.pgerror}")
            return False
        finally:
            cur.close()
            con.close()
    #METODO SELECT DE TODAS LAS CIUDADES
    def getNacionalidades(self):
        NacionalidadSQL = """
            SELECT cod_nac, descrip_nac
            FROM nacionalidad 
            ORDER BY cod_nac ASC  -- Ordena  en orden ascendente     
        """
        Nacionalidades = self._ejecutarConsulta(NacionalidadSQL, fetch_all=True)  # fetch_all para obtener todas las filas
        if Nacionalidades is None:  # Si ocurre un error, maneja el caso
            return []
        return self.conver_dicc_nacionalidad( Nacionalidades)
    #Convierte la tupla en diccionario
    def conver_dicc_nacionalidad(self,lista):
        return[{'cod_nac': item[0],'descrip_nac':item[1]} for item in lista]