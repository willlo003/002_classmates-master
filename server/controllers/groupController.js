const db = require('../models/userModel');
const groupController = {};

groupController.getGroups = (req, res, next) => {
  let queryGroups= {
		text: `SELECT _id, subject, categories, size, courselinks FROM groups`,
	}
  db.query(queryGroups)
    .then((groups) => {
      res.locals.groups = groups.rows;
      return next();
    })
    .catch((err) => {
      console.log(err)
      return next(err)
	  });
};

groupController.getGroupDetails = (req, res, next) => {
  let queryGetGroup = {
    text: `SELECT * FROM groups WHERE _id = $1`,
    values: [req.params.id]
	}
  db.query(queryGetGroup)
    .then((group) => {
      res.locals.group = group.rows[0];
      return next();
    })
    .catch((err) => {
      console.log(err)
      return next(err)
	  });
};

groupController.createGroup = (req, res, next) => {
  const { subject, categories, descriptions, rules, courselinks, size, sunday, monday, tuesday, wednesday, thursday, friday, saturday } = req.body
  console.log("beginning of create group")
  let createGroupQuery = {
     text: 'INSERT INTO public.groups(subject, categories, descriptions, rules, courselinks, size, sunday, monday, tuesday, wednesday, thursday, friday, saturday, host_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
     values: [subject, categories, descriptions, rules, courselinks, size, sunday, monday, tuesday, wednesday, thursday, friday, saturday, req.user._id],
  };
  db.query(createGroupQuery)
    .then(data => {
      let { _id, subject, categories, descriptions, rules, courselinks, size, 
          sunday, monday, tuesday, wednesday, thursday, friday, saturday, host_id 
      } = data.rows[0]
      res.locals.group = { _id, subject, categories, descriptions, rules, courselinks, size, 
          sunday, monday, tuesday, wednesday, thursday, friday, saturday, host_id 
      };
      return next()
  }).catch(error => next(error));
};

groupController.createRefToUser = (req, res, next) => {
  let refQuery = {
        text: 'INSERT INTO public.messages_in_group(user_id, group_id, messages) VALUES($1, $2, $3) RETURNING *',
        values: [req.user._id, res.locals.group._id, "ref created"],
      };
    db.query(refQuery)
    .then(data => {
      return next();
     }).catch(error => next(error));
}

module.exports = groupController;