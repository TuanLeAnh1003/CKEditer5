const res = require('express/lib/response');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Ckeditor5');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  blogId: String,
  userId: String,
  content: String
}, {
    collection: 'Blog',
});

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel