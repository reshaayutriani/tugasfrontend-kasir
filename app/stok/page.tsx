export const metadata = {
  title: "stok",
};
import axios from "axios";
import Link from "next/link";
import Addstok from "./add";
import Deletestok from "./delete";
import Editstok from "./edit";

type stok = {
  id: number;
  stok_id: string;
  menu_id: string;
  jumlah: string;
};
const getstok = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/stok");

  return res.data.data;
};
const stokList = async () => {
  const stok: stok[] = await getstok();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <Addstok />
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>No</th>
            <th>stok id</th>
            <th>menu id</th>
            <th>jumlah</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stok?.map((stok, index) => (
            <tr key={stok.id}>
              <td>{index + 1}</td>
              <td>{stok.stok_id}</td>
              <td>{stok.menu_id}</td>
              <td>{stok.jumlah}</td>
              <td className="flex">
                <div className="mr-1">
                  <Editstok {...stok} />
                </div>
                <Deletestok {...stok}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default stokList;
