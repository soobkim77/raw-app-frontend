const BlogPage = (props) => {
    return (
        <div>
            <button onClick={(e) =>props.data(e)}>Hello</button>
            {props.blogs.map(blog => {
                return <h1>{blog.title}</h1>
            })}
        </div>
    )
}

export default BlogPage