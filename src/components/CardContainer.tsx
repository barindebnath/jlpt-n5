import { useState, MouseEvent } from "react";
import styled from "styled-components";
//mui
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";

//icons
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Card from "./Card";
import n5Data from "./n5Data";
import Settings from "./Settings";

const CardContainer = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [goToCard, setGoToCard] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleGoToCard = () => {
    const goTo = parseInt(goToCard);
    goTo && goTo > 0 && goTo < n5Data.length && setCurrentCard(goTo - 1);
    handleClose();
  };

  return (
    <>
      <Container>
        <InnerContainer>
          <Stack direction='row' justifyContent='space-around' paddingTop='1rem'>
            <IconButton color='primary' aria-label='Menu' component='span' onClick={handleOpenSettings}>
              <SettingsIcon />
            </IconButton>
            <IconButton color='primary' aria-label='Bookmark' component='span'>
              <BookmarkBorderIcon />
            </IconButton>
          </Stack>
          <MainItem>
            {n5Data.length &&
              n5Data.map((item, index) => {
                if (currentCard !== index) return null;
                else return <Card item={item} key={index} />;
              })}
          </MainItem>
          <Stack direction='row' justifyContent='space-around' paddingBottom='1rem'>
            <IconButton
              color='primary'
              aria-label='Previous'
              component='span'
              disabled={currentCard === 0}
              onClick={() => setCurrentCard(currentCard - 1)}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Button aria-describedby={id} variant='text' onClick={handleClick}>
              {currentCard + 1} / {n5Data.length}
            </Button>
            <IconButton
              color='primary'
              aria-label='Next'
              component='span'
              disabled={currentCard === n5Data.length - 1}
              onClick={() => setCurrentCard(currentCard + 1)}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
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
        </InnerContainer>
      </Container>
      <Settings open={openSettings} handleClose={handleCloseSettings} />
    </>
  );
};

export default CardContainer;

const Container = styled(Stack)(({ theme }) => ({
  height: "calc(100vh - 2rem)",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  padding: "1rem 0",
}));

const InnerContainer = styled(Stack)`
  border: ${() => (window.innerWidth <= 800 ? "none" : "2px solid")};
  border-radius: 1rem;
  min-width: ${() => (window.innerWidth <= 800 ? "0" : "30rem")};
  max-width: 30rem;
  margin: ${() => (window.innerWidth <= 800 ? "auto 0" : "auto")};
  height: 100%;
`;

const MainItem = styled.div`
  flex: 1;
`;
