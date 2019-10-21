var mongoose = require("mongoose");

// article schema
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    title: {
        title: String
    },
    link: {
        type: String
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var Article = mongoose.model("Article", ArticleSchema);

// export
module.exports = Article;