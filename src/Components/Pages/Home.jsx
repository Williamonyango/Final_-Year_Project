import React, { use } from 'react'
import { useState, useRef, useEffect } from 'react';
// import './Home.css'
import logo from '../../assets/images/LOGO3.png'
const Home = () => {

  const [formData, setFormData] = useState({
    station: "",
    // operation: "",
    // location: "",
    engineer: "",
    workCarriedOut: "",
    DecralationA: "",
    DecralationB: ""
  });
  const textAreaRef = useRef(null); 


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto"; // Reset height
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Expand to fit content
    }
}, [formData.workCarriedOut]); // Runs when `message` changes


  const handleSubmit = (e) => {
    e.preventDefault();
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
            <label htmlFor="workCarriedOut">Work to be carried out:</label>
            <textarea
              ref={textAreaRef}
              // value={value}
              type="text"
              id="workCarriedOut"
              name="workCarriedOut"
              placeholder="Type here..."
              value={formData.workCarriedOut}
              onChange={handleChange}
              required

              style={{
                width: "100%",
                minHeight: "50px",
                resize: "none",
                overflow: "hidden",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>


          <div className="form">
            <label htmlFor = "DecralationA"> A <p>I hereby declare that it is safe to work within the following defined limits in the Proximity of Live  HV / MV Apparatus </p></label>
            <textarea
              ref={textAreaRef}
              type="text"
              id="DecralationA"
              name="DecralationA"
              placeholder="Type here..."
              value={formData.DecralationA}
              onChange={handleChange}
              required

              style={{
                width: "100%",
                minHeight: "50px",
                resize: "none",
                overflow: "hidden",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="form">
            <label htmlFor = "DecralationB"> B <p>I hereby declare that it is safe to work on the following H.V Apparatus which is switched out, isolated from all live conductors and is connected to Earth.</p></label>
            <textarea
              ref={textAreaRef}
              type="text"
              id="DecralationB"
              name="DecralationB"
              placeholder="Type here..."
              value={formData.DecralationB}
              onChange={handleChange}
              required

              style={{
                width: "100%",
                minHeight: "50px",
                resize: "none",
                overflow: "hidden",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
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


          {/* <div className="form">
            <label htmlFor="operation">Operation</label>
            <select id="operation" name="operation" value={formData.operation} onChange={handleChange} required>
              <option value="">Select Operation</option>
              <option value="maintenance">Maintenance</option>
              <option value="repair">Repair</option>
              <option value="shutdown">Shutdown</option>
              <option value="testing">Testing</option>
            </select>
          </div> */}


          {/* <div className="form">
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
          </div> */}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Home
