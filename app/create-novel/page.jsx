"use client";
import {  useState } from "react";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import TextArea from "@/components/Textarea";
import { useSession } from "next-auth/react";

const initialState = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "Comedy",
  photo: null,
};

const CreateNovel = () => {
  const CLOUD_NAME = "ddeuhfagm";
  const UPLOAD_PRESET = "novel_app_images";

  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center text-2xl">Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <p>Access denied</p>;
  }

  const handleChange = (event) => {
    setError("");
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setState({ ...state, [name]: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { photo, title, category, description, excerpt, quote } = state;

    if (!title || !description || !category || !excerpt || !quote) {
      setError("Please fill all the fields");
      return;
    }

    if (photo) {
      const maxSize = 5 * 1024 * 1024;
      if (photo.size > maxSize) {
        setError("File size is too large. Please select a file under 5MB.");
        return;
      }
    }

    if (title.length < 4) {
      setError("Title must be at least 4 characters long");
      return;
    }
    if (description.length < 20) {
      setError("Description must be at least 20 characters long");
      return;
    }
    if (excerpt.length < 10) {
      setError("Excerpt must be at least 10 characters long");
      return;
    }
    if (quote.length < 6) {
      setError("Quote must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
      const image = photo ? await uploadImage() : null;

      const newNovel = {
        title,
        description,
        excerpt,
        quote,
        category,
        image,
        authorId: session?.user?._id,
      };

      const response = await fetch("http://localhost:3000/api/novel", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(newNovel),
      });

      const data = await response.json();
      if (response.status === 201) {
        setSuccess("Chapter added successfully");
        setTimeout(() => {
          router.refresh();
          router.push("/novel");
        }, 1500);
      } else {
        setError(data.error || "Error adding the chapter. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  const uploadImage = async () => {
    if (!state.photo) return null;

    const formData = new FormData();
    formData.append("file", state.photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const data = await res.json();
      return {
        id: data["public_id"],
        url: data["secure_url"],
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Image upload failed. Please try again.");
      return null;
    }
  };

  return (
    <section className="container max-w-3xl">
      <h2 className="mb-5 text-center">
        <span className="special-word">Add a Chapter</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          type="text"
          name="title"
          placeholder="Title here..."
          onChange={handleChange}
          value={state.title}
        />

        <TextArea
          label="Description"
          rows="4"
          name="description"
          placeholder="Description here..."
          onChange={handleChange}
          value={state.description}
        />

        <TextArea
          label="Excerpt"
          rows="2"
          name="excerpt"
          placeholder="Excerpt here..."
          onChange={handleChange}
          value={state.excerpt}
        />

        <TextArea
          label="Quote"
          rows="2"
          name="quote"
          placeholder="Quote here..."
          onChange={handleChange}
          value={state.quote}
        />

        <div>
          <label className="block">--Select a Category--</label>
          <select
            name="category"
            onChange={handleChange}
            value={state.category}
            className="block rounded-lg w-full p-3"
          >
            <option value="Comedy">Comedy</option>
            <option value="Action">Action</option>
            <option value="Thriller">Thriller</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="History">History</option>
            <option value="Romance">Romance</option>
            <option value="Crime">Crime</option>
            <option value="Magical">Magical</option>
            <option value="Young Adult">Young Adult</option>
            <option value="Paranormal">Paranormal</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Upload Image</label>
          <input
            onChange={handleChange}
            type="file"
            name="photo"
            accept="image/*"
          />
          {state.photo && (
            <div>
              <img
                src={URL.createObjectURL(state.photo)}
                alt="Preview"
                className="w-32 mt-5"
              />
            </div>
          )}
        </div>
        {error && <div className="text-red-700 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}

        <button type="submit" className="btn my-3">
          {isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </section>
  );
};

export default CreateNovel;