import styled from "styled-components";
//mui
import Box from "@mui/system/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

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

  console.log(romaji);
  console.log(kana);
  console.log(kanji);

  return (
    <BoxStyled>
      <List>
        <ListItem>
          <Typography variant='h4' gutterBottom>
            {kanji}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h4' gutterBottom>
            {kana}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h4' gutterBottom>
            {romaji}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h4' gutterBottom>
            {item.Meaning}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='subtitle2'>{item.Type}</Typography>
        </ListItem>
      </List>
    </BoxStyled>
  );
};

export default Card;

const BoxStyled = styled(Box)`
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  /* background: rgb(0, 198, 255);
  background: linear-gradient(180deg, rgba(0, 198, 255, 1) 40%, rgba(0, 44, 57, 1) 100%); */
  /* background: whitesmoke; */
  /* color: darkslategray; */
`;
