import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { JobsService } from "../../../services/JobsService";

import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import { FiX } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

const style = "gap-0.5 py-2 w-2/5 text-sm flex items-center justify-center";

function JobsCardActionButtons({ show, id }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const jobsService = new JobsService();

  const { isPending, mutate } = useMutation({
    mutationFn: async (id) => await jobsService.deleteJob(id),
    onSuccess: () => {
      alert("Success");
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["interviews"]);
      queryClient.invalidateQueries(["monthly"]);
      queryClient.invalidateQueries(["status"]);
      navigate("/jobs");
    },
    onError: (err) => alert(err.message),
  });

  function onDelete() {
    setOpenModal(true);
  }

  function onEdit() {
    navigate(`/manage/${id}`);
  }

  return (
    <div className={`flex justify-center gap-1 ${show ? "" : "hidden"}`}>
      <Button type="primary" className={style} action={onEdit}>
        <FiEdit />
        Edit
      </Button>
      <Button
        type="danger"
        className={style}
        action={onDelete}
        disabled={isPending}
      >
        <FiX />
        Delete
      </Button>
      {openModal && (
        <Modal
          onCancel={() => setOpenModal(false)}
          onConfirm={() => mutate(id)}
        >
          Are you sure you want to delete?
        </Modal>
      )}
    </div>
  );
}

export default JobsCardActionButtons;
