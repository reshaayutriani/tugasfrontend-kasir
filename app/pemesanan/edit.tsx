"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type pemesanan = {
  id: number;
  meja_id: string;
  tanggal_pemesanan: string;
  jam_mulai: string;
  jam_selesai: string;
  nama_pemesanan: string;
  jumlah_pelanggan: string;
};
const API_URL = 'http://127.0.0.1:8000/api'
const Editpemesanan = (pemesanan: pemesanan) => {
  const [modal, setModal] = useState(false);
  const [meja_id, setmeja_id] = useState(pemesanan.meja_id);
  const [tanggal_pemesanan, settanggal_pemesanan] = useState(pemesanan.tanggal_pemesanan)
  const [jam_mulai, setjam_mulai] = useState(pemesanan.jam_mulai)
  const [jam_selesai, setjam_selesai] = useState(pemesanan.jam_selesai)
  const [nama_pemesanan, setnama_pemesanan] = useState(pemesanan.nama_pemesanan)
  const [jumlah_pelanggan, setjumlah_pelanggan] = useState(pemesanan.jumlah_pelanggan)
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/pemesanan/${pemesanan.id}`;
    const data = { meja_id: meja_id, tanggal_pemesanan: tanggal_pemesanan, jam_mulai: jam_mulai, jam_selesai: jam_selesai, nama_pemesanan: nama_pemesanan, jumlah_pelanggan: jumlah_pelanggan }
    await axios.patch(endpoint, data);
    setmeja_id('')
    settanggal_pemesanan('')
    setjam_mulai('')
    setjam_selesai('')
    setnama_pemesanan('')
    setjumlah_pelanggan('')
    setIsMutating(false);
    router.refresh();
    setModal(false);
  };
  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Edit
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Editmenu</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
            <label className="label font-bold">meja_id</label>
              <input
                type="text"
                value={meja_id}
                onChange={(e) => setmeja_id(e.target.value)}
                className="input w-full input-bordered"
                placeholder="meja_id"
              />
              <label className="label font-bold">tanggal_pemesanan</label>
              <input
                type="text"
                value={tanggal_pemesanan}
                onChange={(e) => settanggal_pemesanan(e.target.value)}
                className="input w-full input-bordered"
                placeholder="tanggal_pemesanan"
              />
              <label className="label font-bold">jam_mulai</label>
              <input
                type="text"
                value={jam_mulai}
                onChange={(e) => setjam_mulai(e.target.value)}
                className="input w-full input-bordered"
                placeholder="jam_mulai"
              />
              <label className="label font-bold">jam_selesai</label>
              <input
                type="text"
                value={jam_selesai}
                onChange={(e) => setjam_selesai(e.target.value)}
                className="input w-full input-bordered"
                placeholder="jam_selesai"
              />
              <label className="label font-bold">nama_pemesanan</label>
              <input
                type="text"
                value={nama_pemesanan}
                onChange={(e) => setnama_pemesanan(e.target.value)}
                className="input w-full input-bordered"
                placeholder="nama_pemesanan"
              />
              <label className="label font-bold">tanggal_pemesanan</label>
              <input
                type="text"
                value={tanggal_pemesanan}
                onChange={(e) => settanggal_pemesanan(e.target.value)}
                className="input w-full input-bordered"
                placeholder="tanggal_pemesanan"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Submit loading ...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editpemesanan