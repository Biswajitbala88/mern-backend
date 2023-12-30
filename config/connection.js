const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'mern';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the server
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected successfully to server');

        const database = client.db(dbName);

        // Perform operations using the database object
    } catch (err) {
        console.error('Error occurred while connecting to MongoDB:', err);
    } finally {
        // Close the connection
        await client.close();
        console.log('Connection to MongoDB closed');
    }
}
// Call the function to connect
connectToMongoDB();