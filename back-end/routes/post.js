const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Category = mongoose.model("Category");


router.get("/posts", (req, res) => {
    Post.find()
        .populate("category", "_id name")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });


});

router.get("/featured_posts", (req, res) => {
    Post.find({ isFeatured: true })
        .populate("category", "_id name")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });


});


router.get("/posts/:id", (req, res) => {
    Post.find({ _id: req.params.id })
        .populate("category", "_id name")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        })
});


router.get("/posts/category/:catId", (req, res) => {
    Post.find({ category: req.params.catId })
        .populate("category", "_id name")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });
});


router.get("/trending-posts", (req, res) => {
    Post.find().sort({ numOfLikes: -1 })
        .populate("category", "_id name")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });

});



router.get("/fresh-stories", (req, res) => {
    Post.find()
        .sort({ _id: -1 })
        .limit(3)
        .populate("category", "_id name")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });

});


router.get("/search/:str", (req, res) => {
    const { str } = req.params;
    if (!str) {
        res.json({ err: "nothing is searched" });
    }

    Post.find({ $text: { $search: str } })
        .then((post) => {
            res.json({ msg: "Found!", post })

        })
        .catch((err) => {
            console.log(err);
        });





});


module.exports = router;

