import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  customButton: {
    margin: theme.spacing(1)
  },
}));

const CustomButton = props => {
  const {buttonTitle, ...other} = props;

  const classes = useStyles();

  return (
    <Button
      {...other}
      size="medium"
      variant="contained"
      className={classes.customButton}
    >
      {buttonTitle}
    </Button>
  );
}

export default CustomButton
