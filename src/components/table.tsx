import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as color from "@mui/material/colors";
import { Button, Grid, Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface BasicTable {
  passdata?: any;
}

const BasicTable = (props: any) => {
  const { passdata } = props;
  const [data, setData] = useState();
  // const [first, setfirst] = useState(second)
  console.log(passdata);

  const deleteData = async (id: any) => {
    await axios

      .delete(`https://62468c8fe3450d61b0001464.mockapi.io/test/${id}`)
      .then((response) => {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const getData = () => {
    console.log(passdata);
  };

  useEffect(() => {
    getData();
    // deleteData(id);
    // editData();
  }, []);

  return (
    <Grid
      container
      spacing={0}
      padding={5}
      sx={{ background: color.grey[200] }}
    >
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "22%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: "10px",
          }}
        >
          <Typography variant="body1" color="initial">
            Click the button to add Data
          </Typography>
          <Button variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passdata.map((passdata: any) => (
              <TableRow>
                <TableCell>{passdata.id}</TableCell>
                <TableCell align="center">{passdata.name}</TableCell>
                <TableCell align="center">{passdata.Age}</TableCell>
                <TableCell align="center">{passdata.Gender}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "300px",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ background: color.blue[500] }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ background: color.red[500] }}
                      id={passdata.id}
                      onClick={() => deleteData(passdata.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default BasicTable;
