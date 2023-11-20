// These are the parameters for the path to the website
const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// These get methods display information of the local host url it corosponds with so this one is for the home page 
const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@datarep2023.hlllrsc.mongodb.net/?retryWrites=true&w=majority');

}
const bookSchema = new mongoose.Schema({
   title:String,
   cover:String,
   author:String
})


const bookModel = mongoose.model('books',bookSchema);

app.post('/api/books', (req,res ) => {
   console.log(req.body);

   bookModel.create({
      title:req.body.title,
      cover:req.body.cover,
      author:req.body.author

   })
   .then(
      ()=>{res.send("Data Recieved")}
   )
   .catch(
      ()=>{res.send("Data not recieved")}
   )
   })

app.get('/', (req, res) => {
  res.send('Good Morning World!')
})
//This one will display a set of data which will be displayed using a res.json method
  app.get('/api/books', async (req, res) => {
  let books=await bookModel.find({});
  console.log(books);
  res.json(books)
        })
app.get('/api/book/@id', async (req, res) => { 
console.log(req.params.id);
let book= await bookModel.findById({_id:req.params.id})
res.send(book);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
