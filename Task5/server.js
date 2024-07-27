const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');

let temporaryStorage = [];

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { name, email, address, phone, message } = req.body;

    if (!name || !email || !address || !phone || !message) {
        res.status(400).send('All fields are required.');
        return;
    }

    // Server-side validation passed, store data temporarily
    const formData = { name, email, address, phone, message };
    temporaryStorage.push(formData);

    console.log('Temporary Storage:', temporaryStorage);

    res.send('Form submitted successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
