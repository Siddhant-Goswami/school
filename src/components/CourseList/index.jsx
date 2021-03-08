import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";

import CourseCard from "../CourseCard";
import "./styles.css";

const CourseList = ({ loading, error, courseList, ...props }) => {
  let params = new URLSearchParams("");
  const [pulsating, setPulsating] = React.useState(true);
  if (window.location && window.location.search) {
    params = new URLSearchParams(window.location.search);
  }

  let cardSlug = params.get("card_slug");
  const cardRef = React.useRef(null);

  useEffect(() => {
    if (courseList.length && cardSlug && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      setTimeout(() => {
        setPulsating(false);
      }, 10 * 1000);
    }
  }, [courseList]);

  if (loading) {
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justify="center">
        <Alert severity="error">Failed to fetch details</Alert>
      </Grid>
    );
  }

  return (
    <>
      {courseList.map((course) => (
        <Grid
          container
          spacing={3}
          justify="space-around"
          className="mw-100 mx-3"
          key={course.title}
        >
          <Grid item xs>
            <div className="fw-400 font-large card-title">{course.title}</div>
          </Grid>
          <Grid container spacing={3} direction="row" justify="space-around">
            {course.cards.map((card, index) => {
              return (
                <Grid item xs key={card.slug}>
                  <CourseCard
                    pulsating={pulsating}
                    card={card}
                    position={index + 1}
                    ref={cardSlug === card.slug ? cardRef : null}
                  ></CourseCard>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CourseList;
