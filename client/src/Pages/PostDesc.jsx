import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function PostDesc() {
  const { id } = useParams();

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Blog Description + Comment */}
      <main className="w-full min-h-screen bg-black text-white px-4 md:px-6 py-20 flex flex-col items-center md:items-start justify-start space-y-16">
        {/* Blog Image */}
        <div className="w-full flex justify-center">
          <img
            src="https://media.istockphoto.com/id/530907415/photo/runner-breaking-finish-line-tape.jpg?s=612x612&w=0&k=20&c=IgGh3HhzGiJtxUbSYk8unTvKnK3Wo0m6yuolfSRZAOg="
            className="w-full max-w-xs sm:max-w-sm md:max-w-[960px] md:h-[600px] rounded-lg object-cover"
            alt="Blog banner"
          />
        </div>

        {/* Blog Description */}
        <div className="w-full md:max-w-3xl md:px-30">
          <h2 className="text-lg font-bold mb-4">
            By Tejendra Singh - July 10, 2025
          </h2>
          <p className="text-[#999999] leading-snug">
            Craft your story and share something new with the Noteflux
            community. Enter a compelling post title, a detailed description,
            and include an image to make your post stand out. Choose the
            appropriate category from the dropdown to help readers discover your
            work more easily.
          </p>
        </div>

        {/* Comment Form */}
        <form className="w-full md:max-w-3xl md:px-30 flex flex-col gap-4">
          <label htmlFor="comment" className="text-sm text-[#898989]">
            Leave a comment
          </label>
          <textarea
            id="comment"
            rows="4"
            placeholder="Write your thoughts here..."
            className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none resize-none"
          />
          <button
            type="submit"
            className="self-start bg-white text-black font-bold px-6 py-2 rounded-md hover:bg-gray-200 transition"
          >
            Post Comment
          </button>
        </form>

        {/* Recent Comments */}
        <div className="w-full md:max-w-3xl md:px-30 flex flex-col gap-4">
          <h3 className="text-xl text-white font-bold">Recent Comments</h3>
          <div className="text-sm text-[#898989] font-semibold leading-relaxed space-y-3">
            <p>
              <span className="font-semibold text-white">Alex</span> · July 10,
              2025, 09:07 – Great article! This strategy really helped me focus.
            </p>
            <p>
              <span className="font-semibold text-white">Priya</span> · July 10,
              2025, 09:12 – I love using Noteflux. It’s streamlined my workflow!
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default PostDesc;
