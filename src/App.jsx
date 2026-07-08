import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GastoForm from './components/GastoForm';
import GastoList from './components/GastoList';

export default function App() {
  const [gastos, setGastos] = useState(() => {
    const savedGastos = localStorage.getItem('gastos_hormiga');
    return savedGastos ? JSON.parse(savedGastos) : [];
  });
  
  const [gastoAEditar, setGastoAEditar] = useState(null);
  
  // NUEVO: Estado global para el filtro controlado desde el Navbar
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');

  useEffect(() => {
    localStorage.setItem('gastos_hormiga', JSON.stringify(gastos));
  }, [gastos]);

  const handleCreate = (nuevoGasto) => {
    const gastoConId = { ...nuevoGasto, id: crypto.randomUUID() };
    setGastos([...gastos, gastoConId]);
  };

  const handleUpdate = (gastoActualizado) => {
    setGastos(gastos.map(g => g.id === gastoActualizado.id ? gastoActualizado : g));
    setGastoAEditar(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este gasto hormiga?')) {
      setGastos(gastos.filter(g => g.id !== id));
      if (gastoAEditar?.id === id) setGastoAEditar(null);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light p-0">
      {/* Se pasan el filtro y la función para cambiarlo al Navbar */}
      <Navbar 
        gastos={gastos} 
        filtroCategoria={filtroCategoria} 
        setFiltroCategoria={setFiltroCategoria} 
      />
      <main className="container my-4">
        <div className="row g-4">
          <div className="col-md-5">
            <GastoForm 
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              gastoAEditar={gastoAEditar}
              setGastoAEditar={setGastoAEditar}
            />
          </div>
          <div className="col-md-7">
            {/* Se le pasa el filtro actual a la lista */}
            <GastoList 
              gastos={gastos} 
              filtroCategoria={filtroCategoria}
              onDelete={handleDelete}
              onSelectEdit={setGastoAEditar}
            />
          </div>
        </div>
      </main>
    </div>
  );
}