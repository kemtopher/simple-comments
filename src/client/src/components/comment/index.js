import { useState, useEffect } from "react";
import "./comment.scss";

export default function Comment({ message, created, name }) {
  const formatedDate = new Date(created).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="comment-wrapper">
      <div className="comment-text">{message}</div>
      <div className="comment-info">
        <span className="comment-author">
          {name}: {formatedDate}
        </span>
        {/* <span className="comment-date">{created}</span> */}
      </div>
    </div>
  );
}
