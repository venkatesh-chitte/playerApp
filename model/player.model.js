const mongoose = require('mongoose');

// Define Player Schema
const playerSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });
  
  const Player = mongoose.model('Player', playerSchema);

  module.exports=Player;