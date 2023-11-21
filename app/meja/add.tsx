"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


const API_URL = 'http://127.0.0.1:8000/api'
const Addmeja = () => {
  const [modal, setModal] = useState(false)
  const [nomor_meja, setnomor_meja] = useState("")
  const [kapasitas, setkapasitas] = useState("")
  const [status, setstatus] = useState("")
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()
  const handleChange = () => setModal(!modal)
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsMutating(true)
    let endpoint = `${API_URL}/category`
    const data = { nomor_meja, kapasitas, status, }
    await axios.post(endpoint, data);
    setnomor_meja('')
    setkapasitas('')
    setstatus('')
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
              <label className="label font-bold">Nomor meja</label>
              <input
                type="text"
                value={nomor_meja}
                onChange={(e) => setnomor_meja(e.target.value)}
                className="input w-full input-bordered"
                placeholder="nomor_meja"
              />
              <label className="label font-bold">kapasitas</label>
              <input
                type="text"
                value={kapasitas}
                onChange={(e) => setkapasitas(e.target.value)}
                className="input w-full input-bordered"
                placeholder="kapasitas"
              />
              <label className="label font-bold">status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setstatus(e.target.value)}
                className="input w-full input-bordered"
                placeholder="deskripsi"
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

export default Addmeja