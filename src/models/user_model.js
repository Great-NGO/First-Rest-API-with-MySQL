const db = require("../config/db.config");

// Constructor
class User {
  // constructor(id, email, phone_number) {
  constructor(email, phone_number) {
    // this.id = id;      //Changed database to use auto-increment for primary key.
    this.email = email;
    this.phone_number = phone_number;
  }

  //NB: mysql - result(error, data) //e.g. If there is an error - result(error, null); If it's successful - result(null, data)

  static create(newUser, result) {
    db.query(
      `INSERT INTO users VALUES(?, ?, ?)`,
      [null, newUser.email, newUser.phone_number],
      (err, res) => {
        if (err) {

          console.log("error from create model: ", err);

          if(err.code === "ER_DUP_ENTRY") {
            result({ kind: "Email is taken already."}, null);
            return
          }
          
          result(err, null);
          return;
        }

        console.log("Created User: ", { ...newUser });
        result(null, { id: res.insertId, ...newUser });
      }
    );
  }

  static findById(id, result) {
    db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        // console.log("Found user: ", res);
        console.log("Found user: ", res[0]);  //The first index
        result(null, res[0]);
        return;
      }

      //Not found
      result({ kind: "not_found" }, null);
    });
  }

  static getAll(result) {
    db.query(`SELECT * FROM USERS WHERE id IS NOT NULL AND email IS NOT NULL AND phone_number IS NOT NULL;`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("users: ", res);
      result(null, res);
    });
  }

  static updateById(id, user, result) {
    db.query(
      `UPDATE users SET email = ?,phone_number = ? WHERE id = ?`,
      [user.email, user.phone_number, id],
      (err, res) => {
        if (err) {

          console.log("error from update model: ", err);

          if(err.code === "ER_DUP_ENTRY") {
            result({ kind: "Email is taken already."}, null);
            return
          }

          result(err, null);
          return;
        
        }

        else if (res.affectedRows == 0) {
          //Not found
          result({ kind: "not_found" }, null);
          return;
        }

        else {
          console.log("Updated user: ", {id: Number(id), ...user });
          result(null, { id: Number(id), ...user });
        }
      }
    );
  }

  static delete(id, result) {
    db.query(`DELETE FROM users WHERE id = ?`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      else if (res.affectedRows == 0) {
        //Not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Deleted user with id: ", id);
      result(null, res);
    })
  }
}


module.exports = User;