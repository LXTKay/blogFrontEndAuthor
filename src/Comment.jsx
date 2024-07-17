export default function Comment(props) {
  return (
    <div className="comment" id={props.id}>
      <p className="commentName">{props.name}</p>
      <p className="commentContent">{props.content}</p>
      <p className="commentDate">{props.timestamp}</p>
      </div>
  );
};