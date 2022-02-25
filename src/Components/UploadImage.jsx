import { Button } from "@mui/material";

export const UploadImage = ({ setImageUrl }) => {
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  return (
    <>
      <Button variant="contained" component="label">
        Upload Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileInputChange}
        />
      </Button>
    </>
  );
};
