
import React, { useState, useEffect } from 'react';
import './Home.css';
import logo from '../assets/LOGO3.png';

const Home = () => {
    // State for pending permit applications
    const [pendingPermits, setPendingPermits] = useState([]);
    // State for selected permit to review
    const [selectedPermit, setSelectedPermit] = useState(null);
    // State for approval/rejection form
    const [approvalForm, setApprovalForm] = useState({
        status: '',
        comments: '',
        approverName: '',
        approvalDate: '',
        approvalTime: '',
    });
    // State for history of processed permits
    const [processedPermits, setProcessedPermits] = useState([]);
    // Toggle between pending and history views
    const [viewMode, setViewMode] = useState('pending');

    useEffect(() => {
        // This would be replaced with an actual API call to fetch pending permits
        fetchMockPendingPermits();

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

    // Mock function to simulate fetching permits from a backend
    const fetchMockPendingPermits = () => {
        // Sample data that would come from the form we saw earlier
        const mockData = [
            {
                id: "PTW-2025-001",
                permitNumber: 'LLA 25',
                issuedTo: 'John Doe',
                workDescription: 'Transformer maintenance',
                workDetails: ['Replace damaged insulator', 'Check oil levels', 'Test protective relays'],
                mvlvEquipment: 'Substation A - Transformer 3',
                earthPoints: ['Tower 45', 'Junction Box 12', 'Substation ground grid'],
                additionalEarthConnections: '2',
                consentPerson: 'Pending',
                issueDate: '2025-03-12',
                issueTime: '08:30',
                submittedAt: '2025-03-12T08:35:00',
                urgency: 'high'
            },
            {
                id: "PTW-2025-002",
                permitNumber: 'LLA 26',
                issuedTo: 'Jane Smith',
                workDescription: 'Line repair',
                workDetails: ['Fix broken conductor', 'Replace damaged crossarm', 'Check line tension'],
                mvlvEquipment: 'Line L22 - Section 3',
                earthPoints: ['Tower 67', 'Tower 68', 'Ground connection at switch S45'],
                additionalEarthConnections: '3',
                consentPerson: 'Pending',
                issueDate: '2025-03-13',
                issueTime: '09:15',
                submittedAt: '2025-03-12T14:20:00',
                urgency: 'medium'
            },
            {
                id: "PTW-2025-003",
                permitNumber: 'LLA 27',
                issuedTo: 'Michael Johnson',
                workDescription: 'Circuit breaker maintenance',
                workDetails: ['Replace worn contacts', 'Check operation mechanism', 'Test trip functionality'],
                mvlvEquipment: 'Substation B - Bay 4 - CB 11',
                earthPoints: ['Main busbar', 'Outgoing feeder terminal', 'Ground bus'],
                additionalEarthConnections: '2',
                consentPerson: 'Pending',
                issueDate: '2025-03-14',
                issueTime: '07:45',
                submittedAt: '2025-03-12T16:05:00',
                urgency: 'low'
            }
        ];

        setPendingPermits(mockData);

        // Mock processed permits for history view
        const mockProcessed = [
            {
                id: "PTW-2025-000",
                permitNumber: 'LLA 24',
                issuedTo: 'Samuel Kamau',
                workDescription: 'Distribution panel upgrade',
                workDetails: ['Replace fuses', 'Install new isolator switch', 'Update panel labels'],
                mvlvEquipment: 'Distribution Board DB-14',
                earthPoints: ['Main ground terminal', 'Panel chassis', 'Incoming neutral'],
                additionalEarthConnections: '1',
                consentPerson: 'James Omondi',
                issueDate: '2025-03-10',
                issueTime: '10:00',
                status: 'approved',
                comments: 'Work is necessary and all safety protocols are in place',
                approverName: 'James Omondi',
                approvalDate: '2025-03-10',
                approvalTime: '11:30',
                submittedAt: '2025-03-10T09:15:00'
            },
            {
                id: "PTW-2025-999",
                permitNumber: 'LLA 23',
                issuedTo: 'Elizabeth Wanjiru',
                workDescription: 'Cable fault repair',
                workDetails: ['Locate underground fault', 'Replace damaged section', 'Test continuity'],
                mvlvEquipment: 'Feeder F18 - Underground section',
                earthPoints: ['Terminal box A', 'Terminal box B', 'None'],
                additionalEarthConnections: '0',
                consentPerson: 'James Omondi',
                issueDate: '2025-03-09',
                issueTime: '14:15',
                status: 'rejected',
                comments: 'Insufficient isolation details. Please resubmit with complete earth point information.',
                approverName: 'James Omondi',
                approvalDate: '2025-03-09',
                approvalTime: '15:45',
                submittedAt: '2025-03-09T13:20:00'
            }
        ];

        setProcessedPermits(mockProcessed);
    };

    const handleSelectPermit = (permit) => {
        setSelectedPermit(permit);
        // Initialize approval form with current date and time
        const now = new Date();
        setApprovalForm({
            status: '',
            comments: '',
            approverName: '',
            approvalDate: now.toISOString().split('T')[0],
            approvalTime: now.toTimeString().substring(0, 5)
        });
    };

    const handleApprovalChange = (e) => {
        const { name, value } = e.target;
        setApprovalForm(prev => ({ ...prev, [name]: value }));
    };

    const handlePermitAction = (action) => {
        if (!approvalForm.approverName) {
            alert("Please enter your name as the approver");
            return;
        }

        // Create updated permit with approval/rejection info
        const updatedPermit = {
            ...selectedPermit,
            status: action,
            comments: approvalForm.comments,
            approverName: approvalForm.approverName,
            approvalDate: approvalForm.approvalDate,
            approvalTime: approvalForm.approvalTime,
            consentPerson: approvalForm.approverName
        };

        // In a real application, this would make an API call to update the permit status
        console.log("Updating permit:", updatedPermit);

        // Update our local state
        // Remove from pending permits
        setPendingPermits(prev => prev.filter(p => p.id !== selectedPermit.id));
        // Add to processed permits
        setProcessedPermits(prev => [updatedPermit, ...prev]);

        // Clear selection
        setSelectedPermit(null);

        // Show confirmation
        alert(`Permit ${selectedPermit.permitNumber} has been ${action === 'approved' ? 'approved' : 'rejected'}.`);
    };

    // Format the time from submission to now (for pending permits)
    const formatTimeAgo = (dateString) => {
        const submitted = new Date(dateString);
        const now = new Date();
        const diffMs = now - submitted;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 60) {
            return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        } else {
            const diffHrs = Math.floor(diffMins / 60);
            return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ago`;
        }
    };

    // Get urgency class for styling
    const getUrgencyClass = (urgency) => {
        switch (urgency) {
            case 'high': return 'high-urgency';
            case 'medium': return 'medium-urgency';
            case 'low': return 'low-urgency';
            default: return '';
        }   
    };

    return (
        <div className="dashboard-container">
            {/* Header with logo */}
            <div className="nav">
                <img src={logo} alt="LOGO" />
                <div className="h1_container">
                    <h1>KENYA POWER </h1>
                    <h2>and LIGHTING COMPANY</h2>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>System Control Engineer Dashboard</h1>
                    <p>Review and manage electrical permits to work</p>

                    <div className="view-toggle">
                        <button
                            className={viewMode === 'pending' ? 'active' : ''}
                            onClick={() => setViewMode('pending')}
                        >
                            Pending Approvals
                        </button>
                        <button
                            className={viewMode === 'history' ? 'active' : ''}
                            onClick={() => setViewMode('history')}
                        >
                            Approval History
                        </button>
                    </div>
                </div>

                <div className="dashboard-main">
                    <div className="permit-list">
                        <h2>{viewMode === 'pending' ? 'Pending Permits' : 'Processed Permits'}</h2>

                        {viewMode === 'pending' && pendingPermits.length === 0 && (
                            <p className="no-permits">No pending permits to review</p>
                        )}

                        {viewMode === 'history' && processedPermits.length === 0 && (
                            <p className="no-permits">No processed permits in history</p>
                        )}

                        {viewMode === 'pending' && pendingPermits.map(permit => (
                            <div
                                key={permit.id}
                                className={`permit-card ${selectedPermit?.id === permit.id ? 'selected' : ''} ${getUrgencyClass(permit.urgency)}`}
                                onClick={() => handleSelectPermit(permit)}
                            >
                                <div className="permit-card-header">
                                    <h3>{permit.permitNumber}</h3>
                                    <span className="time-ago">{formatTimeAgo(permit.submittedAt)}</span>
                                </div>
                                <p><strong>Issued To:</strong> {permit.issuedTo}</p>
                                <p><strong>Work:</strong> {permit.workDescription}</p>
                                <p><strong>Equipment:</strong> {permit.mvlvEquipment}</p>
                                <div className="permit-card-footer">
                                    <span className="permit-id">{permit.id}</span>
                                    <span className="urgency-indicator">
                                        {permit.urgency === 'high' ? '⚠️ High Priority' :
                                            permit.urgency === 'medium' ? '⚡ Medium Priority' : 'Low Priority'}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {viewMode === 'history' && processedPermits.map(permit => (
                            <div
                                key={permit.id}
                                className={`permit-card ${permit.status === 'approved' ? 'approved' : 'rejected'}`}
                                onClick={() => handleSelectPermit(permit)}
                            >
                                <div className="permit-card-header">
                                    <h3>{permit.permitNumber}</h3>
                                    <span className={`status-badge ${permit.status}`}>
                                        {permit.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
                                    </span>
                                </div>
                                <p><strong>Issued To:</strong> {permit.issuedTo}</p>
                                <p><strong>Work:</strong> {permit.workDescription}</p>
                                <p><strong>Approved By:</strong> {permit.approverName}</p>
                                <p><strong>Date:</strong> {permit.approvalDate} at {permit.approvalTime}</p>
                                <div className="permit-card-footer">
                                    <span className="permit-id">{permit.id}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="permit-details">
                        {selectedPermit ? (
                            <div className="permit-review">
                                <h2>
                                    Permit Review: {selectedPermit.permitNumber}
                                    <span className="permit-id-small">ID: {selectedPermit.id}</span>
                                </h2>

                                <div className="permit-info">
                                    <div className="info-section">
                                        <h3>General Information</h3>
                                        <p><strong>Issued To:</strong> {selectedPermit.issuedTo}</p>
                                        <p><strong>Issue Date:</strong> {selectedPermit.issueDate}</p>
                                        <p><strong>Issue Time:</strong> {selectedPermit.issueTime}</p>
                                        <p><strong>Submitted:</strong> {formatTimeAgo(selectedPermit.submittedAt)}</p>
                                    </div>

                                    <div className="info-section">
                                        <h3>Work Details</h3>
                                        <p><strong>Description:</strong> {selectedPermit.workDescription}</p>
                                        <div className="work-details-list">
                                            {selectedPermit.workDetails.map((detail, idx) => (
                                                <p key={idx}>• {detail}</p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="info-section">
                                        <h3>Safety Information</h3>
                                        <p><strong>MV/LV Equipment:</strong> {selectedPermit.mvlvEquipment}</p>
                                        <p><strong>Earth Points:</strong></p>
                                        <div className="earth-points-list">
                                            {selectedPermit.earthPoints.map((point, idx) => (
                                                <p key={idx}>• {point}</p>
                                            ))}
                                        </div>
                                        <p><strong>Additional Earth Connections:</strong> {selectedPermit.additionalEarthConnections}</p>
                                    </div>
                                </div>

                                {selectedPermit.status ? (
                                    // If permit is already processed, show the decision details
                                    <div className="decision-details">
                                        <h3>Decision Information</h3>
                                        <p><strong>Status:</strong>
                                            <span className={`status-text ${selectedPermit.status}`}>
                                                {selectedPermit.status === 'approved' ? 'Approved' : 'Rejected'}
                                            </span>
                                        </p>
                                        <p><strong>Comments:</strong> {selectedPermit.comments}</p>
                                        <p><strong>Decided By:</strong> {selectedPermit.approverName}</p>
                                        <p><strong>Date/Time:</strong> {selectedPermit.approvalDate} at {selectedPermit.approvalTime}</p>
                                    </div>
                                ) : (
                                    // If permit is pending, show the approval form
                                    <div className="approval-form">
                                        <h3>Review Decision</h3>
                                        <div className="form-group">
                                            <label htmlFor="approverName">Your Name:</label>
                                            <input
                                                type="text"
                                                id="approverName"
                                                name="approverName"
                                                value={approvalForm.approverName}
                                                onChange={handleApprovalChange}
                                                required
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="comments">Comments/Reason:</label>
                                            <textarea
                                                id="comments"
                                                name="comments"
                                                value={approvalForm.comments}
                                                onChange={handleApprovalChange}
                                                placeholder="Enter your comments or reason for approval/rejection"
                                                rows="4"
                                            ></textarea>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="approvalDate">Date:</label>
                                                <input
                                                    type="date"
                                                    id="approvalDate"
                                                    name="approvalDate"
                                                    value={approvalForm.approvalDate}
                                                    onChange={handleApprovalChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="approvalTime">Time:</label>
                                                <input
                                                    type="time"
                                                    id="approvalTime"
                                                    name="approvalTime"
                                                    value={approvalForm.approvalTime}
                                                    onChange={handleApprovalChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="action-buttons">
                                            <button
                                                className="approve-btn"
                                                onClick={() => handlePermitAction('approved')}
                                            >
                                                Approve Permit
                                            </button>
                                            <button
                                                className="reject-btn"
                                                onClick={() => handlePermitAction('rejected')}
                                            >
                                                Reject Permit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="no-selection">
                                <div className="placeholder-content">
                                    <h3>No Permit Selected</h3>
                                    <p>Select a permit from the list to review its details</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
