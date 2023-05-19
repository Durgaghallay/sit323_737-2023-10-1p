const express = require("express");
const res = require("express/lib/response");
const winston = require("winston");
const app = express();
const add = (n1, n2) => {
  return n1 + n2;
};
const subtract = (n1, n2) => {
  return n1 - n2;
};
const multiply = (n1, n2) => {
  return n1 * n2;
};
const divide = (n1, n2) => {
  return n1 / n2;
};
const logger = winston.createLogger({
  level: "info",

  format: winston.format.json(),

  defaultMeta: { service: "calculator-microservice" },

  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),

    new winston.transports.File({ filename: "logs/error.log", level: "error" }),

    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
app.get("/", (req, res) => {
  res.send("A calculator App microservices");
});
app.get("/add", (req, res) => {
  logger.log({
    level: "info",
    message: `New add operation requested: ${req.query.n1}+${req.query.n2}`,
    timestamp: new Date().toLocaleString(),
  });
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    const result = add(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Add operation error. Error Message ${error.message} `,
      timestamp: new Date().toLocaleString(),
    });
    console.log(error);
    res.status(500).json({ statuscocde: 500, msg: error.message });
  }
});
app.get("/subtract", (req, res) => {
  logger.log({
    level: "info",
    message: `New subtract operation requested: ${req.query.n1}-${req.query.n2}`,
    timestamp: new Date().toLocaleString(),
  });
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    const result = subtract(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Subtract operation error. Error Message ${error.message} `,
      timestamp: new Date().toLocaleString(),
    });
    console.log(error);
    res.status(500).json({ statuscocde: 500, msg: error.message });
  }
});
app.get("/multiply", (req, res) => {
  logger.log({
    level: "info",
    message: `New multiply operation requested: ${req.query.n1}*${req.query.n2}`,
    timestamp: new Date().toLocaleString(),
  });
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    const result = multiply(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Multiply operation error. Error Message ${error.message} `,
      timestamp: new Date().toLocaleString(),
    });
    console.log(error);
    res.status(500).json({ statuscocde: 500, msg: error.message });
  }
});
app.get("/divide", (req, res) => {
  logger.log({
    level: "info",
    message: `New divide operation requested: ${req.query.n1}/${req.query.n2}`,
    timestamp: new Date().toLocaleString(),
  });
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      throw new Error("n2 incorrectly defined");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    const result = divide(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Divide operation error. Error Message ${error.message} `,
      timestamp: new Date().toLocaleString(),
    });
    console.log(error);
    res.status(500).json({ statuscocde: 500, msg: error.message });
  }
});
app.get("/healthcheck", (req, res) => {
  logger.log({
    level: "info",
    message: `Health Check requested`,
    timestamp: new Date().toLocaleString(),
  });
  try {
    res.status(200).json({ statuscocde: 200, healthy: true });
  } catch (error) {
    logger.log({
      level: "error",
      message: `Health Check Failed `,
      timestamp: new Date().toLocaleString(),
    });
    throw error;
  }
});
const port = 3040;
app.listen(port, () => {
  console.log("hello i'm listening to port " + port);
});
