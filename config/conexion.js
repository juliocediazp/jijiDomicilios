const sqlite3 = require('sqlite3').verbose();

class conexion{
    constructor(){
        this.db = new sqlite3.Database(__dirname+'/jiji.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Conectado con jiji.db');
          });
    }
    
    /**
     * 
     * @param {sql para ejecucion de la query} sql 
     * @param {parametros de ejecucion de querys esta es opcional} params 
     * @param {conexion de bases de datos esta es opcional} conexion 
     */
    executeQuery(sql,params=[],conexion=this.db){
      return new Promise(function(resolve, reject){
        conexion.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
          });
       })
    }
    
    /**
     * 
     * @param {*} sql 
     * @param {*} params 
     * @param {*} conexion 
     */
    getSingleResult(sql,params=[],conexion=this.db){
        return new Promise(function(resolve, reject){
          conexion.get(sql, params, (err, row) => {
              if (err) {
                  reject(err);
              }
              resolve(row);
            });
         })
      }

      update(sql,params=[],conexion=this.db){
        return new Promise(function(resolve, reject){
            conexion.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                }
                resolve("OK");
              });
           })
      }
    
}
module.exports= conexion;  