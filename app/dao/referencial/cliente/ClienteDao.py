#Importacion de la conexion
from app.conexion.Conexion import ConexionDB

import psycopg2

class ClienteDao:
    def _ejecutarConsulta(self, consulta, params=None , fetch_one=False, fetch_all=False):
        conexion = ConexionDB()
        con = conexion.getConexion()
        cur = con.cursor()
        try:
            cur.execute(consulta,params)
            #Para consultas de select
            if fetch_one:
                resultado = cur.fetchone()
                return resultado
            if fetch_all:
                resultado = cur.fetchall()
                return resultado
            #Para  UPDATE, INSERT, DELETE
            con.commit()
            return True
        except psycopg2.Error as e:
            con.rollback()
            print(f"pgcode = {e.pgcode}, mensaje = {e.pgerror}")
            return False
        finally:
            cur.close()
            con.close()
    #Metodo para convertir la lista de tuplas a una lista de diccionarios
    def conver_dicc_clientes(self, lista):
        return[{'cod_cliente': item[0],'nom_cliente':item[1],
            'ape_cliente':item[2],'nro_doc_cliente':item[3],
            'direc_cliente':item[4],'nro_telf_cliente':item[5]}for item in lista]
    #Este metodo devuelve un select de la tabla
    def getClientes(self):
        clienteSQL = """
            SELECT cod_cliente, nom_cliente, ape_cliente,
            nro_doc_cliente, direc_cliente, nro_telf_cliente
            FROM cliente 
        """
        clientes = self._ejecutarConsulta(clienteSQL,fetch_all=True)
        if clientes is None:
            return []
        return self.conver_dicc_clientes(clientes)
    #METODO CONSULTA POR ID
    def getClienteById(self,cod_cliente):
        clienteSQL = """
            SELECT cod_cliente, nom_cliente, ape_cliente,cod_tip_doc, nro_doc_cliente,
            direc_cliente, id, cod_nac, nro_telf_cliente, fecha_nac_cliente FROM cliente
            WHERE cod_cliente = %s
        """
        cliente = self._ejecutarConsulta(clienteSQL, (cod_cliente,),fetch_one=True)
        if cliente:
            return {'cod_cliente': cliente[0], 'nom_cliente': cliente[1], 'ape_cliente': cliente[2],
                    'cod_tip_doc': cliente[3], 'nro_doc_cliente': cliente[4], 'direc_cliente': cliente[5],
                    'id':cliente[6], 'cod_nac': cliente[7], 'nro_telf_cliente': cliente[8], 'fecha_nac_cliente': cliente[9]}
        return None
    
    #METODO DE INSERCION
    def insertCliente(self,nom_cliente, ape_cliente,cod_tip_cliente, nro_doc_cliente,
            direc_cliente, id,cod_nac, nro_telf_cliente, fecha_nac_cliente):
        insertSql = """
            INSERT INTO cliente(nom_cliente, ape_cliente,cod_tip_doc, nro_doc_cliente,
            direc_cliente, id,cod_nac, nro_telf_cliente, fecha_nac_cliente) VALUES (
            %s,%s,%s,%s,%s,%s,%s,%s,%s)
        """
        return self._ejecutarConsulta(insertSql,(nom_cliente, ape_cliente,cod_tip_cliente, nro_doc_cliente,
            direc_cliente, id,cod_nac, nro_telf_cliente, fecha_nac_cliente))
    #METODO DE ACTUALIZACION
    def updateCliente(self, cod_cliente,nom_cliente,ape_cliente, cod_tip_cliente, nro_doc_cliente,
                      direc_cliente, id,cod_nac, nro_telf_cliente, fecha_nac_cliente):
        updateSql = """
            UPDATE cliente SET nom_cliente = %s, ape_cliente = %s, cod_tip_doc = %s, nro_doc_cliente = %s,
            direc_cliente = %s, id = %s, cod_nac = %s, nro_telf_cliente = %s,fecha_nac_cliente = %s
            WHERE cod_cliente = %s
        """
        return self._ejecutarConsulta(updateSql,(nom_cliente,ape_cliente,cod_tip_cliente,nro_doc_cliente,
                                                 direc_cliente,id,cod_nac,nro_telf_cliente,fecha_nac_cliente,cod_cliente))
    #METODO DE BORRADO
    def deleteCliente(self, cod_cliente):
        deleteSQL = """
            DELETE FROM cliente WHERE cod_cliente = %s
        """
        return self._ejecutarConsulta(deleteSQL,(cod_cliente,))
    
    