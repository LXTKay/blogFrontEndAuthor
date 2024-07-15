import { useEffect, useState } from "react";
import config from "./config";

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
        return;
      };
    };
    fetchData();
  }, []);
  return (
    <div className="blog-entry">
      <h2 className="title">{post.title}</h2>
      <p className="content">{post.content}</p>
      <p className="date">{post.date}</p>
    </div>
  )
}

export default BlogEntry;