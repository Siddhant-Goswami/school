import React, {useEffect} from "react";
import Box from "@material-ui/core/Box";
import { toast } from "react-toastify";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useHistory } from "react-router-dom";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { Modal } from "react-responsive-modal";

import shareButton from "../../assets/images/share.svg";
import { fetchCourseCardDetails } from "../../services/course.service";
import DetailsModal from "../DetailsModal";
import "react-responsive-modal/styles.css";
import "@szhsin/react-menu/dist/index.css";
import "./styles.css";

const CourseCard = React.forwardRef(({ card, position, pulsating }, ref) => {
  const history = useHistory();
  let params = new URLSearchParams("");

  const [openFirst, setOpenFirst] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);
  const [hasIntentShare, setIntentShare] = React.useState(false);
  const [cardDetailsLoading, setCardDetailsLoading] = React.useState(true);
  const [cardDetailsError, setCardDetailsError] = React.useState(false);
  const [cardDetails, setCardDetails] = React.useState({});

  if (window.location && window.location.search) {
    params = new URLSearchParams(window.location.search);
  }

  useEffect(() => {
    fetchCardDetails();
  }, [])

  const fetchCardDetails = () => {
    fetchCourseCardDetails(card.slug)
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

  const isLoggedIn = () => {
    return localStorage.getItem("userDetails");
  };

  const handleCardClick = () => {
    if (!isLoggedIn()) {
      toast.error("Sign up required!");
    } else {
      if (!hasIntentShare) {
        setOpenFirst(true);
        setOpenSecond(true);
        fetchCardDetails()
      }
    }
  };

  const handleShareClick = (event) => {
    if (isLoggedIn()) {
      params.set("card_slug", card.slug);
      history.push({
        pathname: window.location.pathname,
        search: params.toString(),
      });
    }
  };

  const handleClose = () => {
    setOpenFirst(false);
    setOpenSecond(false);
  };

  return (
    <>
      <Modal
        open={openFirst}
        onClose={handleClose}
        center
        closeIcon={<></>}
        styles={{
          overlay: {
            display: "none",
          },
        }}
        classNames={{
          modalContainer: "customModalContainer1",
          modal: "customModal1",
        }}
      >
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI2NjUiIHZpZXdCb3g9IjAgMCAxMDgwIDY2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxyZWN0IHdpZHRoPSIxMDgwIiBoZWlnaHQ9IjY2NSIgcng9IjI0IiBmaWxsPSIjQkNFOTlFIi8+CjxjaXJjbGUgY3g9IjE5OS41IiBjeT0iNDcuNSIgcj0iMjg1LjUiIGZpbGw9IiNGRkY1QUIiLz4KPGNpcmNsZSBjeD0iMTAyNi41IiBjeT0iNjAzLjUiIHI9IjMwMi41IiBmaWxsPSIjNTVCN0Y5Ii8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI2NjUiIHJ4PSIyNCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
          className="bg-img"
        ></img>
      </Modal>
      <DetailsModal cardDetails={cardDetails} cardDetailsError={cardDetailsError} cardDetailsLoading={cardDetailsLoading} open={openSecond} handleClose={handleClose} />

      <div
        className={`progress-card cursor-pointer ${
          ref !== null && pulsating && "pulse"
        }`}
        onClick={() => {
          setIntentShare(false);
          handleCardClick();
        }}
        ref={ref}
      >
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <div className="progress-card-title">{card.title}</div>

            <Menu
              direction="left"
              menuButton={
                <img
                  src={shareButton}
                  alt="share"
                  className="share"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIntentShare(true);
                  }}
                ></img>
              }
            >
              <MenuItem onClick={handleShareClick}>Share</MenuItem>
            </Menu>
          </Box>
          <LinearProgress
            variant="determinate"
            value={card.progress_percentage}
          />
          <img src={card.thumbnail} alt="Thumbnail" className="card-img" />
          <div className="card-position">#{position}</div>
        </Box>
      </div>
    </>
  );
});

export default CourseCard;
