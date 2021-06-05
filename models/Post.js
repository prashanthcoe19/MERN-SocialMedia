import mongoose from 'mongoose';
const postSchema = mongoose.Schema({
  text: {
    type: String,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model('Post', postSchema);
