import React, { useState, useEffect } from "react";
import { useCreateCommit } from "../shared/hooks/useCreateCommit";

export const CrearCommitForm = ({ titulo = "", parentCommitId = "" }) => {
  const [textoprincipal, setTextoPrincipal] = useState("");
  const { create, isLoading } = useCreateCommit();

  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Ajusta según cómo guardes el login
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await create({
      textoprincipal,
      username,
      titulo,
      parentCommitId,
    });
    setTextoPrincipal(""); // Limpia el input
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "8px" }}>
      <textarea
        placeholder="Escribe un comentario..."
        value={textoprincipal}
        onChange={(e) => setTextoPrincipal(e.target.value)}
        required
        rows={2}
        style={{ width: "100%", marginBottom: "6px" }}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Respondiendo..." : "Responder"}
      </button>
    </form>
  );
};
