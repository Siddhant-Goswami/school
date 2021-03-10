import React, { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { Modal } from "react-responsive-modal";
import {
  CardContent,
  CardActions,
  Card,
  Button,
  Grid,
} from "@material-ui/core";

import { fetchCourseCardDetails } from "../../services/course.service";
import "./styles.css";

const DetailsModal = ({ open, handleClose }) => {
  const [cardDetailsLoading, setCardDetailsLoading] = React.useState(true);
  const [cardDetailsError, setCardDetailsError] = React.useState(false);
  const [cardDetails, setCardDetails] = React.useState({});

  useEffect(() => {
    fetchCardDetails();
  }, []);

  const fetchCardDetails = () => {
    fetchCourseCardDetails()
      .then((response) => {
        setCardDetailsLoading(false);
        setCardDetailsError(false);
        setCardDetails(response.data);
      })
      .catch((error) => {
        setCardDetailsLoading(false);
        setCardDetailsError(true);
      });
  };

  return (
    <Modal
      open={open}
      blockScroll
      onClose={handleClose}
      center
      closeIcon={<></>}
      classNames={{ modalContainer: "customModal2" }}
      styles={{
        modal: {
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        },
      }}
    >
      {cardDetailsError ? (
        <Alert severity="error">Failed card details fetching</Alert>
      ) : (
        <Card style={{ maxWidth: "50%" }} className="description-card">
          <CardContent>
            <div className="instructions">Instructions</div>
            <div className="description">{cardDetails.description}</div>
            <div className="question-num text-gray">
              {cardDetails.number_of_questions} Questions
            </div>
          </CardContent>
          <CardActions>
            <Grid container spacing={3}>
              <Grid item xs>
                <Button
                  variant="outlined"
                  className="btn"
                  fullWidth
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant="outlined"
                  className="gradient-btn btn"
                  fullWidth
                  onClick={handleClose}
                >
                  Got It
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      )}
    </Modal>
  );
};

export default DetailsModal;
