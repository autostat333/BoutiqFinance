const {app, BrowserWindow,ipcMain} = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow ()
  {
  win = new BrowserWindow({width: 1200, height: 800,'titleBarStyle':'hidden','frame':false,'transparent':true});

  // and load the index.html of the app.
  win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))


  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () =>
    {
    win = null
    })
  }


app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () =>
  {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin')
    {
    app.quit()
    }
  })


app.on('activate', () =>
  {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null)
    {
    createWindow()
    }
  })

app.on('minimize',function(){console.log('minimize')});


//////////////////////////////////////////////////////
//Provide functionality for WINDOW MANAGEMENT BUTTONS
ipcMain.on('close',function(event)
  {
  win.close();
  })


ipcMain.on('fullscreen_in',function(event)
  {
  //win.setFullScreen(true);
  win.maximize();
  })


ipcMain.on('fullscreen_out',function(event)
  {
  win.setFullScreen(false);
  })

ipcMain.on('minimize',function(event)
  {
  win.minimize();
  })


//////////////////////////////////////////////////////

var DataStore = require('nedb');
var db = new DataStore({'filename':'./testDB','autoload':true});


var express = require('express');
var restApi = express();
var body_parser = require('body-parser');


restApi.use(body_parser.json());
restApi.use(body_parser.urlencoded({extended:true}));


var http = require("http");
var ultrasonic_server = http.createServer(ultrasonic_callback);
ultrasonic_server.listen(3005,'192.168.99.216');
function ultrasonic_callback(req,resp)
  {
  console.log(req.url);
  resp.end("Ok");
  }



//RESTAPI

restApi.get('/api/sales/get',function(req,resp)
  {
  db.find({},function(err,res)
    {
    if (err)
      {
      resp.statusCode = 500;
      resp.send('Some error happened when get all sales!');
      return false;
      }
    else
      resp.send(res);

    })
  })


restApi.get('/api/error',function()
  {
  resp.statusCode = 500;
  resp.send('Some error happened!');
  })




restApi.post('/api/sales/add',function(req,resp)
  {
  console.log(req.body);
  db.insert(req.body,function(err,res)
    {
    if (err)
      {
      resp.statusCode = 500;
      resp.send('Some error happened when add new sale!');
      return false;
      }
    resp.send(res);
    })
  })




restApi.listen(3004,'localhost');
