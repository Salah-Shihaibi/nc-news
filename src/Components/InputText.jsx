import { TextField } from "@mui/material";

export const InputText = ({ labeling, val, onChangeFun }) => {
  console.log(labeling, val);
  return (
    <TextField
      className="width100"
      onChange={(event) => {
        onChangeFun(event.target.value, labeling);
      }}
      value={val}
      margin="normal"
      required
      label={labeling}
      name={labeling}
      autoComplete={labeling}
      autoFocus
    />
  );
};
