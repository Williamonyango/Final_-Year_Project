import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import logo from '../../assets/images/LOGO3.png';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    permitNumber: 'LLA 25',
    issuedTo: '',
    workDescription: '',
    workDetails: ['', '', ''],
    mvlvEquipment: '',
    earthPoints: ['', '', ''],
    additionalEarthConnections: '',
    consentPerson: '',
    issueDate: '',
    issueTime: '',
    receiptSignature: '',
    receiptDate: '',
    receiptTime: '',
    clearanceSignature: '',
    clearanceDate: '',
    clearanceTime: '',
    cancellationEarthConnections: '',
    cancellationConsentPerson: '',
    cancellationSignature: ''
  });

  useEffect(() => {
    // Apply styles when component mounts
    document.body.style.backgroundColor = "#f8f9fa";
    document.body.style.color = "#333";
    document.body.style.marginTop = "90px";
    return () => {
      // Reset styles when component unmounts
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.marginTop = "";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server
    alert("Permit form submitted successfully!");
  };

  return (
    <>
        <div className="nav">
          <img src={logo} alt="LOGO" />
          <div className="h1_container">
            <h1>KENYA POWER </h1>
            <h2>and LIGHTING COMPANY</h2>
          </div>
        </div>
      

      <form onSubmit={handleSubmit} className="permit-form">
        <div className="form-header">
          <div className="company-info">
            <h2>The Kenya Power and Lighting Co. Ltd.</h2>
            <p>OTHER RELEVANT<br />PERMIT NUMBERS</p>
          </div>
        </div>

        <div className="permit-number">
          <p>No.
            <input
              type="text"
              name="permitNumber"
              value={formData.permitNumber}
              onChange={handleChange}
            />
          </p>
        </div>

        <div className="form-title">
          <h1>Electrical Permit to Work</h1>
        </div>

        <div className="section issue-section">
          <p className="section-title">1. ISSUE</p>
          <p>To
            <input
              type="text"
              name="issuedTo"
              value={formData.issuedTo}
              onChange={handleChange}
              placeholder="Name of person"
            />
          </p>
          <p>For the following work to be carried out:-</p>
          {formData.workDetails.map((detail, index) => (
            <div key={index} className="work-detail">
              <input
                type="text"
                value={detail}
                onChange={(e) => handleArrayChange(e, 'workDetails', index)}
                placeholder={`Work detail ${index + 1}`}
              />
            </div>
          ))}

          <div className="declaration-box">
            <div className="declaration">
              <div className="declaration-text">
                <p>A.</p>
                <p>I hereby declare that it is safe to work within the following defined limits in the Proximity of Live HV / MV Apparatus.</p>
              </div>
              <div className="declaration-field">
                <div className="bracket">&#125;</div>
                <div className="field-container">
                  <textarea
                    name="safeWorkLimits"
                    rows="2"
                    placeholder="Define safe work limits"
                  ></textarea>
                </div>
              </div>
            </div>
            <p className="warning">ALL OTHER PARTS ARE DANGEROUS</p>
          </div>

          <div className="declaration-box">
            <div className="declaration">
              <div className="declaration-text">
                <p>B.</p>
                <p>I hereby declare that it is safe to work on the following H.V. Apparatus which is switched out, isolated from all live conductors and is connected to Earth.</p>
              </div>
              <div className="declaration-field">
                <div className="bracket">&#125;</div>
                <div className="field-container">
                  <textarea
                    name="safeHVApparatus"
                    rows="2"
                    placeholder="Define safe H.V. apparatus"
                  ></textarea>
                </div>
              </div>
            </div>
            <p className="warning">ALL OTHER PARTS ARE DANGEROUS</p>
          </div>

          <div className="equipment-field">
            <p>MV/LV Equipment isolated and earthed
              <input
                type="text"
                name="mvlvEquipment"
                value={formData.mvlvEquipment}
                onChange={handleChange}
              />
            </p>
          </div>

          <div className="declaration-box">
            <div className="declaration">
              <div className="declaration-text">
                <p>Circuit Main Earths have been at the following points</p>
              </div>
              <div className="declaration-field">
                <div className="bracket">&#125;</div>
                <div className="field-container">
                  {formData.earthPoints.map((point, index) => (
                    <input
                      key={index}
                      type="text"
                      value={point}
                      onChange={(e) => handleArrayChange(e, 'earthPoints', index)}
                      placeholder={`Earth point ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="additional-info">
            <p>No. of additional earth connections issue
              <input
                type="text"
                name="additionalEarthConnections"
                value={formData.additionalEarthConnections}
                onChange={handleChange}
              />
            </p>
            <div className="consent">
              <p>Issued with the consent of
                <input
                  type="text"
                  name="consentPerson"
                  value={formData.consentPerson}
                  onChange={handleChange}
                />
              </p>
              <p className="engineer">System Control Engineer.</p>
            </div>
            <div className="signature-line">
              <div>
                <p>Signed
                  <input
                    type="text"
                    name="issueSignature"
                  />
                </p>
                <p className="role">being an Authorised Person.</p>
              </div>
            </div>

            <div className="datetime">
              <div>
                <p>Time
                  <input
                    type="time"
                    name="issueTime"
                    value={formData.issueTime}
                    onChange={handleChange}
                    className="highlighted"
                  />
                  Hrs.
                </p>
              </div>
              <div>
                <p>Date
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    className="highlighted"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section receipt-section">
          <p className="section-title">2. RECEIPT</p>
          <p className="declaration-text">I hereby declare that I accept responsibility for carrying out the work on the Apparatus detailed on this Permit, and that no attempt will be made by me, or by any man under my control, to carry out work on any other apparatus.</p>

          <div className="signature-line">
            <div>
              <p>Signed
                <input
                  type="text"
                  name="receiptSignature"
                  value={formData.receiptSignature}
                  onChange={handleChange}
                />
              </p>
              <p className="role">being the Person in Charge of the Work.</p>
            </div>
          </div>

          <div className="datetime">
            <div>
              <p>Time
                <input
                  type="time"
                  name="receiptTime"
                  value={formData.receiptTime}
                  onChange={handleChange}
                />
                Hrs.
              </p>
            </div>
            <div>
              <p>Date
                <input
                  type="date"
                  name="receiptDate"
                  value={formData.receiptDate}
                  onChange={handleChange}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="section clearance-section">
          <p className="section-title">3. CLEARANCE</p>
          <p className="declaration-text">I hereby declare that all men under my charge have been withdrawn and warned that it is NO LONGER SAFE to work on the apparatus specified on the P.T.W. and that all gear, tool and ADDITIONAL EARTH CONNECTION are clear and have been checked in.</p>

          <div className="signature-line">
            <div>
              <p>Signed
                <input
                  type="text"
                  name="clearanceSignature"
                  value={formData.clearanceSignature}
                  onChange={handleChange}
                />
              </p>
              <p className="role">being the Person in Charge of the Work.</p>
            </div>
          </div>

          <div className="datetime">
            <div>
              <p>Time
                <input
                  type="time"
                  name="clearanceTime"
                  value={formData.clearanceTime}
                  onChange={handleChange}
                  className="highlighted"
                />
                Hrs.
              </p>
            </div>
            <div>
              <p>Date
                <input
                  type="date"
                  name="clearanceDate"
                  value={formData.clearanceDate}
                  onChange={handleChange}
                  className="highlighted"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="section cancellation-section">
          <p className="section-title">4. CANCELLATION</p>
          <p className="declaration-text">I hereby declare that I have checked in
            <input
              type="text"
              name="cancellationEarthConnections"
              value={formData.cancellationEarthConnections}
              onChange={handleChange}
            />
            additional Earth Connections and that with the Consent of
            <input
              type="text"
              name="cancellationConsentPerson"
              value={formData.cancellationConsentPerson}
              onChange={handleChange}
            />
            System Control Engineer, this Permit and all copies are cancelled.
          </p>

          <div className="signature-line">
            <p>Signed
              <input
                type="text"
                name="cancellationSignature"
                value={formData.cancellationSignature}
                onChange={handleChange}
              />
            </p>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit">Submit Permit Form</button>
        </div>
      </form>
    </>
  );
};

export default LandingPage;