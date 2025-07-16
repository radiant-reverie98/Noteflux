import React, { useEffect, useState } from "react";
// import API from "../utils/axios";
import axios from "axios";
function BlogSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://noteflux.onrender.com/api/posts/"); // not /fetch, we changed that
        setPosts(res.data?.posts|| []);
        console.log(res.data.posts)
         
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blogs" className="bg-black text-white md:px-20 px-6 py-20">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        Latest Blogs
      </h1>
      <span className="text-[#898989] font-semibold text-lg">
        Fresh notes everyday
      </span>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        {posts.map((post) => {
          const formattedDate = new Date(post.created_at).toLocaleDateString(
            "en-IN",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          );
         


          return (
            <div
              key={post.post_id}
              className="bg-black p-4 rounded-xl flex flex-col items-start cursor-pointer"
            >
              <div className="w-full aspect-square bg-[#1c1c1c] rounded-md overflow-hidden">
                <img
                  src={post.post_img}
                  alt={post.post_title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-white text-[17px] font-semibold leading-snug">
                {post.post_title}
              </h3>
              <p className="text-[#898989] text-[15px] mt-1 font-sans">
                {formattedDate}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BlogSection;
