import { useState } from "react";
import "./comment-form.scss";

export default function CommentForm() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  async function postFormData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("HTTP-Error: " + response.status);
    }
    return response.json();
  }

  const handleCreateComment = (e) => {
    e.preventDefault();

    postFormData("http://localhost:3001/createComment", {
      name: formData.name,
      message: formData.message,
    }).then(
      setFormData({
        name: "",
        message: "",
      })
    );
  };

  return (
    <div className="form-wrapper">
      <form>
        <div className="field-wrapper">
          <label>Create New Comment</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name here"
            className="form-control input"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>

        <div className="field-wrapper">
          <textarea
            type="text"
            name="message"
            placeholder="Enter your comment here"
            className="form-control text-area"
            value={formData.message}
            onChange={handleFormChange}
          />
        </div>

        <button type="submit" onClick={handleCreateComment}>
          Submit
        </button>
      </form>
    </div>
  );
}
