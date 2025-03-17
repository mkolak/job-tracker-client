import { useState } from "react";
import { formatDate } from "../../../utils/helpers";

import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import { FiX } from "react-icons/fi";
import { observer } from "mobx-react-lite";
import { interviewsStore } from "../../../stores/InterviewsStore";

function InterviewCard({ interview }) {
  const [openModal, setOpenModal] = useState(false);

  function onDelete() {
    setOpenModal(true);
  }

  return (
    <div className="bg-white p-1 sm:p-4 lg:p-6 rounded-lg shadow-lg border border-teal-600 border-opacity-35 flex relative items-center justify-between h-24 w-3/4">
      <div className="flex flex-col">
        <h3 className="text-sm sm:text-lg font-semibold text-gray-800">
          {interview.title}
        </h3>
        <h2 className="text-xs sm:text-md italic text-gray-600">
          {formatDate(interview.datetime)}
        </h2>
      </div>
      <Button
        type="danger"
        action={onDelete}
        disabled={interviewsStore.isLoading}
        className="gap-0.5 p-1 sm:p-2 text-xs sm:text-sm flex items-center justify-center"
      >
        <FiX />
      </Button>
      {openModal && (
        <Modal
          onCancel={() => setOpenModal(false)}
          onConfirm={() => interviewsStore.deleteInterview(interview._id)}
        >
          Are you sure you want to delete?
        </Modal>
      )}
    </div>
  );
}

export default observer(InterviewCard);
