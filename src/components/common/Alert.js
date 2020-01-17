import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const Alert = props => {
  const { win, open,replay, ...other } = props;

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        {...other}
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="alert"
      >
        <DialogContent>
            {win ? (
              <div>
                <Typography variant="h3" gutterBottom>
                  Vous avez Gagné !
                </Typography>
                <img
                  alt={"trophée"}
                  style={{ width: 90, height: 140 }}
                  src={"https://cdn1.iconfinder.com/data/icons/awards-and-achievements/100/award_win_trophy-02-512.png"}
                />
              </div>
            ) : (
              <Typography variant="h3" gutterBottom>
                Vous avez Perdu !
              </Typography>
            )}
        </DialogContent>
        <DialogActions>
          <Button onClick={replay} color="primary" autoFocus>
            Rejouer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Alert;
