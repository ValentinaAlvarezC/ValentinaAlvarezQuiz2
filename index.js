const mongoose = require('mongoose');

const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;


// Create a Schema object
const Schema = mongoose.Schema; 
    const userSchema = new Schema(
        {
            name: {type:String, required:true, },
            studentID:{type:Number, required:true,}
        }
    );

// Create a Model object
const User = mongoose.model("User", userSchema)
const router = express.Router()

app.use('/api', router)


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  URI = req.body.myuri;

  // connect to the database and log the connection

  mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("Connected to MongoDB server")
        app.listen(port, () =>{
            console.log("Server is running on port " + port);
        })
    })
    .catch((error) =>{
        console.log("Error connecting to mongodb " + error);
    }
    )

  // add the data to the database
  router.route('/add')
    .post((req,res) =>{
      const studentName = "Valentina Alvarez"
      const id = "300360015"
    
        const newUser = new User({
          studentName, id
      })
    
      newUser
        .save()
        // send a response to the user
        .then(() => res.send(`<h1>Document  Added</h1>`))
        .catch((err) =>{
            res.status.apply(404).json("Error Happened")})

    });
  

});

// send a response to the user

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


