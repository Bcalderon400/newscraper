var mongoose = require("mongoose");

// comment schema
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    name: {
        title: String
    },
    body: {
        type: String,
        required: true
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

// export
module.exports = Comment;