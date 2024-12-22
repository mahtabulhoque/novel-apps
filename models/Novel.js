import mongoose from "mongoose";

const NovelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      min: [4, "Title must be at least 4 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      min: [20, "Description must be at least 20 characters"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      min: [10, "Excerpt must be at least 10 characters"],
    },
    quote: {
      type: String,
      required: [true, "Quote is required"],
      min: [6, "Quote must be at least 6 characters"],
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
      required: [true, "Category is required"],
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
      required: [true, "Author ID is required"],
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
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
