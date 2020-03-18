const DatabaseState = [
    {STOPPED : 1 << 0},
    {CONNECTED_READ : 1 << 1},
    {CONNECTED_WRITE : 1 << 2},
    {CONNECTED_READ_WRITE : 1 << 1 | 1 << 2}
];

const emptystring = '';
const sqlite = require('sqlite3').verbose();

var state = DatabaseState.STOPPED;

module.exports = {

    openOrCreate : function (config, logCallback){
        if(state != DatabaseState.STOPPED){
            stopBase();
        }

        let path = config['path'];

        logCallback(`Trying open or create database file ${path}`);

        if(path){
            this.database = new sqlite.Database(path, sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE, function(error){
                
                ErrorHandler(error, logCallback);
                
                state = DatabaseState.OPEN_READWRITE;
            });
        }
    },

    createTable : function(table, logCallback){
        if(state == DatabaseState.CONNECTED_WRITE || state == DatabaseState.CONNECTED_READ_WRITE){
            
            let tableName = table['table'];
            let tableObject = table['object'];

            if(tableName && tableObject){

                let sqlString =`CREATE TABLE IF NOT EXISTS ${tableName} (${objectToKeys(tableObject)});`;

                logCallback(sqlString);

                this.database.run(sqlString, function(error, state){
                    ErrorHandler(error, logCallback);
                });
            }
        }
    },

    writeData : function(data, logCallback){
        if(state == DatabaseState.CONNECTED_WRITE || state == DatabaseState.CONNECTED_READ_WRITE){
            
            let tableName = data['table'];
            let dataObject = data['object'];

            if(tableName && dataObject){
                let columns = '';
                let values = '';

                Object.keys(dataObject).forEach(key =>{
                    columns += `${key},`;
                    values += `'${dataObject[key]}',`;
                });

                columns = columns.substring(0, columns.length - 1);
                values = values.substring(0, values.length - 1);

                let sqlString = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;

                logCallback(sqlString);

                this.database.run(sqlString, function(error, state){
                    ErrorHandler(error, logCallback);
                });
            }
        }
    },

    readData : function(data, dataCallback, logCallback){
        if(state == DatabaseState.CONNECTED_WRITE || state == DatabaseState.CONNECTED_READ_WRITE){
            
            let tableName = undefined;
            let condition = undefined;

            if(typeof(data) == 'object'){
                tableName = data['table'];
                condition = data['condition'];
            } else {
                tableName = data;
            }

            if(tableName){

                let sqlString = `SELECT * FROM ${tableName} ${condition ? `WHERE ${condition}` : emptystring};`;
                
                this.database.all(sqlString, [], function(error, elements) {
                    
                    ErrorHandler(error, logCallback);
                    
                    dataCallback(elements);
                });
            }
        }
    },

    stopBase : function (){

        if(this.database){
            this.database.close();
        }

        state = DatabaseState.STOPPED;
    },
    
}

function ErrorHandler(error, errorCallback){
    if(error){
        if(errorCallback){
            errorCallback(error);
        }

        throw error;
    }
}

function objectToKeys (value){

    let result = '';

    Object.keys(value).forEach(name =>{

        let line = `${name} ${value[name]}`;

        if(name == 'PRIMARY_KEY'){
            value[name].forEach(key => {
                result += `PRIMARY KEY (${key}),`
            });
        }else{
            result += `${line},`;
        }
    });

    result = result.substring(0, result.length - 1);

    return result;
}