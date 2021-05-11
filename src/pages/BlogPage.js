import BlogSnip from '../components/BlogSnip'

const BlogPage = (props) => {
    return (
        <div>
            <button onClick={(e) =>props.data(e)}>Hello</button>
            <div>
                {props.blogs.data.map(blog => {
                    return <BlogSnip blog={blog}/>
                })}
            </div>
        </div>
    )
}

export default BlogPage

