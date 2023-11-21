export const metadata = {
  title: "stok",
};
import axios from "axios";
import Link from "next/link";
import Addpemesanan from "./add";
import Deletepemesanan from "./delete";
import Editpemesanan from "./edit";

type pemesanan = {
  id: number;
  meja_id: string;
  tanggal_pemesanan: string;
  jam_mulai: string;
  jam_selesai: string;
  nama_pemesanan: string;
  jumlah_pelanggan: string;
};
const getpemesanan = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/pemesanan");

  return res.data.data;
};
const pemesananList = async () => {
  const pemesanan: pemesanan[] = await getpemesanan();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <Addpemesanan />
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>No</th>
            <th>meja_id</th>
            <th>tanggal_pemesanan</th>
            <th>jam_mulai</th>
            <th>jam_selesai</th>
            <th>nama_pemesanan</th>
            <th>jumlah_pelanggan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pemesanan?.map((pemesanan, index) => (
            <tr key={pemesanan.id}>
              <td>{index + 1}</td>
              <td>{pemesanan.meja_id}</td>
              <td>{pemesanan.tanggal_pemesanan}</td>
              <td>{pemesanan.jam_mulai}</td>
              <td>{pemesanan.jam_selesai}</td>
              <td>{pemesanan.nama_pemesanan}</td>
              <td>{pemesanan.jumlah_pelanggan}</td>
              <td className="flex">
                <div className="mr-1">
                  <Editpemesanan {...pemesanan} />
                </div>
                <Deletepemesanan {...pemesanan}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default pemesananList;
