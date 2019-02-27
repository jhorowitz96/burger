var express = require('express');
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burger: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  

  router.post("/", function(req, res) {
    burger.insertOne(["burger_name"], [req.body.burger_name], function(result) {
      // Send back the ID of the new quote
      res.redirect("/");
    });
  });
  

router.post("/devour", function(req, res) {
  var condition = "id = " + req.body.id;
  console.log(condition);
  console.log("condition", condition);

  burger.updateOne(
    {
      devoured: true
      
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.redirect("/");
    }
  );
});

  
  // Export routes for server.js to use.
  module.exports = router;
  