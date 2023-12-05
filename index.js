const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require('http');
const { MongoClient } = require("mongodb");
const { mongo_url } = require("./config");



const path = require("path");
// import db connection
const dbConnection = require("./connection/db");
// import router
const router = require("./router/router");
require("dotenv").config();
const app = express();
app.use(cors());
const serverr = http.createServer(app);
// const io = new Server(serverr);
const io = require("socket.io")(serverr, {
  cors: {
    origin: "*",
    credentials: true,
  },
  allowEIO3: true,
});

app.use(router);


const client = new MongoClient(mongo_url);
io.on("connection", (socket) => {
    console.log(socket,"socket")
  });


const addNFTListiner = async ()=>{
    await client.connect()
    const database = client.db('test');
    const messages = database.collection('market_places');

    // open a Change Stream on the "messages" collection
    changeStream = messages.watch();

    // set up a listener when change events are emitted
    changeStream.on("change", (next) => {
        io.emit('updateNFT', next.documentKey);
            console.log('Inserte : ',next.documentKey)

      // process any change event
    //   switch (next.operationType) {
    //     case "insert":
    //         io.emit('newNFT', next.documentKey);
    //         console.log('Inserte : ',next.documentKey._id)
    //       break;
    //     case "update":
    //         io.emit('updateNFT', next.documentKey);
    //         console.log('Inserte : ',next.documentKey._id)
    //   }
    });
}
const addProfileListiner = async () => {
  await client.connect()
  const database = client.db('test');
  const messages = database.collection('user_profiles');

  // open a Change Stream on the "messages" collection
  changeStream = messages.watch();

  // set up a listener when change events are emitted
  changeStream.on("change", (next) => {

    io.emit('ProfileListiner', next.documentKey);
    console.log('Inserte : ', next.documentKey)
  });
}
const TrandingNFTListiner = async () => {
  await client.connect()
  const database = client.db('test');
  const messages = database.collection('tranding_market_nfts');

  // open a Change Stream on the "messages" collection
  changeStream = messages.watch();

  // set up a listener when change events are emitted
  changeStream.on("change", (next) => {

    io.emit('TrandingListiner', next.documentKey);
    console.log('Inserte : ', next.documentKey)
  });
}
const FavoriteListiner = async () => {
  await client.connect()
  const database = client.db('test');
  const messages = database.collection('favorite_items');

  // open a Change Stream on the "messages" collection
  changeStream = messages.watch();

  // set up a listener when change events are emitted
  changeStream.on("change", (next) => {

    io.emit('FavoriteListiner', next.documentKey);
    console.log('Inserte : ', next.documentKey)
  });
}
const PayAmountListiner = async () => {
  await client.connect()
  const database = client.db('test');
  const messages = database.collection('user_payments');

  // open a Change Stream on the "messages" collection
  changeStream = messages.watch();

  // set up a listener when change events are emitted
  changeStream.on("change", (next) => {

    io.emit('PayAmountListiner', next.documentKey);
    console.log('Inserte : ', next.documentKey)
  });
}
PayAmountListiner()
FavoriteListiner()
TrandingNFTListiner()
addProfileListiner()
addNFTListiner()
app.get("/", (req, res) => {
    // res.sendFile('./index.html')
  res.send("server running fine 🏃‍♂️");
});
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
let PATH = process.env.PORT || 3344;
let server = serverr.listen(PATH, () => {
  dbConnection();
  console.log(`Marketplace server listening at http://localhost:${PATH}`);
});
process.on("unhandledRejection", (error) => {
  console.log(error.message);
  server.close(() => process.exit(1));
});


