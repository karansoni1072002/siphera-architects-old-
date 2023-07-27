const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const ProjectSchema = new Schema({
    title: String,
    images: [ImageSchema],
    description: String,
    location: String,
    projectStatus: String,
    siteArea: String,
    projectArea: String,
    projectType: String,
    projectTeam: String,
    // collaborators: [
    //     {
    //         collaboratorName: String,
    //         collaboratorService: String
    //     }
    // ]
    collaborators: String,
    photographyName: String
});

module.exports = mongoose.model('Project', ProjectSchema);