import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Editmodal from "./components/modal";

import { Button, TextField, Box } from "@mui/material";
import BasicTable from "./components/table";

const App = () => {
  const [details, setDetails] = useState([{}]);
  const [inputvalue, setInputValue] = useState("");
  // const [responsedata, setResponseData] = useState("");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editId, setEditId] = useState<number>(0);
  const [passname, setPassName] = useState("");

  const handleClickOpen = (id: any, name: any) => {
    setIsOpenModal(true);
    setEditId(id);
    setPassName(name);
  };

  const getData = () => {
    axios
      .get("https://62468c8fe3450d61b0001464.mockapi.io/test")
      .then((response) => {
        console.log(response.data, "test");
        setDetails(response.data);
      });
  };

  const addData = async (inputdata: any) => {
    await axios
      .post("https://62468c8fe3450d61b0001464.mockapi.io/test", {
        name: inputdata,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    getData();
  };

  const deleteData = async (id: any) => {
    await axios
      .delete(`https://62468c8fe3450d61b0001464.mockapi.io/test/${id}`)
      .catch(function (error) {
        console.log(error);
      });

    getData();
  };

  useEffect(() => {
    getData();

    // addData(inputvalue);
    // deleteData(id);
    // editData();
  }, []);

  return (
    <>
      {/* <BasicTable passdata={details} /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Editmodal
          open={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          payload={{ passname: passname, id: editId }}
        />
        <Box>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            value={inputvalue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button onClick={() => addData(inputvalue)} variant="contained">
            Add
          </Button>
        </Box>

        <ul>
          {details.map((e: any) => (
            <li key={e.id}>
              {e.name}
              &nbsp;
              <Button
                variant="outlined"
                onClick={() => handleClickOpen(e.id, e.name)}
                id={e.id}
                name={e.name}
              >
                Edit
              </Button>
              <Button
                id={e.id}
                onClick={() => deleteData(e.id)}
                variant="outlined"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default App;
