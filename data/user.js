
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');


let exportedMethods = {
  addUser(firstName, lastName, email, password, location, skills, experience, field){
      
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
        if(!skills)
            return Promise.reject("You must provide an array of skills");
        if (!experience) 
            return Promise.reject("You must provide an array of experience");
        if(!field)
            return Promise.reject("You must provide an array of fields");
       
        
        return users().then((userCollection) => {
            let newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                hashedPassword: password,
                location: location,
                skills: skills,
                experience: experience,
                field: field,
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
}
module.exports = exportedMethods;