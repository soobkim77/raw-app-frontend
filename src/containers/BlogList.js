import React from "react";
import BlogPreview from "../components/BlogViews/BlogPreview";

const BlogList = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <BlogPreview key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
