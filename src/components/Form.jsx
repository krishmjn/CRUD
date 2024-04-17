import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Form = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState(() => {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    return data;
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountries(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(formData));
  }, [formData]);

  const handleUpdate = (index) => {
    setEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = formData.filter((elem, ind) => ind !== index);
    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const imageFile = form.image.files[0];

    // Check if an image file is selected or not
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const formDataObject = {
        name: form.name.value,
        email: form.email.value,
        phone_number: form.phoneNumber.value,
        dob: form.dob.value,
        address: {
          city: form.city.value,
          district: form.district.value,
          province: form.province.value,
          country: form.country.value,
        },
        image: reader.result, // Base64 encoded image data
      };
  
      if (editing) {
        const updatedFormData = [...formData];
        updatedFormData[editIndex] = formDataObject;
        setFormData(updatedFormData);
        setEditing(false);
      } else {
        setFormData([...formData, formDataObject]);
      }
  
      form.reset();
    };
  
    // Read the image file as data URL
    reader.readAsDataURL(imageFile);
  };
  
  const totalPages = Math.ceil(formData.length / recordsPerPage);
  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const dataToShow = formData.slice(firstIndex, lastIndex);

 

  const changePage = (page) => {
    setCurrentPage(page);
  };



  return (
    <div className="container w-100">
    <h1 className="text-center mt-3">User Registration Form</h1>
      {loading ? (
        <p>Loading countries...</p>
      ) : (
        
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-5 mx-auto">
  <div className="row">
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="Name" className="form-label">Name: </label>
        <input
          type="text"
          name="name"
          className="form-control"
          required
          pattern="[A-Za-z\s]{1,}"
          title="Please enter a valid name (only alphabets and spaces are allowed)"
          defaultValue={editing ? formData[editIndex].name : ""}
        />
      </div>
    </div>
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="Email" className="form-label">Email: </label>
        <input
          type="email"
          name="email"
          className="form-control"
          pattern="[a-zA-Z0-9]+@[a-z]+\.[a-zA-Z]{2,}"
        title="Please enter a valid email address"
          required
          defaultValue={editing ? formData[editIndex].email : ""}
        />
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="Number" className="form-label">Phone Number: </label>
        <input
          type="text"
          name="phoneNumber"
          className="form-control"
          required
          pattern="[0-9]{7,10}"
          title="Phone number must be between 7 and 10 characters"
          defaultValue={editing ? formData[editIndex].phone_number : ""}
        />
      </div>
    </div>
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="dob" className="form-label">DOB: </label>
        <input
          type="date"
          name="dob"
          className="form-control"
          max={new Date().toISOString().split('T')[0]}
          defaultValue={editing ? formData[editIndex].dob : ""}
        />
      </div>
    </div>
  </div>
  <label htmlFor="Address" className="form-label h5">Address: </label><br />


  <div className="row">
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="city" className="form-label">City: </label>
        <input
          type="text"
          name="city"
          className="form-control"
          defaultValue={editing ? formData[editIndex].address.city : ""}
        />
      </div>
    </div>
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="district" className="form-label">District: </label>
        <input
          type="text"
          name="district"
          className="form-control"
          defaultValue={editing ? formData[editIndex].address.district : ""}
        />
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="Province" className="form-label">Province: </label>
        <select name="province" id="province" className="form-select">
          <option value="Koshi">1</option>
          <option value="Madhesh">2</option>
          <option value="Bagmati">3</option>
          <option value="Gandaki">4</option>
          <option value="Lumbini">5</option>
          <option value="Karnali">6</option>
          <option value="Sudur Paschim">7</option>
        </select>
      </div>
    </div>
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="country" className="form-label">Country: </label>
        <select name="country" id="country" className="form-select">
          {countries.map((country, index) => (
            <option key={index} value={country.name.common}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Profile Picture</label>
        <input type="file" name="image" accept=".png" className="form-control" />
      </div>
    </div>
  </div>

  <button type="submit" className="btn btn-primary">{editing ? "Update" : "POST"}</button>
</form>

      )}
      

      <table className="table table-bordered mt-4">
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((data, index) => (
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
                  style={{ maxWidth: "60px", maxHeight: "60px" }}
                />
              </td>
              <td className="d-flex justify-content-between">
                <button onClick={() => handleUpdate(index)} className="btn btn-sm btn-primary mx-1 ">Edit</button>
                <button onClick={() => handleDelete(index)} className="btn btn-sm btn-danger mx-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <ul className="list-unstyled d-flex">
          {numbers.map((n, i) => (
            <li key={i} className={`page-item ${currentPage === n ? "active" : ""}`}>
              <a href="#" onClick={() => changePage(n)} className="page-link">
                {n}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-primary"><Link to={"profiles"} className="link-light">Profiles</Link></button>

    </div>
  );
};

export default Form;
