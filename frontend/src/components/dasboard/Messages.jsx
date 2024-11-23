import Pagination from "../common/Pagination";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import { messageSanders } from "@/data/dashboard";  // Assuming this has message details
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, message } from 'antd';
import { getUserData } from "../../api/UserService";
import { useEffect } from "react";
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { replyToComplaint } from "@/api/ComplaintsService";
export default function Messages({ complaint, user }) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const [replyMessage, setReplyMessage] = useState("");

  // Assuming `complaint.replies` holds the messages array
  const replies = complaint.replies;
  const handleReplyChange = (event) => {
    setReplyMessage(event.target.value);
  };

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    if (!replyMessage) {
      alert("Please enter a reply message");
      return;
    }

    try {
      //console.log(replyMessage)
      await replyToComplaint(complaint._id, {
        message: replyMessage,
        senderId: user,
      });

      complaint.replies.push({
        message: replyMessage,
        senderId: user,
      });

      setReplyMessage("");
      message.success("Reply sent successfully!");
    } catch (error) {
      console.error("Error replying to complaint:", error);
      message.error("Failed to send reply. Please try again.");
    }
  };
  return (
    <>
      <div
        className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""} js-dashboard`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          {/* <Header setSideBarOpen={setSideBarOpen} /> */}

          <div className="dashboard__content_content">
            <h1 className="text-30">Complaint Details</h1>
            <p className="">{complaint.title}</p>
            <div className="row y-gap-30 pt-60">
              <div className="col-lg-4">
                <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30">

                  <div className="row y-gap-30 pt-30">
                    {/* Complaint Title */}
                    <div className="col-12">
                      <h2 className="text-20 font-bold">{complaint.title}</h2>
                    </div>

                    {/* Complaint Body */}
                    <div className="col-12">
                      <p className="text-16">{complaint.body}</p>
                    </div>

                    <div className="col-12">
                      {/* Complaint Status with Badge and Icon */}
                      <div className="d-flex align-items-center">
                        {/* Conditional Icon Based on Status */}


                        {/* Status Text with Badge */}
                        <div className="d-flex align-items-center">
                          {/* Status Text with Badge */}
                          <p className={`text-16 font-bold ${complaint.status === 'resolved' ? 'text-green-500' : 'text-red-500'} mr-10`}>
                            {complaint.status === 'resolved' ? 'Resolved' : 'Pending'}
                          </p>

                          {/* Status Icon with Space */}
                          <div className={`status-icon ${complaint.status === 'resolved' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {complaint.status === 'resolved' ? (
                              <CheckCircleOutlined style={{ fontSize: '20px', color: complaint.status === 'resolved' ? 'green' : 'red' }} />
                            ) : (
                              <ExclamationCircleOutlined style={{ fontSize: '20px', color: complaint.status === 'resolved' ? 'green' : 'red' }} />
                            )}
                          </div>
                        </div>

                      </div>
                    </div>


                    {/* Complaint Date */}
                    <div className="col-12">
                      <div className="text-14 text-gray-500">
                        {new Date(complaint.date).toLocaleDateString()} {/* Format the date as needed */}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-lg-8">
                <div className="rounded-12 bg-white shadow-2 px-40 pt-20 pb-30">
                  <div className="row x-gap-10 y-gap-10 justify-between items-center pb-20 border-1-bottom">
                    <div className="col-auto">
                      <div className="d-flex items-center">
                        <Avatar size={40}>ADMIN</Avatar>

                        <div className="ml-10">
                          <h5 className="text-15 lh-13 fw-500">Chat with Admin</h5>
                          <div className="text-14 lh-13">Active</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Mapping of Replies */}
                  {replies.map((reply, index) => (
                    <div key={index} className={`row pt-20 ${reply.senderId !== user ? '' : 'justify-end text-right'}`}>
                      <div className="col-lg-6">
                        <div className={`d-flex items-center ${reply.senderId !== user ? '' : 'justify-end'}`}>
                          {reply.senderId === user && (
                            <Avatar style={{ backgroundColor: '#8f5774' }} icon={<UserOutlined />} />
                          )}
                          {reply.senderId !== user && (
                            <Avatar style={{ backgroundColor: '#e0829d' }} icon={<UserOutlined />} />
                          )}





                          <h5 className={`ml-10 text-15 fw-500 ${reply.senderId !== user ? '' : 'mr-10'}`}>{reply.userName}</h5>
                          <div className="text-14 ml-5">{reply.time}</div>
                        </div>

                        <div
                          className={`text-14 rounded-12 py-20 px-30 mt-15 ${reply.senderId === user ? 'bg-accent-1-05' : ''
                            }`}
                          style={{
                            backgroundColor: reply.senderId !== user ? 'var(--color-light-purple)' : 'var(--color-light-6)',
                          }}
                        >

                          {reply.message}
                        </div>

                      </div>
                    </div>
                  ))}

                  <div className="mt-40 mb-30 border-1-top"></div>

                  <div className="row y-gap-20 justify-between items-center">
                    <div className="custom-row">
                      <input
                        type="text"
                        className="custom-input"
                        placeholder="Type a Message"
                        value={replyMessage} // Binding the value of the input to replyMessage
                        onChange={handleReplyChange} // Handling input changes
                      />
                    </div>

                    <div className="col-auto">
                      <button className="custom-button" onClick={handleReplySubmit}>
                        Send Reply
                        <i className="icon-arrow-top-right text-16"></i>
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-30">
              © Copyright Tripal {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
      .custom-input {
        padding: 10px 15px;
        border-radius: 8px;
        border: 1px solid #ccc;
        font-size: 14px;
        width: 100%;
        outline: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .custom-input:focus {
        border-color: #8f5774; /* Custom color on focus */
        box-shadow: 0 0 5px rgba(143, 87, 116, 0.5); /* Custom focus shadow */
      }
        /* styles.css */
.custom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px; /* 20px gap between items */
  width: 70%; /* Full width of the container */
  padding: 20px; /* Add padding to make the div bigger */
  background-color: #f9f9f9; /* Optional: background color to make the div more noticeable */
}

.custom-row .col-auto {
  flex-grow: 1; /* Make the columns grow to take available space */
}
/* styles.css */

/* Custom button class */
.custom-button {
  background-color: #8f5774; /* Initial background color */
  color: white; /* Text color */
  padding: 12px 24px; /* Increase padding for a bigger button */
  font-size: 16px; /* Set button font size */
  border: none; /* Remove default button border */
  border-radius: 8px; /* Rounded corners */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; /* Change cursor to pointer */
  transition: background-color 0.3s ease; /* Smooth transition for background color on hover */
}

/* Button hover effect */
.custom-button:hover {
  background-color: #7a4363; /* Lighter purple shade on hover */
}

/* Icon color inside button */
.custom-button i {
  color: #ffffff; /* Ensure the icon is white */
  margin-left: 10px; /* Space between text and icon */
}

/* Button size modification on hover (optional) */
.custom-button:hover {
  transform: scale(1.05); /* Slightly enlarge the button on hover */
}

    `}
      </style>
    </>
  );
}