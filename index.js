require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 4000;

//middleWare
app.use(cors())
app.use(express.json());


const {
    MongoClient,
    ServerApiVersion,
} = require('mongodb');

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.wr4sb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
        // await client.connect();
        console.log("Connected to MongoDB!");

        app.get('/', (req, res) => {
            res.send('LOVE LOVE TUTOR SPHERE')
        })
        // Creating a Database name and collection name
        const userCollection = client.db('tutorSphere').collection('users');
        const languegesCategory= client.db('tutorSphere').collection('languegesCategory');

        // POST: Get the user from client side and Post TO database
        app.post('/users', async(req, res)=>{
            const newUser = req.body;
            console.log(newUser);
            const result = await userCollection.insertOne(newUser);
            res.send("this is a new user",result);
        })
        // GET: Get the users from database
        app.get('/users', async(req,res)=>{
            const result = await userCollection.find().toArray();
            res.send(result)
        })
        // GET: Get the languegesCategory from database
        app.get('/langueges', async(req,res)=>{
            const result = await languegesCategory.find().toArray();
            res.send(result)
        })

        
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})