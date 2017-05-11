
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const users = mongoCollections.users;
const uuid = require('node-uuid');

const userData = require("./user");

let exportedMethods = {
  findPost(id){
     return  posts().then((postCollection)=>{
        var count = 0;
        var p = postCollection.find();
        while(count < id){
            p.next();
            count = count + 1;
        }
       //console.log(p);
          return p.next();
        
      });
    
  },  
  getCurrent(id){
     return  posts().then((postCollection)=>{
        var count = 0;
        var p = postCollection.find();
        while(count < id - 1){
            p.next();
            count = count + 1;
        }
       //console.log(p);
          return p.next();
        
      });
    
  },
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
    getAllPosts(){
      return posts().then((postCollection)=>{
        return postCollection.find({}).toArray();
        
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
  getFirstPost(){
    return posts().then((postCollection)=>{
      return postCollection.findOne();
      
    })
    
  },
  getLastPost(){
    var post = getAllPosts().length();
    return getPostById(post);
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
    
  },
  addLikedPost(postId, userId){
    return users().then((userCollection)=>{
      return userData.getUserById(userId).then((userThatLiked)=>{
        userThatLiked.likedPosts.push(postId);
        var rec = {$set:userThatLiked};
        return userCollection.updateOne({_id:userId}, rec).then((result)=>{
          return postId;
        })       
      })
    })
    
  }

 
}
module.exports = exportedMethods;