import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Importa los estilos CSS

const PagesList = () => {
    const [pages, setPages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20; // Número máximo de filas por página

    useEffect(() => {
        axios.get('http://localhost:8000/api/pages/')
            .then(response => {
                setPages(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the pages!", error);
            });
    }, []);

    const filteredPages = pages.filter(page =>
        (page.medio || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (page.fecha || '').includes(searchTerm) ||
        (page['category__name'] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (page.spots ? page.spots.toString() : '').includes(searchTerm) ||
        (page.src_link || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (page.processing ? 'yes' : 'no').includes(searchTerm.toLowerCase())
    );

    // Paginación
    const indexOfLastPage = currentPage * rowsPerPage;
    const indexOfFirstPage = indexOfLastPage - rowsPerPage;
    const currentPages = filteredPages.slice(indexOfFirstPage, indexOfLastPage);

    const totalPages = Math.ceil(filteredPages.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <h1>Pages List</h1>
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
                        <th>Category</th> {/* Cambiado de 'Category ID' a 'Category' */}
                        <th>Spots</th>
                        <th>Source Link</th>
                        <th>Processing</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPages.length > 0 ? (
                        currentPages.map(page => (
                            <tr key={page.id}>
                                <td>{page.id}</td>
                                <td>{page.medio}</td>
                                <td>{page.fecha}</td>
                                <td>{page['category__name']}</td> {/* Mostrando el nombre de la categoría */}
                                <td>{page.spots}</td>
                                <td>{page.src_link}</td>
                                <td>{page.processing ? 'Yes' : 'No'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="7">No matching results</td></tr>
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

export default PagesList;





