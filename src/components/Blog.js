const Blog = ({blog}) => {
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