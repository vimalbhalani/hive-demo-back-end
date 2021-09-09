const express = require('express');
const cors = require('cors')
const app = express();
const routes = require("./src/api/routes")

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/v1', routes)

const port = 5000
app.listen(port, () => console.log(`🚀server started on port ${port}`));
