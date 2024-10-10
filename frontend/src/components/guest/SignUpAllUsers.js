import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Radio, message } from "antd";
import moment from "moment";
// import { createSeller } from "../../api/SellerService";
// import { createTourGuide } from "../../api/TourGuideService";
// import { createAdvertiser } from "../../api/AdvertiserService";
import { createTourist } from "../../api/TouristService";
import { nationalities } from "../../assets/Nationalities";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../../api/RequestService";
const { Option } = Select;

const SignUpAllUsers = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    nationality: "",
    dateOfBirth: "",
    job: "",
  });

  const [role, setRole] = useState("seller");
  const [form] = Form.useForm();

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    form.resetFields();
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
        const data = await createRequest({
          ...commonUser,
          role: "Seller"
        })
        // setRequest(data)
        console.log({
          ...commonUser,
          role: "seller"
        })
        navigate("/seller/pending", {
          state: {
            ...commonUser,
            role: "Seller"

          }
        })
      } else if (role === "tour-guide") {
        await createRequest({
          ...commonUser,
          role: "Tour Guide"

        })
        navigate("/seller/pending", {
          state: {
            ...commonUser,
            role: "Tour Guide"

          }
        })
        // await createTourGuide(newUser);
      } else if (role === "advertiser") {
        await createRequest({
          ...commonUser,
          role: "Advertiser"
        })
        navigate("/seller/pending", {
          state: {
            ...commonUser,
            role: "Advertiser"

          }
        })
        // await createAdvertiser(newUser);
      } else if (role === "tourist") {
        await createTourist(newUser);
        message.success("Sign up successful!");
      }

      if (role === "tourist") {
        navigate("/tourist");
      }
    } catch (err) {
      message.error(err.response.data.error);
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

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpAllUsers;
