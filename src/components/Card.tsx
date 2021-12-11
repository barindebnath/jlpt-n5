import { useState, useEffect } from "react";
import styled from "styled-components";
//mui
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
//icon
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CardItem = ({ title, phrase }: { title: string; phrase: string }) => {
  return phrase ? (
    <Box>
      <Typography style={{ fontSize: ".8rem" }}>{title}</Typography>
      <Typography variant='h6'>{phrase}</Typography>
    </Box>
  ) : null;
};

type CardProps = {
  item: {
    Kanji: string;
    Vocabulary: string;
    Type: string;
    Meaning: string;
  };
  showHide: { kanji: boolean; romaji: boolean; kana: boolean; discription: boolean; type: boolean };
  kanaRomaji: "kana" | "romaji";
};

const Card = ({ item, showHide, kanaRomaji }: CardProps) => {
  const [overlayKanaRomaji, setOverlayKanaRomaji] = useState(!showHide.kana && !showHide.romaji);
  const [overlayDiscription, setOverlayDiscription] = useState(!showHide.discription);
  const romaji = /\s/g.test(item.Vocabulary)
    ? item.Vocabulary.substr(0, item.Vocabulary.indexOf(" "))
    : item.Vocabulary;
  const kana = /\s/g.test(item.Vocabulary) ? item.Vocabulary.substr(item.Vocabulary.indexOf(" ") + 1) : item.Kanji;
  const kanji = /\s/g.test(item.Vocabulary) ? item.Kanji : "";

  useEffect(() => {
    setOverlayKanaRomaji(!showHide.kana && !showHide.romaji);
    setOverlayDiscription(!showHide.discription);
  }, [showHide]);

  useEffect(() => {
    setOverlayKanaRomaji(!showHide.kana && !showHide.romaji);
    setOverlayDiscription(!showHide.discription);
  }, [item]);

  return (
    <BoxStyled>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
        {showHide.type && (
          <Typography style={{ fontSize: ".8rem" }} align='center'>
            {item.Type}
          </Typography>
        )}
        <Stack direction='row' justifyContent='space-between' style={{ minHeight: "61.2px" }}>
          {overlayKanaRomaji ? (
            <Overlay onClick={() => setOverlayKanaRomaji(false)}>
              <CenterOverlayItem>
                <VisibilityOffIcon />
                <Typography style={{ fontSize: ".8rem" }}>Show {kanaRomaji}</Typography>
              </CenterOverlayItem>
            </Overlay>
          ) : !showHide.kana && !showHide.romaji ? (
            kanaRomaji === "kana" ? (
              <CardItem title='Kana' phrase={kana} />
            ) : (
              <CardItem title='Romaji' phrase={romaji} />
            )
          ) : (
            <>
              {showHide.kana && <CardItem title='Kana' phrase={kana} />}
              {showHide.romaji && <CardItem title='Romaji' phrase={romaji} />}
            </>
          )}
        </Stack>
        {showHide.kanji && (
          <div style={{ minHeight: "51px" }}>
            <CardItem title='Kanji' phrase={kanji} />
          </div>
        )}
        <div style={{ minHeight: "83.2px" }}>
          {overlayDiscription ? (
            <Overlay onClick={() => setOverlayDiscription(false)}>
              <CenterOverlayItem>
                <VisibilityOffIcon />
                <Typography style={{ fontSize: ".8rem" }}>Show discription</Typography>
              </CenterOverlayItem>
            </Overlay>
          ) : (
            <CardItem title='Discription' phrase={item.Meaning} />
          )}
        </div>
      </div>
    </BoxStyled>
  );
};

export default Card;

const BoxStyled = styled(Box)`
  flex: 1;
  position: relative;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Overlay = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.secondary.main,
  cursor: "pointer",
  border: "1px solid",
  borderRadius: ".5rem",
  height: "100%",
  width: "100%",
}));

const CenterOverlayItem = styled(Box)`
  margin: auto;
  text-align: center;
`;
