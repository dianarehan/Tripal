import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import AddressForm from "./components/AddressForm";
import PaymentForm from "./components/PaymentForm";
import AppTheme from "./shared-theme/AppTheme";
import Info from "./components/Info";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/layout/header/TouristHeader";
import Footer from "../../components/layout/footers/FooterThree";
import { createOrder } from "@/api/OrderService";
import { loadStripe } from "@stripe/stripe-js";
import { message, Modal } from "antd";
import { getWalletAndTotalPoints } from "@/api/TouristService";
import { AlertCircle } from "lucide-react";
import {
  getTouristCurrency,
  getConversionRate,
} from "@/api/ExchangeRatesService";

const steps = ["Shipping address", "Payment details"];

export default function Checkout(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState(null);
  const [discount, setDiscount] = useState(0.0);
  const [paymentType, setPaymentType] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [order,setOrder] = useState(null);
  const [currency, setCurrency] = useState("EGP");
  const [exchangeRate, setExchangeRate] = useState(1);

  const getExchangeRate = async () => {
    if (currency) {
      try {
        const rate = await getConversionRate(currency);
        setExchangeRate(rate);
      } catch (error) {
        message.error("Failed to fetch exchange rate.");
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCurrency = getTouristCurrency();
      setCurrency(newCurrency);
      getExchangeRate();
    }, 1);
    return () => clearInterval(intervalId);
  }, [currency]);

  const cart = location.state?.cart || [];
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [isWalletInfoModalVisible, setWalletInfoModalVisible] = useState(false);
  const [updatedWalletInfo, setUpdatedWalletInfo] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const stripePromise = loadStripe(
    "pk_test_51QOIg6DNDAJW9Du6kXAE0ci4BML4w4VbJFTY5J0402tynDZvBzG85bvKhY4C43TbOTzwoGiOTYeyC59d5PVhAhYy00OgGKWbLb"
  );

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const data = await getWalletAndTotalPoints();
        setUpdatedWalletInfo(data.wallet);
        setTotalPoints(data.totalPoints);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchWalletData();
  }, []);

  const handleNextAddress = (newAddress) => {
    setAddress(newAddress);
    setActiveStep(activeStep + 1);
  };

  const processCreditCardPayment = async (orderData) => {
    try {
      const stripe = await stripePromise;
      console.log("Redirecting to Stripe...");
      const response = await createOrder(orderData);
      const sessionId = response?.sessionId;
      setOrder(response.order);      
      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe redirection error:", error);
          message.error("Failed to redirect to payment. Please try again.");
        }
      } else {
        console.error("Session ID not received.");
        message.error("Failed to initiate payment session.");
      }
    } catch (error) {
      console.error("Error processing credit card payment:", error.message);
      message.error("Payment processing failed. Please try again.");
    }
  };

  const showConfirmationModal = () => setConfirmationModalVisible(true);
  const cancelConfirmationModal = () => setConfirmationModalVisible(false);

  const showWalletInfoModal = () => setWalletInfoModalVisible(true);
  const closeWalletInfoModal = () => setWalletInfoModalVisible(false);

  const processWalletPayment = async (orderData) => {
    console.log("Deducting from wallet...");
    try {
      const response = await createOrder(orderData);
      setOrder(response.order);
        } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error(
          "There was an issue processing your payment. Please try again."
        );
      }
      return;
    }
    message.success("Payment with wallet successful!");
    setActiveStep(activeStep + 1);
  };
  const handleConfirmPayment = async () => {
    cancelConfirmationModal();
    const orderData = {
      deliveryAddress: address,
      paymentMethod: "Wallet",
      discountPercentage: discount,
    };
    await processWalletPayment(orderData);
  };

  const processCashOnDelivery = async (orderData) => {
    console.log("Proceeding with cash on delivery...");
    const response = await createOrder(orderData);
    setOrder(response.order);
    setActiveStep(activeStep + 1);
  };

  const handleNextPayment = async (newPaymentType) => {
    setPaymentType(newPaymentType);
    const orderData = {
      deliveryAddress: address,
      paymentMethod: newPaymentType,
    };

    try {
      if (newPaymentType === "Credit Card") {
        await processCreditCardPayment(orderData);
      } else if (newPaymentType === "Wallet") {
        showConfirmationModal();
      } else if (newPaymentType === "Cash on Delivery") {
        await processCashOnDelivery(orderData);
      }
    } catch (error) {
      message.error("Failed to create the order. Please try again.");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm onNext={handleNextAddress} />;
      case 1:
        return (
          <PaymentForm onNext={handleNextPayment} onApplyPromo={setDiscount} />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <div className="page-wrapper">
      <AppTheme {...props}>
        <Header />
        <main className="page-content-hana">
          <Grid
            container
            sx={{
              height: "auto",
              mt: {
                xs: 4,
                sm: 0,
              },
              marginBottom: "8%",
            }}
          >
            <Grid
              item
              xs={12}
              sm={5}
              lg={4}
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                backgroundColor: "#8f5774",
                borderRight: { sm: "none", md: "1px solid" },
                borderColor: { sm: "none", md: "divider" },
                alignItems: "start",
                pt: 16,
                px: 10,
                gap: 4,
                width: "300px",
                position: "relative",
                marginTop: "1.3%",
                height: "auto",
                marginBottom: "-8%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  width: "100%",
                  maxWidth: "none",
                  height: "auto",
                }}
              >
                <Info
                  totalPrice={"0"}
                  cart={cart}
                  currency={currency}
                  exchangeRate={exchangeRate}
                  promo={discount}
                />
              </Box>
            </Grid>

            <Grid
              item
              sm={12}
              md={7}
              lg={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "100%",
                width: "100%",
                backgroundColor: { xs: "transparent" },
                alignItems: "start",
                pt: { xs: 0, sm: 16 },
                px: { xs: 2, sm: 10 },
                gap: { xs: 4, md: 8 },
                marginTop: "3%",
                marginLeft: "0%",
                flexGrow: 1,
                height: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { sm: "space-between", md: "flex-end" },
                  alignItems: "center",
                  width: "100%",
                  maxWidth: { sm: "100%", md: 600 },
                  height: "auto",
                }}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexGrow: 1,
                    height: "auto",
                  }}
                >
                  <Stepper
                    id="desktop-stepper"
                    activeStep={activeStep}
                    sx={{ width: "100%", height: 40 }}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  width: "100%",
                  maxWidth: { sm: "100%", md: 600 },
                  gap: { xs: 5, md: "none" },
                  height: "auto",
                }}
              >
                {activeStep === steps.length ? (
                  <Stack spacing={2} useFlexGap>
                    <Typography variant="h1">📦</Typography>
                    <Typography variant="h5">
                      Thank you for your order!
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Your order number is <strong>&nbsp;#{order._id.slice(-6)}</strong>. We
                      have emailed your order confirmation and will update you
                      once it's shipped.
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        alignSelf: "start",
                        width: { xs: "100%", sm: "auto" },
                      }}
                      onClick={() => {
                        navigate("/orders");
                      }}
                    >
                      Go to my orders
                    </Button>
                  </Stack>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column-reverse", sm: "row" },
                        alignItems: "end",
                        flexGrow: 1,
                        gap: 1,
                        pb: { xs: 12, sm: 0 },
                        mt: { xs: 2, sm: 0 },
                        mb: "60px",
                        justifyContent: "space-between",
                      }}
                    >
                      {activeStep !== 0 && (
                        <Button
                          startIcon={<ChevronLeftRoundedIcon />}
                          onClick={handleBack}
                          variant="text"
                          sx={{
                            display: { xs: "none", sm: "flex" },
                            position: "relative",
                            top: "-210%",
                          }}
                        >
                          Previous
                        </Button>
                      )}
                    </Box>
                  </React.Fragment>
                )}
              </Box>
            </Grid>
          </Grid>
          <Modal
            visible={isConfirmationModalVisible}
            onOk={handleConfirmPayment}
            onCancel={cancelConfirmationModal}
            okText="Yes, Pay"
            cancelText="Cancel"
            className="custom-confirmation-modal"
            okButtonProps={{
              className: "bg-[#036264] hover:bg-[#04494b] text-white",
              style: { backgroundColor: "#036264", color: "white" },
            }}
            cancelButtonProps={{
              className: "text-gray-600 hover:text-gray-800",
            }}
          >
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <AlertCircle className="text-[#036264] w-12 h-12" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Confirm Payment
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to proceed with this payment? Please
                  review the details before confirming.
                </p>
              </div>
            </div>
          </Modal>
          <Modal
            title={null}
            visible={isWalletInfoModalVisible}
            onOk={closeWalletInfoModal}
            footer={null}
            closeIcon={
              <div className="modal-close-icon" onClick={closeWalletInfoModal}>
                ✕
              </div>
            }
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              width: "350px",
              borderRadius: "12px",
              overflow: "hidden",
            }}
            bodyStyle={{
              backgroundColor: "#ffffff",
              color: "#333",
              textAlign: "center",
              padding: "30px 20px",
            }}
          >
            <div className="wallet-modal-content">
              <p>
                <strong>New Wallet Balance:</strong>{" "}
                {updatedWalletInfo?.amount
                  ? updatedWalletInfo.amount.toLocaleString()
                  : "0"}{" "}
                {updatedWalletInfo?.wallet?.currency}
              </p>
              <p>
                <strong>Total Points:</strong>{" "}
                {totalPoints ? totalPoints.toLocaleString() : "0"} points!
              </p>
            </div>
          </Modal>
          <Footer />
        </main>
      </AppTheme>
    </div>
  );
}
