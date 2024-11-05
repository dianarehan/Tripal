import React, { useState } from "react";
import {
  createAdvertiser,
  updateAdvertiser,
} from "../../api/AdvertiserService";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AdvertiserNavBar from "../../components/navbar/AdvertiserNavBar";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./advForm.css";

const AdvertiserForm = ({ isUpdate, onSubmit }) => {
  const { id } = useParams();
  const location = useLocation();
  const advertiser = location.state?.advertiser;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: advertiser?.userName || "",
    email: advertiser?.email || "",
    password: "",
    website: advertiser?.website || "",
    hotline: advertiser?.hotline || "",
    companyProfile: {
      logo: advertiser?.companyProfile?.logo || "",
      companyName: advertiser?.companyProfile?.companyName || "",
      industry: advertiser?.companyProfile?.industry || "",
      description: advertiser?.companyProfile?.description || "",
      foundedYear: advertiser?.companyProfile?.foundedYear || "",
      employees: advertiser?.companyProfile?.employees || "",
      headquarters: {
        address: advertiser?.companyProfile?.headquarters?.address || "",
        city: advertiser?.companyProfile?.headquarters?.city || "",
        country: advertiser?.companyProfile?.headquarters?.country || "",
      },
      socialMedia: {
        linkedin: advertiser?.companyProfile?.socialMedia?.linkedin || "",
        twitter: advertiser?.companyProfile?.socialMedia?.twitter || "",
      },
      certifications: advertiser?.companyProfile?.certifications || [""],
      awards: advertiser?.companyProfile?.awards || [],
    },
    existingImage: advertiser?.companyProfile?.logo || null,
    currentLogo: advertiser?.companyProfile?.logo || null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (name === "companyProfile.employees") {
      // Convert value to number
      const numberValue = Number(value);

      // Check if the value is a valid number
      if (isNaN(numberValue) || numberValue < 0) {
        setError("Please enter a valid number for Employees.");
        return;
      } else {
        // Clear the error if valid
        setError("");
      }
    }
    if (name === "companyProfile.foundedYear") {
      const numberValue = Number(value);
      const currentYear = new Date().getFullYear();

      if (isNaN(numberValue)) {
        setError("Please enter a valid year.");
        return;
      } else {
        // Clear the error if valid
        setError("");
      }
    }

    setFormData((prevData) => {
      let updatedData = { ...prevData };

      keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
          acc[key] = value;
        } else {
          acc[key] = { ...acc[key] };
        }
        return acc[key];
      }, updatedData);

      return updatedData;
    });
  };

  // Handle dynamic input changes for certifications and awards
  const handleItemChange = (e, index, field, type) => {
    const { value } = e.target;

    setFormData((prevData) => {
      const updatedItems = [...prevData.companyProfile[type]];

      // Handle 'certifications' case (array of strings)
      if (type === "certifications") {
        updatedItems[index] = value; // Directly update the string value

        // Handle 'awards' case (array of objects with properties)
      } else if (type === "awards") {
        updatedItems[index] = {
          ...updatedItems[index], // Spread existing properties
          [field]: value, // Update the specific field (e.g., 'title', 'year', 'issuer')
        };
      }

      return {
        ...prevData,
        companyProfile: {
          ...prevData.companyProfile,
          [type]: updatedItems, // Update either certifications or awards
        },
      };
    });
  };

  // Handle adding a new certification or award
  const handleAddItem = (type) => {
    setFormData((prevData) => {
      const updatedItems = [...prevData.companyProfile[type], { title: "" }];
      return {
        ...prevData,
        companyProfile: {
          ...prevData.companyProfile,
          [type]: updatedItems,
        },
      };
    });
  };

  // Handle removing a certification or award
  const handleRemoveItem = (index, type) => {
    setFormData((prevData) => {
      const items = prevData.companyProfile[type] || [];

      // Only proceed if it's a valid array
      const updatedItems = Array.isArray(items)
        ? items.filter((_, i) => i !== index)
        : [];
      return {
        ...prevData,
        companyProfile: {
          ...prevData.companyProfile,
          [type]: updatedItems,
        },
      };
    });
  };

  const handleLogoChange = (info) => {
    if (info.fileList.length === 0) {
      setFormData((prevData) => ({
        ...prevData,
        currentLogo: null,
      }));
      return;
    }

    const file = info.file.originFileObj || info.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          currentLogo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBeforeUpload = (file) => {
    if (formData.currentLogo) {
      message.error("Only one logo can be uploaded.");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prevData) => ({
        ...prevData,
        currentLogo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleRemove = () => {
    setFormData((prevData) => ({
      ...prevData,
      currentLogo: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isUpdate) {
        // Call API to update the advertiser
        const advertiserData = { ...formData };

        // Only include the logo if it has been changed
        if (formData.currentLogo === formData.existingImage) {
          advertiserData.currentLogo = null;
          advertiserData.existingImage = null;
        }
        await updateAdvertiser(id, advertiserData);
        navigate(`/advertiser/${id}`);
      } else {
        // Call API to create a new advertiser
        await createAdvertiser(formData);
      }
      setSuccess("Advertiser updated successfully!");
      setError("");
    } catch (err) {
      setError(err.message || "An error occurred while updating.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdvertiserNavBar />
      <div
        class="dashboard__content_content"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name:</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Website:</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter your website URL"
            />
          </div>
          <div className="form-group">
            <label>Hotline:</label>
            <input
              type="tel"
              name="hotline"
              value={formData.hotline}
              onChange={handleChange}
              placeholder="Enter your hotline number"
            />
          </div>

          <div>
            <h3>Company Profile</h3>
            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                name="companyProfile.companyName"
                value={formData.companyProfile.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
            <div className="form-group">
              <label>Industry:</label>
              <input
                type="text"
                name="companyProfile.industry"
                value={formData.companyProfile.industry}
                onChange={handleChange}
                placeholder="Enter Industry"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="companyProfile.description"
                value={formData.companyProfile.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Founded Year:</label>
              <input
                type="text"
                name="companyProfile.foundedYear"
                value={formData.companyProfile.foundedYear}
                onChange={handleChange}
              />
            </div>
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label>Employees:</label>
              <input
                type="text"
                name="companyProfile.employees"
                value={formData.companyProfile.employees}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Headquarters Address:</label>
              <input
                type="text"
                name="companyProfile.headquarters.address"
                value={formData.companyProfile.headquarters.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="companyProfile.headquarters.city"
                value={formData.companyProfile.headquarters.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input
                type="text"
                name="companyProfile.headquarters.country"
                value={formData.companyProfile.headquarters.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <h4>Social Media</h4>
            <div className="form-group">
              <label>LinkedIn:</label>
              <input
                type="url"
                name="companyProfile.socialMedia.linkedin"
                value={formData.companyProfile.socialMedia.linkedin}
                onChange={handleChange}
                placeholder="Enter LinkedIn profile URL"
              />
            </div>
            <div className="form-group">
              <label>Twitter:</label>
              <input
                type="url"
                name="companyProfile.socialMedia.twitter"
                value={formData.companyProfile.socialMedia.twitter}
                onChange={handleChange}
                placeholder="Enter Twitter profile URL"
              />
            </div>
          </div>

          {/* Certifications and Awards */}
          <div>
            <h4>Certifications</h4>
            {formData.companyProfile.certifications.map((cert, index) => (
              <div key={index} className="cert-award-container">
                <input
                  type="text"
                  value={cert || ""}
                  onChange={(e) =>
                    handleItemChange(e, index, "", "certifications")
                  }
                  placeholder="Enter certification"
                />
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleRemoveItem(index, "certifications")}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-button"
              onClick={() => handleAddItem("certifications")}
            >
              Add Certification
            </button>
          </div>

          {/* Awards Section */}
          <div>
            <h4>Awards</h4>
            {formData.companyProfile.awards.map((award, index) => (
              <div key={index} className="cert-award-container">
                <input
                  type="text"
                  name={`companyProfile.awards[${index}].title`}
                  value={award.title}
                  onChange={(e) =>
                    handleItemChange(e, index, "title", "awards")
                  } // Specify 'title' for the awards field
                  placeholder="Award Title"
                />
                <input
                  type="number"
                  name={`companyProfile.awards[${index}].year`}
                  value={award.year || ""} // Handle undefined case for year
                  onChange={(e) => handleItemChange(e, index, "year", "awards")} // Specify 'year' for the awards field
                  placeholder="Year"
                />
                <input
                  type="text"
                  name={`companyProfile.awards[${index}].issuer`}
                  value={award.issuer || ""} // Handle undefined case for issuer
                  onChange={(e) =>
                    handleItemChange(e, index, "issuer", "awards")
                  } // Specify 'issuer' for the awards field
                  placeholder="Issuer"
                />
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleRemoveItem(index, "awards")}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-button"
              onClick={() => handleAddItem("awards")}
            >
              Add Award
            </button>
          </div>

          <div className="form-group">
            <label>Logo:</label>
            <Upload
              name="logo"
              listType="picture"
              accept=".png,.jpeg,.jpg"
              beforeUpload={handleBeforeUpload} // Prevent multiple uploads
              onChange={handleLogoChange}
              onRemove={handleRemove} // Allow removal of the logo
              fileList={
                formData.currentLogo
                  ? [
                      {
                        uid: "-1",
                        name: "logo.png",
                        status: "done",
                        url: formData.logo,
                      },
                    ]
                  : []
              } // Ensure only one file is shown
            >
              {!formData.currentLogo && (
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
                  Upload Logo
                </Button>
              )}
            </Upload>
            {formData.currentLogo && (
              <img
                src={formData.currentLogo}
                alt="Company Logo"
                className="company-logo-preview"
              />
            )}{" "}
            {/* Display logo preview if present */}
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : isUpdate ? "Update" : "Submit"}
            </button>
          </div>

          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </>
  );
};

export default AdvertiserForm;
