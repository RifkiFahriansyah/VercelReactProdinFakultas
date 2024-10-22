import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateProdi() {
    const [namaProdi, setNamaProdi] = useState('');
    const [fakultasId, setFakultasId] = useState('');  // Bisa diubah
    const [fakultasList, setFakultasList] = useState([]);  // Bisa diubah
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch list of Prodi
    useEffect(() => {
        const fetchFakultas = async () => {
            try {
                const response = await axios.get(
                    'https://project-apiif-3-b.vercel.app/api/api/fakultas'
                );
                setFakultasList(response.data.result);  // Set hasil ke prodiList
            } catch (error) {
                setError('An error occurred while fetching Prodi data');
            }
        };
        fetchFakultas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validasi input
        if (namaProdi.trim() === '' || prodiId === '') {
            setError('Name Prodi and Prodi ID are required');
            return;
        }

        try {
            const response = await axios.post(
                'https://project-apiif-3-b.vercel.app/api/api/prodi',
                { nama: namaProdi, fakultas_id: fakultasId }
            );
            if (response.status === 201) {
                setSuccess('Prodi created successfully');
                setNamaProdi('');
                setFakultasId(''); 
            } else {
                setError('Failed to create Prodi');
            }
        } catch (error) {
            setError('An error occurred while creating Prodi');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Prodi</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaProdi" className="form-label">
                        Name Prodi
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="namaProdi"
                        value={namaProdi}
                        onChange={(e) => setNamaProdi(e.target.value)}
                        placeholder="Masukan Nama Prodi"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="prodiId" className="form-label">
                        Pilih Fakultas
                    </label>
                    <select
                        className="form-select"
                        id="prodiId"
                        value={fakultasId}
                        onChange={(e) => setFakultasId(e.target.value)}
                    >
                        <option value="">Pilih Fakultas</option>
                        {fakultasList.map((fakultas) => (
                            <option key={fakultas.id} value={fakultas.id}>
                                {fakultas.nama}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
}