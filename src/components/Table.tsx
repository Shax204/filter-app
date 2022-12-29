import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useRef, useState } from "react";
import TableFilter from "./TableFilter";
export interface IApiData {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface IOption {
  value: number | string;
  title: string;
}

type ValueType = string | number;

interface IOptionExtended extends IOption {
  checked: boolean;
}
const TableComponent = () => {
  const [data, setData] = useState<IApiData[]>([]);
  const [filteredData, setFilteredData] = useState<IApiData[]>([]);
  const [nameData, setNameData] = useState<IOptionExtended[]>([]);
  const [emailData, setEmailData] = useState<IOptionExtended[]>([]);
  const [filter, setFilter] = useState<{ [key: string]: ValueType[] }>({});
  const tableList = Object.values(filter).length ? filteredData : data;

  useEffect(() => {
    async function fetchApi() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setData(data);
      const nameList: IOptionExtended[] = [],
        emailList: IOptionExtended[] = [];
      data.forEach(({ id, name, email }: IApiData) => {
        const checked = false;
        nameList.push({
          value: id,
          title: name,
          checked
        });
        emailList.push({
          value: id,
          title: email,
          checked
        });
      });

      setNameData(nameList);
      setEmailData(emailList);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const name = filter.name;
    const email = filter.email;
    const filterList = data.filter((el) => {
      return (
        (!email?.length || email.includes(el.id)) &&
        (!name?.length || name.includes(el.id))
      );
    });
    setFilteredData(filterList);
  }, [filter]);
  const handleSortByName = (ids: (string | number)[], name: string) => {
    setFilter((prev) => ({ ...prev, [name]: ids }));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableFilter
                name={"Name"}
                data={nameData}
                setFilteredData={(data) => handleSortByName(data, "name")}
              />
            </TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">
              <TableFilter
                name={"Email"}
                data={emailData}
                setFilteredData={(data) => handleSortByName(data, "email")}
              />
            </TableCell>

            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Website</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableList.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.username}</TableCell>
              <TableCell align="right">{item.email}</TableCell>
              <TableCell align="right">{item.phone}</TableCell>
              <TableCell align="right">{item.website}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
