import getIdFromURL from "./getIdFromURL";
import config from "./config";

export default function CreateComment() {
  async function submitComment() {
    try{
      const id = getIdFromURL();
      const name = document.querySelector("input[name=commentName]").value;
      const content = document.querySelector("input[name=commentContent]").value;

      const response = await fetch(config.APIURL + "comments/", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          content: content,
          postId: id
        })
      });

      if(!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      if(data.message == "Comment created"){
        window.location.reload();
      }
      console.log(data);
      document.querySelector("#message").innerHTML = data.message || data.errors[0].msg;
    } catch(error){
      document.querySelector("#message").innerHTML = error.message;
    }
  }

  return (
    <div>
      <form action="#">
        <h4>Create a new comment</h4>
        <input type="text" name="commentName" placeholder="Your name" />
        <input type="text" name="commentContent" placeholder="Your Comment" />
        <button type="button" onClick={submitComment}>Submit</button>
      </form>
      <div id="message"></div>
    </div>
  );
}