const express = require('express');
const mongoose = require('mongoose');
const { port, host, db, authApiUrl } = require('./configuration');
const axios = require('axios')
const { connectDb } = require('./helpers/db');
const {response} = require("express");

const app = express();

const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model('Post', postSchema);

app.get("/test", (req, res) => {
    res.send('Our api server is working correctly');
});

app.get("/api/testapidata", (req, res) => {
    res.json({
        testwithapi: true,
    })
});

app.get("/testwithcurrentuser", (req, res) => {
    axios.get(authApiUrl + '/currentUser').then(response => {
        res.json({
            testwithcurrentuser: true,
            currentUser: response.data
        })
    })

})

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api server on port: ${port}`);
        console.log(`On host ${host}`);
        console.log(`Db ${db}`);

        // Post.find(function (err, posts) {
        //     if (err) return console.error(err);
        //     console.log("posts", posts);
        // })

        const testPost = new Post({name: "TestPost"});
        testPost.save(function (err, saveTestPost) {
            if (err) return console.error(err);
            console.log('savedTestPost with volumes', saveTestPost)

        })
    });
}


connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer)