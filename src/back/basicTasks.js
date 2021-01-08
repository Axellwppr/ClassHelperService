import {
    ipcMain,
    BrowserWindow
} from 'electron'
var fs = require('fs').promises;
var crypto = require('crypto');
var pTimeout = require('p-timeout');
var win = BrowserWindow.getAllWindows()[0];

const publicKey =
    `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEArftw56NU4YEe2AwK0EMD
a1GwPo1Okr+szzOE7u1ll+Z2SryZAb8E4VOCnj1xhjW/an6/8GsKrEuJUYgxdWmm
agaQ41cWswXYm8PXQUZ4IaHC1Qc1P6I4oTtts7tBs7po9zdb/P62jKy2xLH9WLaB
IgKG5WhJctl8d7AllTLzhAFVKQWRqwCcnLy55FINEqvVd+vm1MRORIoL/ecuWO0h
Jj2wqxZ5QxZoCIfPLDnk9uNK/rO8yEVdZkt5Xr0r0Xp1KGpzEj5pmyVMeBDM1j5h
NtMbMHyp5+Y6BlwlzLPFr3pTwwmMstkhu7p0DwGEitcxqMVzuPUBcuSzF/uoXrn5
u4G/J4FRT+oY6Um8JxHOENKpvQjJjSxgt5/MLNFh/pYp9c78wES3UpSVjO4fQPVh
9P/mJlvm/rM+9sqqrBeipiHLWNhCb8YI42xMnWhh5B2woRTh5owBCZTLf4JXdOFp
F+WLjF1NO51lcBf9Q366GF5r4mPkWvTJJuPbInJaFlf2f3xE3pS0mkea9mdBXCqt
Z533gnjeq0YDswiN5udl2+FapVO3GFtimpP9IeOhUbhcWXxrRc5RlGSJtgMh3XfE
C/I34ks5fqZL0evRLQdt1CZ0tmTAmSo921okBWL2tvWU68xRA7REwa9rppV7XUJT
E5V3ieUt3XmWaAmZ1+sBZMUCAwEAAQ==
-----END PUBLIC KEY-----`

// console.log(crypto.getCiphers())

const decrypt = text => {
    var body = JSON.parse(text);
    var mainKey = Buffer.from(body.key, 'base64');
    mainKey = crypto.publicDecrypt(publicKey, mainKey);
    const nonce = Buffer.from(body.nonce, 'base64');
    const tag = Buffer.from(body.tag, 'base64');
    const Encrypted = Buffer.from(body.data, 'base64');
    var decipheriv = crypto.createDecipheriv('aes-256-gcm', mainKey, nonce, {
        authTagLength: 16
    });
    decipheriv.setAuthTag(tag);
    var Decrypted = decipheriv.update(Encrypted, null, 'utf8');
    try {
        decipheriv.final();
        return JSON.parse(Decrypted);
    } catch (err) {
        console.error('Authentication failed!');
        throw new Error('Authentication failed!');
    }
}

ipcMain.on('basicTasksLoad', async function(event) {
    try {
        var data = await pTimeout(fs.readFile('\\\\10.181.201.188\\云上春晖\\2022届\\03\\交换\\Weather&DailySentence.Encrypted.txt').toString(), 3000);
        // var data = await pTimeout(fs.readFile('E:\\Dev\\chs.support\\Outside\\Weather&DailySentence.Encrypted.txt'), 3000);
        data = await data.toString();
        if (!data) throw new Error("File Load Failed");
        data = decrypt(data);
        try {
            win.webContents.send("basicTasksWeatherLoaded", data.weather[0].daily_forecast);
        } catch (e) {
            win.webContents.send("basicTasksWeatherLoadFailed");
        }
        try {
            win.webContents.send("basicTasksPaperLoaded", { translate: data.paper.content, motto: data.paper.note });
        } catch (e) {
            win.webContents.send("basicTasksPaperLoadFailed");
        }
    } catch (e) {
        win.webContents.send("basicTasksLoadFailed");
    }
});