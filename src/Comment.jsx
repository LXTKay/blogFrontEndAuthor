import config from "./config";
import getAuthCookie from "./getAuthCookie";
import "./Comment.css";
import Context from "./context";
import { useContext } from "react";

export default function Comment(props) {
  const {loggedIn, setLoggedIn} = useContext(Context);

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
      e.target.parentElement.parentElement.innerHTML = data.message;
    }catch(error) {
      document.getElementById(id).innerHTML = error.message;
    }
  };
  return (
    <div className="comment" id={props.id}>
      <div className="commentTopBar">
        <p className="commentName">{props.name}</p>
        <p className="commentDate">{props.timestamp}</p>
        {loggedIn && (<button className="deleteButton" onClick={e=>deleteComment(e)}>Delete</button>)}
      </div>
      <p className="commentContent">{props.content}</p>
    </div>
  );
};