const express = require("express");

const app = express();
const logger = require('./middleware/logger');
const routes = require('./routes/routes');

app.use(logger);
app.use(express.json());
app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));