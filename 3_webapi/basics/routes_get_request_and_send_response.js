// 1. create server
// 2. add dependencies
// 3. server listens to port
// 4. get request

projectData = {"hello":1};
const express = require('express'); 
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('websites'));

const port = 8091;
app.listen(port, function(){});

data = []
app.get('/all', function(req,res){
    res.send(projectData);
});
app.post('/addAnimal',addAnimal);

function addAnimal(req,res){
    data.push(req.body);
    res.send({message: 'Xong rồi nè má!!!!!'});
}
data1 = []
app.post('/addMovie',addMovie);
function addMovie(req,res){
    data1.push(req.body);
    res.send({message: 'Xong rồi nè ba!!!!!'});
}