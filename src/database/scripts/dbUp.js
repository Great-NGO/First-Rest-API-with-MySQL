const db = require("../../config/db.config");

let query = `create table if not exists users (id INT primary key auto_increment, email Varchar(255) NOT NULL UNIQUE , phone_number Varchar(15) Not null );`

function createDB() {
    db.query(query, (err, data) => {
        if(err) {
            console.log("Error in creating table USERS", err)
            process.exit(1);
    
        } else {
            console.log("Created Table USERS successfully");
            process.exit(1);
        }
    });
    
}

createDB();

