import { useEffect, useState } from "react";
import config from "./config";
import Comment from "./Comment";

function BlogEntry(){
  const [post, setPost] = useState({});

  function getIdFromURL(){
    const path = window.location.pathname;
    const segments = path.split("/");
    const id = segments[segments.length - 1];
    return id;
  }

  useEffect(() => {
    async function fetchData() {
      const id = getIdFromURL();
      try{
        const response = await fetch(config.APIURL + "posts/" + id, {
          mode: "cors",
          method: "GET",
        });

        if(!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setPost(data);

      } catch(error) {
        console.log(error);
        const data = {
          id: "dummyID",
          title: error.name,
          content: error.message,
          isPublished: true,
          date: Date.now(),
        }
        setPost(data);
        return;
      };
    };
    fetchData();
  }, []);

  let comments = null;
  if (post.comments && post.comments.length > 0){
    comments = post.comments.map(function(comment){
      return <Comment 
        key={comment._id}
        name={comment.name} 
        content={comment.content} 
        timestamp={comment.timestamp}
        id={comment._id}
      />
    })
  }
  
  return (
    <div className="blog-entry">
      <h2 className="title">{post.title}</h2>
      <p className="content">{post.content}</p>
      <p className="date">{post.timestamp}</p>
      {comments && (
        <div className="commentSection">
          <h3>Comments</h3>
          {comments}
        </div>
        )
      }
      
    </div>
  )
}

export default BlogEntry;