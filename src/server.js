const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const models = require('./database');

const { PORT = 8000 } = process.env;


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Routes
app.use('/api/users', require('./users/routes'));
app.use('/api/auth', require('./auth/routes'));

models.sequelize.sync().then(() => {
    console.log('Database models synced');
})
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})