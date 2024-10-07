import React from 'react';
import { useState, useEffect } from 'react';
import { CreateNewHistoricalPlace, getHistoricalPlaceDetails, updateHistoricalPlace } from '../../api/HistoricalPlaceService';
import { getAllPeriodTags, CreateNewPeriodTag } from '../../api/HistoricalPlacePeriodService';
import { getAllTypeTags, CreateNewTypeTag } from '../../api/HistoricalPlaceTagService';
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Select, Button, message, Upload, InputNumber, TimePicker } from "antd";
import Maps from '../../components/HistPlaceMap/Maps';
import SearchBox from '../../components/HistPlaceMap/SearchBox';
import moment from 'moment';
import { tourismGovernerID } from '../../IDs';
import { InboxOutlined } from '@ant-design/icons';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import GovernorNavBar from '../../components/governor/GovernorNavBar';
function HistoricalPlaceForm({ state }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const isCreate = id === undefined;
    const [form] = Form.useForm();
    const [selectPosition, setSelectPosition] = useState(null);
    const [selectLocation, setSelectLocation] = useState(null);
    const [searchPlaceHolder, setSearchPlaceHolder] = useState(null);

    const [histDetails, setHistDetails] = useState(null);
    const [images, setImages] = useState(new Set());
    const [encodedImages, setEncodedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const passedData = location.state?.place;
    const [tagsOptions, setTagsOptions] = useState([]);
    const [periodTagsOptions, setPeriodTagsOptions] = useState([]);
    const [tags, setTags] = useState(passedData ? passedData.tags.map(tag => tag.name) : []);
    const [periodTags, setPeriodTags] = useState(passedData ? passedData.historicalPeriod.map(period => period.name) : []); 
    const [formData, setFormData] = useState({
        name: passedData ? passedData.name : "",
        description: passedData ? passedData.description : "",
        weekdayOpening: passedData ? passedData.openingHours.weekdays.openingTime : '',
        weekdayClosing: passedData ? passedData.openingHours.weekdays.closingTime : '',
        weekendOpening: passedData ? passedData.openingHours.weekends.openingTime : '',
        weekendClosing: passedData ? passedData.openingHours.weekends.closingTime : '',
        foreignerPrice: passedData ? passedData.ticketPrices.foreigner : 0,
        nativePrice: passedData ? passedData.ticketPrices.native : 0,
        studentPrice: passedData ? passedData.ticketPrices.student : 0,
    });
    useEffect(() => {
        setTags(passedData ? passedData.tags : [])
        // console.log("TAGS I GOT", passedData.tags)
        setPeriodTags(passedData ? passedData.historicalPeriod : [])
        setSelectPosition(passedData ? { lat: passedData.location.coordinates.latitude ? passedData.location.coordinates.latitude : '-77.0364', lon: passedData.location.coordinates.longitude ? passedData.location.coordinates.longitude : '-77.0364' } : null)
        setSelectLocation(passedData ? passedData.location.address : '');
        console.log("passed", passedData)

    }, [passedData]);



    const handleChoosingImage = (e) => {
        const files = e.fileList.map((file) => file.originFileObj);
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImages((oldImages) => new Set(oldImages).add(reader.result));
                console.log(images);
            }
        });
        console.log(images);
    }


    const handleInputChange = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePrices = (field, price) => {
        setFormData({ ...formData, [field]: price });
        console.log(formData);
    }
    const handleTagChange = (value) => {
        setTags(value);
    };

    const handlePeriodTagChange = (value) => {
        setPeriodTags(value);
    };
    useEffect(() => {
        const fetchTags = async () => {
            const tagData = await getAllTypeTags();
            setTagsOptions(tagData);
        };
        fetchTags();
    }, []);

    useEffect(() => {
        const fetchPeriodTags = async () => {
            const periodTagData = await getAllPeriodTags();
            setPeriodTagsOptions(periodTagData);
        };
        fetchPeriodTags();
    }, []);
    const handleSubmit = async () => {
        const newPlace = {
            name: formData.name,
            description: formData.description,
            openingHours: {
                weekdays: {
                    openingTime: formData.weekdayOpening,
                    closingTime: formData.weekdayClosing,
                },
                weekends: {
                    openingTime: formData.weekendOpening,
                    closingTime: formData.weekendClosing,
                }
            },
            ticketPrices: {
                foreigner: formData.foreignerPrice,
                native: formData.nativePrice,
                student: formData.studentPrice
            },
            tags: tags,
            historicalPeriod: periodTags,
        };

        try {
            if (isCreate) {
                await CreateNewHistoricalPlace(newPlace);
                toast.success('Place created successfully!');
            } else {
                await updateHistoricalPlace(id, newPlace);
                toast.success('Place updated successfully!');
            }
            navigate('/historical-places');
        } catch (error) {
            toast.error('Error while saving place.');
        }
    };
    return (
        <div>
            <GovernorNavBar />
            <h2>{isCreate ? 'Create New Historical Place' : 'Update Historical Place'}</h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    name: formData.name,
                    description: formData.description,
                    weekdayOpening: formData.weekdayOpening ? moment(formData.weekdayOpening, "HH:mm") : null,
                    weekdayClosing: formData.weekdayClosing ? moment(formData.weekdayClosing, "HH:mm") : null,
                    weekendOpening: formData.weekendOpening ? moment(formData.weekendOpening, "HH:mm") : null,
                    weekendClosing: formData.weekendClosing ? moment(formData.weekendClosing, "HH:mm") : null,
                    foreignerPrice: formData.foreignerPrice,
                    nativePrice: formData.nativePrice,
                    studentPrice: formData.studentPrice,
                    tags: tags,
                    historicalPeriod: periodTags,
                }}
            >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter the name" }]}>
                    <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter place name" />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter the description" }]}>
                    <Input name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter description" />
                </Form.Item>

                <Form.Item label="Weekday Opening" name="weekdayOpening">
                    <TimePicker format="HH:mm" value={formData.weekdayOpening ? moment(formData.weekdayOpening, "HH:mm") : null} onChange={(time) => handleInputChange({ target: { name: 'weekdayOpening', value: time.format("HH:mm") } })} />
                </Form.Item>

                <Form.Item label="Weekday Closing" name="weekdayClosing">
                    <TimePicker format="HH:mm" value={formData.weekdayClosing ? moment(formData.weekdayClosing, "HH:mm") : null} onChange={(time) => handleInputChange({ target: { name: 'weekdayClosing', value: time.format("HH:mm") } })} />
                </Form.Item>

                <Form.Item label="Weekend Opening" name="weekendOpening">
                    <TimePicker format="HH:mm" value={formData.weekendOpening ? moment(formData.weekendOpening, "HH:mm") : null} onChange={(time) => handleInputChange({ target: { name: 'weekendOpening', value: time.format("HH:mm") } })} />
                </Form.Item>

                <Form.Item label="Weekend Closing" name="weekendClosing">
                    <TimePicker format="HH:mm" value={formData.weekendClosing ? moment(formData.weekendClosing, "HH:mm") : null} onChange={(time) => handleInputChange({ target: { name: 'weekendClosing', value: time.format("HH:mm") } })} />
                </Form.Item>

                <Form.Item label="Tags" name="tags">
                    <Select
                        mode="multiple"
                        placeholder="Select tags"
                        value={tags}
                        onChange={handleTagChange}
                        options={tagsOptions.map((tag) => ({ label: tag.name, value: tag.name }))}
                    />
                </Form.Item>

                <Form.Item label="Historical Periods" name="historicalPeriod">
                    <Select
                        mode="multiple"
                        placeholder="Select periods"
                        value={periodTags}
                        onChange={handlePeriodTagChange}
                        options={periodTagsOptions.map((period) => ({ label: period.name, value: period.name }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Foreigner Price"
                    name="foreignerPrice"
                    rules={[{ required: id === undefined, message: "Please enter the foreigner ticket price" }]}
                >
                    <InputNumber
                        min={0}
                        value={formData.foreignerPrice}
                        onChange={(value) => { handlePrices('foreignerPrice', value) }}
                        placeholder="Enter foreigner ticket price"
                        style={{ width: '100%' }}
                    />
                </Form.Item>


                <Form.Item
                    label="Native Price"
                    name="nativePrice"
                    rules={[{ required: id === undefined, message: "Please enter the native ticket price" }]}
                >
                    <InputNumber
                        min={0}
                        value={formData.nativePrice}
                        onChange={(value) => { handlePrices('nativePrice', value) }}
                        placeholder="Enter native ticket price"
                        style={{ width: '100%' }}
                    />
                </Form.Item>


                <Form.Item
                    label="Student Price"
                    name="studentPrice"
                    rules={[{ required: id === undefined, message: "Please enter the student ticket price" }]}
                >
                    <InputNumber
                        min={0}
                        value={formData.studentPrice}
                        onChange={(value) => { handlePrices('studentPrice', value) }}
                        placeholder="Enter student ticket price"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    label="Upload Images for the Place"
                    name="images"
                    rules={[{ required: false, message: "Please upload at least one image" }]}
                >
                    <Upload.Dragger
                        name="files"
                        multiple
                        beforeUpload={() => false}
                        onChange={handleChoosingImage}
                        showUploadList={true}
                    >
                        <p >
                            <InboxOutlined />
                        </p>
                        <p >Click or drag files to this area to upload</p>
                        <p >
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files.
                        </p>
                    </Upload.Dragger>
                </Form.Item>

                <SearchBox
                    selectPosition={selectPosition}
                    setSelectPosition={setSelectPosition}
                    setSelectLocation={setSelectLocation}
                    selectLocation={selectLocation}
                />
                < Maps selectPosition={selectPosition} />
                <div style={{ marginTop: '10px' }}>
                    <strong>Selected Location:</strong> {selectLocation || 'No location selected yet'}
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                        loading={loading}
                    // onClick={() => navigate('/historicalPlace/tourismGoverner')}
                    >
                        {id === undefined ? "Create" : "Update"}

                    </Button>
                </Form.Item>
            </Form>



            <ToastContainer />
        </div>





    )
}
export default HistoricalPlaceForm;


