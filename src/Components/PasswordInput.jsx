import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const PasswordInput = ({
  password,
  setPassword,
  label,
  defaultText,
}) => {
  const [showPassword, setShowPassword] = useState("");
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl sx={{ m: 1, width: "100%" }} required variant="outlined">
      <InputLabel htmlFor={"outlined-adornment-password" + label}>
        {defaultText}
      </InputLabel>
      <OutlinedInput
        id={"outlined-adornment-password" + label}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(event) => {
          setPassword(event.target.value, label);
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((curr) => !curr)}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
};
