# HugoPOS  

**A proof-of-concept Point of Sale (POS) system integrating a receipt printer**  

HugoPOS is a lightweight, easy-to-use POS system designed for small kiosks. It features product creation, inventory tracking, and automatic VAT calculations.  

---

## Features  
- **Dead simple interface**: Intuitive and easy to use for small-scale operations.  
- **Inventory management**: Add and track products directly within the system.  
- **VAT calculations**: Automatically calculates VAT for transactions.  
- **Receipt printing**: Integrated with **EPSON receipt printers** (configurable via `printer.js`).  
---

## Target Audience  
HugoPOS is a prototype developed for **DISCO MELO UF** to manage sales at discos and similar events. While it’s a proof of concept, it showcases the potential for small kiosk operations.  

---

## Current Status  
HugoPOS is a working prototype with foundational functionality. It is not production-ready.

---

## Setup Instructions  
The project is split into two parts, the server (handles printing), and the client.

1. Clone this repository:  
   ```bash  
   git clone https://github.com/TheMole3/HugoPOS.git  
   cd HugoPOS  
   ```
2. Install dependencies
    ```bash  
   npm install     # Install server dependencies
   cd client
   npm install     # Install client dependencies
   ```
3. Run the server
    ```bash  
   cd .. 
   node .
   ```
3. Run the client
    ```bash  
   cd client
   npm run dev
   ```

---
## Customizing for Other Printers
The integration is built with EPSON receipt printers in mind. To modify it for a different printer model, update the configuration in printer.js.
