// Require MySQL
const mysql = require("mysql");

// Create connection
let connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  mysql.createConnection({
    host: "zy4wtsaw3sjejnud.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "ssdckdp2t20hvgqu",
    password: "dotkgpmmqzeepbpv",
    database: "nt8adhnagi758ych"
  });
}

// Make connection
connection.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;
