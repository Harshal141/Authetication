const mongoose = require('mongoose'); 
// const config = require('config');
// const db = config.get('mongoURI');

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI, {
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