var mongoose = require("mongoose");

// article schema
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    title: {
        title: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var Article = mongoose.model("Article", ArticleSchema);

// export
module.exports = Article;