import React from 'react';

export default function Navbar({ gastos, filtroCategoria, setFiltroCategoria }) {
  const totalGastado = gastos.reduce((acumulador, gasto) => acumulador + Number(gasto.monto), 0);

  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow-sm">
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        
        {/* Logo / Nombre */}
        <span className="navbar-brand mb-0 h1 d-flex align-items-center gap-2">
          🐜 <span>HormigaLibre</span>
        </span>
        
        {/* BUSCADOR POR CATEGORÍA EN NAVBAR */}
        <div className="d-flex align-items-center gap-2 src-navbar-search">
          <label className="text-white small mb-0 d-none d-sm-block fw-bold text-uppercase">Buscar por:</label>
          <select 
            className="form-select form-select-sm bg-secondary text-white border-0"
            style={{ width: '220px', cursor: 'pointer' }}
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="Todas">🔍 Todas las Categorías</option>
            <option value="Comida / Snacks">🍔 Comida / Snacks</option>
            <option value="Transporte diario">🚌 Transporte diario</option>
            <option value="Vicios / Cigarros">🚬 Vicios / Cigarros</option>
            <option value="Suscripciones">📺 Suscripciones Digitales</option>
            <option value="Otros Antojos">🛍️ Otros Antojos</option>
          </select>
        </div>

        {/* Resumen Financiero */}
        <div className="d-flex align-items-center">
          <div className="bg-danger text-white px-3 py-2 rounded-pill fw-bold shadow-sm">
            Total Gastado: ${totalGastado.toLocaleString('es-CL')} CLP
          </div>
        </div>
        
      </div>
    </nav>
  );
}