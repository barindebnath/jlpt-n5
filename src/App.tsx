import { useState, useEffect } from "react";
import styled from "styled-components";
//mui
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
//icons
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
//custom components
import Card from "./components/Card";
import n5Data from "./components/n5Data";
import Settings from "./components/Settings";

const App = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [bookmark, setBookmark] = useState(0);
  const [kanaRomaji, setKanaRomaji] = useState<"kana" | "romaji">("kana");
  const [goToCard, setGoToCard] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openSettings, setOpenSettings] = useState(false);
  const [showHide, setShowHide] = useState({
    kanji: true,
    kana: true,
    romaji: true,
    discription: true,
    type: true,
  });

  const isPopoverOpen = Boolean(anchorEl);
  const popoverId = isPopoverOpen ? "simple-popover" : undefined;

  const handleGoToCard = () => {
    const goTo = parseInt(goToCard);
    goTo && goTo > 0 && goTo < n5Data.length && setCurrentCard(goTo - 1);
    setAnchorEl(null);
  };

  const handelShowHide = (key: string, value: boolean) => {
    setShowHide({ ...showHide, [`${key}`]: value });
    value === true && (key === "kana" || key === "romaji") && setKanaRomaji(key);
  };

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") setCurrentCard(currentCard + 1);
      if (event.key === "ArrowLeft") setCurrentCard(currentCard - 1);
    });
    return () => {
      window.removeEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") setCurrentCard(currentCard + 1);
        if (event.key === "ArrowLeft") setCurrentCard(currentCard - 1);
      });
    };
  });

  return (
    <Box style={{ transform: window.innerWidth <= 800 ? "rotate(90deg)" : "none" }}>
      <Container>
        <InnerContainer>
          <Stack direction='row' height='100%'>
            <IconButton
              color='primary'
              aria-label='Previous'
              component='span'
              disabled={currentCard === 0}
              onClick={() => setCurrentCard(currentCard - 1)}
              style={{ borderRadius: "0", padding: "1rem" }}
            >
              <ArrowCircleLeftIcon />
            </IconButton>
            <Stack flex={1}>
              {n5Data.length &&
                n5Data.map((item, index) => {
                  if (currentCard !== index) return null;
                  else return <Card item={item} key={index} showHide={showHide} kanaRomaji={kanaRomaji} />;
                })}
              <Stack direction='row' justifyContent='space-around'>
                <IconButton
                  color='primary'
                  aria-label='Bookmark'
                  component='span'
                  style={{ padding: "1rem" }}
                  onClick={() => setBookmark(currentCard)}
                >
                  {bookmark === currentCard ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
                <Button
                  aria-describedby={popoverId}
                  variant='text'
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  {currentCard + 1} / {n5Data.length}
                </Button>
                <IconButton
                  color='primary'
                  aria-label='Menu'
                  component='span'
                  onClick={() => setOpenSettings(true)}
                  style={{ padding: "1rem" }}
                >
                  <SettingsIcon />
                </IconButton>
              </Stack>
            </Stack>
            <IconButton
              color='primary'
              aria-label='Next'
              component='span'
              disabled={currentCard === n5Data.length - 1}
              onClick={() => setCurrentCard(currentCard + 1)}
              style={{ borderRadius: "0", padding: "1rem" }}
            >
              <ArrowCircleRightIcon />
            </IconButton>
          </Stack>
        </InnerContainer>
      </Container>
      <Popover
        id={popoverId}
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        style={{ transform: window.innerWidth <= 800 ? "rotate(90deg)" : "none" }}
      >
        <Stack direction='row' style={{ padding: ".5rem" }}>
          <TextField
            type='number'
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label={`Max ${n5Data.length}`}
            variant='outlined'
            value={goToCard}
            onChange={(e) => setGoToCard(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleGoToCard()}
          />
          <IconButton
            color='primary'
            aria-label='Next'
            component='span'
            disabled={currentCard === n5Data.length - 1}
            onClick={handleGoToCard}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
      </Popover>
      <Settings
        open={openSettings}
        handleClose={() => setOpenSettings(false)}
        showHide={showHide}
        handelShowHide={handelShowHide}
        // wordComplexity={wordComplexity}
        // handleComplexity={(complexity) => setWordComplexity(complexity)}
      />
    </Box>
  );
};

export default App;

const Container = styled(Stack)(({ theme }) => ({
  height: window.innerWidth <= 800 ? "100vw" : "100vh",
  width: window.innerWidth <= 800 ? "100vh" : "100vw",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
}));

const InnerContainer = styled(Stack)`
  border: ${() => (window.innerWidth <= 800 ? "none" : "2px solid")};
  border-radius: 1rem;
  min-width: ${() => (window.innerWidth <= 800 ? "0" : "40rem")};
  max-width: 40rem;
  min-height: ${() => (window.innerWidth <= 800 ? "0" : "25rem")};
  max-height: 25rem;
  margin: ${() => (window.innerWidth <= 800 ? "auto 0" : "auto")};
  height: 100%;
`;
