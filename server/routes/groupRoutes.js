const express = require("express");

const groupController = require("../controllers/groupController");
const userController = require("../controllers/userController");

const router = express.Router();

// Private Route
// 1) Post request is accessed through the form where the endpoint is at /api/user/mygroups/create.
//    Refer to the /mygroups/create on userRoutes.js for reference
// 2) Check if the user has the JWT token stored in the cookie on the frontend -> if yes, verify it along with the JWT secret
// 3) Create group
// 4) Create reference in the message_in_group table where the foreign keys of user_id and group_id exists along with the string of "ref created"
router.post(
  "/create",
  userController.verifyToken,
  groupController.createGroup,
  groupController.createRefToUser,
  (req, res) => {
    res.status(200).json(res.locals.group);
  }
);

// 1) Get request to the specific group to access information about that group by the id parameter of /api/group/:id.
router.get("/:id", groupController.getGroupDetails, (req, res) => {
  console.log("hi from groupRoutes");
  res.status(200).json(res.locals.group);
});

// 1) Display all groups existed in the database
router.get("/", groupController.getGroups, (req, res) => {
  res.status(200).json(res.locals.groups);
});

module.exports = router;
