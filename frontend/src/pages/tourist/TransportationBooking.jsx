/* eslint-disable react/prop-types */
import { Modal } from 'antd';
import { useState } from "react";
import bg from '../../assets/images/bg.png';
import front from '../../assets/images/1.png';

const TransportationBookingPopUp = ({ setDoneBookTransportation, setIsBookedAccepted }) => {

  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  const handleCancel = () => {
    setIsBookedAccepted(false);
    setOpen(false);
    setDoneBookTransportation(true);
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={[]}
      >
        <section className="cta -type-1 " >
          <div className="cta__bg" >
            <img src={bg} alt="background" />
          </div>
          <div className="container" >
            <div className="row justify-between">
              <div className="col-xl-5 col-lg-6">
                <div className="cta__content">
                  <h2
                    data-aos="fade-up"
                    data-aos-delay=""
                    className="text-47 md:text-28 lh-13 text-white"
                  >
                    Transport from
                    <br className="lg:d-none" />
                    and to the Airport
                  </h2>

                  <p
                    data-aos="fade-up"
                    data-aos-delay=""
                    className="mt-10 text-white"
                  >
                    Book your transportation from and to the Airport
                    <br className="lg:d-none" />
                    FREE
                  </p>

                  <div className="mt-10">
                    <div className="singleInput -type-2 row x-gap-10 y-gap-10">
                      <div className="col-md-auto col-12">
                        <button
                          data-aos="fade-right"
                          data-aos-delay=""
                          className="button -md -accent-1 bg-white col-12 text-accent-2"
                          onClick={() => {
                            setIsBookedAccepted(true);
                            setOpen(false);
                            setDoneBookTransportation(true);
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="cta__image">
                  <img src={front} alt="image" />
                </div>
              </div>
            </div>
          </div>
        </section >
      </Modal >
    </>
  );
};
export default TransportationBookingPopUp;


