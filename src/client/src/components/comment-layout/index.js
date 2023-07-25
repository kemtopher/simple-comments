import { useEffect, useState } from "react";
import CommentForm from "../comment-form";
import CommentFeed from "../comment-feed";
import "./comment-layout.scss";

export default function CommentLayout() {
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchComments = () => {
    fetch("http://localhost:3001/getComments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .then(setLoaded(true))
      .catch((error) => console.log("ERROR: " + error.message));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="layout-wrapper">
      <CommentForm />
      <CommentFeed
        comments={comments}
        fetchComments={fetchComments}
        loaded={loaded}
      />
    </div>
  );
}
