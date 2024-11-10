import React, { useState, useEffect } from "react";
import AdminNavBar from "../../components/navbar/AdminNavBar";
import { getAllComplaints, getComplaintById, updateComplaintStatus, replyToComplaint, } from "../../api/ComplaintsService";
import { adminId } from "../../IDs";
import { OrderedListOutlined } from '@ant-design/icons';
import { checkTouristExists } from "../../api/TouristService";
import { message } from "antd";
import { message, Dropdown, Menu } from "antd";

const ComplaintsPage = () => {
    const tabs = ["all", "pending", "resolved"];
    // const [sideBarOpen, setSideBarOpen] = useState(true);
    const [currentTab, setcurrentTab] = useState("pending");
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [isSorted, setIsSorted] = useState(false);
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        const fetchUserExistence = async () => {
            console.log("selected", selectedComplaint);
            if (selectedComplaint != null) {
                if (selectedComplaint.issuerId) {
                    const exists = await checkUserExistence(selectedComplaint.issuerId);
                    setUserExists(exists);
                }
            }
        };

        fetchUserExistence();
    }, [selectedComplaint?.issuerId]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await getAllComplaints();
                const shuffledArray = response.sort(() => Math.random() - 0.5);
                setComplaints(shuffledArray);
                console.log(response[0].date);
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        };

        fetchComplaints();
    }, []);


    const handleReplyChange = (event) => {
        setReplyMessage(event.target.value);
    };

    const checkUserExistence = async (id) => {
        console.log("The id is ", id);
        try {
            const response = await checkTouristExists(id);
            console.log("msg", response.message);
            if (response.message === "User exists") {

                return true;

            }
            else
                if (response.message === "User not found") {
                    return false;
                }
        }
        catch (error) {
            message.error(error);
        }
    };
    const handleReplySubmit = async (event) => {
        event.preventDefault();

        if (!replyMessage) {
            alert("Please enter a reply message");
            return;
        }

        try {
            //console.log(replyMessage)
            //console.log("Admin ID:", adminId);  // Ensure this is defined
            await replyToComplaint(selectedComplaint._id, {
                message: replyMessage,
                senderId: adminId,
            });
            // Re-fetch the complaints to get updated data
            const updatedComplaints = await getAllComplaints();
            setComplaints(updatedComplaints);
            setReplyMessage("");
            //setSelectedComplaint(null); 
            message.success("Reply sent successfully!");
        } catch (error) {
            console.error("Error replying to complaint:", error);
            message.error("Failed to send reply. Please try again.");
        }
    };

    useEffect(() => {
        // Set newStatus to the current status of selectedComplaint
        if (selectedComplaint) {
            setNewStatus(selectedComplaint.status);
        }
    }, [selectedComplaint]);

    const handleStatusChange = async (complaintId) => {
        try {
            //console.log(newStatus)
            //console.log(complaintId)
            await updateComplaintStatus(complaintId, { status: newStatus });
            // Update local state to reflect changes
            const updatedComplaints = complaints.map(complaint =>
                complaint._id === complaintId ? { ...complaint, status: newStatus } : complaint
            );
            setComplaints(updatedComplaints);
            setSelectedComplaint((prev) => ({ ...prev, status: newStatus })); // Update selected complaint status
        } catch (error) {
            console.error("Error updating complaint status:", error);
        }
    };

    const toggleComplaintDetails = async (complaintId) => {
        if (selectedComplaint && selectedComplaint._id === complaintId) {
            // If the same complaint is selected, hide it
            setSelectedComplaint(null);
        } else {
            // Otherwise, fetch and show the complaint details
            try {
                const complaintDetails = await getComplaintById(complaintId);
                setSelectedComplaint(complaintDetails);
            } catch (error) {
                console.error("Error fetching complaint details:", error);
            }
        }
    };
    const [isSorted, setIsSorted] = useState(false); // initial sorting state (e.g., false for ascending, true for descending)


    const items = [
        {
            key: '1',
            label: (
                <a onClick={() => {
                    setIsSorted(true);
                }}>
                    Ascending
                </a>
            ),
        }, {
            key: '2',
            label: (
                <a onClick={() => {
                    setIsSorted(false);
                }}>
                    Descending
                </a>
            ),

        }];

    return (
        <div className="complaints">
            {/* <Sidebar setSideBarOpen={setSideBarOpen} /> */}
            <div className="dashboard__content">
                {/* <Header setSideBarOpen={setSideBarOpen} /> */}
                <div className="dashboard__content_content">
                    <h1 className="text-30">Complaints Management</h1>
                    <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:mb-20 mt-60">
                        <div className="tabs -underline-2 js-tabs">
                            <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">

                                {tabs.map((tab, i) => (
                                    <div
                                        key={i}
                                        className="col-auto"
                                        onClick={() => setcurrentTab(tab)}
                                    >
                                        <button
                                            className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${tab === currentTab ? "is-tab-el-active" : ""
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="tabs__content js-tabs-content">
                                <div className="tabs__pane -tab-item-1 is-tab-el-active">
                                    <div className="overflowAuto">
                                        <table className="tableTest mb-30">
                                            <thead className="bg-light-1 rounded-12">
                                                <tr>
                                                    <th>Complaint ID</th>
                                                    <th>Title</th>
                                                    <th>Status</th>
                                                    <th>Date     <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                                                        <OrderedListOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
                                                    </Dropdown></th>
                                                    <th>Actions</th>
                                                </tr>

                                            </thead>

                                            <tbody>
                                                {(isSorted ? [...complaints].sort((a, b) => new Date(a.date) - new Date(b.date)) : complaints.sort((a, b) => new Date(b.date) - new Date(a.date)))
                                                    .filter((complaint) => currentTab === "all" || complaint.status === currentTab)

                                                    .map((complaint) => (
                                                        <React.Fragment key={complaint._id}>
                                                            <tr>
                                                                <td>{complaint._id}</td>
                                                                <td>{complaint.title}</td>
                                                                <td className={`circle ${complaint.status === 'resolved' ? 'text-purple-1' : 'text-red-2'}`}>
                                                                    {complaint.status}
                                                                </td>                                    <td>{(new Date(complaint.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))}</td>
                                                                <td>
                                                                    <button onClick={() => toggleComplaintDetails(complaint._id)}>
                                                                        {selectedComplaint && selectedComplaint._id === complaint._id ? 'Hide Details' : 'View Details'}
                                                                    </button>
                                                                </td>

                                                            </tr>
                                                            {selectedComplaint && selectedComplaint._id === complaint._id && (
                                                                <tr>
                                                                    <td colSpan="4">
                                                                        <div className="complaint-details">
                                                                            <h3>Complaint Details</h3>
                                                                            <p><strong>Title:</strong> {selectedComplaint.title}</p>
                                                                            <p><strong>Body:</strong> {selectedComplaint.body}</p>
                                                                            <p><strong>Date:</strong> {(new Date(selectedComplaint.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))}</p>
                                                                            <p><strong>Issuer UserName:</strong>  {userExists ? selectedComplaint.issuerUserName : "Deleted User"
                                                                            }</p>
                                                                            <p><strong>Status:</strong>
                                                                                <div class="dropdown -base -price js-dropdown js-form-dd is-active" data-main-value="">

                                                                                    <div class="dropdown__button h-50 min-w-auto js-button">
                                                                                        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                                                                            <option value="pending">pending</option>
                                                                                            <option value="resolved">resolved</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </p>
                                                                            <button onClick={() => handleStatusChange(selectedComplaint._id)}>Update Status</button>
                                                                            <h4>Replies</h4>
                                                                            <ul>
                                                                                {selectedComplaint.replies.map((reply, index) => (
                                                                                    <li class="text-14 bg-light-1 rounded-12 py-20 px-30 mt-15" key={index}>{reply.message} (from: {reply.senderId}) on {new Date(reply.date).toLocaleDateString()}</li>
                                                                                ))}
                                                                            </ul>

                                                                            {/* Reply Form */}
                                                                            <div className="reply-section">
                                                                                <h4>Reply to Complaint</h4>
                                                                                <form onSubmit={handleReplySubmit}>
                                                                                    <textarea
                                                                                        value={replyMessage}
                                                                                        onChange={handleReplyChange}
                                                                                        placeholder="Enter your reply here..."
                                                                                        required
                                                                                    />
                                                                                    <button type="submit">Send Reply</button>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            )}

                                                        </React.Fragment>
                                                    ))}

                                                {/* <td>
                                <div className="d-flex items-center">
                                  <button className="button -dark-1 size-35 bg-light-1 rounded-full flex-center">
                                    <i className="icon-pencil text-14"></i>
                                  </button>

                                  <button className="button -dark-1 size-35 bg-light-1 rounded-full flex-center ml-10">
                                    <i className="icon-delete text-14"></i>
                                  </button>
                                </div>
                              </td> */}

                                            </tbody>
                                        </table>
                                    </div>

                                    {/* <Pagination /> */}

                                    {/* <div className="text-14 text-center mt-20">
                    Showing results 1-30 of 1,415
                  </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="text-center pt-30">
            © Copyright Viatours {new Date().getFullYear()}
          </div> */}
                </div>
            </div>
        </div>
    );
}
export default ComplaintsPage;