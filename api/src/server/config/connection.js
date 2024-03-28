const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB")
}).catch((e) => {
    console.log(`Error occurred: ${e}`);
});

module.exports = mongoose.connection;