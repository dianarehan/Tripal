import { React, useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, InputNumber, DatePicker, Select } from 'antd';

import { createTourGuide, updateProfile, getProfileData } from '../../api/TourGuideService';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import TourguideNavBar from '../../components/navbar/TourguideNavBar';
import languages from '../../assets/constants/Languages'
const TourGuideForm = () => {
  const { id } = useParams();
  const isUpdate = id === undefined;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  //   email: ,
  //   password: ,
  //   name: ,
  //   mobileNumber:,
  //   nationality: ,
  //   yearsOfExperience: ,
  //   languagesSpoken: [],
  //   education: [
  //     {
  //       degree: 
  //       institution: ,
  //       yearOfCompletion: 
  //     }
  //   ],
  //   previousWork: [
  //     {
  //       companyName: 
  //       position: 
  //       location: 
  //       startDate: 
  //       endDate: 
  //       description: 
  //     }
  //   ],

  //   profilePicture: 
  // }

  useEffect(() => {
    const getTourGuideData = async (id) => {
      try {
        setLoading(true);
        const profileData = await getProfileData(id);
        const data = await profileData.data;
        setLoading(false);
      } catch (e) {
        toast.error(e);
        setLoading(false);
      }
    };
    console.log(isUpdate !== null);
    if (isUpdate !== undefined) { getTourGuideData(id); }
  }, [isUpdate, id]);

  const onFinish = async () => {
    if (isUpdate === undefined) {
      try {
        setLoading(true);
        const result = await createTourGuide(formData);
        if (result) {
          setLoading(false);
          toast.success('profile created successfully')
          setFormData({
            userName: '',
            email: '',
            password: '',
            mobileNumber: '',
            experienceYears: 0
          });

        }
      }
      catch (err) {
        toast.error(err);
        setLoading(false);
      }
    }
    else {
      try {
        setLoading(true);
        const result = await updateProfile(id, formData);
        setLoading(false);
        toast.success('profile Updated successfully')
        setFormData({
          userName: '',
          email: '',
          password: '',
          mobileNumber: '',
          experienceYears: 0
        });


      }
      catch (err) {
        toast.error(err);
        setLoading(false);
      }
    }
  }
  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleYearsChange = (field, years) => {
    setFormData({ ...formData, [field]: years });
    console.log(formData);
  }

  const [form] = Form.useForm();
  const { Option } = Select;
  return (
    <div>
      <TourguideNavBar />
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> */}

      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        name="dynamic_form_complex"
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
        initialValues={{
          items: [{}],
        }}
      >

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="User Name"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nationality"
          name="nationality"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Select Languages"
          label="Select Languages"
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please select your spoken languages !',
        //     type: 'array',
        // //   },
        // ]}
        >
          <Select mode="multiple" placeholder="Please select spoken languages">
            {languages.map((language) => (
              <Option key={language} value={language}>
                {language}
              </Option>
            ))}
          </Select>

        </Form.Item>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: 'flex',
                rowGap: 16,
                flexDirection: 'column',
              }}
            >
              {fields.map((field) => (
                <Card
                  //size="small"
                  title={`Education ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="Degree" name={[field.name, 'name']}>
                    <Input style={{
                      width: '100%',
                    }} />
                  </Form.Item>
                  <Form.Item label="Institution" name={[field.name, 'name']}>
                    <Input style={{
                      width: '100%',
                    }} />
                  </Form.Item>
                  <Form.Item label="Year Of Completion">
                    <InputNumber style={{
                      width: '100%',
                    }} />
                  </Form.Item>

                </Card>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                + Add Education
              </Button>
            </div>
          )}
        </Form.List>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: 'flex',
                rowGap: 16,
                flexDirection: 'column',
              }}
            >
              {fields.map((field) => (
                <Card
                  //size="small"
                  title={`Previous Work ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="Company Name" name={[field.name, 'name']}>
                    <Input style={{
                      width: '100%',
                    }} />
                  </Form.Item>
                  <Form.Item label="Position" name={[field.name, 'name']}>
                    <Input style={{
                      width: '100%',
                    }} />
                  </Form.Item>
                  <Form.Item label="Location" name={[field.name, 'name']}>
                    <Input style={{
                      width: '100%',
                    }} />
                  </Form.Item>
                  <Form.Item label="Start Date">
                    <DatePicker />
                  </Form.Item>
                  <Form.Item label="End date">
                    <DatePicker />
                  </Form.Item>
                  <Form.Item label="Description">
                    <InputNumber style={{
                      width: '100%',
                    }} />
                  </Form.Item>

                </Card>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                + Add previous work experience:
              </Button>
            </div>
          )}
        </Form.List>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TourGuideForm;
