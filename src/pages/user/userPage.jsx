import React from "react";
import { CommitsList } from "../../components/ListCommit";
import { SidebarDemo } from "../../components/nanvbars/sidevbar";
import "./userPage.css";

export const UserPage = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const username = user?.username || "";

  return (
    <div className="user-page-layout">
        <SidebarDemo />


      <main className="main-content">
        <h1>Mis Commits</h1>

        {username ? (
          <CommitsList username={username} />
        ) : (
          <p>No se encontró usuario logueado. Por favor inicia sesión.</p>
        )}
      </main>
    </div>
  );
};
