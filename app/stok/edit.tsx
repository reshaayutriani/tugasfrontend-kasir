"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type stok = {
  id: number;
  stok_id: string;
  menu_id: string;
  jumlah: string;
};
const API_URL = 'http://127.0.0.1:8000/api'
const Editstok = (stok: stok) => {
  const [modal, setModal] = useState(false);
  const [stok_id, setstok_id] = useState(stok.stok_id);
  const [menu_id, setmenu_id] = useState(stok.menu_id);
  const [jumlah, setjumlah] = useState(stok.jumlah);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const handleChange = () => setModal(!modal);
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsMutating(true);
    let endpoint = `${API_URL}/stok/${stok.id}`;
    const data = { stok_id: stok_id, menu_id: menu_id, jumlah: jumlah, };
    await axios.patch(endpoint, data);
    setstok_id("");
    setmenu_id("");
    setjumlah("");
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
              <label className="label font-bold">stok id</label>
              <input
                type="text"
                value={stok_id}
                onChange={(e) => setstok_id(e.target.value)}
                className="input w-full input-bordered"
                placeholder="stok_id"
              />
              <label className="label font-bold">menu id</label>
              <input
                type="text"
                value={menu_id}
                onChange={(e) => setmenu_id(e.target.value)}
                className="input w-full input-bordered"
                placeholder="menu_id"
              />
              <label className="label font-bold">jumlah</label>
              <input
                type="text"
                value={jumlah}
                onChange={(e) => setjumlah(e.target.value)}
                className="input w-full input-bordered"
                placeholder="jumlah"
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

export default Editstok