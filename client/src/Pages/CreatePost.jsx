import React from "react";
import Navbar from "../components/Navbar";
import Noteflux from "../assets/Noteflux.png";

function CreatePost() {
  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen bg-black text-white px-6 py-20 flex flex-col items-start justify-start space-y-16">
        {/* Image */}
        <img src={Noteflux} className="md:h-[600px] md:w-[960px] px-20" />

        {/* Block 1 */}
        <div className="md:max-w-xl md:px-20">
          <h2 className="text-lg font-semibold mb-4">Start a New Blog Entry</h2>
          <p className="text-[#999999] leading-snug">
            Craft your story and share something new with the Noteflux community.
            Enter a compelling post title, a detailed description, and include an
            image to make your post stand out. Choose the appropriate category
            from the dropdown to help readers discover your work more easily.
          </p>
        </div>

        {/* Block 2 */}
        <div className="md:max-w-2xl md:px-20">
          <h2 className="text-lg font-semibold mb-4">Select Category & Finalize</h2>
          <p className="text-[#999999] leading-snug">
            Pick a category from the dropdown that best fits your post topic.
            Organizing your content helps like-minded readers connect with your ideas.
          </p>
          <p className="text-[#999999] mt-4 leading-snug">
            Ready to publish? Once you click Create Post, your article will appear
            at the top of Noteflux for all to explore and comment on!
          </p>
        </div>

        {/* Form Section */}
        <form className="w-full max-w-xl space-y-5 md:px-20">
          {/* Post Title */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-[#898989]">Post Title</label>
            <input
              type="text"
              placeholder="Enter your post title"
              className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none"
            />
          </div>

          {/* Post Image */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-[#898989]">Post Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 bg-[#1c1c1c] text-white rounded-md focus:outline-none file:text-white file:border-0 file:mr-4"
            />
          </div>

          {/* Post Description */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-[#898989]">Post Description</label>
            <textarea
              rows="5"
              placeholder="Write your blog content here..."
              className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Post Category */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-[#898989]">Category</label>
            <select className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none">
              <option value="">Select a category</option>
              <option value="tech">Tech</option>
              <option value="life">Lifestyle</option>
              <option value="edu">Education</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-white text-black font-bold py-3 rounded-md hover:bg-gray-200 transition"
          >
            Create Post
          </button>
        </form>
      </section>
    </>
  );
}

export default CreatePost;
