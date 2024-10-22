/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react"; //Mengimport react, useState, dan useEffect dari module/library react
import { useParams, useNavigate } from "react-router-dom"; //Mengimport useParams dan useNavigate dari module/library react-router-dom untuk menangani parameter dan navigasi
import axios from "axios"; //Mengimport axios untuk melakukan request HTTP

export default function Edit(){
    const { id } = useParams(); //Mengambil parameter "id" dari URL menggunakan useParams
    const navigate = useNavigate();//Menggunakan useNavigate untuk navigasi setelah proses selesai
    const [nama, setNama] = useState("")//Menginisialisasi state 'nama' untuk menyimpan nama fakultas
    const [error, setError] = useState("")//Menginisialisasi state 'error' untuk menyimpan pesan error

    //Menyimpan data fakultas berdasarkan id ketika komponen pertama kali dibuat
    useEffect(() => {
        axios
        .get(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`) //Mengirimkan request GET untuk mendapatkan data fakultas berdasarkan id
        .then((response) =>{
            setNama(response.data.result.nama) //Jika sukses, Mengisi state 'nama' dengan nama fakultas dari response
        })
        .catch((error) =>{
            console.error("Error Fetching data :", error)//Menampilkan pesan error di console jika request gagal
            setError("Data tidak ditemukan"); //Menampilkan pesan error jika data tidak ditemukan
        });
    }, [id]); //Use Effect akan dijalankan ulang setiap kali 'id' berubah 

    //Menghandle perubahan input saat pengguna mengetik di form
    const handleChange = (e) =>{
        setNama(e.target.value) //Mengisi state 'nama' dengan nilai input dari form  
    };

    //Menghandle submit form untuk mengdeit data fakultas
    const handleSubmit = (e) =>{
        e.preventDefault(); //Mencegah reload halaman saat form disubmit
        axios
        .patch(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`, { nama }) //Mengirimkan request PATCH untuk mengupdate data fakultas berdasarkan id
        .then((response) => {
            navigate("/fakultas"); //Jika update berhasil, navigasi ke halaman list fakultas
        })
        .catch((error) =>{
            console.error("Error Updating data :", error) //Menampilkan pesan error di console jika ada kesalahan
            setError("Gagal Update Data");//Mengubah state 'error' jika terjadi kesalahan saat update data 
        });
    };

    return(
        <div>
            <h2>Edit Fakultas</h2> {/* Judul Halaman */}
            {error && <p className="text-danger">{error}</p>} {/* Menampilkan pesan error jika ada */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">Nama Fakultas</label> {/* Label input nama*/}
                    <input 
                       type="text"
                       className="form-control"
                       id="nama"
                       value={nama} //Mengisi Nilai Input dengan state "nama"
                       onChange={handleChange} //Mengubah nilai input saat input ada perubahan (user mengetik)
                       required //Input wajib diisi
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}
