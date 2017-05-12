
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('uuid');


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
                queue: [],
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

    },

  pushPosts(jobArr, userId) {
    if(!jobArr|| !userId)
      return Promise.reject("No jobkey/userId provided!");

    return users().then((userCollection) => {
      return this.getUserById(userId).then((currUser) => {
        currUser.queue = jobArr;
        var rec = {$set:currUser};
        return userCollection.updateOne({_id:userId}, rec).then(() => {
          return jobArr;
        });
      });
    });
  },

  popPost(userId) {
    if(!userId)
      return Promise.reject("No userId provided!");

    return users().then((userCollection) => {
      return this.getUserById(userId).then((currUser) => {
        var job = currUser.queue.pop();
        var rec = {$set:currUser};
        return userCollection.updateOne({_id:userId}, rec).then((result) => {
          return job;
        });
      });
    });
  },

  peekPost(userId) {
    if(!userId)
      return Promise.reject("No userId provided!");

    return users().then((userCollection) => {
      return this.getUserById(userId).then((currUser) => {
        return currUser.queue[currUser.queue.length-1];
      });
    });
  },

  jobsQueued(userId) {
    if(!userId)
      return Promise.reject("No userId provided!");

    return users().then((userCollection) => {
      return this.getUserById(userId).then((currUser) => {
        return currUser.queue.length;
      });
    });
  }

}
module.exports = exportedMethods;
