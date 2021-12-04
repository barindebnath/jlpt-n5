import { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

type SettingsProps = {
  open: boolean;
  handleClose: () => void;
};

const Settings = ({ open, handleClose }: SettingsProps) => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <BoxStyled>
        <FormGroup>
          <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label='Kanji' />
          <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label='Romaji' />
          <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label='Discription' />
          <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label='Type' />
        </FormGroup>
      </BoxStyled>
    </Modal>
  );
};

export default Settings;

const BoxStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  padding: "1rem",
  width: "70%",
  maxWidth: "15rem",
  borderRadius: "1rem",
}));
