import mongoose from "mongoose";

const NovelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
    },
    description: {
      type: String,
      required: true,
      min: 20,
    },
    excerpt: {
      type: String,
      required: true,
      min: 10,
    },
    quote: {
      type: String,
      required: true,
      min: 6,
    },

    image: {
      id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Comedy",
        "Action",
        "Thriller",
        "Fantasy",
        "Sci-fi",
        "History",
        "Romance",
        "Crime",
        "Magical",
        "Young Adult",
        "Paranormal",
      ],
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose?.models?.Novel || mongoose.model("Novel", NovelSchema);
