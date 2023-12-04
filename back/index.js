const express=require('express');
const connecttoDB = require('./db/db');
const cors=require('cors');
const router = require('./routes/route');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api',router);
app.listen(5000,()=>{
    connecttoDB();
    console.log("Listening on port 5000...");
})


