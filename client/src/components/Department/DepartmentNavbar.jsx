import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import checkAccess from "../../checkAcces";
import Logout from "../Logout";

const DepartmentNavbar = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkAccess()) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="title">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Project Harbor
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to={`/DepartmentHome/${props.id}/${props.collegeCode}/${props.dname}`}
                    className="navLink"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to={`/DepartmentHome/${props.id}/${props.collegeCode}/${props.dname}/departmentprojectlist`}
                    className="navLink"
                  >
                    list Project
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/DepartmentHome/${props.id}/${props.collegeCode}/${props.dname}/personalInfo`}
                    className="navLink"
                  >
                    My Account
                  </NavLink>
                </li>

                <li className="nav-item">
                  <Logout></Logout>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default DepartmentNavbar;