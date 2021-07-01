const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");

// app.get('/api/leaders', (req, res) => {
// 	res.send(leaderList);
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/group", groupRoutes);

// serve index.html on the route '/'
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  // statically serve everything in the build folder on the route '/build'
  app.use("/build", express.static(path.join(__dirname, "../build")));
  app.use("/assets", express.static(path.join(__dirname, "../client/assets/")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  });

  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  });

  app.get("/my_groups", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  });

  app.get("/create", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  });

  app.get("/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  });

  app.use("*", (req, res, next) =>
    next({
      log: "Page is not found",
      status: 404,
      message: { err: "Not found?" },
    })
  );

  app.use((err, req, res, next) => {
    //respond w 404 error message
    const defaultError = {
      log: "Express error handler caught unknown middleware error",
      status: 400,
      message: { err: "An error occurred" },
    };

    let errObj = Object.assign({}, defaultError, err);
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.message);
  });
}

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
