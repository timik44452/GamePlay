const path = require('path');
const express = require('express');

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
    console.log(`${currentTime()}:${message}`);
}

function currentTime(){
    return date.toLocaleString();
}