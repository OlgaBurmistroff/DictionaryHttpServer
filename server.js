var http = require('http');
const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/?maxPoolSize=20&w=majority";

const client = new MongoClient(uri);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    
    await  listDatabases(client);
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

function handleGetReq(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("GET: " + req.url); //write a response to the client
  console.log("GET: " + req.url);
  return res.end() //end the response
}

function handlePostReq(req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("POST: " + req.url); //write a response to the client
  console.log("POST: " + req.url);
  return res.end() //end the response
}

function handleDeleteReq(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("DELETE: " + req.url); //write a response to the client
  console.log("DELETE: " + req.url);
  return res.end() //end the response
}

function handlePutReq(req, res) {
    
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("PUT: " + req.url); //write a response to the client
  console.log("PUT: " + req.url);
  return res.end() //end the response
}

function handleError (res, code) { 
    res.statusCode = code 
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`) 
} 

//create a server object:
http.createServer(function (req, res) {
    if (req.method === 'GET') {
        return handleGetReq(req, res)
    } else if (req.method === 'POST') {
        return handlePostReq(req, res)
    } else if (req.method === 'DELETE') {
        return handleDeleteReq(req, res)
    } else if (req.method === 'PUT') {
        return handlePutReq(req, res)
    }
}).listen(8080); //the server object listens on port 8080S