import React from "react";
import "./App.css";
import Navigator from "./Navigator";
import { Box, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import ImageGallery from "react-image-gallery";
import DATA from "./productos";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";

const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const CustomButtonRoot = styled("button")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}
function App() {
  return (
    <div>
      <Router>
        <Box className="App" style={{ padding: 8, flexGrow: 1 }}>
          <Box>
            <Navigator />
          </Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categoria/:categorie" element={<Home />} />
            <Route path="/categoria/:categorie/:selected" element={<Home />} />
            <Route path="/product/:selected" element={<Home />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

function Home() {
  const { selected, categorie } = useParams();
  let navigate = useNavigate();

  const setSelected = (p) => {
    if (p) {
      if (categorie) {
        navigate(`/categoria/${categorie}/${p.id}`);
      } else {
        navigate(`/product/${p.id}`);
      }
    } else {
      if (categorie) {
        navigate(`/categoria/${categorie}/`);
      } else {
        navigate(`/`);
      }
    }
  };
  let product;
  if (DATA) {
    product = DATA.find((p) => `${p.id}` === `${selected}`);
  }
  let parsedData = DATA;
  if (categorie) {
    parsedData = parsedData.filter((p) => p.categoria === categorie);
  }
  return (
    <Box style={{width: "100%"}}>
      <Grid style={{width: "100%"}} container>
        {parsedData.map((p) => (
          <Grid lg={3} md={4} sm={12} style={{ padding: 5, width: "100%" }}>
            <Card style={{ backgroundColor: "#ccc", height: 400 }}>
              <CardHeader
                title={p.name}
                titleTypographyProps={{ style: { fontSize: 15 } }}
              />
              <CardMedia
                component="img"
                height="194"
                width="100%"
                image={"/images/" + p.images[0]}
                style={{ objectFit: "fill" }}
                alt={p.name}
              />
              <CardContent>
                <CustomButton onClick={() => setSelected(p)}>
                  Ver mas info
                </CustomButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {console.log(product)}
        {product && (
          <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            open={true}
            onClose={() => setSelected(null)}
          >
            <DialogTitle>{product.name}</DialogTitle>
            <DialogContent>
              <ImageGallery
                autoPlay={false}
                showPlayButton={false}
                items={product.images.map((i) => {
                  const imagen = "/images/" + i;
                  return { original: imagen, thumbnail: imagen };
                })}
              />
              <p style={{ textAlign: "justify" }}>
                {product.detalles ? product.detalles : null}
              </p>
              <TableContainer component={Paper}>
                <Table
                  style={{ backgroundColor: "#ccc" }}
                  aria-label="simple table"
                >
                  <TableBody>
                    {product.details &&
                      // eslint-disable-next-line array-callback-return
                      product.details.split(".").map((row) => {
                        console.log(row.trim() === "");
                        if (row.trim() !== "")
                          return (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">
                                {row.split(":")[0]}
                              </TableCell>
                              <TableCell align="left">
                                {row.split(":")[1]}
                              </TableCell>
                            </TableRow>
                          );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </Dialog>
        )}
      </Grid>
      <Box
        style={{
          backgroundColor: "#ccc",
          padding: 30,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: 8,
          marginRight: -8,
          marginLeft: -8,
          marginBottom: -8
        }}
      >
        <p>Teléfonos: 0998541980 - 0997900943</p>
        <p>Ruc: 1716912777001</p>
        <p>Parroquia: La union</p>
      </Box>
    </Box>
  );
}

export default App;
