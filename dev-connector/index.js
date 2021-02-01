const express = require('express');
const connectDB = require('./config/database');

const app = express();

// Connect to database
connectDB();
app.get('/', (req, res) => {
    res.send('API is running')
})

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// environment variable PORT will be available after use Heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server started on port ${PORT}');
});