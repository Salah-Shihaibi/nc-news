import React from "react";
import { Button } from "@mui/material";

export const DeleteOption = ({ itemName, deleteFunc, setShow }) => {
  return (
    <div className="container_global delete_card">
      <p className="article_title center_text">
        Are you sure you want to delete this {itemName}?
      </p>
      <div>
        <Button
          type="submit"
          variant="contained"
          className="cancel mr-2"
          onClick={deleteFunc}
        >
          Delete
        </Button>
        <Button variant="contained" type="button" onClick={setShow}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
