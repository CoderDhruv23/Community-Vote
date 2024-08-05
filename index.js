import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectDB from './database.js';
import signinRouter from './routes/signin.js';  // Import signinRouter
import registerRouter from './routes/register.js';  // Import registerRouter
import issueRouter from './routes/issues.js';
import uploadsRouter from './routes/uploads.js';
import Upload from './models/upload.js';

dotenv.config();  // Load environment variables from .env file

const app = express();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'server/routes')]);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'views/partials')));

// Middleware for form handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for rendering the EJS template
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/home', (req, res) => {
  res.render('home');
});
app.get('/vote', (req, res) => {
  res.render('vote');
});

app.get('/post', (req, res) => {
  res.render('post');
});

// app.get('/uploads', (req, res) => {
//   res.render('uploads');
// });


app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/signin', (req, res) => {
  res.render('signin');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/anouncement', (req, res) => {
  res.render('anouncement');
});
app.get('/profile', (req, res) => {
  res.render('profile');
});
app.use('/', signinRouter);
app.use('/', registerRouter);
app.use('/issues', issueRouter);
app.use('/uploads', uploadsRouter);

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log(`Database Connected: ${mongoose.connection.host}:${mongoose.connection.port}`))
  .catch((err) => {
    console.log(err);
  });


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));


app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("index", { 
    user: req.user,
    data: allBlogs, // Update to match the `views/index.ejs` template
  });
});

//login



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


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
