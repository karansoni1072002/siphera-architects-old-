const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const CategorySchema = new Schema({
    title: String,
    images: [ImageSchema],
    description: String,
});

module.exports = mongoose.model('Category', CategorySchema);