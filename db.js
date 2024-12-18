const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

async function connectToServer() {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        database = client.db('TaskManager');

        if (!database) {
            console.log('Database not Connected');
        } else {
            console.log('Connected to Database');
        }
    } catch (error) {
        console.error('Failed to connect to the database', error);
        throw error;
    }
}

function getDatabase() {
    if (!database) {
        throw new Error('Database not connected. Please call connectToServer first.');
    }
    return database;
}

module.exports = {
    connectToServer,
    getDatabase
};
