import { Popup } from "./Popup";
import { DeleteOption } from "./DeleteOption";

export const DeletePopup = ({
  deleting,
  setDeleting,
  deleteFunc,
  itemName,
}) => {
  return (
    <>
      {deleting ? (
        <div className="parent">
          <Popup
            setShow={() => {
              setDeleting(false);
            }}
          >
            <DeleteOption
              setShow={() => {
                setDeleting(false);
              }}
              itemName={itemName}
              deleteFunc={deleteFunc}
            ></DeleteOption>
          </Popup>
        </div>
      ) : null}
    </>
  );
};
