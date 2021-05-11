// import React, { useEffect, useState } from "react";
import {useLocation, useHistory} from 'react-router-dom'


// const getBlog = (blogID) => {
//     let configObj = {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("jwt")}`
//         }
//       }
  
//       fetch(`http://localhost:3000/blogs/${blogID}`, configObj)
//       .then(r => r.json())
// }


const Blog = (props) => {
    // const location = useLocation()
    // const history = useHistory()
    // console.log(location, history)
    // const [blog, setBlog] = useState([]);

    // useEffect(() => {
    //     let mounted = true;
    //     getBlog(props.location.state.blog.id)
    //       .then(items => {
    //         if(mounted) {
    //           setBlog(items)
    //         }
    //       })
    //     return () => mounted = false;
    //   }, [props])


    return (
        <div>
            {/* <h1>{blog.title}</h1>
            <h4>{blog.user}</h4>
            <p>
                {blog.content}
            </p> */}
        </div>
    )
}

export default Blog