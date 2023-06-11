import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const LoginForm = () => {
  // localStorage.removeItem('auth')
  // localStorage.removeItem('JToken')
  // const {info} = useAuth();
 
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    collegeCode: "",
    email: "",
    password: "",
    desgination: "",
  });

  const [error, setError] = useState("");
const [show,setShow] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setShow(false);
    const response = await fetch(
      `http://localhost:5000/login/${loginInfo.collegeCode}/${loginInfo.email}/${loginInfo.password}/${loginInfo.desgination}`
    );

    const data = await response.json();
 
    if (data.length !== 0) {
      //    info.auth=true
      //    localStorage.setItem("JToken", data.JToken);
      // localStorage.setItem('auth',true)
      // userInformation.setdata(data)
      if (loginInfo.desgination === "College Admin")
        navigate(`/AdminHome/${data[0].id}/${data[0].collegeCode}`);
      else if (loginInfo.desgination === "HOD")
        navigate(
          `/DepartmentHome/${data[0].id}/${data[0].collegeCode}/${data[0].dname}`
        );
      else if (loginInfo.desgination === "Professor")
        navigate(`/MentorHome/${data[0].id}/${data[0].collegeCode}/${data[0].dname}`);
      else
      navigate(`/StudentHome/${data[0].id}/${data[0].collegeCode}/${data[0].dname}`)
    } else {
      setError("Details Not Exist");
      setShow(true);
    }
  };

  return (
    <>
      <div className="container">
      
      </div>

      <div className="form">
        <div style={{ color: "red" }}>
          <h3>{error}</h3>
        </div>
        <form onSubmit={login}>
        <div className="mb-3 ">
              <label className="form-label">Desgination</label>
              <select
                className="form-select"
                value={loginInfo.desgination}
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, desgination: e.target.value });
                }}
                required
              >
                <option defaultValue value="">Choose Your Desgination</option>
                <option>Student</option>
                <option>Professor</option>
                <option>HOD</option>
                <option>College Admin</option>
              </select>
            </div>
          <div className="contact-box  ">
            <div className="mb-3 ">
              <label className="form-label">College Code</label>
              <input
                type="name"
                className="form-control required"
                placeholder="Enter Your College Code"
                required
                value={loginInfo.collegeCode}
                autoComplete="current-password"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, collegeCode: e.target.value });
                }}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control required"
                id="email"
                placeholder="Enter your Registered email "
                required
                value={loginInfo.email}
                autoComplete="current-password"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, email: e.target.value });
                }}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control required"
                placeholder="Enter your Password "
                required
                value={loginInfo.password}
                autoComplete="current-password"
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
              />
            </div>
           <div className="forgot-container">

            <button type="submit" className="btn btn-dark toggle-disabled login-btn">
              Login
            </button>
             { show? <NavLink to='/forgot_password' className="forgot-password">Forgot Password?</NavLink> :""}
           </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
