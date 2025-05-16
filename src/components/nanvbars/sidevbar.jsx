import './sidebar.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/Logo.png";
import profile from "../../assets/img/profile.png";
import { useUserDetails } from "../../shared/hooks";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { IconArrowLeft } from "@tabler/icons-react";
import { cn } from "../../lib/utils";

export function SidebarDemo() {
  const { isLogged, logout, username } = useUserDetails();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className={cn("transition-all duration-300", open ? "w-64" : "w-20")}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="sidebar-body justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="sidebar-logo">{open ? <Logo /> : <LogoIcon />}</div>
              <div className="sidebar-links mt-8 flex flex-col gap-2">
                {posts.map((post, idx) => (
                  <SidebarLink
                    key={idx}
                    link={{ label: post.title, href: "#" }}
                    onClick={() => handleNavigate(`/post/${post._id}`)}
                    className="sidebar-link"
                  />
                ))}
              </div>
            </div>

            <div className="sidebar-footer flex flex-col gap-2">
              <SidebarLink
                link={{
                  label: isLogged ? username : "User",
                  href: "/settings",
                  icon: (
                    <img
                      src={profile}
                      className="sidebar-avatar"
                      alt="Avatar"
                    />
                  ),
                }}
                className="sidebar-link"
              />

              <SidebarLink
                link={{
                  label: isLogged ? "Logout" : "Login",
                  href: isLogged ? "#" : "/auth",
                  icon: <IconArrowLeft className="icon" />,
                }}
                onClick={isLogged ? handleLogout : () => handleNavigate("/auth")}
                className="sidebar-link"
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      <div className="flex flex-1 transition-all duration-300 overflow-hidden">
        <Dashboard />
      </div>
    </div>
  );
}

const Logo = () => (
  <a href="/*" className="flex items-center space-x-2 py-1 text-sm font-normal text-black">
    <div className="h-5 w-6 rounded bg-black dark:bg-white" />
    <img src={logo} className="sidebar-avatar" alt="logo" />
  </a>
);

const LogoIcon = () => (
  <a href="/" className="flex items-center py-1 text-sm font-normal text-black">
    <div className="h-5 w-6 rounded bg-black dark:bg-white" />
  </a>
);

const Dashboard = () => (
  <div className="flex flex-1 flex-col gap-2 p-2 md:p-10 rounded-tl-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-700">
    <div className="flex gap-2">
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
      ))}
    </div>
    <div className="flex flex-1 gap-2">
      {[...Array(2)].map((_, idx) => (
        <div key={idx} className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
      ))}
    </div>
  </div>
);
