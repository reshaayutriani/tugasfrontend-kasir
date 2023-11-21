"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type JenisMakanan = {
  id: number;
  nama_jenis: string;
  kategori_id: string;
};
const API_URL = 'http://127.0.0.1:8000/api'
const EditJenisMakanan = (JenisMakanan: JenisMakanan) => {
  const [modal, setModal] = useState(false);
  const [nama_jenis, setnama_jenis] = useState(JenisMakanan.nama_jenis);
  const [kategori_id, setKategori_id] = useState(JenisMakanan.kategori_id);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/JenisMakanan/${JenisMakanan.id}`;
    const data = { nama_jenis: nama_jenis, kategori_id: kategori_id};
    await axios.patch(endpoint, data);
    setnama_jenis("");
    setKategori_id("");
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
          <h3 className="font-bold text-lg">EditJenisMakanan</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Nama jenis</label>
              <input
                type="text"
                value={nama_jenis}
                onChange={(e) => setnama_jenis(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama jenis"
              />
              <label className="label font-bold">kategori id</label>
              <input
                type="text"
                value={kategori_id}
                onChange={(e) => setnama_jenis(e.target.value)}
                className="input w-full input-bordered"
                placeholder="kategori id"
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

export default EditJenisMakanan