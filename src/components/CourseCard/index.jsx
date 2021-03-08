import React from "react";
import { toast } from "react-toastify";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useHistory } from "react-router-dom";

import shareButton from "../../assets/images/share.svg";
import DetailsModal from "../DetailsModal";
import "./styles.css";

const CourseCard = React.forwardRef(({ card, position, pulsating }, ref) => {
  const history = useHistory();
  let params = new URLSearchParams("");

  const [openFirst, setOpenFirst] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);

  if (window.location && window.location.search) {
    params = new URLSearchParams(window.location.search);
  }

  const handleCardClick = () => {
    if (!localStorage.getItem("userDetails")) {
      toast.error("Sign up required!");
    } else {
      setOpenFirst(true);
      setOpenSecond(true);
    }
  };

  const handleShareClick = (event) => {
    event.stopPropagation();
    params.set("card_slug", card.slug);
    history.push({
      pathname: window.location.pathname,
      search: params.toString(),
    });
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
      <DetailsModal open={openSecond} handleClose={handleClose} />

      <div
        className={`progress-card cursor-pointer ${
          ref !== null && pulsating && "pulse"
        }`}
        onClick={handleCardClick}
        ref={ref}
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between">
            <div className="progress-card-title">{card.title}</div>
            <img
              src={shareButton}
              alt="share"
              className="share"
              onClick={handleShareClick}
            ></img>
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
