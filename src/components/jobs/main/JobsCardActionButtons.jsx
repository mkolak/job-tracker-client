import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { jobsStore } from "../../../stores/JobsStore";

import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import { FiX } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

const style = "gap-0.5 py-2 w-2/5 text-sm flex items-center justify-center";

function JobsCardActionButtons({ show, id }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

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
        disabled={jobsStore.isLoading}
      >
        <FiX />
        Delete
      </Button>
      {openModal && (
        <Modal
          onCancel={() => setOpenModal(false)}
          onConfirm={() => jobsStore.deleteJob(id)}
        >
          Are you sure you want to delete?
        </Modal>
      )}
    </div>
  );
}

export default observer(JobsCardActionButtons);
