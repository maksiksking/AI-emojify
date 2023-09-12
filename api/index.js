require("dotenv").config();
const dotenv = require('dotenv');
dotenv.config({ path: '../process.env' });
const express = require("express");
const app = express();
const ntpClient = require('ntp-client');

app.use(express.static('../public'));

// ntp script (unimportant)
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
console.log("I'm alive")
console.log(process.env.OPENAI_API_KEY_LATEST)


app.get("/testGet", (req, res) => {
    // const APIkey = process.env.OPENAI_API_KEY_LATEST
    const test = "help"
    console.log(test)

    res.json({ test });
});

const port = process.env.PORT || 3030

app.listen(port, (err, res) => {
    if (err) {
        console.log(err)
        return res.status(500).send(err.message)
    } else {
        console.log('[INFO] Server Running on port:', port)
    }
})