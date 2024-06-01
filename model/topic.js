const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  imageUrl: { type: String},
});

const topicSchema = new mongoose.Schema({
  name: { type: String },
  images: [imageSchema],
});

module.exports = mongoose.model('Topic', topicSchema);