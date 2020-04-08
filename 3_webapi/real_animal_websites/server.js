//1.Create express app obj
let projectData = {};
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
//2.Add dependency layer (urlencoded,...)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('websites'));
//3.Let app listen to port 
const port = 8002;
app.listen(port,()=>{console.log(`Listening to port ${port}`)});
//4.Create POST route -> app collect data from client to server
let animalData = []
app.get('/all',(req,res)=>{
    res.send(animalData);
});
//5.Create GET route -> app send data from server to client 
app.post('/addAnimal',(req,res)=>{
    newEntry = {
        animal: req.body.animal,
        fact: req.body.fact,
        fav: req.body.favorite,
    }
    animalData.push(newEntry);
    res.send(animalData);
    console.log("New Animal Data",animalData);
});

//send fake data from server
const fakedata = {
    animal: 'lions',
    fact: 'lions are good',
}
app.get('/fakeAnimalData',(req,res)=>{
    res.send(fakedata);
    console.log("Send fake Animal Data",animalData);
});