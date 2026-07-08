import React from 'react';

export default function GastoItem({ gasto, onDelete, onSelectEdit }) {
  // Asignación visual de emojis rápidos por categoría
  const getIcon = (cat) => {
    switch(cat) {
      case 'Comida / Snacks': return '🍔';
      case 'Transporte diario': return '🚌';
      case 'Vicios / Cigarros': return '🚬';
      case 'Suscripciones': return '📺';
      default: return '🛍️';
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white border rounded shadow-sm hover-shadow transition">
      <div className="d-flex align-items-center gap-3">
        <div className="fs-3 bg-light p-2 rounded-circle" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {getIcon(gasto.categoria)}
        </div>
        <div>
          <h4 className="h6 mb-1 fw-bold text-dark">{gasto.detalle}</h4>
          <div className="d-flex gap-2 align-items-center text-muted small">
            <span className="badge bg-secondary px-2 py-1">{gasto.categoria}</span>
            <span>•</span>
            <span>{gasto.fecha}</span>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="text-danger fw-bold fs-6">
          -${gasto.monto.toLocaleString('es-CL')}
        </span>
        <div className="btn-group btn-group-sm" role="group">
          <button 
            type="button" 
            className="btn btn-outline-warning" 
            title="Editar registro"
            onClick={() => onSelectEdit(gasto)}
          >
            ✏️
          </button>
          <button 
            type="button" 
            className="btn btn-outline-danger" 
            title="Eliminar registro"
            onClick={() => onDelete(gasto.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}