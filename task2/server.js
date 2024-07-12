const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Route to display the form
app.get('/', (req, res) => {
    res.render('index', { submitted: false });
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, address, phone, message } = req.body;
    res.render('index', {
        submitted: true,
        name: name,
        email: email,
        address: address,
        phone: phone,
        message: message
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
