require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 4000;

//middleWare
app.use(cors({
    origin: [`http://localhost:5173`, `https://turtorsphere.web.app`],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())

// Verify token
const veryfyToken = (req, res, next) => {
    const token = req.cookies?.token
    if (!token) {
        return res.status(401).send({
            message: 'unAuthorized access'
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'unAuthorized access'
            })
        }
        req.user=decoded
        next();
    })
}

const {
    MongoClient,
    ServerApiVersion,
    ObjectId,
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
        const languegesCategory = client.db('tutorSphere').collection('languegesCategory');
        const tutorsCollection = client.db('tutorSphere').collection('tutorsCollection');

        //JWT auth Related APIs
        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
                expiresIn: '5h'
            });
            res.cookie('token', token, {
                    httpOnly: true,
                    secure: false
                })
                .send({
                    success: true
                })
        })

        app.post('/logout', (req, res) => {
            res.clearCookie('token', {
                    httpOnly: true,
                    secure: false,
                })
                .send({
                    success: true
                })
        })
        // POST: Get the user from client side and Post TO database
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await userCollection.insertOne(newUser);
            res.send("this is a new user", result);
        })
        // GET: Get the users from database
        app.get('/users', async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result)
        })
        // GET: Get the languegesCategory from database
        app.get('/langueges', async (req, res) => {
            const result = await languegesCategory.find().toArray();
            res.send(result)
        })
        // POST: Get the New Tutors from client side
        app.post('/tutors', async (req, res) => {
            const newTutor = req.body;
            console.log(newTutor);
            const result = await tutorsCollection.insertOne(newTutor);
            res.send(result)
        })
        // GET: Get the tutors apis from database collection
        app.get(`/tutors`, async (req, res) => {
            const result = await tutorsCollection.find().toArray();
            res.send(result)
        })

        //GET: Get the tutorial Apis for specific email
        app.get('/tutors/email/:email',veryfyToken, async (req, res) => {
            const email = req.params.email;
            const filter = {
                email: email
            };
            console.log(req.cookies?.token);
            if(req.user.email !== req.params.email){
                return res.status(403).send({message: 'forbidden access'})
            }
            const result = await tutorsCollection.find(filter).toArray();
            res.send(result)
        })
        // GET: Get the specipic data from database using category
        app.get('/tutors/category/:category', async (req, res) => {
            const category = req.params.category;
            const filter = {
                language: category
            };
            const result = await tutorsCollection.find(filter).toArray();
            res.send(result)
        })
        // GET the Signle tuitorial data
        app.get('/tutorial/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {
                _id: new ObjectId(id)
            };
            const result = await tutorsCollection.findOne(filter);
            res.send(result)
        })
        // PUT: Get the data from client side form and update to database collection
        app.put('/tutorial/:id', async (req, res) => {
            const id = req.params.id;
            const updatedData = req.body;
            const result = await tutorsCollection.updateOne({
                _id: new ObjectId(id)
            }, {
                $set: updatedData
            })
            res.send(result);
        })
        //DELETE: Delete the product from database
        app.delete('/tutorial/:id', async (req, res) => {
            const id = req.params.id;
            const deletedId = {
                _id: new ObjectId(id)
            };
            const result = await tutorsCollection.deleteOne(deletedId);
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