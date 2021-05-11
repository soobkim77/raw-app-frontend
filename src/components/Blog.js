import React, { useEffect, useState } from "react";


const getBlog = (blogID) => {
    let configObj = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      }
  
      fetch(`http://localhost:3000/blogs/${blogID}`, configObj)
      .then(r => r.json())
}


const Blog = (props) => {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        let mounted = true;
        getBlog(props.blog.id)
          .then(items => {
            if(mounted) {
              setBlog(items)
            }
          })
        return () => mounted = false;
      }, [])


    return (
        <div>
            <h1>{blog.title}</h1>
            <h4>{blog.user}</h4>
            <p>
                {blog.content}
            </p>
        </div>
    )
}

export default Blog