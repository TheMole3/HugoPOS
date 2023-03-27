

let header = async (printer) => {
    return new Promise((resolve, reject) => {
        printer.alignCenter();
        printer.setTextQuadArea();

        printer.bold(true)
        printer.println("HUGOS KIOSK
        ")
        printer.setTextNormal()
        printer.bold(false);

        printer.table(["Datum: " + new Date().toISOString().split("T")[0], "Tid: " + new Date().toTimeString().split(" ")[0]])

        resolve(true)
    }); 
}

let itemList = async (printer, items) => {
    return new Promise((resolve) => {
        // Reset font
        printer.setTextNormal()
        printer.setTypeFontA()
        printer.bold(false);

        // Produkt lista
        printer.tableCustom([
            { text:"Produkt", align:"LEFT", width:0.5, bold: true },
            { text:"", align:"LEFT", width:0.3, bold:true },
            { text:"Pris", align:"RIGHT", width:0.2, bold: true }
        ]);

        for(const item of items) {
            if(item.count == 0) continue;
            printer.tableCustom([
                { text:item.name, align:"LEFT", width:0.50 },
                { text:item.count>1?` ${item.count}st*${(item.price * ( 1+ item.moms )).toFixed(2)}`:"", align:"LEFT", width:0.3 },
                { text: `${(item.count * item.price * ( 1+ item.moms )).toFixed(2)}`, align:"RIGHT", width:0.2 }
            ]);
        }

        printer.drawLine();

        // Total
        let total = items.reduce(function (acc, obj) { return acc + (obj.price * obj.count * ( 1 + obj.moms )); }, 0); // Calculate total

        // Öresavrundning
        if(total - Math.floor(total)) {
            printer.tableCustom([
                {text:"Öresavrundning", align:"LEFT"},
                {text: (Math.floor(total) - total).toFixed(2), align: "RIGHT"}
            ])
        }
        
        printer.bold(true);
        printer.tableCustom([
            {text:"Total", align:"LEFT"},
            {text: Math.floor(total).toFixed(2) + " kr", align: "RIGHT"}
        ])
        printer.bold(false);

        

        // Moms
        printer.newLine()
        printer.tableCustom([                               // Prints table with custom settings (text, align, width, bold)
            { text:"Moms%", align:"LEFT", width:0.25 },
            { text:"Moms", align:"CENTER", width:0.25 },
            { text:"Netto", align:"CENTER", width:0.25 },
            { text:"Brutto", align:"RIGHT", width:0.25 }
        ]);

        // Räkna moms
        let levels = {}
        for (const item of items) { 
            if(!levels[item.moms]) levels[item.moms] = {
                moms: item.moms,
                netto: 0,
            }
            levels[item.moms].netto += item.price * item.count
        }
        for(const levelIndex in levels) {
            let level = levels[levelIndex];
            levels[levelIndex].netto = levels[levelIndex].netto.toFixed(2)
            levels[levelIndex].brutto = (levels[levelIndex].netto * ( 1 + levels[levelIndex].moms )).toFixed(2)

            printer.tableCustom([                               // Prints table with custom settings (text, align, width, bold)
            { text: (level.moms * 100).toFixed(2) , align:"LEFT", width:0.25 },
            { text: (level.brutto-level.netto).toFixed(2), align:"CENTER", width:0.25 },
            { text: level.netto, align:"CENTER", width:0.25 },
            { text: level.brutto, align:"RIGHT", width:0.25 }
        ]);
        }
        
        printer.newLine();

        resolve(true);
    })
}

let payment = (printer, pay, items) => {
    let total = items.reduce(function (acc, obj) { return acc + (obj.price * obj.count * ( 1 + obj.moms )); }, 0); // Calculate total

    printer.tableCustom([
        { text: "Mottaget", align: "LEFT", width: 0.25 },
        { text: pay.type, align: "LEFT", width: 0.25 },
        { text: pay.amount.toFixed(2), align: "RIGHT", width: 0.5 },
    ])

    if(pay.amount != Math.floor(total)) {
        printer.tableCustom([
            { text: "Åter", align: "LEFT", width: 0.25 },
            { text: pay.type, align: "LEFT", width: 0.25 },
            { text: Math.floor((total) - pay.amount).toFixed(2), align: "RIGHT", width: 0.5 },
        ])
    }
}

let footer = (printer) => {
        
}

/*
[{
    name: "Äpple",
    count: 2,
    price: 5,
}]

pay {
    type: "Swish"|"Kontant"
    amount: 500
}
*/

import {printer as ThermalPrinter, types as PrinterTypes} from "node-thermal-printer";

export let print = async (items, pay) => {
    let printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,                                   // Printer type: 'star' or 'epson'
        interface: '/dev/usb/lp0',                                  // Printer interface
        characterSet: "PC865_NORDIC",                               // Printer character set, may be string or Buffer
        removeSpecialCharacters: false,                             // Removes special characters - default: false
        replaceSpecialCharacters: true,                             // Replaces special characters listed in config files - default: true
        lineCharacter: "-",                                         // Set character for lines - default: "-"
        width: 40,
    });

    // Print header
    await header(printer);
    printer.newLine();
    await itemList(printer, items);
    printer.drawLine();
    await payment(printer, pay, items)


    printer.partialCut()

    console.log(printer.getText())
    printer.execute(function(err){
        if (err) {
            console.error("Print failed", err);
        } else {
            console.log("Print done");
        }
    }).catch(err => console.error);
}

/*
print([
    {
        name: "Twix",
        count: 2,
        price: 15,
        moms: 0,
    },{
        name: "Mars",
        count: 2,
        price: 15,
        moms: 0,
    },{
        name: "Dumle",
        count: 5,
        price: 2,
        moms: 0,
    },{
        name: "Läsk, cola",
        count: 1,
        price: 5,
        moms: 0.25,
    },{
        name: "Popcorn",
        count: 1,
        price: 5,
        moms: 0.25,
    },{
        name: "Chips",
        count: 1,
        price: 10,
        moms: 0.25,
    }
], {
    type: "kontant",
    amount: 200
})*/
