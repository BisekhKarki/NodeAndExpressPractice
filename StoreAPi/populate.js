require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProduct = require('./products.json');

const start = async () => {
    try {
        console.log('Connecting to DB...');
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to DB');

        console.log('Deleting existing products...');
        const deleteResult = await Product.deleteMany();
        console.log(`Deleted products: ${deleteResult.deletedCount}`);

        console.log('Inserting new products...');
        const insertedProducts = await Product.create(jsonProduct);
        console.log(`Inserted products: ${insertedProducts.length}`);
        console.log('Process completed successfully');
        process.exit(0)
        
    } catch (error) {
        console.log('Error occurred:', error);
        process.exit(1)
    }
};

start();
