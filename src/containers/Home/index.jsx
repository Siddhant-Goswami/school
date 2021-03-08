import React, { useEffect } from "react";
import WelcomeSection from "../../components/WelcomeSection";
import CourseList from "../../components/CourseList";
import { fetchCourseListing } from "../../services/course.service";
import db from "../../firebase.config";

function HomePage() {
  const [courseListLoading, setCourseListLoading] = React.useState(true);
  const [courseListError, setCourseListError] = React.useState(false);
  const [courseList, setCourseList] = React.useState([]);

  useEffect(() => {
    addClickEventsInFirebase();
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    fetchCourseListing()
      .then((response) => {
        setCourseListLoading(false);
        setCourseListError(false);
        setCourseList(response.data);
      })
      .catch((error) => {
        setCourseListLoading(false);
        setCourseListError(true);
      });
  };

  const addClickEventsInFirebase = () => {
    document.addEventListener("click", (event) => {
      const userDetails = localStorage.getItem("userDetails");
      const username = userDetails ? JSON.parse(userDetails).name : "Alien";
      const data = {
        username: username,
        event: event.type,
        timestamp: new Date().getTime(),
      };

      db.collection("analytics")
        .doc()
        .set(data)
        .then(() => {
          console.log("user has clicked");
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  };

  return (
    <>
      <WelcomeSection />
      <CourseList
        loading={courseListLoading}
        error={courseListError}
        courseList={courseList}
      />
    </>
  );
}
export default HomePage;
