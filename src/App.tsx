import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Editmodal from "./components/modal";

import { Button, TextField, Box, Typography, Divider } from "@mui/material";
import BasicTable from "./components/table";
import { findByLabelText } from "@testing-library/react";

interface TestData {
  inputvalue?: any;
}

const App = (props: any) => {
  const { inputval } = props;
  const [details, setDetails] = useState([{}]);
  const [inputvalue, setInputValue] = useState("");
  // const [responsedata, setResponseData] = useState("");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editId, setEditId] = useState<number>(0);
  const [passname, setPassName] = useState("");

  // Testing UseStates
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

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

      {/* Todo list */}

      <Box
        p={5}
        m={9}
        sx={{
          border: "1px solid grey",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" align="center" mb={2} color="initial">
          Todo List
        </Typography>
        <Editmodal
          open={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          payload={{ passname: passname, id: editId }}
        />
        <Box>
          <TextField
            id="standard-basic"
            // label="Name"
            placeholder="Name"
            variant="standard"
            value={inputvalue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button
            disabled={!inputvalue}
            onClick={() => addData(inputvalue)}
            variant="contained"
          >
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

      {/* Todo List end */}

      {/* Login */}

      <Box
        m={9}
        p={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "1px solid grey",
          borderRadius: "20px",
        }}
      >
        <Typography mb={2} variant="h5" color="initial">
          Login
        </Typography>
        <TextField
          id="demo-helper-text-aligned"
          // label="Username"
          placeholder="Username"
          sx={{ marginBottom: "10px" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="demo-helper-text-aligned"
          type={"password"}
          placeholder="Password"
          sx={{ marginBottom: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          data-testid="login-button"
          disabled={!username || !password}
          // {loading ? "please wait" : "Login"}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        <span
          data-testid="error"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          Something went wrong!
        </span>
      </Box>

      {/* Login end */}
    </>
  );
};

export default App;
