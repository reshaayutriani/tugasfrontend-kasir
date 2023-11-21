"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


const API_URL = 'http://127.0.0.1:8000/api'
const Addmenu = () => {
  const [modal, setModal] = useState(false)
  const [nama_menu, setNama_menu] = useState("")
  const [harga, setharga] = useState("")
  const [deskripsi, setdeskripsi] = useState("")
  const [jenis_id, setjenis_id] = useState("")
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()
  const handleChange = () => setModal(!modal)
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsMutating(true)
    let endpoint = `${API_URL}/category`
    const data = { nama_menu, harga, deskripsi, jenis_id }
    await axios.post(endpoint, data);
    setNama_menu('')
    setharga('')
    setdeskripsi('')
    setjenis_id('')
    setIsMutating(false);
    router.refresh()
    setModal(false)
  }
  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add New
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Category</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nama menu</label>
              <input
                type="text"
                value={nama_menu}
                onChange={(e) => setNama_menu(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama_menu"
              />
              <label className="label font-bold">harga</label>
              <input
                type="text"
                value={harga}
                onChange={(e) => setharga(e.target.value)}
                className="input w-full input-bordered"
                placeholder="harga"
              />
              <label className="label font-bold">deskripsi</label>
              <input
                type="text"
                value={deskripsi}
                onChange={(e) => setdeskripsi(e.target.value)}
                className="input w-full input-bordered"
                placeholder="deskripsi"
              />
              <label className="label font-bold">jenis id</label>
              <input
                type="text"
                value={jenis_id}
                onChange={(e) => setjenis_id(e.target.value)}
                className="input w-full input-bordered"
                placeholder="jenis_id"
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
}

export default Addmenu