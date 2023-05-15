import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TokenContext from "../../Context/TokenContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Auth/auth";
import Chart from "./Chart";
const drawerWidth = 240;

const AdminLayout = (props) => {
  const { setAccessToken, user } = useContext(TokenContext);
  const navigate = useNavigate();
  const logoutUser = () => {
    logout();
    setAccessToken("");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {user.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <div className="">
            <img
              className="img-fluid rounded-circle text-center"
              style={{ maxWidth: "50px", borderRadius: "50%", margin: "auto" }}
              src="https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
              alt="profile"
            />
          </div>
        </Toolbar>
        <Divider />
        <List>
          <ListItem key="DashBorad" disablePadding>
            <ListItemButton onClick={() => navigate("/admin")}>
              <ListItemIcon>
                <i className="fa fa-home"></i>
              </ListItemIcon>
              <ListItemText primary="DashBorad" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Notes" disablePadding>
            <ListItemButton onClick={() => navigate("/admin/notes")}>
              <ListItemIcon>
                <i className="fa fa-book"></i>
              </ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Contact" disablePadding>
            <ListItemButton onClick={() => navigate("/admin/contact-list")}>
              <ListItemIcon>
                <i className="fa fa-envelope"></i>
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItemButton>
          </ListItem>

          <ListItem key="User" disablePadding>
            <ListItemButton onClick={() => navigate("/admin/user-list")}>
              <ListItemIcon>
                <i className="fa fa-users"></i>
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Category" disablePadding>
            <ListItemButton onClick={() => navigate("/admin/category-list")}>
              <ListItemIcon>
                <i className="fa fa-list"></i>
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Product" disablePadding>
            <ListItemButton onClick={() => navigate("/admin/product-list")}>
              <ListItemIcon>
                <i className="fa fa-product-hunt"></i>
              </ListItemIcon>
              <ListItemText primary="Product" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Order" disablePadding>
            <ListItemButton onClick={() => navigate("/admin/order-list")}>
              <ListItemIcon>
                <i className="fa fa-shopping-cart"></i>
              </ListItemIcon>
              <ListItemText primary="Order" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={() => logoutUser()}>
              <ListItemIcon>
                <i className="fa fa-sign-out"></i>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
