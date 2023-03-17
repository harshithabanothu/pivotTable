import React, { useState } from "react";
import data from "./data.json";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./App.css";


function App() {
  const [expandedDepartments,setExpandedDeparments]=useState([]);
  const [expandedClasses,setexpandedClasses]=useState([]);
  const [expandedBatches,setexpandedBatches]=useState([]);
  const [expandedYears,setexpandedYears]=useState([])
  const [expandedSemesters,setexpandedSemesters]=useState([])
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
    if(expandedClasses.includes(classData)){
      setexpandedClasses(expandedClasses.filter((item)=>item!==classData))
    }
    else{
      setexpandedClasses(expandedClasses.concat(classData))
    }
  }

  const handleBatchClick=(batchData)=>{
    if(expandedBatches.includes(batchData)){
      setexpandedBatches(expandedBatches.filter((item)=>item!==batchData))
    }else{
      setexpandedBatches(expandedBatches.concat(batchData))
    }
  }

  const renderValues = (values) => {
    return <div className="sub-column-heading">
      <div>{values?.Written || 0}</div>
      <div>{values?.Practical || 0}</div>
      <div className="border-none">{values?.Oral || 0}</div>
    </div>
  }

  //render functions for expanded rows display
  const renderSubjectRows = (subjects) => {
    return (
      subjects.map((subject) => (
        <td>
          {renderValues(subject.values)}
        </td>
      ))
    )
  }

  const checkSubjectCondition=(semester,year)=>{
    const filteredYear = expandedYears.filter((yearData)=>yearData.value === year)[0].Semester
    const filteredArray = expandedSemesters.filter(value => filteredYear.includes(value));
    return filteredArray.map((sem) => sem.value).includes(semester.value)
   }

  const renderSemesterRows=(year)=>{
    const semesters=year.Semester
    return(
       semesters.map((semester) => (
        <>
        {checkSubjectCondition(semester,year.value) && renderSubjectRows(semester.Subject)}
        <td>
        {renderValues(semester.values)}
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
            {expandedYears.map((col) => col.value).includes(colYear.value) && renderSemesterRows(colYear)}
          <td>
          {renderValues(colYear.values)}
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
        <td >{expandedBatches.includes(record) ? <ArrowDropDownIcon onClick={()=>{handleBatchClick(record)}}/>:<ArrowRightIcon onClick={()=>{handleBatchClick(record)}}/>}<span>{record.value}</span></td>
        {record.columns.Year.map((colYear) => (
          <>
          {expandedYears.map((col) => col.value).includes(colYear.value) && renderSemesterRows(colYear)}
          <td>
          {renderValues(colYear.values)}
          </td>
          </>
        ))}
      </tr>
      {expandedBatches.includes(record) && renderStudentRows(record.Student)}
      </>)
    })
  }

  const renderClassRows=(classArray)=>{
     
       return classArray.map((record) => {
        return (
        <>
          <tr>
            <td>
              <div>
                {expandedClasses.includes(record) ? <ArrowDropDownIcon onClick={()=>{handleClassClick(record)}}/>:<ArrowRightIcon onClick={()=>{handleClassClick(record)}}/>}
                <span>{record.value}</span>
             </div>
            </td>
            {record.columns.Year.map((colYear) => (
              <>
                  {expandedYears.map((col) => col.value).includes(colYear.value) && renderSemesterRows(colYear)}
                  <td>
                     {renderValues(colYear.values)}
                  </td>
              </>
            ))}
            
          </tr>
          {expandedClasses.includes(record) && renderBatchRows(record.Batch)}
        </>
           );
      })
  }
  //onclicks for columns section
  const handleYearClick=(columnyear)=>{
    if(expandedYears.includes(columnyear)){
      setexpandedYears(expandedYears.filter((item)=>item!==columnyear))
    }
    else{
      setexpandedYears(expandedYears.concat(columnyear))
    }

  }
  const handleSemesterClick=(columnSemester)=>{
    if(expandedSemesters.includes(columnSemester)){
      setexpandedSemesters(expandedSemesters.filter((item)=>item!==columnSemester))
    }
    else{
      setexpandedSemesters(expandedSemesters.concat(columnSemester))
    }

  }
  const renderSubjectsColumns=(semesterData)=>{
    const subjectArray=semesterData.Subject
    const semester=semesterData.value
   return(
           <th colSpan={subjectArray.length}> 
           <ArrowDropDownIcon onClick={()=>{handleSemesterClick(semesterData)}}/><span>{semester}</span>
           {subjectArray.map((subval)=>
              <th>
               <div>{subval.value}</div>
               <div className="sub-column-heading">
                           <div>Written</div>
                           <div>Practical</div>
                           <div className="border-none">Oral</div>
              </div>
            </th>
            )} 
            </th>
   )
}
const renderSemesterColumns=(yearData)=>{
  const semesterArray=yearData.Semester
  const year=yearData.value
  const colSpanValue = expandedYears.filter((year)=>year.value === yearData.value)[0].Semester
  const filteredArray = expandedSemesters.filter(value => colSpanValue.includes(value));
  return (
    <th colSpan={semesterArray.length+filteredArray.length *3}>

      <ArrowDropDownIcon onClick={()=>{handleYearClick(yearData)}}/><span>{year}</span>

      <div className="flex">{semesterArray.map((semval) =>
        <>
          {expandedSemesters.includes(semval) && renderSubjectsColumns(semval)}
          <th>
            <div className="flex">
               {expandedSemesters.includes(semval) ? <ArrowDropDownIcon onClick={()=>{handleSemesterClick(semval)}}/>:<ArrowRightIcon onClick={() => { handleSemesterClick(semval) }} />}
               <span>{semval.value}</span>
            </div>
            <div className="sub-column-heading">
              <div>Written</div>
              <div>Practical</div>
              <div className="border-none">Oral</div>
              </div>
            </th>
          </>)}</div></th>
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
                   {expandedYears.includes(coldata) && renderSemesterColumns(coldata)}
                <th>
                  <div className="flex">
                      {expandedYears.includes(coldata) ? <ArrowDropDownIcon onClick={()=>{handleYearClick(coldata)}}/>:<ArrowRightIcon onClick={()=>{handleYearClick(coldata)}}/>}
                      <span>{coldata.value}</span>
                  </div>
                 {/* coldata.Semester===currentColumns && */}
                      <div className="sub-column-heading">
                           <div>Written</div>
                           <div>Practical</div>
                           <div className="border-none">Oral</div>
                      </div>
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
                <td>
                  <div className="flex">
                     {expandedDepartments.includes(record) ?<ArrowDropDownIcon onClick={()=>{handleDepartmentClick(record)}}/>:<ArrowRightIcon onClick={()=>{handleDepartmentClick(record)}}/>}
                     <span>{record.value}</span>
                  </div>
                  </td>
                  {record.columns.Year.map((colYear) => (
                  // condition that we clicked the correct year
                  <>
                  {expandedYears.map((col)=>col.value).includes(colYear.value) && renderSemesterRows(colYear)}
                  
                  <td>
                     {renderValues(colYear.values)}
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
