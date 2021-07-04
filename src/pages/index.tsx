import React, { FC, useRef } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';

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

type DBCollectionTypes = {
  createdAt: Date;
  name?: string;
  detail?: string;
};

type PropsTypes = {
  lists: DBCollectionTypes[];
};

const Index: FC<PropsTypes> = ({ lists }) => {
  const classes = useStyles();
  const name = useRef<HTMLInputElement>(null);
  const detail = useRef<HTMLInputElement>(null);

  const [form, setForm] = React.useState<DBCollectionTypes>({
    createdAt: new Date(),
    name: '',
    detail: '',
  });

  // const handleChange = (e, changedName) => {
  //   console.log(name.current?.value, changedName);
  // };

  const handleSubmit = () => async (e: any) => {
    e.preventDefault();
    setForm({
      createdAt: new Date(),
      name: name.current?.value,
      detail: detail.current?.value,
    });
    await axios.post('/api/', form);
    console.log(form, `name: ${name.current?.value}`);
  };

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
        <form onSubmit={handleSubmit()}>
          <TextField
            required
            id="name"
            defaultValue="Hello"
            label="名前"
            inputRef={name}
            // onChange={(e) => handleChange(e, 'name')}
          />
          <TextField
            required
            id="text"
            defaultValue="name"
            label="ねがいごと"
            inputRef={detail}
          />
          <Button type="submit" color="primary">
            投稿する
          </Button>
        </form>
      </Box>
      <Box className={classes.root}>
        {lists.map((item) => {
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

// firestore SSG
export async function getStaticProps() {
  const list = await db.collection('stripList').get();
  const lists = list.docs.map((doc) => {
    const stripData = doc.data();
    return {
      createdAt: stripData.detail,
      detail: stripData.detail,
      name: stripData.name,
    };
  });
  return {
    props: {
      lists,
    },
  };
}

export default Index;
