'use strict';

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create({}); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

let printer = require("thermal-printer")

printer.init({
        type: "epson",
        interface: "/dev/usb/lp0",
        characterSet: "PC865_NORDIC",
        width: 40,
})

printer.newLine()
printer.println(JSON.stringify(results, null, 2))
printer.partialCut()

printer.execute()
