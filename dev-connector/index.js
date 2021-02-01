const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('API is running')
})

// environment variable PORT will be available after use Heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server started on port ${PORT}');
});