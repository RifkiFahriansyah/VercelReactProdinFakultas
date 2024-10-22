import React, {useEffect, useState, UseState} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List(){
    const [prodi, setProdi] = useState([]);

    useEffect(() => {
        axios.get('https://project-apiif-3-b.vercel.app/api/api/prodi')
        .then((response) => {
            console.log(response.data.result)
            setProdi(response.data.result)
        })
        .catch((error) => {
            console.log(error)
        })
    },[])

    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this! Prodi : ${nama}`,
            icon: "warning",
            showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if(result.isConfirmed){
                //Lakukan penghapusan jika dikonfirmasi
                axios
                .delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
                .then((response)=> {
                    //Hapus fakultas dari state setelah sukses dihapus dari server
                    setProdi(prodi.filter((f) => f.id !== id));
                    //Tampilkan notifikasi sukses
                    Swal.fire("Deleted!", "Prodi has been deleted.", "success");
                })
                .catch((error)=> {
                    console.error("Error deleting data : ", error);// Menangani error 
                    Swal.fire("Error", "There was an issue deleting data", "error");// Menampilkan notifikasi error
                });
            }
        });
    };
    return (
      <>
      <h2>List Prodi</h2>
      <NavLink to="/prodi/create" className="btn btn-primary my-2 mx-3">
          Create
      </NavLink>
      <table className="table">
          <thead>
              <tr>
              <th scope="col">Nama Prodi</th>
              <th scope="col">Nama Fakultas</th>
              <th scope="col">#</th>
              </tr>
          </thead>
          <tbody>
              {prodi.map((f) => (
                  <tr key={f.id}>
                      <td>{f.nama}</td>
                      <td>{f.fakultas.nama}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Action buttons">
                          <NavLink to={`/prodi/edit/${f.id}`} className="btn btn-warning">
                              Edit
                          </NavLink> | 
                          <button
                        onClick={()=>handleDelete(f.id, f.nama)}
                        className="btn btn-danger" 
                        >
                            Delete
                        </button>
                        </div>
                      </td>
                  </tr>
              ))}
          </tbody>
          </table>
      </>
  )
}
      