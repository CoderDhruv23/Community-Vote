import express from 'express';
import connectDB from './database.js';
import registerRoute from './routes/register.js';
import path from 'path';

const app = express();

app.set("view engin","ejs");
app.set("views", path.resolve('./views'))

// Connect to MongoDB
connectDB();


mongoose
    .connect('mongodb://127.0.0.1:27017/CVote')
    .then(() => console.log("MongoDB COnnected"))
    .catch((err) => console.log("Mongo Error", err));

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Set up EJS for templating
app.set('view engine', 'ejs');

// Routes
app.use('/', registerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
