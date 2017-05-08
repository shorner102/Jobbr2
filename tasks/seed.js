const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.user;
const posts = data.post;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return users.addUser("Harry", "Potter", "lemon", "$2a$06$SagJO.YW8T7c7Fzh.0VaIuYaAetQKsU2PbmI.VzzjjfWKA8yyLbQe", "Hogwarts", "Casting Spells", "Defeating Voldemort", "Wizardry");
    }).then(()=>{
      
        return posts.addPost("Software Engineer", "Next Century", "Columbia, MD", "Create software that changes lives", "http://ncc.com");
    }).then((post)=>{
      
      console.log(post);
    })
      
            
            
      
      .then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});