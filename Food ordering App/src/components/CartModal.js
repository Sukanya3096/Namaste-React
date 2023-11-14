import React, { useEffect } from "react";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  isNewFlag,
  addItemsFromNewRestaurantFlag,
  clearCart,
} from "../utils/cartSlice";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "85%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 520,
  minWidth: 300,
  bgcolor: "background.paper",
  boxShadow: "0 2px 20px 0 rgba(40,44,63,.5)",
  p: 4,
};

const buttonStartStyle = {
  cursor: "pointer",
  backgroundColor: "#60b246",
  border: "2px solid #60b246",
  borderRadius: "0px",
  width: "220px",
  height: "50px",
  fontWeight: 600,
  color: "#fff",
  textTransform: "uppercase",
  "&:hover": {
    backgroundColor: "#60b246",
    color: "#fff",
    border: "2px solid #60b246",
  },
};

const buttonCloseStyle = {
  cursor: "pointer",
  backgroundColor: "#fff",
  border: "2px solid #60b246",
  fontWeight: 600,
  width: "220px",
  height: "50px",
  borderRadius: "0px",
  color: "#60b246",
  textTransform: "uppercase",
};

export default function CartModal() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    dispatch(addItemsFromNewRestaurantFlag(false));
  };
  const dispatch = useDispatch();
  const openModal = useSelector(
    (store) => store.cart.addItemsFromNewRestaurant
  );

  const startAfresh = () => {
    dispatch(isNewFlag(false));
    dispatch(addItemsFromNewRestaurantFlag(false));
    dispatch(clearCart());
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Items already in cart
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "10px",
              }}
            >
              <Button sx={buttonCloseStyle} onClick={handleClose}>
                NO
              </Button>
              <Button sx={buttonStartStyle} onClick={startAfresh}>
                YES, START AFRESH
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
