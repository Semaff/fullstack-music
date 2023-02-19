import { List as MaterialList } from "@mui/material";
import { ILeftbarItem } from "components/Leftbar/types/ILeftbarItem";
import Item from "../Item/Item";

interface ListProps {
  items: ILeftbarItem[];
}

const List = ({ items }: ListProps) => {
  return (
    <MaterialList
      role="list"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "start",
        padding: "0 10px"
      }}
    >
      {items.map(({ primary, to, icon }, index) => (
        <Item key={index} primary={primary} to={to} icon={icon} />
      ))}
    </MaterialList>
  );
};

export default List;
