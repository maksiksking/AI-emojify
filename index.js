require("dotenv").config();
const dotenv = require('dotenv');
dotenv.config({ path: './process.env' });
const express = require("express");
const app = express();
const ntpClient = require('ntp-client');

app.use(express.static('public'));

// ntp script
app.get("/vC4B5cmd5ybVouxbC3qnjldC", (req, res) => {
    ntpClient.getNetworkTime("pool.ntp.org", 123, function(err, date) {
        if(err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch date" });
            return;
        }

        res.json({ date });
    });
});
console.log(process.env.OPENAI_API)
console.log(process.env.OPENAI_API_KEY)


app.get("/keys", (req, res) => {
    const APIkey = process.env.OPENAI_API
    console.log(APIkey)

    res.json({ APIkey });
});

app.listen(3030, () => {
    console.log("Server is running on port 3030");
});