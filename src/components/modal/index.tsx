import { deleteDoc, DocumentReference, DocumentData } from "firebase/firestore";

import "./style.css";

export function DeleteConfirmationModal({
  docRef,
  setIsModalOpen,
}: {
  docRef: DocumentReference<DocumentData>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="modal-background | flex flex-justify-center flex-align-center">
      <div className="modal | bg-primary-100 flex flex-column gap-2">
        <h2 className="fs-600 fw-bold">
          Are you sure you want to delete this comment?
        </h2>

        <p>This cannot be undone</p>

        <div className="modal__btn-panel | gap-1">
          <button
            type="button"
            onClick={() => deleteDoc(docRef)}
            className="btn-small btn--danger border border--danger"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="btn-small btn--accent border border--accent"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
