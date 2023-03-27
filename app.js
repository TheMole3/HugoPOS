import { handler } from './client/build/handler.js';
import express from 'express';
 
const app = express();
import cors from 'cors'
import bodyParser from 'body-parser'

import { print } from "./printer.js"

app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
 
// add a route that lives separately from the SvelteKit app
app.post('/print', cors(), (req, res) => {
    console.log(req.body)
    res.send(200);
    print(req.body.products, req.body.payment)
});
 
// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
 
app.listen(3000, () => {
  console.log('listening on port 3000');
});