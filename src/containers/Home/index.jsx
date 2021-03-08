import React, {useEffect} from "react";
import WelcomeSection from "../../components/WelcomeSection";
import CourseList from "../../components/CourseList";
import { fetchCourseListing } from "../../services/course.service";

function HomePage() {
  const [courseListLoading, setCourseListLoading] = React.useState(true);
  const [courseListError, setCourseListError] = React.useState(false);
  const [courseList, setCourseList] = React.useState([]);

  useEffect(() => {
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
