import React, { useState, useEffect } from "react";
import { List, Button, Modal, Input } from "antd";
import ActivityCategoryApi from "../../api/ActivityCategoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavBar from "../../components/admin/AdminNavBar";
import Footer from "../../components/Footer";

const ActivityCategoryDetails = () => {
  const [nameValue, setNameValue] = useState("");
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [updateCategoryID, setUpdateCategoryID] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ActivityCategoryApi.getActivityCategories();

        setData(response);
        console.log("Fetched categories:", response);
      } catch (error) {
        console.error("Error fetching activity categories:", error);
        toast.error("Failed to fetch activity categories!");
      }
    };
    fetchData();
  }, []);

  const notifyDelete = (name) =>
    toast(`Activity Category ${name} is deleted successfully!`);
  const notifyCreate = (name) =>
    toast(`Activity Category ${name} is added successfully!`);
  const notifyUpdate = (name) =>
    toast(`Activity Category ${name} is updated successfully!`);

  const handleInputChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const createdCategory = await ActivityCategoryApi.createActivityCategory(
        nameValue
      );
      console.log("just created", createdCategory);
      const id = createdCategory._id;
      const newObject = {
        Name: nameValue,
        _id: id
      };
      setData([...data, newObject]);
      setNameValue("");
      notifyCreate(nameValue);
    } catch (error) {
      console.error("Error creating activity category:", error);
      toast.error("Failed to create activity category!");
    }
  };

  const deleteActivityCategory = async (id, name) => {
    try {
      await ActivityCategoryApi.deleteActivityCategory(id);
      const updatedData = data.filter((item) => item._id !== id);
      setData(updatedData);
      notifyDelete(name);
    } catch (error) {
      console.error(`Error deleting activity category with id ${id}:`, error);
      toast.error("Failed to delete activity category!");
    }
  };
  const editActivityCategory = async (id, name) => {
    setUpdateCategoryID(id);
    setIsModalVisible(true);
  };
  const handleUpdate = async (id, name) => {
    try {
      await ActivityCategoryApi.updateActivityCategory(id, name);
      const newData = data.map((c) => {
        if (c._id === id) {
          const newObj = {
            Name: updateCategoryName,
          };
          return newObj;
        } else {
          return c;
        }
      });
      setData(newData);
      notifyUpdate();
      setIsModalVisible(false);
    } catch (error) {
      console.error(`Error updating activity category with id ${id}:`, error);
      toast.error("Failed to update activity category!");
    }
  };
  return (
    <div className="page-container2">

      <AdminNavBar />
      <br></br>   <br></br>   <br></br>
      <div style={{
        width: "800px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}> { }
        <h2>Create a new activity Category</h2>
        <Input
          value={nameValue}
          onChange={handleInputChange}
          placeholder="Enter new activity category name"
        />
        <br></br>
        <br></br>
        <Button onClick={handleButtonClick} type="primary">
          Submit
        </Button>
        <h2>View existing activity categories</h2>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(activityCategory) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() =>
                    editActivityCategory(
                      activityCategory._id,
                      activityCategory.Name
                    )
                  }
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  danger
                  onClick={() =>
                    deleteActivityCategory(
                      activityCategory._id,
                      activityCategory.Name
                    )
                  }
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={<a href="https://ant.design">{activityCategory.Name}</a>}
                description={activityCategory.Name}
              />
            </List.Item>
          )}
        />
        <Modal
          title="Update Activity Category"
          open={isModalVisible}
          onOk={() => handleUpdate(updateCategoryID, updateCategoryName)}
          onCancel={() => setIsModalVisible(false)}
        >
          <Input
            value={updateCategoryName}
            onChange={(e) => setUpdateCategoryName(e.target.value)}
            placeholder="Enter new activity category name"
          />
        </Modal>
        <ToastContainer />
      </div>

      <Footer />

    </div >
  );
};

export default ActivityCategoryDetails;