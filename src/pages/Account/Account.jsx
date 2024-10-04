import React from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import styles from "../Timeline/Timeline.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
function Account() {
  const { user } = useAuthValue();

  const uid = user.uid;
  const navigate = useNavigate();

  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  function deletepost(id) {
    deleteDocument(id);
  }
  return (
    <div className={styles.container}>
      <div className={styles.nopost}>
        {posts && posts.length === 0 && (
          <div>
            <p>Opa, ainda não temos nenhum Post</p>
            <Link to="/newpost">
              <h1 className={styles.newpost}>Criar Post </h1>
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
                  <div className={styles.tagdate}>
                    <p className={styles.tags}>
                      Tags: {post.tagsarray.join(", ")}
                    </p>
                    <p className={styles.tags}>
                      {new Date(post.createdAt.seconds * 1000).toLocaleString(
                        "pt-BR"
                      )}
                    </p>
                    <button
                      onClick={() => {
                        deletepost(post.id);
                      }}
                    >
                      EXCLUIR
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Account;
