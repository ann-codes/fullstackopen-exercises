import React from "react";
import { useHistory } from "react-router-dom";
import useField from "../hooks/useField";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    props.setNotification(`${content.value} has been added to the list!`);
    history.push("/anecdotes");
  };

  const clearAll = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>Create a New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content: <input {...content} reset={null} />
        </div>
        <div>
          author: <input {...author} reset={null} />
        </div>
        <div>
          url for more info: <input {...info} reset={null} />
        </div>
        <button type="submit">create</button>{" "}
        <button type="button" onClick={() => clearAll()}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
