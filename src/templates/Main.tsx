import React, { ReactNode } from 'react';

import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Main = (props: IMainProps) => {
  const classes = useStyles();
  return (
    <div className="antialiased w-full text-gray-700">
      {props.meta}

      {/* header */}
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            七夕 ~お願いごとをしよう~
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="py-5 text-xl content">{props.children}</div>
    </div>
  );
};

export { Main };
