/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react"; //Mengimport react, useState, dan useEffect dari module/library react
import { useParams, useNavigate } from "react-router-dom"; //Mengimport useParams dan useNavigate dari module/library react-router-dom untuk menangani parameter dan navigasi
import axios from "axios"; //Mengimport axios untuk melakukan request HTTP

export default function Edit(){
    const { id } = useParams(); //Mengambil parameter "id" dari URL menggunakan useParams
    const navigate = useNavigate();//Menggunakan useNavigate untuk navigasi setelah proses selesai
    const [nama, setNama] = useState("")//Menginisialisasi state 'nama' untuk menyimpan nama fakultas
    const [fakultas, setFakultas] = useState(""); // Mengisialisasi state 'fakultas' untuk menyimpan ID fakultas terpilih
    const [listFakultas, setListFakultas] = useState([]); // Menginisialisasi state 'listFakultas' untuk menyimpan data fakultas dari API
    const [error, setError] = useState("")//Menginisialisasi state 'error' untuk menyimpan pesan error

    //Mengambil data prodi berdasarkan id ketika komponen pertama kali dimuat
    useEffect(() => {
        //Mengambil data berdsarkan id
        axios
        .get(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`) //Mengirimkan request GET untuk mendapatkan data fakultas berdasarkan id
        .then((response) =>{
            setNama(response.data.result.nama) //Menyimpan nama prodi ke dalam state 'nama'
            setFakultas(response.data.result.fakultas_Id) //Menyimpan ID fakultas ke dalam state 'fakultas' 
        })
        .catch((error) =>{
            console.error("Error Fetching data :", error)//Menampilkan pesan error di console jika request gagal
            setError("Data tidak ditemukan"); //Menampilkan pesan error jika data tidak ditemukan
        }); 

    //Mengambil data fakultas untuk dropdown
    axios
    .get("https://project-apiif-3-b.vercel.app/api/api/fakultas")// Request ke API fakultas
    .then((response) =>{
        setListFakultas(response.data.result); // Menyimpan daftar fakultas ke dalam state 'listFakultas'
    }) 
    .catch((error)=>{
        console.error("Error Fetching data fakultas :", error); //Mengangani error jika request gagal
    });
}, [id]); //Use Effect akan dijalankan ulang setiap kali 'id' berubah

//Menghandle perubahan input saat pengguna mengetik di form
const handleChange = (e) =>{
    setNama(e.target.value) //Mengubah state 'nama' sesuai dengan nilai input yg diisi pengguna 
};

// Menghandle perubahan dropdown Fakultas
const handleFakultasChange = (e) =>{
    setFakultas(e.target.value); //Mengubah state 'fakultas' sesuai dengan pilihan yg dipilih pengguna di dropdown 
};

//Menghandle submit form untuk mengedit data prodi
const handleSubmit = (e) =>{
    e.preventDefault(); //Mencegah reload halaman saat form disubmit 
    axios
    .patch(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`, { 
        nama,
        fakultas_Id: fakultas 
    }) //Mengirimkan request PATCH untuk mengupdate data prodi berdasarkan id
    .then((response)=>{
        navigate("/prodi"); //Jika update berhasil, navigasi kembali ke halaman list prodi
    })
    .catch((error)=>{
        console.error("Error Updating Data :", error); //Menampilkan pesan error di console jika ada kesalahan
        setError("Gagal Update Data"); //Mengubah state 'error' jika terjadi kesalahan saat update data
    });
};

return(
    <div>
        <h2>Edit Program Studi</h2> {/* Judul Halaman */}
        {error && <p className="text-danger">{error}</p>} {/* Menampilkan pesan error jika ada */}
        <form onSubmit={handleSubmit}> {/* Form untuk mengedit data prodi */}
            <div className="mb-3">
                <label htmlFor="nama" className="form-label">
                    Nama Program Studi 
                </label> {/* Label input nama prodi */}
                <input 
                    type="text" 
                    className="form-control"
                    id="nama"
                    value={nama} //Mengisi Nilai Input dengan state "nama"
                    onChange={handleChange} //Mengubah nilai input saat input ada perubahan (user mengetik)
                    required //Input wajib diisi
                />
            </div>
            <div className="mb3">
                <label htmlFor="fakultas" className="form-label">
                    Nama Fakultas
                </label> {/* Label dropdown fakultas */}
                <select className="form-select" id="fakultas" value={fakultas}
                onChange={handleFakultasChange}// Dropdown untuk memilih fakultas 
                required
                >
                    <option value="">Pilih Fakultas</option>
                    {listFakultas.map(
                        //Melakukan mapping dari daftar fakultas untuk menampilkan setiap fakultas sebagai opsi
                        (f) => (
                            <option key={f.id} value={f.id}>
                                {f.nama} {/* Menampilkan nama fakultas */}
                            </option>
                        )
                    )}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                Save
            </button>{" "}
            {/* Tombol untuk submit form */}
        </form>
    </div>
)
}