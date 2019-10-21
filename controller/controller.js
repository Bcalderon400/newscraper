// dependecies
var express = require("express");
var router = express.Router();
var path = require("path");

// scraper tools
var request = require("request");
var cheerio = require("cheerio");

// models
var Comment = require("../models/Comment");
var Article = require("../models/Article");

// index router
router.get("/", function(req, res) {
    res.redirect("/articles");
});

// scrape request
router.get("/scrape", function(req, res) {
    request("https://www.theverge.com", function(error, response, html) {
        // load to cheerio with selector
        var $ = cheerio.load(html);
        var titlesArray = [];

        // grab articles
        $(".c-entry-box--compact__title").each(function(i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();

            result.link = $(this)
                .children("a")
                .attr("href");

            // check for duplicates
            if (result.title !== "" && result.link !== "") {
                if (titlesArray.indexOf(result.title) == -1) {
                    titlesArray.push(result.title);

                    Article.count({ title: result.title }, function(err, test) {
                        if (test === 0) {
                            var entry = new Article(result);

                            entry.save(function(err, doc) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(doc);
                                }
                            });
                        }
                    });
                } else {
                    console.log("Article already exists.");
                }
            } else {
                console.log("Not saved to DB, missing data");
            }
        });
        res.redirect("/");
    });

});

// grab articles and populate to DOM
router.get("/articles", function(req, res) {
    Article.find().sort({ _id: -1 }).exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            var artcl = { article: doc };
            res.render("index", artcl);
        }
    });
});

// scrape articles to JSON
router.get("/articles-json", function(req, res) {
    Article.find({}, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});

module.exports = router;