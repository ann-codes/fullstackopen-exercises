const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  author: String,
  url: { type: String, required: true, unique: true, minlength: 5 },
  likes: { type: Number, default: 0 },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
