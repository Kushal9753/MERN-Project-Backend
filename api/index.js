import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bookRoute from "../rout/book.route.js"
import cors from 'cors'
import userRout from '../rout/user.route.js'

import path from "path"


const app = express()

app.use(cors())
app.use(express.json());

dotenv.config()

const PORT = process.env.PORT || 4000;

const URI = process.env.MongoDBURI


// connect to mongoDB

// try {
//   mongoose.connect(URI,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
//   console.log("Connected to mongoDB");
  
// } catch (error) {
//   console.log("Error: ", error);
  
// }


mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((error) => console.log("❌ MongoDB connection error:", error));




// defining routes
app.use("/book", bookRoute)
app.use("/user", userRout)

// deployment

if (process.env.NODE_ENV === "production") {
  app.use(express.static("Frontend/dist"));
  app.use((req, res) => res.sendFile(path.resolve("Frontend/dist/index.html")));
}


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})


