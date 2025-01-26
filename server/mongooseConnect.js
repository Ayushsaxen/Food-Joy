const mongoose = require("mongoose");

const mongodb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ayushsaxena707:ayush123@cluster0.u1c4e.mongodb.net/test"
    );
    console.log("DB connected");
    const foodCollection = await mongoose.connection.db.collection("food");
    const data = await foodCollection.find({}).toArray();

    global.food_items = data; //here we have defeine an global variable
    //for category
    const categoryCollection = await mongoose.connection.db.collection(
      "category"
    );
    const catData = await categoryCollection.find({}).toArray();
    global.food_category = catData;
  } catch (err) {
    console.log(err);
  }
};
module.exports = mongodb;
