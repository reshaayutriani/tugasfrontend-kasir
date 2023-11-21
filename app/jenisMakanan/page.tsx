export const metadata = {
  title: "JenisMakanan",
};
import axios from "axios";
import Link from "next/link";
import AddJenisMakanan from "./add";
import DeleteJenisMakanan from "./delete";
import EditJenisMakanan from "./edit";

type JenisMakanan = {
  id: number;
  nama_jenis: string;
  kategori_id: string;
};
const getJenisMakanan = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/jenisMakanan");

  return res.data.data;
};
const JenisMakananList = async () => {
  const JenisMakanan: JenisMakanan[] = await getJenisMakanan();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddJenisMakanan />
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>No</th>
            <th>Nama jenis</th>
            <th>kategor id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {JenisMakanan?.map((JenisMakanan, index) => (
            <tr key={JenisMakanan.id}>
              <td>{index + 1}</td>
              <td>{JenisMakanan.nama_jenis}</td>
              <td>{JenisMakanan.kategori_id}</td>
              <td className="flex">
                <div className="mr-1">
                  <EditJenisMakanan {...JenisMakanan} />
                </div>
                <DeleteJenisMakanan {...JenisMakanan} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JenisMakananList;
