const runCode = require('./execute');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// API to accept code
app.post('/submit', (req, res) => {
    const { code, language } = req.body;

    if (!code) {
        return res.status(400).send("Code is required");
    }

    // Save code to file
    const filename = `code_${Date.now()}.txt`;
    fs.writeFileSync(filename, code);

    res.send({
        message: "Code received successfully",
        file: filename
    });
});

app.post('/run', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).send("Code is required");
    }

    const filename = `temp_${Date.now()}.js`;
    fs.writeFileSync(filename, code);

    try {
        const output = await runCode(filename);
        res.send({ output });
    } catch (err) {
        res.send({ error: err });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});