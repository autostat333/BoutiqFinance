var async = require('async');
var express = require('express');
var fs = require('fs');
var path = require('path');
//var $ = require('jQuery');
var app = express();



app.locals.CONFIG = JSON.parse(fs.readFileSync('./config','utf-8'));
app.locals.CONFIG['SCRIPT_DIR'] = __dirname;


var TestCntr = function(req,resp,next)
    {
    return require('./server/TestCntr.js')(async,fs,app);
    };





//STATIC FILES
app.use('/views', express.static(__dirname+'/app/views'));
app.use('/dist', express.static(__dirname+'/app/dist'));


app.get('/',function(req,resp)
        {
        fs.readFile('./index.html','utf-8',function(err,res)
            {
            if (err){resp.send('Cannot find index.html');return false;};
            resp.send(res);
            })
        });


app.get('/test',function(req,resp,next){TestCntr().stack(req,resp,next)});


app.listen(app.locals.CONFIG.PORT,app.locals.CONFIG.HOST,function()
    {
    console.log('App is started');
    })

