const db = require("../../config/db.config");

let query = `drop table if exists users;`

function dropDB() {
    db.query(query, (err, data) => {
        if(err) {
            console.log("Error in dropping table ", err)
            process.exit(1);
    
        } else {
            console.log("Dropped Table USERS successfully");
            process.exit(1);
        }
    });
    
}

dropDB();

