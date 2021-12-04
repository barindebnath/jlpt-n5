import styled from "styled-components";
//mui
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

const CardItem = ({ title, phrase }: { title: string; phrase: string }) => {
  if (phrase) {
    return (
      <>
        <Typography style={{ fontSize: ".8rem" }}>{title}</Typography>
        <Typography variant='h5' style={{ marginBottom: "1.5rem" }}>
          {phrase}
        </Typography>
      </>
    );
  } else return null;
};

type CardProps = {
  item: {
    Kanji: string;
    Vocabulary: string;
    Type: string;
    Meaning: string;
  };
};

const Card = ({ item }: CardProps) => {
  const romaji = /\s/g.test(item.Vocabulary)
    ? item.Vocabulary.substr(0, item.Vocabulary.indexOf(" "))
    : item.Vocabulary;
  const kana = /\s/g.test(item.Vocabulary) ? item.Vocabulary.substr(item.Vocabulary.indexOf(" ") + 1) : item.Kanji;
  const kanji = /\s/g.test(item.Vocabulary) ? item.Kanji : "";

  return (
    <BoxStyled>
      <div style={{ flex: 1 }}>
        <CardItem title='Kana' phrase={kana} />
        <CardItem title='Romaji' phrase={romaji} />
        <CardItem title='Discription' phrase={item.Meaning} />
        <CardItem title='Kanji' phrase={kanji} />
      </div>
      <div>
        <Typography style={{ fontSize: ".8rem" }} align='center'>
          {item.Type}
        </Typography>
      </div>
      <KanjiDiv></KanjiDiv>
    </BoxStyled>
  );
};

export default Card;

const BoxStyled = styled(Box)`
  position: relative;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
`;

const KanjiDiv = styled("div")`
  position: absolute;
  bottom: 5rem;
  right: 1rem;
`;
