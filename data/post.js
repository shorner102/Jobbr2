
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const uuid = require('node-uuid');


let exportedMethods = {
  addPost(jobtitle, company, formattedLocation, snippet, url){
      
        if (!jobtitle) 
            return Promise.reject("You must provide a Job Title");
        if (!company) 
            return Promise.reject("You must provide a company");
        if(!formattedLocation)
            return Promise.reject("You must provide a location");
        if(!snippet)
            return Promise.reject("You must provide a description");
        if(!url)
            return Promise.reject("You must provide a url");
        
        return posts().then((postCollection) => {
            let newPost = {
                jobtitle: jobtitle,
                company: company,
                formattedLocation: formattedLocation,
                snippet: snippet,
                url: url,
                timestamp: null,
                _id: uuid.v4()
            };

            return postCollection
                .insertOne(newPost)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getPostById(newId);
                });
        });
    },
      
// getUserById
  getPostById(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        
        return posts().then((postCollection) => {
            return postCollection.findOne({_id: id});
        });
    },
  removePost(id){
      if(!id)
        return Promise.reject("You must provide an id to search for");
      return posts().then((postCollection) =>{
        return postCollection.deleteOne({_id:id}).then((deletionInfo)=>{
          if(deletionInfo.deletedCount === 0) throw "Could not find the document with this id to delete";
          return true;
          
        });
        
      });
    
  }

 
}
module.exports = exportedMethods;