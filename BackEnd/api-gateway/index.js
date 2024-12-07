const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const httpProxy = require('express-http-proxy');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const account_url = process.env.ACCOUNT_SERVICE;
const contacteznous_url = process.env.CONTACTEZ_NOUS_SERVICE;
const email_url = process.env.EMAIL_SERVICE;
const reclamation_url = process.env.RECLAMATION_SERVICE;
const reviews_url = process.env.REVIEWS_SERVICE;
const cdn_url = process.env.CDN_SERVICE;

const accountServiceProxy = httpProxy(account_url);
const contactezNousServiceProxy = httpProxy(contacteznous_url);
const emailServiceProxy = httpProxy(email_url);
const reclamationServiceProxy = httpProxy(reclamation_url);
const reviewsServiceProxy = httpProxy(reviews_url);
const cdnServiceProxy = httpProxy(cdn_url);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(limiter);
app.use(cors());

//Proxing
app.use("/accounts", accountServiceProxy);
app.use("/contacez-nous", contactezNousServiceProxy);
app.use("/emails", emailServiceProxy);
app.use("/reclamations", reclamationServiceProxy);
app.use("/reviews", reviewsServiceProxy);
app.use("/cdn", cdnServiceProxy);

const port = process.env.PORT || 3301;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});