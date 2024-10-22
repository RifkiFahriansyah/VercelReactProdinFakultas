import React, {useEffect, useState, UseState} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; // Import sweetalert2

export default function List(){

    //Fungsi untuk menghapus fakultas berdasarkan ID dengan konfirmasi sweetalert2
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this! Fakultas : ${nama}`,
            icon: "warning",
            showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if(result.isConfirmed){
                //Lakukan penghapusan jika dikonfirmasi
                axios
                .delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
                .then((response)=> {
                    //Hapus fakultas dari state setelah sukses dihapus dari server
                    setFakultas(fakultas.filter((f) => f.id !== id));
                    //Tampilkan notifikasi sukses
                    Swal.fire("Deleted!", "Fakultas has been deleted.", "success");
                })
                .catch((error)=> {
                    console.error("Error deleting data : ", error);// Menangani error 
                    Swal.fire("Error", "There was an issue deleting data", "error");// Menampilkan notifikasi error
                });
            }
        });
    };
    const [fakultas, setFakultas] = useState([]);

    useEffect(() => {
        axios.get('https://project-apiif-3-b.vercel.app/api/api/fakultas')
        .then((response) => {
            console.log(response.data.result)
            setFakultas(response.data.result)
        })
        .catch((error) => {
            console.log(error)
        })
    },[])
    return(
        <>
            <h2>List Fakultas</h2>

            {/* Tombol Tambah Fakultas */}
            <NavLink to="/fakultas/create" className="btn btn-primary my-4">
                create
            </NavLink>
            <ul className="list-group">
                {fakultas.map((data) => (
                    <li key={data.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{data.nama}</span>
                        <div className="btn-group" role="group" aria-label="Action buttons">
                        <NavLink to={`/fakultas/edit/${data.id}`} className="btn btn-warning">
                            Edit
                        </NavLink>
                        <button
                        onClick={()=>handleDelete(data.id, data.nama)}
                        className="btn btn-danger" 
                        >
                            Delete
                        </button>
                        </div>
                    </li>
                ))}
            </ul> 
        </>
    )
}