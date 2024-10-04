import React from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import styles from "./Search.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Search() {
  const query = useQuery();
  const search = query.get("q");
  const [newquery, setNewQuery] = useState("");
  const navigate = useNavigate();

  const newsearch = (e) => {
    e.preventDefault();

    if (newquery) {
      return navigate(`/search?q=${newquery}`);
    }
  };

  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", search);

  return (
    <div className={styles.container}>
      <form className={styles.searchform} onSubmit={newsearch}>
        <input
          type="search"
          name="busca"
          id="busca"
          placeholder="Busque por tags"
          value={newquery}
          onChange={(e) => {
            setNewQuery(e.target.value);
          }}
        />
        <button>Pesquisar</button>
      </form>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.nopost}>
            <h1>Não temos Posts desse assunto...</h1>
            <Link to="/newpost">
              <p className={styles.neon}>Criar Post sobre isso</p>
            </Link>
          </div>
        )}

        <div className={styles.posts}>
          {posts &&
            posts.map((post) => {
              return (
                <div key={post.id} className={styles.post}>
                  <h2 className={styles.user}>{post.createdBy}</h2>
                  <h3>{post.text}</h3>
                  <p className={styles.tags}>
                    Tags: {post.tagsarray.join(", ")}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Search;
