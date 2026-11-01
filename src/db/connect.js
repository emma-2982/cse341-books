
import dns from 'node:dns';
import { MongoClient } from 'mongodb';

// Configure DNS servers before connecting to MongoDB
dns.setServers(['8.8.8.8', '1.1.1.1']);

let database;

const connectToDb = async () => {
    const connectionString = process.env.MONGODB_URI;

    if (!connectionString) {
        throw new Error('MONGODB_URI is required.');
    }

    try {
        const client = new MongoClient(connectionString);

        await client.connect();

        database = client.db(process.env.MONGODB_DB_NAME || 'practice');

        console.log('MongoDB connected successfully!');

        return database;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

const getDb = () => {
    if (!database) {
        throw new Error('Database not initialized. Call connectToDb first.');
    }

    return database;
};

export { connectToDb, getDb };
