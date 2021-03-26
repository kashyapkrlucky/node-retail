// Import modules
const express = require('express');
const PORT = process.env.PORT || 3000;
// express app defintion
const app = express();

// Setting database
require('./db');

// Setting middleware
require('./middleware')(app);

// listening app
app.listen(PORT, () => {
    console.log(`Your server is running on PORT ${PORT}`);
});
