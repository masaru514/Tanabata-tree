import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { db } from '../utils/db';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: 35,
    flexWrap: 'wrap',
    margin: '42px',
  },
  cardRoot: {
    maxWidth: 200,
    height: 400,
  },
  content: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    writingMode: 'vertical-rl',
    boxSizing: 'border-box',
    flexDirection: 'column',
    width: '100%',
    maxHeight: 350,
  },
  text: {
    fontSize: 14,
    width: 140,
    height: 313,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stripName: {},
  pos: {
    marginBottom: 12,
  },
});

const handleSubmit = (e: any) => {
  e.preventDefault();
  console.log(e);
};

const Index = ({ lists }: any) => {
  const classes = useStyles();
  // eslint-disable-next-line unused-imports/no-unused-vars
  // const [form, setForm] = React.useState({
  //   name: '',
  //   detail: '',
  // });
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField required id="name" defaultValue="Hello" label="名前" />
          <TextField
            required
            id="text"
            defaultValue="name"
            label="ねがいごと"
            onChange={() => console.log('aa')}
          />
          <Button type="submit" color="primary">
            投稿する
          </Button>
        </form>
      </Box>
      <Box className={classes.root}>
        {lists.map((item: { detail: string; name: string }) => {
          return (
            <Card key={item.detail} className={classes.cardRoot}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.text}
                  color="textSecondary"
                  gutterBottom
                >
                  {item.detail}
                </Typography>
                <Typography className={classes.stripName}>
                  {item.name}
                </Typography>
              </CardContent>

              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          );
        })}
      </Box>
    </Main>
  );
};

export async function getStaticProps() {
  const list = await db.collection('stripList').get();
  const lists = list.docs.map((doc) => {
    return { id: doc.id, detail: doc.data().detail, name: doc.data().name };
  });
  return {
    props: {
      lists,
    },
  };
}

export default Index;
