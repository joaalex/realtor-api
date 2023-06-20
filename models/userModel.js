const database = require('../config/database');


const getUserWithEmailFromDb = (email)=>{
  return new Promise( (res, rej)=>{
    database.query({
      sql: 'SELECT * FROM users WHERE email = ?',
      values: [email]
    },
    (error, result)=>{
      if(error){
        return rej(error)
      }
      res(result)
    });
  });
};


const getAllUsersFromDb = () => {
  return new Promise( (res, rej)=>{
    database.query({
      sql: 'SELECT * FROM users',
    }, 
      (error, result)=>{
        if (error) {
          return rej(error);
        };
        res(result);
    });
  });
};

const updateUserFromDb = (data, email) =>{
  return new Promise((res, rej)=>{
    database.query({
      sql : `UPDATE users SET ${data}, modified_at = current_timestamp WHERE email = ?  `,
      values: [email]
    },
       (error , result)=>{
        if(error){
          return rej(error);
        };
        res(result)
    })
  })
}



module.exports = {
                  getUserWithEmailFromDb,
                  getAllUsersFromDb,
                  updateUserFromDb
                };