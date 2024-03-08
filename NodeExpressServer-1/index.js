//- Node.js server without any framework.........................................


const http = require('node:http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;                 //this parameter states whather the status is successful or not by seeing status
  
  res.end('My first nodejs server 2march2024\n'); //what the value want to return to the server
});
// launching server
server.listen(port, () => { //listen method for launching the server, takes two method - port and hostname
  console.log(`Server running succefully :)`);
});

/* Notes---
- framework we gonna use - express
- lots of framework in the market
- information is exchange between client and server in json formate
*/