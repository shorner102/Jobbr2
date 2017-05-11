
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');


let exportedMethods = {
  addUser(firstName, lastName, email, password, location, jobType, field, skills){
      
        if (!firstName) 
            return Promise.reject("You must provide a first name");
        if (!lastName) 
            return Promise.reject("You must provide a last name");
        if(!email)
            return Promise.reject("You must provide an email");
        if(!password)
            return Promise.reject("You must provide a password");
        if(!location)
            return Promise.reject("You must provide a location");
        if (!jobType) 
            return Promise.reject("You must provide a job type");
        if(!field)
            return Promise.reject("You must provide an array of fields");
        if(!skills)
            return Promise.reject("You must provide an array of skills");
        
        
       
        
        return users().then((userCollection) => {
            let newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                hashedPassword: password,
                location: location,
                jobType: jobType,
                field: field,
                skills: skills,
                likedPosts: [],
                _id: uuid.v4()
            };

            return userCollection
                .insertOne(newUser)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getUserById(newId);
                });
        });
    },
      
// getUserById
  getUserById(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        
        return users().then((userCollection) => {
            return userCollection.findOne({_id: id});
        });
    },


 getUserByEmail(email) {
        if (!email) 
            return Promise.reject("You must provide an id to search for");
        
        return users().then((userCollection) => {
            return userCollection.findOne({email: email}).then((user)=>{
              if(!user) throw "User not found";
              return user;
              
            });
        });

    }
/*  ,
  addLikedPost(postId, userId){
    return users().then((userCollection)=>{
      return this.getUserbyId(userId).then((userThatLiked)=>{
        userThatLiked.likedPosts.push(postId);
        var rec = {$set:userThatLiked};
        return userCollection.updateOne({_id:userid}, rec).then((result)=>{
          return postId;
        })
        
      })
      
    })
    
  }*/
  
  
  
  /*
        addComment(recipeId, poster, comment) {
        return recipesColl().then((recipeCollection) => {
          let newComment = {
                  poster: poster,
                  comment: comment,
                  _id: uuid.v4()
              };
          return recipes.getRecipeById(recipeId).then((commentedRecipe) =>{
            commentedRecipe.comments.push(newComment);
            var rec = {$set:commentedRecipe};
            return recipeCollection.updateOne({ _id: recipeId }, rec).then((result) => {
              return newComment;
              });
            
          });
             
        });
    },
    */
}
module.exports = exportedMethods;