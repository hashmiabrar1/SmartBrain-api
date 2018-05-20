const express=require('express');
const app=express();

const bodyParser=require('body-parser');

const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');


const register=require("./controllers/register");
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const knex = require('knex');
const db=knex({										//function knex. creating a variable postgres
  client: 'pg',
  connection: {
    host : '127.0.0.1',								//localhost
    user : 'abrarhashmi',
    password : '',
    database : 'smart-brain'
  }
});
	
// db.select('*').from('users').then(data=>{					//then returns a promise and we get our response
// 	console.log(data);
// })				

app.use(bodyParser.json());
app.use(cors());

/*const database={

	users:[
		{
		  name:    "abrar",
		  id:      '123',
		  email:   'hashmiabrar14@gmail.com',
		  password: 'ab',
		  entries:  0,
		  joined:   new Date()

		},
		{
		name:    'akhil',
		id:      '124',
		email:   'akhil14@gmail.com',
		password: 'banana',
		entries: 0,
		joined:  new Date()	
		}
	],
	login:[
		{
			id: "",
			hash: " ",
			email: "akhil14@gmail.com"
		}
	]	}*/

/*app.get('/',(req,res)=>{
	res.send(database.users);
})
*/

app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});


app.put('/image',(req,res)=>{image.handleImage(req,res,db)});
app.post('/url',(req,res)=>{image.handleApi(req,res)});



// bcrypt.hash("bacon", null, null, function(err, hash) {				//To create hash of password
//     // Store hash in your  password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, ()=>{
	console.log("server is working and app running on port 3000");
})