import { useEffect } from "react";
import Comment from "../comment";
import "./comment-feed.scss";

export default function CommentFeed({ comments, fetchComments, loaded }) {
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const renderComments = comments
    .toReversed()
    .map((comment, index) => (
      <Comment
        key={index}
        message={comment?.message}
        created={comment?.created}
        name={comment?.name}
      />
    ));

  const handleDeleteAllComments = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/deleteComments", {
      method: "DELETE",
    })
      //   .then(setComments([]))
      .catch((error) => console.log(error.message));

    console.log(comments.length);
  };

  const renderDeleteBtn = (
    <div className="comment-actions">
      <button type="button" onClick={handleDeleteAllComments}>
        Delete All Comments
      </button>
    </div>
  );

  const renderCommentsList = (
    <div className="comment-list">
      {comments.length > 0 ? renderComments : <h3>No comments yet ...</h3>}
    </div>
  );

  const renderLoadingScreen = <h3>Loading Comments ...</h3>;

  return (
    <div className="comment-feed">
      {loaded ? renderCommentsList : renderLoadingScreen}
      {comments.length > 0 ? renderDeleteBtn : null}
    </div>
  );
}
