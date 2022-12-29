import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";

interface IOption {
  value: number | string;
  title: string;
  checked: boolean;
}

const TableFilter = ({
  name,
  data,
  setFilteredData
}: {
  name: string;
  data: IOption[];
  setFilteredData: (ids: (string | number)[]) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [filterList, setFilterList] = useState<IOption[]>(data);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (data) {
      setFilterList(data);
    }
  }, [data]);

  const handleEmit = (value: number | string) => {
    const updateList = filterList.map((item) => {
      if (item.value === value) {
        item.checked = !item.checked;
      }
      return item;
    });
    setFilterList(updateList);
    const emitValue = updateList
      .filter(({ checked }) => checked)
      .map(({ value }) => value);
    setFilteredData(emitValue);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        {filterList.map(({ value, title, checked }) => (
          <MenuItem key={value} onClick={() => handleEmit(value)}>
            <Checkbox checked={checked} /> {title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default TableFilter;
