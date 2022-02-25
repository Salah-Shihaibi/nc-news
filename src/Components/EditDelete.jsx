import { useContext } from "react";
import { LoggedIn } from "../contexts/LoggedIn";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

export const EditDelete = ({ url, author, setDeleting, editFunc }) => {
  const navigate = useNavigate();
  const { user } = useContext(LoggedIn);

  return (
    <>
      <div className={`edit_delete width100`}>
        {author === user.username ? (
          <>
            <DeleteOutlineIcon
              className="red point"
              onClick={() => {
                setDeleting(true);
              }}
            />
            <EditOutlinedIcon
              className="blue point"
              onClick={() => (url ? navigate(url) : editFunc())}
            />
          </>
        ) : null}
      </div>
    </>
  );
};
