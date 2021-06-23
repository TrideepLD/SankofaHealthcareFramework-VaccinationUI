import { Modal } from "carbon-components-react";
import React from "react";

import ConfirmationContent from "../ConfirmationContent";

/*
  View Detail modal component

  Handles display of modal contents - Data related to the selected vaccination record

*/

const ViewDetails = ({ currentPatient, openModal, setOpenModal }) => {
  const closeModal = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };

  return (
    <>
      {currentPatient && (
        <Modal
          open={openModal}
          modalHeading="View Vaccination Request"
          primaryButtonText="Close"
          secondaryButtonText={null}
          onRequestClose={(e) => closeModal(e)}
          onRequestSubmit={(e) => closeModal(e)}
        >
          <ConfirmationContent patientDetails={currentPatient} />
        </Modal>
      )}
    </>
  );
};

export default ViewDetails;
