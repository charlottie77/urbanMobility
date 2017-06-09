const electron = require('electron')
// Module to control application life.
const app = electron.app
const ipcMain = electron.ipcMain;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const WebSocketClient = require('websocket').client;

const WSclient = new WebSocketClient();

WSclient.on('connect', function(connection) {
    // console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        // console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        // console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            agentBase.webContents.send('setControl', JSON.parse(message.utf8Data));
            radar.webContents.send('setControl', JSON.parse(message.utf8Data));
            bar3D.webContents.send('setControl', JSON.parse(message.utf8Data));
            scatter.webContents.send('setControl', JSON.parse(message.utf8Data));
            trafficJam.webContents.send('setControl',JSON.parse(message.utf8Data));
        }
    });
});

ipcMain.on('controlSig',(evt,arg)=>{
  // console.log(arg);
  agentBase.webContents.send('setControl', arg);
  radar.webContents.send('setControl', arg);
  bar3D.webContents.send('setControl', arg);
  scatter.webContents.send('setControl', arg);
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// let mainWindow
let agentBase
// let trafficJam
let radar
let bar3D
let scatter
let controlWin
// let no2Window
function createWindow () {
  // Create the browser window.
  agentBase = new BrowserWindow({width: 1066, height: 600,backgroundColor: '#000000',frame:false,thickFrame:false})
  radar = new BrowserWindow({width: 630, height: 900,backgroundColor: '#000000',frame:false,thickFrame:false})
  bar3D = new BrowserWindow({width: 630, height: 400,backgroundColor: '#000000',frame:false,thickFrame:false})
  scatter = new BrowserWindow({width: 600, height: 500,backgroundColor: '#000000',frame:false,thickFrame:false});
  controlWin = new BrowserWindow({width: 600, height: 500,backgroundColor: '#ffffff'})
  // trafficJam = new BrowserWindow({width:600,height:600,backgroundColor:'#000000'});
  // no2Window = new BrowserWindow({width:1366,height:768})
  // and load the index.html of the app.
  controlWin.loadURL(url.format({
    pathname: path.join(__dirname,'control.html'),
    protocol: 'file:',
    slashes: true
  }));
  agentBase.loadURL(url.format({
    pathname: path.join(__dirname, 'agentBase.html'),
    protocol: 'file:',
    slashes: true
  }))
  radar.loadURL(url.format({
    pathname: path.join(__dirname, 'radarchart.html'),
    protocol: 'file:',
    slashes: true
  }))
  bar3D.loadURL(url.format({
    pathname: path.join(__dirname, 'bar3d.html'),
    protocol: 'file:',
    slashes: true
  }))
  scatter.loadURL(url.format({
    pathname: path.join(__dirname, 'scatter.html'),
    protocol: 'file:',
    slashes: true
  }))
  // trafficJam.loadURL(url.format({
  //   pathname: path.join(__dirname, 'trafficJam.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
  // no2Window.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
// const total = require('./data/total.group.json');
// ipcMain.on('randShift',(event,arg)=>{
//   let copy = Array.from(total)
//   let rtn = [];
//   for (var i = 0; i < arg; i++) {
//     rtn.push(copy.splice(parseInt(Math.random()*copy.length),1)[0]);
//   }
//   copy = null;
//   event.sender.send('randShiftCB',rtn);
// })

  // agentBase.webContents.on('did-finish-load', () => {

  //   WSclient.connect('ws://127.0.0.1:5678/')
  // })

  // no2Window.webContents.on('did-finish-load', () => {
  //   setInterval(()=>{
  //     no2Window.webContents.send('msgtest', 'no2!')
  //   },300);
  // })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  agentBase.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    agentBase = null
  })
  controlWin.on('closed',()=>{controlWin = null})
  radar.on('closed',function(){radar = null})
  bar3D.on('closed',()=>{bar3D = null})
  scatter.on('closed',()=>{scatter = null})
  // trafficJam.on('closed',()=>{scatter = null})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
  app.quit()
})

// app.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
