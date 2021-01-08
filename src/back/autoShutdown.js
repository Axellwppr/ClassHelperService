const schedule = require('node-schedule');
const {execSync} = require('child_process');
import {
    ipcMain,
    BrowserWindow
} from 'electron'
var win = BrowserWindow.getAllWindows()[0];

schedule.scheduleJob("autoShutdown", '0 1 21 * * *', function () {
// setTimeout(function () {
    win.webContents.send('loadURL', '/system/shutdown');
    var sendTime = function (time) {
        win.webContents.send('autoShutdownTime', time);
    }
    var cancel = false,
        time = 10;
    ipcMain.on('autoShutdownStart', function (event) {
        sendTime(time);
        var t = setInterval(() => {
            if (cancel) {
                clearInterval(t);
                return false;
            }
            time--;
            sendTime(time);
            if (time == 0) {
                clearInterval(t);
                execSync('shutdown /s /t 0');
                return true;
            }
        }, 1000);
    });
    ipcMain.on('autoShutdownCancel', function () {
        cancel = true;
    });
// },3000);
})