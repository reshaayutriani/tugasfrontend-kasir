export const metadata = {
  title: "menu",
};
import axios from "axios";
import Link from "next/link";
import Addmenu from "./add";
import Deletemenu from "./delete";
import Editmenu from "./edit";

type menu = {
  id: number;
  nama_menu: string;
  harga: string;
  deskripsi: string;
  jenis_id: string;
};
const getmenu = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/menu");

  return res.data.data;
};
const menuList = async () => {
  const menu: menu[] = await getmenu();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <Addmenu />
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>No</th>
            <th>nama menu</th>
            <th>harga</th>
            <th>deskripsi</th>
            <th>jenis_id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menu?.map((menu, index) => (
            <tr key={menu.id}>
              <td>{index + 1}</td>
              <td>{menu.nama_menu}</td>
              <td>{menu.harga}</td>
              <td>{menu.deskripsi}</td>
              <td>{menu.jenis_id}</td>
              <td className="flex">
                <div className="mr-1">
                  <Editmenu {...menu} />
                </div>
                <Deletemenu {...menu} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default menuList;
