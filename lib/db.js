import mongoose, { connect as mongooseConnect } from 'mongoose';

export async function connect() {
    try {
        mongooseConnect(process.env.MONGODB_URL); // Use the renamed import
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Mongodb connected successfully');
        });
        connection.on('error', (err) => {
            console.log('Mongodb connection error. Please make sure to connect');
            process.exit();
        });
    } catch (error) {
        console.log('Something went wrong!');
        console.log(error);
    }
}
