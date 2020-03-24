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
});

app.listen(serverConfig, onServerStarted);  

// Dynamic
app.get('/teams/*', function(req, res){
    res.sendFile(repos + '/team.html');
});

//posts
app.get('/posts/best', function(req, res){
    sqlcontroller.readData('team', (elements) =>{
        let response = '';

        if(elements){
            elements.forEach(element =>{
                response += `{"team":"${element.NAME}","date":"14:59 09.09.2020","text":"Hello world","iconUrl":null,"imageUrl":null},`;
            });
        }

        if(response.length > 0){
            response = response.substring(0, response.length - 1);
        }

        response = `[${response}]`;

        res.send(response);
    }, log);

    
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
