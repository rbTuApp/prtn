import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Logo from "./images/logo.jpeg";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const drawerWidth = 240;
export default function Navigator() {
  let navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const menu = [
    { title: "Almacenaje", direction: "almacenaje" },
    { title: "Herramientas Eléctricas", direction: "herramientas_electricas" },
    {
      title: "Herramientas Hidráulicas",
      direction: "herramientas_hidraulicas",
    },
    { title: "Herramientas Neumáticas", direction: "herramientas_neumaticas" },
    { title: "Congelados y alimentos", direction: "congelados_y_alimentos" },
    {
      title: "Herramientas de Construcción",
      direction: "herramientas_de_construccion",
    },
    {
      title: "Herramientas de Seguridad",
      direction: "herramientas_de_seguridad",
    },
    { title: "Sin categorizar", direction: "home" },
  ];
  const drawer = (
    <>
      <Box style={{ padding: 5 }}>
        <img
          src={Logo}
          alt="Logo de la empresa"
          style={{ width: "100%", borderRadius: 20 }}
        />
      </Box>

      <Divider />
      <List>
        {menu.map((text, index) => (
          <ListItem
            onClick={() =>
              text.direction !== "home"
                ? navigate("/categoria/" + text.direction)
                : navigate("/")
            }
            button
            key={index}
          >
            <ListItemText primary={text.title} />
          </ListItem>
        ))}
      </List>
    </>
  );
  return (
    <Box>
      <IconButton
        color="primary"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          mr: 2,
          position: "fixed",
          left: 15,
          top: 10,
          display: { sm: "none" },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          PaperProps={{
            className: "contenedor",
            style: { backgroundColor: "rgb(113 186 211)", position: "fixed" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
          PaperProps={{
            className: "contenedor",
            style: { backgroundColor: "rgb(113 186 211)", position: "fixed" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
