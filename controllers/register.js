	
const handleRegister=(req,res,db,bcrypt)=>{
	const {name, email, password}=req.body;
	if(!name || !email || !password){										//If there is no name, email or password entered
		return res.status(400).json("incorrect form submission");			//We do return cause it will go out of the function
	}
	/*var y=/^[a-z]{2,30}\@[a- z]{2,10}\.[a-z]{2,5}$/;
	if(!email.match(y)){
		return res.status(400).json("incorrect mail type");
	}*/
	const hash=bcrypt.hashSync(password);
	db.transaction(trx=>{										//More info in n.b...Transaction required when we hame more than 1 changes
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
			return trx('users')
			.returning('*')								//Returns all data from database specific to where is existing to response
			.insert({
				name: name,
				email: loginEmail[0],
				joined:   new Date()

			}).then(user=>{									//promise returned and if its a success then we get inserted data in then
			res.json(user[0]);								//responding with user data
		})
	}).then(trx.commit)
	  .catch(trx.rollback)
	}).catch(err=>{
		res.status(404).json("unable to register");
	})
}
module.exports={
	handleRegister:handleRegister
}