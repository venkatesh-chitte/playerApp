const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require("./routes/player.route")

const app = express();
const PORT_NO = 5001;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Set up view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.use(playerRoutes);



// Connect to MongoDB
mongoose
.connect('mongodb://0.0.0.0:27017/playerData')
.then(()=>{
    app.listen(PORT_NO, () => {
        console.log(`Server is running on http://localhost:${PORT_NO}`);
      });
})
.catch((err)=>{
    console.log(err)
})