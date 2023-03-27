import {printer as ThermalPrinter, types as PrinterTypes} from "node-thermal-printer";

let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,                                   // Printer type: 'star' or 'epson'
    interface: '/dev/usb/lp0',                                  // Printer interface
    characterSet: "PC865_NORDIC",                               // Printer character set, may be string or Buffer
    removeSpecialCharacters: false,                             // Removes special characters - default: false
    replaceSpecialCharacters: true,                             // Replaces special characters listed in config files - default: true
    lineCharacter: "-",                                         // Set character for lines - default: "-"
    width: 40,
});

setInterval(() => {
    printer.raw("########################################")

},10)