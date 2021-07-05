import React, { FC, useRef } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import { format } from 'date-fns';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { db, auth } from '../utils/firebase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      gap: 35,
      flexWrap: 'wrap',
      margin: '42px',
      [theme.breakpoints.down('xs')]: {
        margin: '5px',
        gap: '20px',
        justifyContent: 'space-between',
      },
    },
    cardRoot: {
      maxWidth: 200,
      height: 400,
      [theme.breakpoints.down('xs')]: {
        maxWidth: 170,
        width: '46%',
      },
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
    pos: {
      marginBottom: 12,
    },
    form: {
      margin: '40px',
      [theme.breakpoints.down('xs')]: {
        margin: '20px',
      },
    },
    nameField: {
      width: '68%',
      marginRight: 10,
    },
    nameGroup: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

type DBCollectionTypes = {
  createdAt: number;
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
  const [inputError, setInputError] = React.useState({
    name: false,
    detail: false,
  });
  const [form, setForm] = React.useState<DBCollectionTypes>({
    createdAt: 0,
    name: '',
    detail: '',
  });

  const handleChange = () => () => {
    setForm({
      createdAt: Number(format(new Date(), 'yyyyMMddHHmmss')),
      name: name.current?.value,
      detail: detail.current?.value,
    });
    if (name.current) {
      const nameRef = name.current;
      if (!nameRef.validity.valid) {
        setInputError({
          ...inputError,
          name: true,
        });
      } else {
        setInputError({
          ...inputError,
          name: false,
        });
      }
    }
  };

  const handleSubmit = () => async () => {
    await axios.post('/api/', form);
    if (name.current && detail.current) {
      name.current.value = '';
      detail.current.value = '';
    }
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
        <form className={classes.form} onSubmit={handleSubmit()}>
          <Box>
            <TextField
              required
              id="name"
              label="名前"
              error={inputError.name}
              placeholder="おりひめ"
              inputProps={{ maxLength: 15 }}
              helperText={name?.current?.validationMessage}
              inputRef={name}
              onChange={handleChange()}
            />
          </Box>
          <Box className={classes.nameGroup}>
            <TextField
              required
              error={inputError.detail}
              id="text"
              label="お願いごと"
              placeholder="コロナが落ち着きますように"
              inputRef={detail}
              inputProps={{ maxLength: 66 }}
              helperText={detail?.current?.validationMessage}
              onChange={handleChange()}
              className={classes.nameField}
            />
            <Box ml={3} mt={2}>
              <Button
                type="submit"
                variant="outlined"
                disabled={inputError.name && inputError.detail}
                color="primary"
              >
                投稿する
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      <Box className={classes.root}>
        {lists.map((item) => {
          return (
            <Card key={item.createdAt} className={classes.cardRoot}>
              <CardContent className={classes.content}>
                <Typography className={classes.text} gutterBottom>
                  {item.detail}
                </Typography>
                <Typography color="textSecondary">{item.name}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Main>
  );
};

// firestore SSG
export async function getStaticProps() {
  const list = await db
    .collection('stripList')
    .orderBy('createdAt', 'desc')
    .get();
  const lists = list.docs.map((doc) => {
    return doc.data();
  });
  auth.onAuthStateChanged((user) => {
    if (!user) {
      auth.signInAnonymously();
    }
  });
  return {
    props: {
      lists,
    },
    revalidate: 50,
  };
}

export default Index;
