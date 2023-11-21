"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


const API_URL = 'http://127.0.0.1:8000/api'
const Addpelanggan = () => {
  const [modal, setModal] = useState(false)
  const [nama, setnama] = useState("")
  const [email, setemail] = useState("")
  const [nomortelepon, setnomortelepon] = useState("")
  const [alamat, setalamat] = useState("")
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()
  const handleChange = () => setModal(!modal)
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsMutating(true)
    let endpoint = `${API_URL}/pelanggan`
    const data = { nama, email, nomortelepon, alamat }
    await axios.post(endpoint, data);
    setnama('')
    setemail('')
    setnomortelepon('')
    setalamat('')
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
}

export default Addpelanggan