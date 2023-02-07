const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// acessing mongodb URI from default.json
const fs = require('fs');
var global_data = fs.readFileSync("default.json");
global_data = JSON.parse(global_data);

const connectDB = async () => {
    try {
        await mongoose.connect(global_data["mongoURI"], {
            useNewUrlParser: true,
            // useCreateIndex: true
        });
        console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;