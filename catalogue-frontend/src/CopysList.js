import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Importa los estilos CSS

const CopysList = () => {
    const [copies, setCopies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20; // Número máximo de filas por página

    useEffect(() => {
        axios.get('http://localhost:8000/api/copies/')
            .then(response => {
                setCopies(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the copies!", error);
            });
    }, []);

    const filteredCopies = copies.filter(copy =>
        (copy.medio || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (copy.fecha || '').includes(searchTerm) ||
        (copy.marca || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (copy.producto || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (copy.version || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (copy.programa || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (copy.hora || '').includes(searchTerm) ||
        (copy.vehiculo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (copy.anunciante || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (copy.tema || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (copy.id_category ? copy.id_category.toString() : '').includes(searchTerm) ||
        (copy.processing ? copy.processing.toString() : '').includes(searchTerm) ||
        (copy.file || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginación
    const indexOfLastCopy = currentPage * rowsPerPage;
    const indexOfFirstCopy = indexOfLastCopy - rowsPerPage;
    const currentCopies = filteredCopies.slice(indexOfFirstCopy, indexOfLastCopy);

    const totalPages = Math.ceil(filteredCopies.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <h1>Copys List</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Medio</th>
                        <th>Fecha</th>
                        <th>Marca</th>
                        <th>Producto</th>
                        <th>Versión</th>
                        <th>Programa</th>
                        <th>Hora</th>
                        <th>Vehículo</th>
                        <th>Anunciante</th>
                        <th>Tema</th>
                        <th>Category ID</th>
                        <th>Processing</th>
                        <th>File</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCopies.length > 0 ? (
                        currentCopies.map(copy => (
                            <tr key={copy.id}>
                                <td>{copy.id}</td>
                                <td>{copy.medio}</td>
                                <td>{copy.fecha}</td>
                                <td>{copy.marca}</td>
                                <td>{copy.producto}</td>
                                <td>{copy.version}</td>
                                <td>{copy.programa}</td>
                                <td>{copy.hora}</td>
                                <td>{copy.vehiculo}</td>
                                <td>{copy.anunciante}</td>
                                <td>{copy.tema}</td>
                                <td>{copy.id_category}</td>
                                <td>{copy.processing ? 'Yes' : 'No'}</td>
                                <td><a href={copy.file}>Download</a></td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="14">No matching results</td></tr>
                    )}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className={index + 1 === currentPage ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CopysList;
