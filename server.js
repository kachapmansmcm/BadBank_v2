// server/index.js
require('dotenv').config({path: "./config.env"});
const express = require("express");
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error');
const User = require("./models/Users");

connectDB();


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'))

app.use(express.json());

app.use('/api/auth', require("./routes/auth"));
app.use('/api/private', require("./routes/private"));

//error handle is last thing before server
app.use(errorHandler);


async function mySeeder() {
  const data = await User.findOne({"username": "admin"}).exec();
  if (data != null) {
      // Data exists, no need to seed.
      return;
  }
  const adminUser = new User({
    username: "admin",
    email: "admin@test.com",
    password: "AdminPassword",
    isAdmin: true    
  });

  await adminUser.save()
}


mySeeder();


const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
})