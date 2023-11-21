export const metadata = {
  title: "pelanggan",
};
import axios from "axios";
import Link from "next/link";
import Addpelanggan from "./add";
import Deletepelanggan from "./delete";
import Editpelanggan from "./edit";

type pelanggan = {
  id: number;
  nama: string;
  email: string;
  nomortelepon: string;
  alamat: string;
};
const getpelanggan = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/pelanggan");

  return res.data.data;
};
const pelangganList = async () => {
  const pelanggan: pelanggan[] = await getpelanggan();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <Addpelanggan />
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>No</th>
            <th>nama</th>
            <th>email</th>
            <th>nomor telepon</th>
            <th>alamat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pelanggan?.map((pelanggan, index) => (
            <tr key={pelanggan.id}>
              <td>{index + 1}</td>
              <td>{pelanggan.nama}</td>
              <td>{pelanggan.email}</td>
              <td>{pelanggan.nomortelepon}</td>
              <td>{pelanggan.alamat}</td>
              <td className="flex">
                <div className="mr-1">
                  <Editpelanggan {...pelanggan} />
                </div>
                <Deletepelanggan {...pelanggan}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default pelangganList;
