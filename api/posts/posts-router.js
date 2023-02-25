// implement your posts router here
const express = require('express')

const Posts = require("./posts-model")

const router = express.Router()


router.get("/", async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({message: "The posts information could not be retrieved"})
    }
})

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const singlePost = await Posts.findById(id)
        if (!singlePost) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else {
            res.status(200).json(singlePost)
        }
    } catch(err) {
        res.status(500).json({message: "The post information could not be retrieved"})
    }
})


router.post("/", async (req, res) => {
    try {
        const {title, contents} = req.body;
        if (!title || !contents) {
            res.status(400).json({message: "Please provide title and contents for the post"})
        } else {
            const post = {
                "title": title,
                "contents": contents
            }
       const newPost = await Posts.insert(post)
       console.log(newPost)
       const myPost = await Posts.findById(newPost.id)
                res.status(201).json(myPost)
        }
    } catch(err) {
        res.status(500).json({message: "There was an error while saving the post to the database"})
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {title, contents} = req.body;
        const tempPost = await Posts.findById(id)
        if (!tempPost) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else if (!title || !contents) {
            res.status(400).json({message: "Please provide title and contents for the post"})
        } else {
            const updatedPost = await Posts.update(id, {title, contents})
            const newPost = await Posts.findById(id);
            res.status(200).json(newPost)
        }
    } catch(err) {
        res.status(500).json({message: "The post information could not be modified"})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const tempPost = await Posts.findById(id);
        if (!tempPost) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else {
            const deletedPost = await Posts.remove(id);
            res.json(tempPost)
        }
    } catch(err) {
        res.status(500).json({message: "The post could not be removed"})
    }
})

router.get("/:id/comments", async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Posts.findById(id)
        const comments = await Posts.findPostComments(id);
        if (!post) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else {
            res.status(200).json(comments)
        }
    } catch(err) {
        res.status(500).json({message: "The comments information could not be retrieved"})
    }
})

module.exports = router;