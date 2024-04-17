import React, { useState, useEffect } from "react";


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
    
    const reader = new FileReader(); // FileReader to read file as data URL
    const imageFile = form.image.files[0];
  
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
    <div>
      {loading ? (
        <p>Loading countries...</p>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        
          <label htmlFor="Name">Name: </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={editing ? formData[editIndex].name : ""}
          />
          <br />
          <label htmlFor="Email">Email: </label>
          <input
            type="email"
            name="email"
            required
            defaultValue={editing ? formData[editIndex].email : ""}
          />
          <br />
          <label htmlFor="Number">Phone Number: </label>
          <input
            type="text"
            name="phoneNumber"
            required
            pattern=".{7,10}"
            title="Phone number must be between 7 and 10 characters"
            defaultValue={editing ? formData[editIndex].phone_number : ""}
          />
          <br />
          <label htmlFor="dob">DOB: </label>
          <input
            type="date"
            name="dob"
            defaultValue={editing ? formData[editIndex].dob : ""}
          />
          <br />
          <label htmlFor="Address">Address: </label>
          <label htmlFor="city">City: </label>
          <input
            type="text"
            name="city"
            defaultValue={editing ? formData[editIndex].address.city : ""}
          />
          <br />
          <label htmlFor="district">District: </label>
          <input
            type="text"
            name="district"
            defaultValue={editing ? formData[editIndex].address.district : ""}
          />
          <br />
          <label htmlFor="Province">Province: </label>
          <select name="province" id="province">
            <option value="Koshi">1</option>
            <option value="Madhesh">2</option>
            <option value="Bagmati">3</option>
            <option value="Gandaki">4</option>
            <option value="Lumbini">5</option>
            <option value="Karnali">6</option>
            <option value="Sudur Paschim">7</option>
          </select>
          <label htmlFor="country">Country: </label>
          <select name="country" id="country">
            {countries.map((country, index) => (
              <option key={index} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="image">Profile Picture</label>
          <input type="file" name="image" accept=".png" />
          <br />
          <button type="submit">{editing ? "Update" : "POST"}</button>
  </form>
      )}

      <table border={2}>
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
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </td>
                <td>
                  <button onClick={() => handleUpdate(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <ul>
 
          {numbers.map((n, i) => (
            <li key={i} className={`page-item ${currentPage === n ? "active" : ""}`}>
              <a href="#" onClick={() => changePage(n)}>
                {n}
              </a>
            </li>
          ))}
   
        </ul>
      </div>
    </div>
  );
};

export default Form;
