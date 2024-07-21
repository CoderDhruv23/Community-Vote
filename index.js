import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

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


// app.get("/vote", (req, res) => {
//     res.render("vote.ejs");
//   });

app.get("/about", (req, res) => {
    res.render("about.ejs");
  });
  
  app.get("/contact", (req, res) => {
    res.render("contact.ejs");
  });



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
