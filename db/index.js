const mongoose = require('mongoose');
const colors = require('colors');
const db = require('./config');

mongoose.connect(db.server, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log(colors.blue('Connected to db'));
}).catch(err => {
    console.log(colors.red('Error in connection', err));
})