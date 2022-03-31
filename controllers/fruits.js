//DEPENDENCIES
const express = require('express')
const router = express.Router();
const Fruit = require('../models/fruits')

//ROUTES
//index
router.get('/', (req, res) => {
    Fruit.find({}, (err, fruits) => {
        res.render("index.ejs", {fruits})
    });
})

//new & create
router.get('/new', (req, res) => {
    res.render("new.ejs")
})

router.post('/', (req, res) => {
    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    const fruit = new Fruit(req.body)
    fruit.save()
    res.redirect("/fruits")
})

//show route
router.get('/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, fruit) => {
        res.render("show.ejs", {fruit})
    })
})

//delete route
router.delete("/:id", (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, fruit) => {
        res.redirect("/fruits")
    })
})

//edit route
router.get('/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, fruit) => {
        res.render("edit.ejs", {fruit})
    })
})

router.put("/:id", async (req, res) => {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    try {
      const updatedFruit = await Fruit.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true });
      res.redirect("/fruits");
    } catch (error) {
      console.log(error);
    };
  });


module.exports = router