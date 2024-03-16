const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
const result = dotenv.config();

if (result.error) {
  console.error("Error loading .env file:", result.error);
  throw result.error;
}
const hostname= "ph335579"
const password= "Harsh@111"
const database= "GoFood"
const uri = `MONGO_URI = "mongodb+srv://${hostname}:${password}@cluster0.0obpanm.mongodb.net/${database}`

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");

    const dataCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection = mongoose.connection.db.collection("food_categorys");

    const [data, category] = await Promise.all([
      dataCollection.find({}).toArray(),
      foodCategoryCollection.find({}).toArray()
    ]);

    global.food_items = data;
    global.foodCategory = category;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error;
  }
};

module.exports = connectToDatabase;
