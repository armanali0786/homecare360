const express = require('express');
const cors = require('cors');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

const connectDB = require("./config/db");
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use('/api', apiRoutes);


connectDB();

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
