import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import connectDB from './database.js';
import registerRoute from './routes/register.js';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'server/routes')]);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'views/partials')));

// Route for rendering the EJS template
app.get('/', (req, res) => {
  res.render("index.ejs");
});


app.get("/vote", (req, res) => {
    res.render("vote.ejs");
  });

  app.get("/posts", (req, res) => {
    res.render("posts.ejs");
  });

app.get("/about", (req, res) => {
    res.render("about.ejs");
  });
  
  app.get("/contact", (req, res) => {
    res.render("contact.ejs");
  });

  app.get("/signin", (req, res) => {
    res.render("signin.ejs");
  });

  app.get("/register", (req, res) => {
    res.render("register.ejs");
  });

  app.get("/anouncement", (req, res) => {
    res.render("anouncement.ejs");
  });

  app.get("/post", (req, res) => {
    res.render("post.ejs");
  });


  // -------------------------------------------------------------------------------------
  //connection
  // mongoose
  //   .connect('mongodb://127.0.0.1:27017/CVote')
  //   .then(() => console.log("MongoDB COnnected"))
  //   .catch((err) => console.log("Mongo Error", err));
  
  // //schema---------------------
  // const userSchema = new mongoose.Schema({
  //   firstName: {
  //     type: String,
  //   }
  // });

  // //model
  // const User = mongoose.model("user", userSchema);


//-----------------------------------------------------------------------------------------------------

// Error handling for 404 - Not Found
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
});

// Error handling for other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
