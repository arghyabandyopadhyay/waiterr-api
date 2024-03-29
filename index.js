const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const createError = require('http-errors');
const errorHandler = require('errorhandler');
const logger = require('./logger');

const app = express();
const port = 3000;



const userDetailsRouter = require("./routes/userDetails");
const userClientAllocationRouter = require("./routes/userClientAllocation");
const masterRouter = require("./routes/masterAPI");
const indexRouter = require('./routes/router');
const customerBankRouter=require('./routes/customerBank');

app.use(express.json());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

// app.use('/api', indexRouter);

// app.get("/", (req, res) => {
//   res.json({ message: "ok" });
// });

app.use("/api/userdetails", userDetailsRouter);
app.use("/api/customerBank", customerBankRouter);
app.use("/api/userClientAllocation", userClientAllocationRouter);
app.use("/api/master", masterRouter);
app.use("/api/app", indexRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  logger.info(`Waiterr api app listening at http://127.0.0.1:${port}`);
});
