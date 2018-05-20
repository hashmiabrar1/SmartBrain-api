const handleSignIn=(req,res,db,bcrypt)=>{
			//Transaction not required because were not modifying data
	const {email, password}=req.body;					//from user 
	if( !email || !password){
		return res.status(400).json("incorrect form submission");			//We do return cause it will go out of the function
	}
	db.select('email','hash').from('login')
	.where('email','=',email)							//comparing password from table with input password
	.then(data=>{
		const isValid=bcrypt.compareSync(password, data[0].hash);
		if(isValid){
			return db.select('*').from('users')							//Getting data from table. Always return so that we go out of the current function and previous select knows abt it 
			.where('email','=',email)
			.then(user=>{
				res.json(user[0])
			})
			.catch(err=>{
				res.status(400).json("unable to get user. user not registered");		//Won't work for arrays
			})

		}
		else{
			res.status(404).json("Wrong credentials");				//wrong email or password
		}
		
	})
	.catch(err=>{
		res.status(400).json("Wrong credentials");				//wrong email or password..wont work for arrays

	})

}
module.exports={
	handleSignIn:handleSignIn
}
