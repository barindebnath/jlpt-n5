import styled from "styled-components";
//mui
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";

const CardItem = ({ title, phrase }: { title: string; phrase: string }) => {
  return (
    <>
      <Typography style={{ fontSize: ".8rem" }}>{title}</Typography>
      <Typography variant='h5' style={{ marginBottom: "1rem" }}>
        {phrase}
      </Typography>
    </>
  );
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
      <CardItem title='Kanji' phrase={kanji} />
      <CardItem title='Kana' phrase={kana} />
      <CardItem title='Romaji' phrase={romaji} />
      <CardItem title='Discription' phrase={item.Meaning} />
      <Typography variant='subtitle1'>{item.Type}</Typography>
    </BoxStyled>
  );
};

export default Card;

const BoxStyled = styled(Box)`
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  max-width: 30rem;
`;
