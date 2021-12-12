import { useState } from "react";
import styled from "styled-components";
//mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import Grid from "@mui/material/Grid";
//icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type SettingsProps = {
  open: boolean;
  handleClose: () => void;
  showHide: { kanji: boolean; romaji: boolean; kana: boolean; discription: boolean; type: boolean };
  handelShowHide: (key: "kanji" | "kana" | "type" | "romaji" | "discription") => void;
  goToBookmark: () => void;
  colorMode: { primary: string; secondary: string };
  toggleColorMode: ({}: { primary: string; secondary: string }) => void;
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

const GridColorButton = ({
  theme,
  selected,
  selectColor,
}: {
  theme: { primary: string; secondary: string };
  selected: boolean;
  selectColor: () => void;
}) => {
  return (
    <Grid item xs={6}>
      <ShowColor
        style={{ border: selected ? `1px solid ${theme.primary}` : "1px solid transparent" }}
        onClick={selectColor}
      >
        <svg height='100%' width='100%'>
          <clipPath id='cut-off-right'>
            <rect x='0' y='0' width='50%' height='100%' />
          </clipPath>
          <circle
            cx='50%'
            cy='50%'
            r='20%'
            fill={theme.primary}
            stroke='#141414'
            stroke-width='2px'
            clip-path='url(#cut-off-right)'
          />

          <clipPath id='cut-off-left'>
            <rect x='50%' y='0' width='50%' height='100%' />
          </clipPath>
          <circle
            cx='50%'
            cy='50%'
            r='20%'
            fill={theme.secondary}
            stroke='#141414'
            stroke-width='2px'
            clip-path='url(#cut-off-left)'
          />
        </svg>
      </ShowColor>
    </Grid>
  );
};

const ColorPalatte = [
  { primary: "#FEE715FF", secondary: "#101820FF" },
  { primary: "#F95700FF", secondary: "#FFFFFFFF" },
  { primary: "#ADEFD1FF", secondary: "#00203FFF" },
  { primary: "#157275", secondary: "#F0F4F4" },
  { primary: "#B4B4B4", secondary: "#121212" },
];

const Settings = ({
  open,
  handleClose,
  showHide,
  handelShowHide,
  goToBookmark,
  colorMode,
  toggleColorMode,
}: SettingsProps) => {
  const [isColorPalet, setIsColorPalet] = useState(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {!isColorPalet ? (
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
          <Button variant='outlined' onClick={() => setIsColorPalet(true)} fullWidth>
            Choose Theme
          </Button>
        </BoxStyled>
      ) : (
        <BoxStyled>
          <Grid container textAlign='center'>
            <Grid item xs={6} textAlign='center'>
              <Button color='primary' startIcon={<ArrowBackIcon />} onClick={() => setIsColorPalet(false)}>
                Back
              </Button>
            </Grid>
            {ColorPalatte.map((theme) => {
              return (
                <GridColorButton
                  theme={theme}
                  selected={JSON.stringify(colorMode) === JSON.stringify(theme)}
                  selectColor={() => toggleColorMode(theme)}
                />
              );
            })}
          </Grid>
        </BoxStyled>
      )}
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

const ShowColor = styled("div")`
  border-radius: 0.5rem;
  height: 3rem;
  cursor: pointer;
`;
