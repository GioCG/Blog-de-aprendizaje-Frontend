import { SidebarDemo } from "../../components/nanvbars/sidevbar";
import { Link } from "react-router-dom";
import practicaImg from "../../assets/img/Práctica Supervisada IN6CM.gif";
import tallerImg from "../../assets/img/Taller III IN6CM.gif";
import tecnologiaImg from "../../assets/img/Tecnología III IN6CM.gif";
import './dashboardPage.css';

export const DashboardPage = () => {
  return (
    <div className="dashboard-page-content">
      <div className="dashboard-wrapper">
        <SidebarDemo />

        <div className="dashboard-main">
          {/* Sección de introducción */}
          <section className="dashboard-intro">
            <h1>Bienvenido al Dashboard del Blog</h1>
            <p>
              Esta página te permite navegar fácilmente por las diferentes categorías
              de blogs disponibles: Práctica Supervisada, Taller III y Tecnología III.
              Haz clic en cualquiera de las tarjetas para explorar las publicaciones
              correspondientes a esa categoría. ¡Disfruta la lectura y mantente actualizado con las últimas entradas!
            </p>
          </section>

          {/* Cursos / Categorías */}
          <div className="dashboard-courses">
            <Link
              to="/blog/practicasupervisada"
              state={{ categoriaNombre: "practicasupervisada" }}
              className="course-card"
            >
              <img src={practicaImg} alt="practicasupervisada" />
              <p>Práctica Supervisada</p>
            </Link>

            <Link
              to="/blog/talleriii"
              state={{ categoriaNombre: "talleriii" }}
              className="course-card"
            >
              <img src={tallerImg} alt="talleriii" />
              <p>Taller III</p>
            </Link>

            <Link
              to="/blog/tecnologia"
              state={{ categoriaNombre: "tecnologia" }}
              className="course-card"
            >
              <img src={tecnologiaImg} alt="tecnologia" />
              <p>Tecnología III</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
