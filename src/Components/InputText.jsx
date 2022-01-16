import { TextField } from "@mui/material";

export const InputText = ({
  labeling,
  val,
  onChangeFun,
  width = "100%",
  initialText = "",
}) => {
  if (!initialText) initialText = labeling;
  return (
    <TextField
      sx={{ width }}
      onChange={(event) => {
        onChangeFun(event.target.value, labeling);
      }}
      value={val}
      margin="normal"
      required
      label={initialText}
      name={labeling}
      autoComplete={labeling}
      autoFocus
    />
  );
};
