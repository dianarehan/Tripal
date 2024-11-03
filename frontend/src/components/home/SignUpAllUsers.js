import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Radio, message, Upload } from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseInstance from '../../firebase';
// import { createSeller } from "../../api/SellerService";
// import { createTourGuide } from "../../api/TourGuideService";
// import { createAdvertiser } from "../../api/AdvertiserService";
import { createTourist } from "../../api/TouristService";
import { nationalities } from "../../assets/Nationalities";
import { useNavigate } from "react-router-dom";
import { createRequest, acceptRequest } from "../../api/RequestService";
const { Option } = Select;

const SignUpAllUsers = () => {
  const [requestId, setRequestId] = useState('')
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    nationality: "",
    dateOfBirth: "",
    job: "",
    document: ""
  });
  const handleAcceptRequest = () => {
    acceptRequestFE(requestId);
  };
  const [role, setRole] = useState("seller");
  const [form] = Form.useForm();

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const acceptRequestFE = async (RequestID) => {
    try {
      const response = await acceptRequest(RequestID);
      console.log("Request accepted successfully:", response);
      return response;
    } catch (error) {
      console.error("Error accepting request:", error.message);

    }
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    form.resetFields();
  };
  // const handleBeforeUpload = (file) => {
  //   if (formData.document) {
  //     message.error("Only one document can be uploaded.");
  //     return Upload.LIST_IGNORE;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setFormData({ ...formData, document: reader.result });
  //   };
  //   reader.readAsDataURL(file);
  //   return false;
  // };
  const handleDocumentChange = (info) => {
    if (info.fileList.length === 0) {
      setFormData({ ...formData, document: null });
      return;
    }
    const file = info.fileList[0].originFileObj;
    // const reader = new FileReader();
    // reader.readAsDataURL(file.originFileObj);
    // reader.onloadend = () => {
    setFormData({ ...formData, document: file });
    console.log("FILE DATA", info.file);

  }

  const handleRemove = () => {
    setFormData({ ...formData, document: null });
  };
  const handleSubmit = async (values) => {
    const formattedDateOfBirth = role === "tourist"
      ? new Date(values.dateOfBirth).toISOString().split("T")[0]
      : values.dateOfBirth;

    const commonUser = {
      userName: values.userName,
      email: values.email,
      password: values.password,
    };

    let newUser;
    let response;
    if (role === "tourist") {
      newUser = {
        ...commonUser,
        mobileNumber: values.mobileNumber,
        nationality: values.nationality,
        dateOfBirth: formattedDateOfBirth,
        job: values.job,
      };
    } else {
      newUser = commonUser;
    }

    try {
      if (role === "seller") {

        // const newFormData = new FormData();
        // newFormData.append('document', formData.document); // fileInput is an <input type="file">

        response = await createRequest({
          ...commonUser,
          role: "Seller",
        }, formData.document);

        navigate("/seller/pending", {
          state: {
            ...commonUser,
            role: "Seller"
          }
        });
      } else if (role === "tour-guide") {
        response = await createRequest({
          ...commonUser,
          role: "Tour Guide",
        }, formData.document);
        navigate("/seller/pending", {
          state: {
            ...commonUser,
            role: "Tour Guide"
          }
        });
      } else if (role === "advertiser") {

        response = await createRequest({
          ...commonUser,
          role: "Advertiser",
        }, formData.document);

        console.log("response", response)
        navigate("/seller/pending", {
          state: {
            ...commonUser,
            role: "Advertiser"
          }
        });
      } else if (role === "tourist") {
        response = await createTourist(newUser);
        message.success("Sign up successful!");
        navigate("/tourist");
      }

    } catch (error) {
      console.log('Error object:', error);
      // Check if error response exists and display the error message

      message.error(error.message); // Display backend error

    }
  };



  return (
    <div className="signUpUsersForm-container">
      <h2 className="signUpUsersForm-title">Sign Up</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Role">
          <Radio.Group onChange={handleRoleChange} value={role}>
            <Radio value="seller">Seller</Radio>
            <Radio value="tour-guide">Tour Guide</Radio>
            <Radio value="advertiser">Advertiser</Radio>
            <Radio value="tourist">Tourist</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Please enter your user name" }]}
        >
          <Input
            value={formData.userName}
            onChange={(e) => handleChange("userName", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </Form.Item>

        {role === "tourist" && (
          <>
            <Form.Item
              label="Mobile Number"
              name="mobileNumber"
              rules={[{ required: true, message: "Please enter your mobile number" }]}
            >
              <Input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: true, message: "Please select your nationality" }]}
            >
              <Select
                value={formData.nationality}
                onChange={(value) => handleChange("nationality", value)}
              >
                <Option value="">Select Nationality</Option>
                {nationalities.map((nationality, index) => (
                  <Option key={index} value={nationality}>
                    {nationality}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[{ required: true, message: "Please select your date of birth" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                value={formData.dateOfBirth ? moment(formData.dateOfBirth) : null}
                onChange={(date, dateString) => handleChange("dateOfBirth", dateString)}
              />
            </Form.Item>
            <Form.Item
              label="Job"
              name="job"
              rules={[{ required: true, message: "Please enter your job" }]}
            >
              <Input
                value={formData.job}
                onChange={(e) => handleChange("job", e.target.value)}
              />
            </Form.Item>
          </>
        )}
        {role !== "tourist" && (
          <Form.Item>
            <Upload
              name="document"
              accept=".pdf"
              beforeUpload={() => false}
              // beforeUpload={handleBeforeUpload}
              onChange={handleDocumentChange}
              onRemove={handleRemove}
            >

              {!formData.document && (
                <Button
                  icon={<UploadOutlined />}
                  size="small"
                  type="default"
                  style={{
                    whiteSpace: "nowrap",
                    padding: "0 8px",
                    width: "auto",
                  }}


                >
                  Upload Document
                </Button>
              )}

            </Upload>
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Sign Up
          </Button>
        </Form.Item>

      </Form>

      <Input
        placeholder="enter request/user id"
        value={requestId}
        onChange={(e) => setRequestId(e.target.value)}
      />
      <br></br> <br></br>
      <Button type="primary" style={{ width: "50%" }} onClick={handleAcceptRequest}>
        Accept Request
      </Button>

      <br></br> <br></br>

    </div>

  );
};

export default SignUpAllUsers;
