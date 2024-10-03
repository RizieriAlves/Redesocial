import React from "react";
import styles from "./NewPost.module.css";
import { useState } from "react";
function NewPost() {
  function newpost(e) {
    e.preventDefault();
    if (tags.length < 1) {
      alert("Informe pelo menos uma tag");
    }
  }

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  function actualtag(e) {
    setTag(e.target.value);
  }

  function addTag(e) {
    e.preventDefault();
    if (tag != "") {
      let newtags = [];
      newtags.push(tag);
      newtags.push(...tags);
      setTags(newtags);
      setTag("");
    }
  }

  function removetag(index) {
    let newtags = tags.filter((el, i) => {
      if (i != index) {
        return true;
      } else {
        return false;
      }
    });
    setTags(newtags);
  }

  return (
    <div className={styles.container}>
      <h3>New Post</h3>
      <form onSubmit={newpost} className={styles.form}>
        <textarea
          type="text"
          name="text"
          id="text"
          required
          placeholder="Compartilhe, reclame ou digite o que estiver afim"
          maxLength="300"
        ></textarea>
        <div>
          <p>TAGS:</p>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Tags"
            onChange={actualtag}
          ></input>
          <button onClick={addTag} className={styles.addtag}>
            Add Tag
          </button>
        </div>
        {tags && (
          <div>
            <p className={styles.tags}>
              {tags.map((tag, index) => {
                return (
                  <span
                    key={index}
                    className={styles.tag}
                    onClick={() => removetag(index)}
                  >
                    {tag}
                  </span>
                );
              })}
            </p>
          </div>
        )}
        <button className={styles.send}>Enviar</button>
      </form>
    </div>
  );
}

export default NewPost;
