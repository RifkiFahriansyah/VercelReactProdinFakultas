import React, {useState, UseState} from "react";
import axios from "axios";

export default function Craete(){
    //Inisialisasi state untuk menyimpan data fakultas
    const [namaFakultas, setNamaFakultas] = useState("");
    //Inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");
    //Inisialisasi state untuk menyimpan pesan sukses
    const [success, setSuccess] = useState("");

    //Fungsi yg akan dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault(); //Jangan reload halaman
        setError(""); //Kosongkan error
        setSuccess(""); //Kosongkan success

        // Validasi input jika namaFakultas kosong, set pesan error
        if(namaFakultas.trim() === ""){
            setError("Nama Fakultas harus diisi"); // set pesan error jika input field kosong
            return; // stop eksekusi
        }

        try{
            const respone = await axios.post(
                "https://project-apiif-3-b.vercel.app/api/api/fakultas",
                {nama: namaFakultas}, // Data yg dikirim berupa objek JSON 
            );
            
            if(respone.status === 201){
                // Tampilkan pesan sukses jika fakultas berhasil dibuat
                setSuccess("Fakultas created successfully");
                setNamaFakultas(""); 
                }else {
                    // Jika tisak berhasil, maka pesan error nampil
                    setError("Failed to create fakultas");
                }
        }catch (error){
            // Jika terjadi error (misal masalah jaringan dan database), tampilkan pesan error
            setError("An error occured while creating fakultas");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Fakultas</h2>
            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
            {error && <div className="alert alert-success">{success}</div>}

            {/* Form untuk input data fakultas */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaFakultas" className="form-label">
                        Nama Fakultas
                    </label>

                    {/* Input untuk nama fakultas dengan class bootstrap */}
                    <input 
                        type="text" className="form-control" id="namaFakultas"
                        value={namaFakultas} // Nilai input disimpan di state namaFakultas
                        onChange={(e) => setNamaFakultas(e.target.value)} // Update state saat input berubah
                        placeholder="Masukkan Nama Fakultas" // Placeholder teks untuk input
                    />
                </div>
                {/* Type Button Submit */}
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );

}