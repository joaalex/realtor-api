const database = require('../config/database');
const {userValidation, updateValidation} = require('../validations/userValidation');
const { v4: uuidv4 } = require('uuid');
const {getUserWithEmailFromDb, getAllUsersFromDb, updateUserFromDb} = require('../models/userModel')


const addUser = async (req,res)=>{
  // try{

    const {username, email, password, phone} = req.body;
    userValidation(req.body);
    if(error !== undefined){
      res.status(404).json({
        status : 'error',
        message : error.message
      });
      return;
    };

    const checkIfUserAlreadyExists = await getUserWithEmailFromDb(email);
    if(checkIfUserAlreadyExists.length > 0){
      res.status(404).json({
        status : 'error',
        message : "User already exists"
      })
      return;
    };

    const userId = uuidv4();
    database.query({
      sql : 'INSERT INTO users (userId, username, email, password, phone) values(?,?,?,?,?)',
      values: [userId, username, email, password, phone]
    }, 
      (error, result, field)=>{
        if(error){
          console.log(error);
          res.status(404).json({
            status: 'error',
            message: `${error} : Cannot add user at this time.`
          });
          return;
        };
        res.status(201).json({
          status: 'success',
          message: 'User added successfully'
        });

    });


  // } catch(error){
  //   res.status(500).json({
  //     status : error,
  //     message: error.message || "Something went wrong"
  //   })
  // }
  
};

const getSingleUser = async (req, res) =>{
  try{
    const {email} = req.params;

  const getSingleUser = await getUserWithEmailFromDb(email);
  res.status(200).json({
    status: 'success',
    message: 'User fetched succesfully',
    data: getSingleUser
  });

  } catch(error) {
    res.status(404).json({
      status: 'error',
      message: "Couldn't fetch user"
    });
  };

};

const getAllUser = async (req, res) => {
    try{
      const allUsers = await getAllUsersFromDb()
      res.status(200).json({
      status: 'success',
      message: 'All users fetched successfully',
      data: allUsers
    });

    } catch(error){
      res.status(404).json({
        status: 'error',
        message: "Couldn't fetch all users"
      });
    };
};


const updateUser = async (req, res) =>{
  try{
    const{ email } = req.params
    const { username, password, phone} = req.body;
    updateValidation(req.body);
    if(error !== undefined){
      res.status(404).json({
        status : 'error',
        message : error.message
      });
      return;
    };
    
    const keys = Object.keys(req.body);
    const data = keys.map( key => `${key} = ${req.body[key]}`)
     
    const updatedUsed = await updateUserFromDb(data, email);
    res.status(200).json({
      status : 'Success',
      message : 'Updated Successfully',
      data : updatedUsed
    });

  }catch(error){
    res.status(500).json({
      status : 'Error',
      message : 'Unable to update user'
    });

  };

};

module.exports = {
                  addUser,
                  getSingleUser,
                  getAllUser,
                  updateUser
                };

