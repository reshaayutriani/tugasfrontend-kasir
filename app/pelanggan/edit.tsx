"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type pelanggan = {
  id: number;
  nama: string;
  email: string;
  nomortelepon: string;
  alamat: string;
};
const API_URL = 'http://127.0.0.1:8000/api'
const Editpelanggan = (pelanggan: pelanggan) => {
  const [modal, setModal] = useState(false);
  const [nama, setnama] = useState(pelanggan.nama);
  const [email, setemail] = useState(pelanggan.email);
  const [nomortelepon, setnomortelepon] = useState(pelanggan.nomortelepon);
  const [alamat, setalamat] = useState(pelanggan.alamat);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/pelanggan/${pelanggan.id}`;
    const data = { nama: nama, email: email, nomortelepon: nomortelepon,  alamat: alamat};
    await axios.patch(endpoint, data);
    setnama("");
    setemail("");
    setnomortelepon("");
    setalamat("");
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
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setnama(e.target.value)}
                className="input w-full input-bordered"
                placeholder="nama"
              />
              <label className="label font-bold">email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="input w-full input-bordered"
                placeholder="email"
              />
              <label className="label font-bold">nomortelepon</label>
              <input
                type="text"
                value={nomortelepon}
                onChange={(e) => setnomortelepon(e.target.value)}
                className="input w-full input-bordered"
                placeholder="nomortelepon"
              />
              <label className="label font-bold">alamat</label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setalamat(e.target.value)}
                className="input w-full input-bordered"
                placeholder="alamat"
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

export default Editpelanggan