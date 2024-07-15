import "./BlogEntryPreview.css";
import { Link } from "react-router-dom";

function BlogEntryPreview(props) {
  function redirect() {
    window.location.href = "/"+props.id;
  };
  return (
      <div className="blog-entry-preview" onClick={redirect}>
        <h2 className="title">{props.title}</h2>
        <p className="content">{props.content}</p>
        <p className="date">{props.date}</p>
      </div>
  )
}

export default BlogEntryPreview;