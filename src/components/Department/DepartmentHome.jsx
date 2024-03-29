import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateMentorInformation from "./UpdateMentorInformation";
import DepartmentNavbar from "./DepartmentNavbar";
import { v4 } from "uuid";
import Loader from "../Loader";
const DepartmentHome = () => {
  var i = 1;
  const param = useParams();

  const navigate = useNavigate();
  const [newMentor, setnewMentor] = useState({
    id: v4().slice(0, 20),
    profid: "",
    collegeCode: param.collegeCode,
    name: "",
    dname: param.dname,
    email: "",
    password: "",
  });

  const [prof, setprof] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const getData = async () => {
    setShowLoader(true);
    const response = await fetch(
      `http://localhost:5000/getInformationDashBoard/department/${param.collegeCode}/${param.dname}`,
      {
        headers: {
          JToken: localStorage.getItem("JToken"),
        },
      }
    );
    const data = await response.json();
    setprof(data);
    setShowLoader(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const addMentor = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/addNewMember/Department`,
      {
        method: "POST",
        headers: {
          JToken: localStorage.getItem("JToken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMentor),
      }
    );
    const data = await response.json();
    setnewMentor({
      id: v4().slice(0, 20),
      profid: "",
      collegeCode: param.collegeCode,
      name: "",
      dname: param.dname,
      email: "",
      password: "",
    });
    getData();
  };
  const seedetails = (profid) => {
    navigate(`/mentordetails/${param.id}/${param.dname}/${param.cc}/${profid}`);
  };
  return (
    <>
      <DepartmentNavbar
        id={param.id}
        collegeCode={param.collegeCode}
        dname={param.dname}
      ></DepartmentNavbar>
      <div className="background">
        <div className="container-content">
          <form className="row g-3 container-box" onSubmit={addMentor}>
            <div className="col-auto">
              <input
                type="text"
                className="form-control "
                placeholder="Enter professor Id"
                value={newMentor.profid}
                onChange={(e) => {
                  setnewMentor({ ...newMentor, profid: e.target.value });
                }}
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter professor Name"
                value={newMentor.name}
                onChange={(e) => {
                  setnewMentor({ ...newMentor, name: e.target.value });
                }}
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="email"
                className="form-control"
                placeholder="Enter professor email"
                value={newMentor.email}
                onChange={(e) => {
                  setnewMentor({ ...newMentor, email: e.target.value });
                }}
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter professor Password"
                value={newMentor.password}
                onChange={(e) => {
                  setnewMentor({ ...newMentor, password: e.target.value });
                }}
                required
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-dark mb-3">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      {showLoader ? (
        <Loader></Loader>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>

              <th scope="col">Professor</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {prof.map((elem) => {
              return (
                <tr key={elem.id}>
                  <th scope="row">{i++}</th>

                  <td scope="col">
                    <NavLink
                      to={`/DepartmentHome/${param.id}/${param.collegeCode}/${param.dname}/mentorprojectlist/${elem.id}`}
                      style={{ color: "black", textDecoration: "underline" }}
                    >
                      {elem.name}
                    </NavLink>
                  </td>
                  <td scope="col">{elem.email}</td>
                  <td scope="col"></td>
                  <td scope="col">
                    {" "}
                    <UpdateMentorInformation
                      id={elem.id}
                      name={elem.name}
                      profid={elem.profId}
                      email={elem.email}
                      getData={getData}
                    ></UpdateMentorInformation>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default DepartmentHome;
