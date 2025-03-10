import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { formatDate } from "../../../utils/helpers";

import { InterviewsService } from "../../../services/InterviewsService";

import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import { FiX } from "react-icons/fi";

function InterviewCard({ interview }) {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const interviewsService = new InterviewsService();

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => interviewsService.deleteInterview(id),
    onSuccess: () => {
      alert("Success");
      queryClient.invalidateQueries([`job_${interview.jobAdvertisementId}`]);
      queryClient.invalidateQueries([`interviews`]);
      setOpenModal(false);
    },
    onError: (err) => alert(err.message),
  });

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
        disabled={isPending}
        className="gap-0.5 p-1 sm:p-2 text-xs sm:text-sm flex items-center justify-center"
      >
        <FiX />
      </Button>
      {openModal && (
        <Modal
          onCancel={() => setOpenModal(false)}
          onConfirm={() => mutate(interview._id)}
        >
          Are you sure you want to delete?
        </Modal>
      )}
    </div>
  );
}

export default InterviewCard;
