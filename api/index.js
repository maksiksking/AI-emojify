// const express = require("express");
// const app = express();
//
// app.use(express.static('../public'));
//
// ntp script (unimportant)
// console.log("I'm alive")
// console.log(process.env.OPENAI_API_KEY_LATEST)
//
//
// app.get("/testGet", (req, res) => {
//     // const APIkey = process.env.OPENAI_API_KEY_LATEST
//     const test = "help"
//     console.log(test)
//
//     res.json({ test });
// });
//
// const port = process.env.PORT || 3030
//


require("dotenv").config();
const dotenv = require('dotenv');
const ntpClient = require('ntp-client');
dotenv.config({ path: '../process.env' });
const app = require('express')();
const { v4 } = require('uuid');

// ntp script
app.get("/api/ntp", (req, res) => {
    ntpClient.getNetworkTime("pool.ntp.org", 123, function(err, date) {
        if(err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch date" });
            return;
        }

        res.json({ date });
    });
});

// key script
app.get('/api/key', (req, res) => {
    res.json(process.env.OPENAI_API_KEY_LATEST);
});

app.get('/api/item/:slug', (req, res) => {
    const { slug } = req.params;
    res.end(`Item: ${slug}`);
});

module.exports = app;