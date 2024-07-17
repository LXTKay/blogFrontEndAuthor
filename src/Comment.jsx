import config from "./config";
import getAuthCookie from "./getAuthCookie";

export default function Comment(props) {
  async function deleteComment(e) {
    const id = props.id;
    const authCookie = getAuthCookie();
    try{
      const response = await fetch(config.APIURL + "comments/" + id, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authCookie
        },
        credentials: "include",
      });
      const data = await response.json();
      e.target.parentElement.innerHTML = data.message;
    }catch(error) {
      document.getElementById(id).innerHTML = error.message;
    }
  };
  return (
    <div className="comment" id={props.id}>
      <button onClick={e=>deleteComment(e)}>Delete</button>
      <p className="commentName">{props.name}</p>
      <p className="commentContent">{props.content}</p>
      <p className="commentDate">{props.timestamp}</p>
    </div>
  );
};