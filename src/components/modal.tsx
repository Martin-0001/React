import React from "react";
import { Button, Modal, Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
// import App from "../App";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  id?: number;
  payload: any;
}

const Editmodal = ({ open, onClose, payload }: EditModalProps) => {
  const [name, setName] = useState("");
  const [response, setResponse] = useState();
  //   const {  } = props;

  const editData = (id: any, name: any) => {
    axios
      .put(`https://62468c8fe3450d61b0001464.mockapi.io/test/${id}`, {
        name: name,
      })
      .then((res: any) => setResponse(res));
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="standard-basic"
            variant="standard"
            label={payload.passname}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>

          <Button
            variant="contained"
            onClick={() => editData(payload.id, name)}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Editmodal;
