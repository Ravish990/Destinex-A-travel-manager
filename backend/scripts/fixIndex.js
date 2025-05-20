const mongoose = require('mongoose');
const User = require('../db/models/user.model');
require('dotenv').config();

async function fixIndex() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Drop the existing index
        await User.collection.dropIndex('phoneNumber_1');
        console.log('Dropped existing phoneNumber index');

        // Create new sparse index
        await User.collection.createIndex({ phoneNumber: 1 }, { unique: true, sparse: true });
        console.log('Created new sparse phoneNumber index');

        console.log('Index fix completed successfully');
    } catch (error) {
        console.error('Error fixing index:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

fixIndex(); 