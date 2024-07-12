const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { submitted: false });
});

app.post('/submit', (req, res) => {
    const { firstName, lastName, email, phone, gender } = req.body;
    res.render('index', { submitted: true, firstName, lastName, email, phone, gender });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
