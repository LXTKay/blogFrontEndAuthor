import { useEffect, useState } from "react";
import config from "./config";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import getIdFromURL from "./getIdFromURL";
import ModalDelete from "./ModalDelete";
import getAuthCookie from "./getAuthCookie";

function BlogEntry(){
  const [post, setPost] = useState({});

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
  };

  function showModal(){
    const modal = document.querySelector("#modalDelete");
    modal.showModal();
  }

  async function deleteFunction(){
    const id = getIdFromURL();
    const authCookie = getAuthCookie();
    try{
      const response = await fetch(config.APIURL + "posts/" + id, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authCookie
        },
        })
      
      if(!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      document.querySelector(".blog-entry").innerHTML = data.message;
    }catch(error) {
      console.log(error);
    };
  };

  function editPost(){
    window.location.href = getIdFromURL() + "/edit";
  };
  
  return (
    <div className="blog-entry">
      <h2 className="title">{post.title}</h2>
      <div>
        <button onClick={editPost}>Edit</button>
        <button onClick={showModal}>Delete</button>
        <ModalDelete deleteFunction={deleteFunction}/>
      </div>
      <p className="content">{post.content}</p>
      <p className="date">{post.timestamp}</p>
        <div className="commentSection">
          <h3>Comments</h3>
          {comments}
          <CreateComment />
        </div>
    </div>
  )
}

export default BlogEntry;