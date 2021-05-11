
const Blog = (props) => {

    return (
        <div>
            <img src={props.blog.attributes.img} alt=""/>
            <h1>{props.blog.attributes.title}</h1>
            <h4>By: {props.blog.attributes.user}</h4>
            <p>
                {props.blog.attributes.content}
            </p>
        </div>
    )
}

export default Blog