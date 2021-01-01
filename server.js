const express = require('express');
const apiRouter = require('./routes');
const cors = require('cors');
const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/fitbit', apiRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
