import React from "react";

function BlogSection() {
  return (
    <>
    <section id="blogs" className="bg-black text-white md:px-20 px-6 py-20">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        Latest Blogs
      </h1>
      <span className="text-[#898989] font-semibold text-lg">
        Fresh notes everyday
      </span>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        <div className="bg-black p-4 rounded-xl flex flex-col items-start">
          <div className="w-full aspect-square bg-[#1c1c1c] rounded-md overflow-hidden">
            <img
              src="https://media.istockphoto.com/id/530907415/photo/runner-breaking-finish-line-tape.jpg?s=612x612&w=0&k=20&c=IgGh3HhzGiJtxUbSYk8unTvKnK3Wo0m6yuolfSRZAOg="
              alt="blog"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-white text-[17px] font-semibold leading-snug">
            We learn everyday
          </h3>
          <p className="text-[#898989] text-[15px] mt-1 font-sans">July 10, 2025</p>
        </div>
        
      </div>
      

    </section>
    </>
  );
}

export default BlogSection;
