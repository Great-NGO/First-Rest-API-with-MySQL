const User = require("../models/user_model");

// Create and Save a new user
exports.create = (req, res) => {

// Before we created the id's our selves... - if (id == undefined || email == undefined || phone_number == undefined); now we don't cos we generate it automatically;

  //Validate request
  const { email, phone_number } = req.body;
  if (email == undefined || phone_number == undefined) {
    res.status(400).send({
      message: "Content (Email and phone_number) Can not be empty",
    });
  } else {
    //Create a User
    const user = new User(email, phone_number);

    // Save User in the database
    User.create(user, (err, data) => {
      if (err) {
        if(err.kind === "Email is taken already.") {
            res.status(404).send({
                message: "Email belongs to another user.",
              });
        }  
        else {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the user.",
            });
        }
      } else {
        res.send(data);
      }
    });
  }
};

// Retrieve all users from the database
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the users.",
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(Number(req.params.id), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Update a User identified by the id in the request
exports.update = async (req, res) => {
  //Validate Request
//   const { id, email, phone_number } = req.body;
  const { email, phone_number } = req.body;

  // if(!req.body) {
  if (email == undefined || phone_number == undefined) {
    res.status(400).send({
      message: "Content (Email and phone_number) can not be empty!",
    });
  } 
  else {
    // let user = { id, email, phone_number };
    let user = { email, phone_number };
    User.updateById(
      // Number(req.params.id),
      req.params.id,
      user,
      (err, data) => {
        if (err) {
          console.log("Updating err:", err);
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}`,
            });
          } 
          else if(err.kind === "Email is taken already.") {
            res.status(404).send({
                message: "Email belongs to another user.",
              });
          } else {
            console.log("Updating error: ", err);
            res.status(500).send({
              message: "Error updating User with id " + req.params.id,
            });
          }
        } else {
        //   res.send({data});
          res.send(data);
        }
      }
    );
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.delete(Number(req.params.id), (err, data) => {
    if (err) {
      console.log("EEEE ", err);
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id,
        });
      }
    } else {
      res.send({ message: "User was deleted successfully" });
    }
  });
};
