const db = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {};

userController.getUsers = (req, res, next) => {
  // write code here
  console.log("usercontroller");
  let queryUsers = {
    text: `SELECT * FROM users WHERE _id = $1`,
    values: [2],
  };
  db.query(queryUsers)
    .then((users) => {
      res.locals.users = users.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

userController.register = (req, res, next) => {
  let checkEmailExist = {
    text: `SELECT email FROM users WHERE email = $1`,
    values: [req.body.email],
  };
  db.query(checkEmailExist).then((user) => {
    if (user.rowCount !== 0) {
      return res
        .status(400)
        .json({ email: "A user has already registered with this address" });
    } else {
      let { name, email, password } = req.body;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          let createUserQuery = {
            text: "INSERT INTO public.users(name, email, password, num_of_classes_joined, status) VALUES($1, $2, $3, $4, $5) RETURNING *",
            values: [name, email, hash, 0, "Newbie"],
          };
          db.query(createUserQuery)
            .then((data) => {
              let { name, email } = data.rows[0];
              res.locals.user = { name, email };
              console.log("checking", res.locals.user);
              return next();
            })
            .catch((error) => next(error));
        });
      });
    }
  });
};

userController.login = (req, res, next) => {
  let checkEmailExist = {
    text: `SELECT _id, name, email, password FROM users WHERE email = $1`,
    values: [req.body.email],
  };
  db.query(checkEmailExist).then((user) => {
    if (user.rowCount === 0) {
      return res.status(404).json({ message: "This user does not exist" });
    }

    // bcrypt.compare(req.body.password, user.rows[0].password).then((isMatch) => {
    //   if (isMatch) {
    let { _id, name, email } = user.rows[0];
    res.locals.user = { _id, name, email };
    return next();
    //   } else {
    //     return res.status(400).json({ message: "Incorrect password" });
    //   }
  });
  //   });
};

userController.signToken = (req, res, next) => {
  const token = jwt.sign(res.locals.user, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
  res.cookie("token", token, {
    secure: false, // set to true if your using https
    httpOnly: true,
  });
  console.log("0) Token is signed");
  return next();
};

userController.verifyToken = (req, res, next) => {
  console.log("beginning of verifyToken");
  const token = req.cookies.token || "";
  let jwtToken = jwt.decode(token);
  if (!token) {
    return res.status(401).json("You need to Login");
  }
  if (Date.now() > jwtToken.exp * 1000) {
    return res.status(200).json({ success: "no" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, { _id, name, email }) => {
      if (err) return res.status(500).json(err);
      req.user = { _id, name, email };
      console.log("2) user sucessfully verified token");
      return next();
    });
  }
};

userController.deleteToken = (req, res, next) => {
  const token = "";
  res.cookie("token", token, {
    secure: false, // set to true if your using https
    httpOnly: true,
  });
  return next();
};

userController.getMyGroups = (req, res, next) => {
  //   console.log("getMyGroup", req);
  // req.user_.id
  let queryMyGroups = {
    text: "SELECT g.subject, g.categories, g.size, g.courselinks FROM groups AS g JOIN messages_in_group AS m ON (m.group_id = g._id) JOIN users AS u ON (u._id = m.user_id)",
    // text: "SELECT * FROM users",
    // text: "SELECT g.subject, g.categories, g.size, g.courselinks FROM groups AS g JOIN messages_in_group AS m ON (m.group_id = g._id) JOIN users AS u ON (u._id = m.user_id) WHERE m.user_id = $1",
    // values: [req.user._id],
  };

  console.log("3) Within the controller getMyGroup");
  db.query(queryMyGroups)
    .then((groups) => {
      //   console.log("users", groups);
      res.locals.myGroups = groups.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

module.exports = userController;
