import styled from "styled-components";
//mui
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type SettingsProps = {
  open: boolean;
  handleClose: () => void;
  showHide: { kanji: boolean; romaji: boolean; kana: boolean; discription: boolean; type: boolean };
  handelShowHide: (key: string, value: boolean) => void;
};

const Settings = ({ open, handleClose, showHide, handelShowHide }: SettingsProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <BoxStyled>
        <Typography style={{ fontSize: ".8rem" }} gutterBottom>
          Show Hide
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={showHide.kana} onChange={(e) => handelShowHide("kana", e.target.checked)} />}
            label='Kana'
          />
          <FormControlLabel
            control={<Switch checked={showHide.kanji} onChange={(e) => handelShowHide("kanji", e.target.checked)} />}
            label='Kanji'
          />
          <FormControlLabel
            control={<Switch checked={showHide.romaji} onChange={(e) => handelShowHide("romaji", e.target.checked)} />}
            label='Romaji'
          />
          <FormControlLabel
            control={
              <Switch
                checked={showHide.discription}
                onChange={(e) => handelShowHide("discription", e.target.checked)}
              />
            }
            label='Discription'
          />
          <FormControlLabel
            control={<Switch checked={showHide.type} onChange={(e) => handelShowHide("type", e.target.checked)} />}
            label='Type'
          />
        </FormGroup>
        <Divider />
        <Button variant='outlined'>Open Bookmark</Button>
      </BoxStyled>
    </Modal>
  );
};

export default Settings;

const BoxStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: window.innerWidth <= 800 ? "rotate(90deg) translate(-50%, 50%)" : "translate(-50%, -50%)",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  padding: "1rem",
  width: "70%",
  maxWidth: "15rem",
  borderRadius: "1rem",
}));
