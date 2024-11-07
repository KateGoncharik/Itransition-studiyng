import { FC } from "react";
import { Menu } from "react-admin";
import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";

export const CustomMenu: FC = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <Menu.ResourceItem name="users" />
      <Menu.ResourceItem name="templates" />
      <Menu.ResourceItem name="forms" />
      <Menu.Item to={"/"}>
        <HomeIcon /> <Typography sx={{ ml: 2 }}>Home</Typography>
      </Menu.Item>
    </Menu>
  );
};
