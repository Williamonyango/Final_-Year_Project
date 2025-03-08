import React from 'react'
import { useState } from 'react';
import './Home.css'
import logo from '../../assets/images/LOGO3.png'
const Home = () => {

  const [formData, setFormData] = useState({
    station: "",
    operation: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`Station: ${formData.station}, Operation: ${formData.operation}, Location: ${formData.location}`);
    console.log(formData);
  };


  return (
    <div className="home">
      <div className="home_hero">
        <img src={logo} alt="Logo" />
        <div className="hero">
          <h2>KENYA POWER <br /> <span>Lighting Company</span></h2>
        </div>
      </div>
      <div className="line"></div>

      <div className="body">
        <div className="title">
          <h1>Apply for a permit</h1>
          <div className="underline"></div>
        </div>

        <form onSubmit={handleSubmit} className='permit-form'>
          <div className="form">
            <label htmlFor="station">Issued to</label>
            <input
              type="text"
              id="engineer"
              name="engineer"
              placeholder="Engineer Name"
              value={formData.engineer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form">
            <label htmlFor="station">Station Number</label>
            <input
              type="text"
              id="station"
              name="station"
              placeholder="Station Number"
              value={formData.station}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form">
            <label htmlFor="operation">Operation</label>
            <select id="operation" name="operation" value={formData.operation} onChange={handleChange} required>
              <option value="">Select Operation</option>
              <option value="maintenance">Maintenance</option>
              <option value="repair">Repair</option>
              <option value="shutdown">Shutdown</option>
              <option value="testing">Testing</option>
            </select>
          </div>


          <div className="form">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Home
