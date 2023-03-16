import React, { useState } from "react";
import data from "./data.json";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./App.css";


function App() {
  const [expandedDepartments,setExpandedDeparments]=useState([]);
  const [currentClass,setCurrentClass]=useState([]);
  const [currentBatch,setCurrentBatch]=useState([]);
  const [currentYear,setCurrentYear]=useState([])
  const [currentSemester,setCurrentSemester]=useState([])
  const rowdata = data.Department;
  const columndata = data.Year;
  //onclick functions for rows display
  const handleDepartmentClick =(departmentData)=>{
    if(expandedDepartments.includes(departmentData)){
     setExpandedDeparments(expandedDepartments.filter((item)=> item!==departmentData))
    }
    else{
      setExpandedDeparments(expandedDepartments.concat(departmentData))
     }
  }
  const handleClassClick=(classData)=>{
    if(currentClass.includes(classData)){
      setCurrentClass(currentClass.filter((item)=>item!==classData))
    }
    else{
      setCurrentClass(currentClass.concat(classData))
    }
  }
  const handleBatchClick=(batchData)=>{
    if(currentBatch.includes(batchData)){
      setCurrentBatch(currentBatch.filter((item)=>item!==batchData))
    }else{
      setCurrentBatch(currentBatch.concat(batchData))
    }
  }
  //render functions for expanded rows display
  const renderSubjectRows = (subjects) => {
    return (
      subjects.map((subject) => (
        <td>
          <div className="sub-column-heading">
            <div>{subject.values?.Written ? subject.values?.Written : 0}</div>
            <div>{subject.values?.Practical ? subject.values?.Practical : 0}</div>
            <div>{subject.values?.Oral ? subject.values?.Oral : 0}</div>
          </div>
        </td>
      ))
    )
  }

  const checkSubjectCondition=(semester)=>{
    // console.log(semester,currentColumns,currentSemester)
    return currentSemester.map((sem) => sem.value).includes(semester.value)
    // return false
   }
  const renderSemesterRows=(semesters)=>{
    return(
       semesters.map((semester) => (
        <>
        {checkSubjectCondition(semester) && renderSubjectRows(semester.Subject)}
        <td>
          <div className="sub-column-heading">
            <div>{semester.values?.Written ? semester.values?.Written: 0 }</div>
            <div>{semester.values?.Practical ? semester.values?.Practical : 0 }</div>
            <div>{semester.values?.Oral ? semester.values?.Oral: 0}</div>
          </div>
        </td>
        </>
      ))
    )
  }
  const renderStudentRows=(studentArray)=>{
    return studentArray?.map((record)=>{
      return(
       <>
        <tr>
          <td>{record.value}</td>
          {record.columns.Year.map((colYear) => (
            <>
            {currentYear.map((col) => col.value).includes(colYear.value) && renderSemesterRows(colYear.Semester)}
          <td>
            <div className="sub-column-heading">
                  <div>{colYear.values?.Written ? colYear.values.Written : 0 }</div>
                  <div>{colYear.values?.Practical ? colYear.values.Practical : 0}</div>
                  <div>{colYear.values?.Oral ? colYear.values.Oral : 0}</div>
            </div>
          </td>
          </>
           ))}
        </tr>
        </>
      )
    })

  }
  const renderBatchRows=(batchArray)=>{
    return batchArray?.map((record)=>{
      return(<>
      <tr>
        <td >{<ArrowRightIcon onClick={()=>{handleBatchClick(record)}}/>}<span>{record.value}</span></td>
        {record.columns.Year.map((colYear) => (
          <>
          {currentYear.map((col) => col.value).includes(colYear.value) && renderSemesterRows(colYear.Semester)}
          <td>
            <div className="sub-column-heading">
                  <div>{colYear.values?.Written ? colYear.values.Written : 0 }</div>
                  <div>{colYear.values?.Practical ? colYear.values.Practical : 0}</div>
                  <div>{colYear.values?.Oral ? colYear.values.Oral : 0}</div>
            </div>
          </td>
          </>
        ))}
      </tr>
      {currentBatch.includes(record) && renderStudentRows(record.Student)}
      </>)
    })
  }

  const renderClassRows=(classArray)=>{
     
       return classArray.map((record) => {
        return (
        <>
          <tr>
            <td>{<ArrowRightIcon onClick={()=>{handleClassClick(record)}}/>}<span>{record.value}</span></td>
            {record.columns.Year.map((colYear) => (
              <>
              {currentYear.map((col) => col.value).includes(colYear.value) && renderSemesterRows(colYear.Semester)}
              <td>
                <div className="sub-column-heading">
                  <div>{colYear.values?.Written ? colYear.values?.Written : 0}</div>
                  <div>{colYear.values?.Practical ? colYear.values?.Practical : 0 }</div>
                  <div>{colYear.values?.Oral ? colYear.values?.Oral : 0}</div>
                </div>
              </td>
              </>
              
            ))}
            
          </tr>
          {currentClass.includes(record) && renderBatchRows(record.Batch)}
        </>
           );
      })
  }
  //onclicks for columns section
  const handleYearClick=(columnyear)=>{
    if(currentYear.includes(columnyear)){
      setCurrentYear(currentYear.filter((item)=>item!==columnyear))
    }
    else{
      setCurrentYear(currentYear.concat(columnyear))
    }

  }
  const handleSemesterClick=(columnSemester)=>{
    if(currentSemester.includes(columnSemester)){
      setCurrentSemester(currentSemester.filter((item)=>item!==columnSemester))
    }
    else{
      setCurrentSemester(currentSemester.concat(columnSemester))
    }

  }
  const renderSubjectsColumns=(columnSubject)=>{
   return(
            columnSubject.map((subval)=>
              <th>
               <div>{subval.value}</div>
               <div className="sub-column-heading">
                           <div>Written</div>
                           <div>Practical</div>
                           <div>Oral</div>
              </div>
            </th>
            ) 
   )
}
const renderSemesterColumns=(semesterArray)=>{
  return (

    semesterArray.map((semval) =>
      <>
        {currentSemester.includes(semval) && renderSubjectsColumns(semval.Subject)}
        <th>
          <ArrowRightIcon onClick={() => { handleSemesterClick(semval) }} />
          {semval.value}
         <div className="sub-column-heading">
            <div>Written</div>
            <div>Practical</div>
            <div>Oral</div>
          </div>
        </th>
      </>
      )
  )
}

  
  return (
    <div className="App">
      <h1>Pivot Table</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            {columndata.map((coldata) => {
              return (
               <>
                  
                <th>
                  <ArrowRightIcon onClick={()=>{handleYearClick(coldata)}}/>
                  <span>{coldata.value}</span>
                 {/* coldata.Semester===currentColumns && */}
                      <div className="sub-column-heading">
                           <div>Written</div>
                           <div>Practical</div>
                           <div>Oral</div>
                      </div>
                      {currentYear.includes(coldata) && renderSemesterColumns(coldata.Semester)}
                </th>
                </>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rowdata.map((record) => {
            return (
            <>

              <tr>
                <td>{<ArrowRightIcon onClick={()=>{handleDepartmentClick(record)}}/>}<span className="departments-num">{record.value}</span></td>
                 {record.columns.Year.map((colYear) => (
                  //write the condition that we clicked the correct year
                  <>
                  {currentYear.map((col)=>col.value).includes(colYear.value) && renderSemesterRows(colYear.Semester)}
                  
                  <td>
                    <div className="sub-column-heading">
                      <div>{colYear.values.Written}</div>
                      <div>{colYear.values.Practical}</div>
                      <div>{colYear.values.Oral}</div>
                    </div>
                  </td>
                  </>
                ))}
                
              </tr>
               {expandedDepartments.includes(record) && renderClassRows(record.Class)}
            </>
               );
          })}
          
        </tbody>
      </table>
    </div>
  );
}

export default App;
