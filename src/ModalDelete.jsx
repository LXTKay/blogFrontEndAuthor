export default function ModalDelete(props) {
  function closeModal() {
    const modal = document.querySelector("#modalDelete");
    modal.close();
  }
  return (
    <dialog id="modalDelete">
      <p>Do you really want to delete this Post?</p>
      <button onClick={props.deleteFunction}>Yes</button>
      <button onClick={closeModal}>No</button>
    </dialog>
  )
};