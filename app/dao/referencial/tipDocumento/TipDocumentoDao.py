from app.conexion.Conexion import ConexionDB
import psycopg2

class TipDocumentoDao:
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
    def getTipDocumento(self):
        tipDocumentoSQL = """
            SELECT cod_tip_doc, descrip_tip_doc
            FROM tipo_documento
        """
        tipDocumentos = self._ejecutarConsulta(tipDocumentoSQL, fetch_all=True)  # fetch_all para obtener todas las filas
        if tipDocumentos is None:  # Si ocurre un error, maneja el caso
            return []
        return self.conver_dicc_tipDocumento(tipDocumentos)
    #Convierte la tupla en diccionario
    def conver_dicc_tipDocumento(self,lista):
        return[{'cod_tip_doc': item[0],'descrip_tip_doc':item[1]} for item in lista]