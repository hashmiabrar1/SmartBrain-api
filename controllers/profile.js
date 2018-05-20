const handleProfileGet=(req,res,db)=>{
const { id }=req.params;
	db.select('*').from('users').where({
		id:id
	})
	.then(user=>{
		if(user.length){
		res.json(user[0]);
	}
	else{
		res.status(400).json("Error not found");			//This is working

	}
	}).catch(err=>{											//catch here wont work for array. Doesnt work os user([]) is true
		res.status(404).json("Error not found");
	})
}
module.exports={
	handleProfileGet:handleProfileGet
}