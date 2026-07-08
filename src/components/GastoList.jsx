import React from 'react';
import GastoItem from './GastoItem';

export default function GastoList({ gastos, filtroCategoria, onDelete, onSelectEdit }) {
  
  // Filtrado lógico basado en la propiedad recibida del estado global
  const gastosFiltrados = filtroCategoria === 'Todas' 
    ? gastos 
    : gastos.filter(g => g.categoria === filtroCategoria);

  return (
    <div className="card shadow-sm border-0 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="card-title h5 mb-0 text-secondary fw-bold">
          📊 Historial {filtroCategoria !== 'Todas' ? `(${filtroCategoria})` : ''}
        </h3>
        <span className="badge bg-light text-dark border px-2 py-1 small">
          Mostrando: {gastosFiltrados.length}
        </span>
      </div>

      {gastosFiltrados.length === 0 ? (
        <div className="text-center py-5 text-muted bg-light rounded border border-dashed">
          <p className="mb-0 fs-6">No se registran gastos guardados en esta categoría.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {gastosFiltrados.map((gasto) => (
            <GastoItem 
              key={gasto.id} 
              gasto={gasto} 
              onDelete={onDelete}
              onSelectEdit={onSelectEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}