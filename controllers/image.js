const Clarifai=require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
 apiKey: 'b9fc44da3eb64df0a20b9cded8250550'
});

const handleApi=(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)    //here its an error if u give imageUrl instead of input as React hasn't done updating the state. Check section 22, lecture 171
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json("Cant work with API"))

}

const handleImage=(req,res,db)=>{
const { id }=req.body;
	
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')								//returns entries for the user with id entered			
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>{
		res.status(400).json("Error not possible");
	})
}
module.exports={
	handleImage,
	handleApi
}