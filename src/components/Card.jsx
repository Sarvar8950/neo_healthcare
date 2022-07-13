import React from 'react'

export default function Card({ details, setcount, setnotesdata }) {

  function deletebtn(id) {
    fetch(`http://localhost:3001/notes/${id}`, {
      method: "DELETE"
    })
      .then(() => alert("Card deleted succesfully"))
    setcount(1)
  }
  function togglebtn(id) {
    fetch(`http://localhost:3001/notes/${id}`, {
      method: "PATCH",
      data: {
        "timer": "0",
        "status": "completed"
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })
    setcount(1)
  }

  return (
    <div className='cardbox' key={details._id}>
      <p>Subject : {details.name} </p>
      <p>Details : {details.description} </p>
      <button className='deletebtn' onClick={() => deletebtn(details.id)}>Delete</button>
      <button className={`${details.status}`} onClick={() => togglebtn(details.id)}>{details.status === "pending" ? "Pending" : details.status === "completed" ? "Completed" : "Failed"}</button>
    </div>
  )
}
