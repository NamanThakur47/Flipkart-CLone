import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';
import { v4 as uuid } from "uuid";

// Components//
import Connection from "./database/db.js";
import DefaultData from './default.js';
import Routes from './routes/routes.js';


dotenv.config();

const app = express();

app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

app.use('/',Routes);


const PORT = process.env.PORT || 8000;

const username = process.env.DB_USERNAME; 
const password = process.env.DB_PASSWORD;

const URL = `mongodb+srv://${username}:${password}@ecommerceweb.6qbu2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


Connection(process.env.MONGODB_URI || URL);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('flipkart/build'))
}

app.listen(PORT,()=>console.log(`Server Is SuccessFully Running On PORT ${PORT}`));

// Default Data to database

DefaultData();

export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;

export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE; 
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback';
paytmParams['EMAIL'] = 'palnaman.ktecheducation@gmail.com';
paytmParams['MOBILE_NO'] = '8279221650';
