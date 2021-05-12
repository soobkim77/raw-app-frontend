import BlogSnip from '../components/BlogSnip'

const BlogPage = (props) => {
    return (
        <div>
           
            <div>
                {props.blogs.map(blog => {
                    return <BlogSnip key={blog.id} blog={blog} showBlog={props.showBlog}/>
                })}
            </div>
        </div>
    )
}

export default BlogPage

