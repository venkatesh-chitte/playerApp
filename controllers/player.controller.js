const Player = require("../model/player.model")

module.exports.getPlayer=async (req, res) => {
    try {
      const firstPlayer = await Player.findOne();
      res.render('players', { player: firstPlayer });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  module.exports.createPlayer=async (req,res)=>{
    try{
        const{name,age} = req.body;
        //checking if all fields are exists
        if(!name || !age){
            return res.status(400).json({
                message:"Enter all required fields"
            })
        }
        //Checking user already exists
        const player = await Player.findOne({name:name})
        if(player){
            return res.status(400).json({
                message:"Player already exists"
            })
        }
        //Creating new user
        const currentPlayer = await Player.create({
            name:name,
            age:age
        })
        //Sending response
        return res.status(200).json({
            message:"Player created Successfully",
            player:currentPlayer
        })
    }catch{
        //Handling error
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports.nextPlayer = async (req, res) => {
    try {
      const currentPlayerId = req.query.id;
      const currentPlayer = await Player.findById(currentPlayerId);
  
      if (!currentPlayer) {
        res.status(404).send('Player not found');
        return;
      }
  
      const nextPlayer = await Player.findOne({ _id: { $gt: currentPlayerId } }).sort({ _id: 1 }).limit(1);
  
      if (!nextPlayer) {
        // If there is no next player, redirect back to the players page
        res.redirect('/players');
        return;
      }
  
      res.render('players', { player: nextPlayer });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
