import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dasboard/Sidebar";
import MetaComponent from "@/components/common/MetaComponent";
import SellerHeader from "@/components/layout/header/SellerHeader";
import FooterThree from "@/components/layout/footers/FooterThree";
import { requestAccountDeletion } from "../../api/RequestService";
import { Form, message, Upload } from "antd";
import { getUserData } from "@/api/UserService";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Spinner from "@/components/common/Spinner";
import { changeSellerPassword, getSellerDetails, updateSeller } from "@/api/SellerService";

const metadata = {
  title: "Profile || Tripal",
};

export default function Profile() {
  const [userData, setUserData] = useState("");
  const [userRole, setUserRole] = useState("");
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [profileInformation, setProfileInformation] = useState({});
  const [initialLogo, setInitialLogo] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserData();
        setUserData(user.data.id);
        setUserRole(user.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [PasswordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handlePasswordInput = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [editedProfile, setEditedProfile] = useState({
    email: "",
    description: "",
    logo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    try {
      if (PasswordForm.newPassword.length < 6) {
        message.error("Password must be at least 6 characters long");
        return;
      }
      if (PasswordForm.newPassword !== PasswordForm.confirmPassword) {
        message.error("Passwords don't match");
        return;
      }

      await changeSellerPassword(PasswordForm.oldPassword, PasswordForm.newPassword);
      message.success("Password changed successfully");

    } catch (error) {
      message.error(
        error.response?.data?.error || "Failed to change password"
      );
      console.error("Password change error:", error);
    }
  };
  const handleEditClick = async () => {
    try {
      await updateSeller(editedProfile);
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  const getUserInformation = async () => {
    try {
      const response = await getSellerDetails();

      setProfileInformation(response.data);
      setEditedProfile({
        email: response.data.email,
        description: response.data.description,
        logo: response.data.logo || "",
      });
      setInitialLogo(response.data.logo || "");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDeletion = async () => {
    try {
      const response = await requestAccountDeletion();
      message.success(response.message);
      navigate("/login");
    } catch (error) {
      message.warning(error.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  const handleLogoChange = (info) => {
    if (info.fileList.length === 0) {
      setEditedProfile({ ...editedProfile, logo: null });
      return;
    }

    const file = info.file.originFileObj || info.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedProfile({ ...editedProfile, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBeforeUpload = (file) => {
    if (editedProfile.logo) {
      message.error("Only one logo can be uploaded.");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setEditedProfile({ ...editedProfile, logo: reader.result });
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleRemove = () => {
    setEditedProfile({ ...editedProfile, logo: null });
  };

  if (loading) {
    return <Spinner />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="page-wrapper">
        <SellerHeader />
        <main className="page-content">
          <div
            className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""
              } js-dashboard`}
          >
            <Sidebar setSideBarOpen={setSideBarOpen} />
            <div className="dashboard__content">
              <div className="dashboard__content_content">
                <h2>Profile</h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>{profileInformation.userName}</h5>
                </div>

                <div className="mt-50 rounded-12 bg-white shadow-2 px-40 pt-40 pb-30">
                  <h5 className="text-20 fw-500 mb-30">Profile Details</h5>

                  <div className="contactForm row y-gap-30">
                    <div className="col-md-6">
                      <div className="form-input">
                        <input
                          type="text"
                          name="userName"
                          value={profileInformation.userName}
                          readOnly
                        />
                        <label className="lh-1 text-16 text-light-1">
                          Username
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-input">
                        <input
                          type="text"
                          name="email"
                          value={editedProfile.email}
                          onChange={handleInputChange}
                        />
                        <label className="lh-1 text-16 text-light-1">
                          Email
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-input description-width">
                        <input
                          type="text"
                          name="description"
                          value={editedProfile.description}
                          onChange={handleInputChange}
                        />
                        <label className="lh-1 text-16 text-light-1 description-height">
                          Description
                        </label>
                      </div>
                    </div>

                    <Form.Item name="logo">
                      {/* logo */}

                      <div className="col-12">
                        <Upload
                          name="logo"
                          listType="picture"
                          accept=".png,.jpeg,.jpg"
                          beforeUpload={handleBeforeUpload}
                          onChange={handleLogoChange}
                          onRemove={handleRemove}
                          fileList={
                            editedProfile.logo
                              ? [
                                {
                                  uid: "-1",
                                  name: "logo.png",
                                  status: "done",
                                  url: editedProfile.logo,
                                },
                              ]
                              : []
                          }
                        >
                          {editedProfile.logo ? (
                            <div className="uploaded-image-container">
                              <img
                                alt="uploaded logo"
                                src={editedProfile.logo}
                                className="size-200 rounded-12 bg-light-purple1 flex-center flex-column"
                              />
                            </div>
                          ) : (
                            <div className="col-auto">
                              <label
                                htmlFor="imageInp2"
                                className="size-200 rounded-12 border-dash-2 bg-light-purple1 flex-center flex-column"
                              >
                                <img
                                  alt="image"
                                  src={"/img/dashboard/upload.svg"}
                                />
                                <div className="text-16 fw-500 dark-purple mt-10">
                                  Upload Logo
                                </div>
                              </label>
                            </div>
                          )}
                        </Upload>
                      </div>
                    </Form.Item>

                    <div className="col-12">
                      <div className="d-flex justify-between mt-30">
                        <button
                          onClick={handleEditClick}
                          className="button -md -dark-1"
                        >
                          Save Changes
                          <i className="icon-arrow-top-right text-16 ml-10"></i>
                        </button>
                        <button
                          className="button -md -dark-1 delete-btn"
                          onClick={handleDeletion}
                        >
                          Delete Account
                          <i className="icon-delete text-20 ml-10"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-30">
                  <h5 className="text-20 fw-500 mb-30">Change Password</h5>

                  <div className="contactForm y-gap-30">
                    <div className="row y-gap-30">
                      <div className="col-md-6">
                        <div className="form-input">
                          <input
                            type={
                              showPassword.oldPassword ? "text" : "password"
                            }
                            name="oldPassword"
                            value={PasswordForm.oldPassword}
                            onChange={handlePasswordInput}
                            required
                            minLength={6}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            Old password
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              togglePasswordVisibility("oldPassword")
                            }
                            className="password-toggle"
                          >
                            {showPassword.oldPassword ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </button>
                          <style>{`
                            .form-input {
                              position: relative;
                            }
                            .password-toggle {
                              position: absolute;
                              right: 10px;
                              top: 50%;
                              transform: translateY(-50%);
                              background: none;
                              border: none;
                              cursor: pointer;
                              color: var(--color-stone);
                              z-index: 2;
                              padding: 5px;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                            }
                            .password-toggle:hover {
                              color: var(--color-stone-light);
                            }
                            .form-input input {
                              padding-right: 40px;
                            }
                          `}</style>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-input">
                          <input
                            type={
                              showPassword.newPassword ? "text" : "password"
                            }
                            name="newPassword"
                            value={PasswordForm.newPassword}
                            onChange={handlePasswordInput}
                            required
                            minLength={6}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            New password
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              togglePasswordVisibility("newPassword")
                            }
                            className="password-toggle"
                          >
                            {showPassword.newPassword ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-input">
                          <input
                            type={
                              showPassword.confirmPassword ? "text" : "password"
                            }
                            name="confirmPassword"
                            value={PasswordForm.confirmPassword}
                            onChange={handlePasswordInput}
                            required
                            minLength={6}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            Confirm new password
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              togglePasswordVisibility("confirmPassword")
                            }
                            className="password-toggle"
                          >
                            {showPassword.confirmPassword ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <button
                          className="button -md -dark-1"
                          onClick={handleChangePassword}
                        >
                          Save Changes
                          <i className="icon-arrow-top-right text-16 ml-10"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <FooterThree />
      </div>

      <style jsx global>{`
        :root {
          --color-dark-purple: #8f5774;
          --color-light-purple: #dac4d0;
          --color-pink: #e0829d;
          --color-stone: #036264;
          --color-stone-light: #5a9ea0;
          --color-footer: #e5f8f8;
        }

        /* Form Inputs */
        .contactForm .form-input {
          position: relative;
          margin-bottom: 20px;
        }

        .contactForm .form-input label {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          transition: 0.3s ease;
          color: #aaa;
          z-index: 1;
          background: white;
          padding: 0 5px;
        }

        .contactForm .form-input input:focus + label,
        .contactForm .form-input textarea:focus + label,
        .contactForm .form-input input:not(:placeholder-shown) + label,
        .contactForm .form-input textarea:not(:placeholder-shown) + label,
        .contactForm .form-input input.filled + label,
        .contactForm .form-input textarea.filled + label,
        .form-input .ant-select-focused + label,
        .form-input .ant-select-selection-item + label,
        .form-input .ant-select-open + label,
        .form-input .ant-select-selection-placeholder + label {
          transform: translateY(-29px);
          font-size: 12px;
          color: var(--color-stone);
        }

        .contactForm .form-input input,
        .contactForm .form-input textarea {
          padding: 10px;
          font-size: 16px;
          width: 100%;
          border: 1px solid var(--color-light-purple);
          outline: none;
          border-radius: 8px;
          height: 64x;
        }

        .contactForm .form-input input,
        .contactForm .form-input textarea {
          padding: 10px;
          font-size: 16px;
          width: 100%;
          border: 1px solid var(--color-light-purple);
          outline: none;
          border-radius: 8px;
        
        }

        .description-width{ 
          width:205%;
         
         
        }

        .description-height{ 
           transform: translateY(-50px);
        }

        /* Select Styles */
        .styled-select,
        .styled-multi-select {
          width: 100%;
        }

        .styled-select .ant-select-selector,
        .styled-multi-select .ant-select-selector {
          height: 44px !important;
          padding: 5px 10px !important;
          font-size: 16px !important;
          border: 1px solid var(--color-light-purple) !important;
          border-radius: 8px !important;
          background-color: white !important;
        }

        .styled-multi-select .ant-select-selector {
          min-height: 44px !important;
          height: auto !important;
          padding: 4px 8px !important;
        }

        .styled-select .ant-select-selection-search-input,
        .styled-multi-select .ant-select-selection-search-input {
          height: 42px !important;
        }

        .styled-select .ant-select-selection-item,
        .styled-multi-select .ant-select-selection-item {
          line-height: 32px !important;
          color: var(--color-stone) !important;
        }

        .styled-multi-select .ant-select-selection-overflow {
          padding: 4px 0;
        }

        .styled-multi-select .ant-select-selection-item {
          height: 32px !important;
          background-color: var(--color-footer) !important;
          border-color: var(--color-stone-light) !important;
          border-radius: 6px !important;
          padding: 0 10px !important;
          margin: 4px !important;
          display: flex !important;
          align-items: center !important;
        }

        .styled-select:hover .ant-select-selector,
        .styled-multi-select:hover .ant-select-selector {
          border-color: var(--color-stone) !important;
        }

        .styled-select.ant-select-focused .ant-select-selector,
        .styled-multi-select.ant-select-focused .ant-select-selector {
          border-color: var(--color-stone) !important;
          box-shadow: 0 0 0 2px rgba(3, 98, 100, 0.1) !important;
        }

        .styled-select-dropdown,
        .styled-multi-dropdown {
          padding: 6px !important;
          border-radius: 8px !important;
        }

        .styled-select-dropdown .ant-select-item,
        .styled-multi-dropdown .ant-select-item {
          padding: 8px 12px !important;
          color: var(--color-stone) !important;
          border-radius: 6px !important;
        }

        .styled-select-dropdown .ant-select-item-option-selected,
        .styled-multi-dropdown .ant-select-item-option-selected {
          background-color: var(--color-footer) !important;
          font-weight: 500 !important;
        }

        .styled-select-dropdown .ant-select-item-option-active,
        .styled-multi-dropdown .ant-select-item-option-active {
          background-color: var(--color-light-purple) !important;
        }

        /* Points Container */
        .points-container {
          display: flex;
          gap: 5px;
        }

        .points-container .form-input {
          flex: 2;
          margin-bottom: 0;
        }

        /* Button Styles */
        .button.-md.-dark-1 {
          background-color: var(--color-stone) !important;
          border: none;
          height: 44px !important;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
          color: white !important;
          cursor: pointer;
        }

        .button.-md.-dark-1:hover {
          background-color: var(--color-stone-light) !important;
        }

        .button.-md.-dark-1.delete-btn {
          background-color: var(--color-pink) !important;
        }

        .button.-md.-dark-1.delete-btn:hover {
          background-color: var(--color-dark-purple) !important;
        }

        /* Section Headers */
        .section-header {
          color: var(--color-stone);
          margin: 20px 0 10px;
          font-size: 16px;
        }

        /* Clear Icon */
        .ant-select-clear {
          background: white !important;
          color: var(--color-stone) !important;
        }

        /* Remove Tag Icon */
        .ant-select-selection-item-remove {
          color: var(--color-stone) !important;
          font-size: 12px !important;
          margin-left: 4px !important;
        }

        /* Dropdown Arrow */
        .ant-select-arrow {
          color: var(--color-stone) !important;
        }

        /* Empty Content */
        .ant-select-empty {
          color: #aaa !important;
          padding: 10px !important;
        }
      `}</style>
    </>
  );
}
