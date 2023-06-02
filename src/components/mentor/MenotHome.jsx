import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { v4 as uuid } from 'uuid';
import MentorNavbar from './MentorNavbar';
import ProjectDetaials from '../ProjectDetails'
const MentorHome = () => {
    const param = useParams();
    var row = 1;
    
const[project,setProject] = useState([])
const [listProject,setListProject]= useState([])
const [filter,setFilter] = useState('')



const getProject=async()=>{
  const respone = await fetch(`http://localhost:5000/getprojectlist/mentor/${param.id}`,
  {
        headers:{
          JToken:localStorage.getItem('JToken')
        }});
  const data = await respone.json();
  setProject(data)
  setListProject(data)
      }
useEffect(()=>{
  getProject()
},[])



useEffect(()=>{
  if(filter!= ''){
    setListProject( project.filter((elem) => elem.status == filter)
    )
  }
else setListProject(project)
},[filter])


    return (<>
   

   <MentorNavbar id={param.id} collegeCode={param.collegeCode} dname={param.dname}></MentorNavbar>
    
  
  <div className='background'>

  <div className='container-content'>

  <ul className=' row g-3 container-box'  type='none'>
  <li className='col-auto' ><button  className="btn btn-dark mb-3" onClick={()=>{
    setFilter('pending')
  }}>Pending Project</button></li>
  <li className='col-auto'> <button  className="btn btn-dark mb-3" onClick={()=>{
    setFilter('In Progess')
  }}>In Progess Project</button></li>

  <li className='col-auto'><button  className="btn btn-dark mb-3" onClick={()=>{
    setFilter('Rejected')
  }}>Rejected Project</button></li>

  <li className='col-auto'><button  className="btn btn-dark mb-3" onClick={()=>{
    setFilter('Finalized')
  }}>Finalized Project</button></li>


  <li className='col-auto'><button  className="btn btn-dark mb-3" onClick={()=>{
    setFilter('')
  }}>All Project</button></li>
</ul>



  </div>
  </div>
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">PROJECT NAME</th>
        <th scope='col'>Project discreption</th>
        <th scope='col'>Status</th>
        
      </tr>
    </thead>
    <tbody> 
    {listProject.map(elem=>{

   return(
      <tr key={uuid()}>
        <td scope="row" >{row++}</td>
      
        <td scope="col">{elem.projectName}</td>
        <td scope="col">{elem.description}</td>
        <td scope="col">{elem.status}</td>

        {/* {(condition.message === 'Finalized')?<td scope="col">{condition.message}</td>:<></>}
        {(condition.message === 'Rejected')? <td scope="col">{elem.reason}</td>:<></>}
        {/* {(condition.thead === 'New request')? <><td scope='col'><button  className="btn btn-dark mb-3" onClick={()=>{acceptProject(elem.pid)}} >Accept</button></td>
        <td scope='col'><RejectModal pid={elem.pid} getProject={getProject}></RejectModal></td></>:<></>} 
       {/* {(condition.message === 'In Progess')?<><td scope='col'><button  className="btn btn-dark mb-3" onClick={()=>{finalizeCondition(elem.pid)}} >Finalize</button></td></>:<></>} */}
      <td> <ProjectDetaials info={{...elem}} from='mentor'></ProjectDetaials> 
      </td>
      </tr>
    )
  })}
  
      
    </tbody>
  </table>
    </>
    )
}

export default MentorHome