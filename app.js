const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const dbo = require('./db'); 

const app = express();


app.engine('hbs', engine({ layoutsDir: 'views/', defaultLayout: "main", extname: "hbs" }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try {
        let database = dbo.getDatabase();
        const collection = database.collection('Task');
        const cursor = collection.find({});
        let description = await cursor.toArray();
        let message = '';
        res.render('main', { message, description });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send('Error connecting to the database');
    }
});

app.post('/store_Task', async (req, res) => {
    try {
        let database = dbo.getDatabase();
        const collection = database.collection('Task');
        const task = {
            Task: req.body.Task,
            description: req.body.des,
        };
        await collection.insertOne(task);
        res.redirect('/');
    } catch (error) {
        console.error('Error storing the Task data:', error);
        res.status(500).send('Error storing the Task data');
    }
});

dbo.connectToServer().then(() => {
    app.listen(3013, () => {
        console.log('Server is running on port 3009');
    });
}).catch((error) => {
    console.error('Failed to connect to database:', error);
});
