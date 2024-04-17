import React from 'react'
import { Link } from 'react-router-dom';

const Profiles = () => {
    const data = JSON.parse(localStorage.getItem("data")) || [];
  return (
    <div className='container'>
    <h1 className='text-center  mt-2'>User Records</h1>
        
   
    <table className="table table-bordered mt-5 mx-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>DOB</th>
            <th>CITY</th>
            <th>DISTRICT</th>
            <th>Province</th>
            <th>Country</th>
            <th>Profile</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone_number}</td>
              <td>{data.dob}</td>
              <td>{data.address.city}</td>
              <td>{data.address.district}</td>
              <td>{data.address.province}</td>
              <td>{data.address.country}</td>
              <td>
                <img
                  src={data.image}
                  alt="Profile"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
    <button className="btn btn-primary "><Link to="/" className='link-light '>Home</Link></button>
    </div>
  )
}

export default Profiles