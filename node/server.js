const path = require('path');
const express = require('express');
const sqlcontroller = require('./sqlcontroller');

const app = express();
const date = new Date();
const repos = 
    path.join(
    path.dirname(
    path.resolve()), 'src');


var serverConfig = {
    port:3000,
    host:'localhost'
};

var sqlConfig = {
    path: path.dirname(repos) + '/node/database.db'
};


sqlcontroller.openOrCreate(sqlConfig, log);

sqlcontroller.database.serialize(function(){
    sqlcontroller.createTable(
        {
            table:'team',
            object: 
            { 
                ID:'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
                NAME: 'TEXT NOT NULL',
            }
        }, 
        log);
    
    sqlcontroller.createTable(
        {
            table:'post',
            object: 
            { 
                TEAM:'int NOT NULL',
                TEXT: 'TEXT NOT NULL'
            }
        }, 
        log);

    sqlcontroller.writeData(
        {
            table:'team',
            object:
            {
                NAME:'Grecha team'
            }
        },
        log);

    sqlcontroller.readData('team', log);
});

app.listen(serverConfig, onServerStarted);  

// Dynamic
app.get('/teams/:id', function(req, res){
    res.sendFile(repos + '/team.html');
});

// Files
app.get('/*', function(req, res){
    res.sendFile(repos + req.url);
});

function onServerStarted(){
    log(`Repos path ${repos}`);
    log(`Server was been started ${serverConfig.host}:${serverConfig.port}`);
}

function log(message){
    console.log(`${date.toLocaleString()}:${message}`);
}
