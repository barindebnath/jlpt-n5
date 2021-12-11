import styled from "styled-components";
//mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import Grid from "@mui/material/Grid";
//icons
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type SettingsProps = {
  open: boolean;
  handleClose: () => void;
  showHide: { kanji: boolean; romaji: boolean; kana: boolean; discription: boolean; type: boolean };
  handelShowHide: (key: "kanji" | "kana" | "type" | "romaji" | "discription") => void;
  goToBookmark: () => void;
  isDark: boolean;
  toggleColorMode: () => void;
};

const GridButton = ({ value, selected, onChange }: { value: string; selected: boolean; onChange: () => void }) => {
  return (
    <Grid item xs={6}>
      <ToggleButton color='primary' value={value} selected={selected} onChange={onChange} fullWidth>
        {value}
      </ToggleButton>
    </Grid>
  );
};

const Settings = ({
  open,
  handleClose,
  showHide,
  handelShowHide,
  goToBookmark,
  isDark,
  toggleColorMode,
}: SettingsProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <BoxStyled>
        <Grid container textAlign='center'>
          <GridButton value='Kanji' selected={showHide.kanji} onChange={() => handelShowHide("kanji")} />
          <GridButton value='Kana' selected={showHide.kana} onChange={() => handelShowHide("kana")} />
          <GridButton value='Romaji' selected={showHide.romaji} onChange={() => handelShowHide("romaji")} />
          <GridButton value='Type' selected={showHide.type} onChange={() => handelShowHide("type")} />
          <GridButton
            value='Discription'
            selected={showHide.discription}
            onChange={() => handelShowHide("discription")}
          />
        </Grid>

        <Button variant='outlined' onClick={goToBookmark} fullWidth>
          Open Bookmark
        </Button>
        <Button
          variant='outlined'
          endIcon={isDark ? <Brightness7Icon /> : <Brightness4Icon />}
          onClick={toggleColorMode}
          fullWidth
        >
          {isDark ? "Light" : "Dark"} Mode
        </Button>
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
