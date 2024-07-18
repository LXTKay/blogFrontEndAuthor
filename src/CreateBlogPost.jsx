import getAuthCookie from "./getAuthCookie";
import config from "./config";
import { redirect } from "react-router-dom";

export default function CreateBlogPost() {
  async function submitPost(){

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
      document.getElementById("message").innerText = "Please fill in all fields";
      return;
    }
    
    const isPublished = document.getElementById("isPublished").checked;
    const post = {title, content, isPublished};

    try{
      const authCookie = getAuthCookie();
      if(!authCookie) throw new Error("No auth cookie found");
      
      const response = await fetch(config.APIURL + "posts/", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authCookie
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      
      document.getElementById("message").innerText = data.message;
      window.location.href = "/";
    } catch(error){
      document.getElementById("message").innerText = error.message;
    }
    
  }
  return (
    <form action="#">
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" />
      </div>
      <div>
        <label htmlFor="content">Body:</label>
        <textarea name="content" id="content"></textarea>
      </div>
      <div>
        <label htmlFor="isPublished">Publish:</label>
        <input type="checkbox" name="isPublished" id="isPublished" />
      </div>
      <button type="button" onClick={submitPost}>Submit</button>
      <div id="message"></div>
    </form>

  );
}