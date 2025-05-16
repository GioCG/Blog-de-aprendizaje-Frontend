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
          <div className="dashboard-courses">
            <Link to="/blog/practica-supervisada" className="course-card">
              <img src={practicaImg} alt="Práctica Supervisada" />
              <p>Práctica Supervisada</p>
            </Link>

            <Link to="/blog/taller-iii" className="course-card">
              <img src={tallerImg} alt="Taller III" />
              <p>Taller III</p>
            </Link>

            <Link to="/blog/tecnologia-iii" className="course-card">
              <img src={tecnologiaImg} alt="Tecnología III" />
              <p>Tecnología III</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
