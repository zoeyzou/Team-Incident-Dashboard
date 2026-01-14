import { useDispatch, useSelector } from "react-redux";
import { RootState } from "/store/index";
import { IncidentForm } from "../incidents/ui/incidentForm";
import Modal from "/ui/Modal";
import { closeModal } from "./modalSlice";

const GlobalModal = () => {
  const dispatch = useDispatch();
  const { type, title, props } = useSelector(
    (state: RootState) => state.ui.modal,
  );

  if (!type) return null;

  const handleClose = () => dispatch(closeModal());

  const content = {
    incidentForm: <IncidentForm onClose={handleClose} {...props} />,
  }[type];

  return (
    <Modal isOpen={true} onClose={handleClose} title={title}>
      {content}
    </Modal>
  );
};

export default GlobalModal;
