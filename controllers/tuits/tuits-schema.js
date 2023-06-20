import mongoose, { isObjectIdOrHexString } from 'mongoose';
const { Schema, ObjectId } = mongoose;
const schema = mongoose.Schema({
  _id: { type: ObjectId },
  topic: String,
  userName: String,
  title: String,
  time: String,
  image: String,
  liked: Boolean,
  disliked: Boolean,
  replies: Number,
  retuits: Number,
  likes: Number,
  dislikes: Number,
  handle: String,
  tuit: String
}, { collection: 'tuits' });
export default schema;