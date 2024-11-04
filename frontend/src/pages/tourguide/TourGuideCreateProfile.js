import { React, useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, InputNumber, DatePicker, Select } from 'antd';

import { updateProfile, getProfileData } from '../../api/TourGuideService';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import TourguideNavBar from '../../components/navbar/TourguideNavBar';
import languages from '../../assets/constants/Languages';
import { nationalities } from '../../assets/Nationalities';
import moment from 'moment';
const TourGuideForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    mobileNumber: "",
    nationality: "",
    yearsOfExperience: 0,
    languagesSpoken: [],
    education: [],
    previousWork: [],
    profilePicture: ""
  });
  useEffect(() => {
    const getTourGuideData = async () => {
      try {
        setLoading(true);
        const profileData = await getProfileData(id);
        const data = await profileData.data;
        setLoading(false);
        for (let i = 0; i < data.previousWork.length; i++) {
          data.previousWork[i].startDate = moment(data.previousWork[i].startDate).isValid() ? moment(data.previousWork[i].startDate) : null;
          data.previousWork[i].endDate =moment(data.previousWork[i].endDate).isValid() ? moment(data.previousWork[i].endDate) : null;
          console.log(data.previousWork[i].startDate);
          console.log(data.previousWork[i].endDate);
        } 
  
        setFormData({
          email: data?.email || "",
          name: data?.name || "",
          mobileNumber: data?.mobileNumber || "",
          nationality: data?.nationality || "",
          yearsOfExperience: data?.yearsOfExperience || 0,
          languagesSpoken: data?.languagesSpoken || [],
          education: data?.education || [],
          previousWork: data.previousWork || [],
          profilePicture: data?.profilePicture || ""
        });
        console.log(data);
      } catch (e) {
        toast.error(e);
        setLoading(false);
      }
    };
    getTourGuideData();
  }, [id]);

  const onFinish = async () => {
    try {
      setLoading(true);
      console.log(formData.previousWork[0].endDate.$d)
      const date = formData.previousWork[0].endDate;
      const isoDate = date.toISOString();
      formData.previousWork = Object.values(formData.previousWork).filter(item => item !== undefined)
      formData.education = Object.values(formData.education).filter(item => item !== undefined)
      const result = await updateProfile(id, { ...formData, previousWork: [...formData.previousWork], education: [...formData.education] });
      console.log(result);
      if (result) {
        setLoading(false);
        toast.success('profile Updated successfully')
        setFormData({
          email: "",
          name: "",
          mobileNumber: "",
          nationality: "",
          yearsOfExperience: 0,
          languagesSpoken: [],
          education: [],
          previousWork: [],
          profilePicture: ""
        });

      }
    }
    catch (err) {
      toast.error(err);
      setLoading(false);
    }

  }

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      email: formData.email,
      name: formData.name,
      mobileNumber: formData.mobileNumber,
      yearsOfExperience: formData.yearsOfExperience,
      nationality: formData.nationality,
      languagesSpoken: formData.languagesSpoken,
      education: formData.education,
      previousWork: formData.previousWork

    });
    console.log(formData);
  }, [formData, form]);
  const { Option } = Select;
  return (
    <div>
      <TourguideNavBar />
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> */}

      <Form
        form={form}
        onFinish={onFinish}
        style={{
          Width: '100%',
        }}
        autoComplete="off"
        initialValues={{
          email: formData.email,
          name: formData.name,
          mobileNumber: formData.mobileNumber,
          yearsOfExperience: formData.yearsOfExperience,
          nationality: formData.nationality,
          languagesSpoken: formData.languagesSpoken,
          education: formData.education,
          previousWork: formData.previousWork

        }}
        onValuesChange={(changedValues, allValues) => {
          console.log("changedValues: ", changedValues)
          setFormData((oldData) =>
          ({
            ...oldData, ...changedValues, education: allValues.education,
            previousWork: {
              ...allValues.previousWork,
              startDate: allValues?.previousWork?.startDate?.toISOString(),
              endDate: allValues?.previousWork?.endDate?.toISOString()
            }
          }));
          console.log("from onvalueChanges", formData);
        }}
      >
        <Form.Item
          label="Email"
          name='email'
          rules={[
            {
              required: formData.email === "",
              type: 'email',
              message: 'Please enter your email'
            },
          ]}
        >
          <Input style={{ width: '100%' }}
            placeholder="Enter your email"


          />
        </Form.Item>

        <Form.Item
          name='name'
          label="Name"
          rules={[
            {
              required: formData.name === "",
              message: 'Please input your name!',
            },
          ]}
        >
          <Input
            type='text'
            placeholder="Enter your name"
            style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name='mobileNumber'
          rules={[
            {
              required: formData.mobileNumber === "",
              message: 'Please input your mobile number!',
            },
          ]}
        >
          <Input
            type='text'
            placeholder="Enter your mobile number"
            style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Years of Experience"
          name="yearsOfExperience"
          rules={[
            {
              required: formData.yearsOfExperience === 0,
              message: 'Please input your years of experience!',
            },
          ]}
        >
          <InputNumber
            
            placeholder="Enter experience years"
            style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name='nationality' label="Nationality"
          rules={[
            {
              required: formData.nationality === '',
              message: 'Please select your nationality!',
            },
          ]}>
          <Select>
            {nationalities.map((nationality) => (
              <Select.Option value={nationality}>{nationality}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="languagesSpoken"
          label="Select Languages"
          rules={[
            {
              required: formData.languagesSpoken?.length === 0,
              message: 'Please select your languages!',
            },
          ]}
        >
          <Select mode="multiple" placeholder="Please select spoken languages">
            {languages.map((language) => (
              <Option key={language} value={language}>
                {language}
              </Option>
            ))}
          </Select>

        </Form.Item>
        <Form.List name="education">
          {(fields, { add: addEducation, remove: removeEducation }) => (
            <div
              style={{
                display: 'flex',
                rowGap: 16,
                flexDirection: 'column',
              }}
            >
              {fields.map((field) => (
                <Card
                  title={`Education ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        removeEducation(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="Degree" name={[field.name, 'degree']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your degree!',
                      },
                    ]}>
                    <Input style={{
                      width: '100%',
                    }} />
                  </Form.Item>
                  <Form.Item label="Institution" name={[field.name, 'institution']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your institution!',
                      },
                    ]}>
                    <Input style={{
                      width: '100%',
                    }} />
                  </Form.Item>
                  <Form.Item label="Year Of Completion" name={[field.name, 'yearOfCompletion']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Year Of Completion!',
                      },
                    ]}>
                    <InputNumber style={{
                      width: '100%',
                    }} />
                  </Form.Item>

                </Card>
              ))}
              <Button type="dashed" onClick={() => addEducation()} block>
                + Add Education
              </Button>
            </div>
          )}
        </Form.List>
        <Form.List name="previousWork">
          {(fields, { add: addPrevWork, remove: removePrevWork }) => (
            <div
              style={{
                display: 'flex',
                rowGap: 16,
                flexDirection: 'column',
              }}
            >
              {fields.map((field) => (
                <Card
                  title={`Previous Work ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        removePrevWork(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="Company Name" name={[field.name, 'companyName']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your company name!',
                      },
                    ]}>
                    <Input style={{
                      width: '100%',
                    }} />
                  </Form.Item>
                  <Form.Item label="Position" name={[field.name, 'position']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your position!',
                      },
                    ]}>
                    <Input style={{
                      width: '100%',
                    }} />
                  </Form.Item>
                  <Form.Item label="Location" name={[field.name, 'location']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter company location!',
                      },
                    ]}>
                    <Input style={{
                      width: '100%',
                    }} />
                  </Form.Item>
                  <Form.Item label="Start Date" name={[field.name, 'startDate']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter working start date !',
                      },
                    ]}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="End date" name={[field.name, 'endDate']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter working end date!',
                      },
                    ]}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Description" name={[field.name, 'description']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your job description!',
                      },
                    ]}>
                    <Input.TextArea style={{
                      width: '100%',
                    }} />
                  </Form.Item>

                </Card>
              ))}
              <Button type="dashed" onClick={() => addPrevWork()} block>
                + Add previous work experience
              </Button>
            </div>
          )}
        </Form.List>


        <Form.Item
        >
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TourGuideForm;
