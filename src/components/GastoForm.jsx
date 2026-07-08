import React, { useState, useEffect } from 'react';

export default function GastoForm({ onCreate, onUpdate, gastoAEditar, setGastoAEditar }) {
  const [detalle, setDetalle] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [error, setError] = useState('');

  // Efecto para cargar los datos en el formulario si se va a editar un gasto
  useEffect(() => {
    if (gastoAEditar) {
      setDetalle(gastoAEditar.detalle);
      setMonto(gastoAEditar.monto);
      setCategoria(gastoAEditar.categoria);
      setFecha(gastoAEditar.fecha);
    } else {
      limpiarFormulario();
    }
  }, [gastoAEditar]);

  const limpiarFormulario = () => {
    setDetalle('');
    setMonto('');
    setCategoria('');
    setFecha('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- VALIDACIONES DE DESARROLLO SEGURO ---
    if (!detalle.trim() || !monto || !categoria || !fecha) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (Number(monto) <= 0) {
      setError('El monto debe ser un valor numérico mayor a cero.');
      return;
    }

    setError(''); // Limpiar errores si pasa las validaciones

    const datosGasto = {
      detalle: detalle.trim(),
      monto: Number(monto),
      categoria,
      fecha
    };

    if (gastoAEditar) {
      // Si estamos editando, mantenemos el ID original y actualizamos
      onUpdate({ ...datosGasto, id: gastoAEditar.id });
    } else {
      // Si es nuevo, se envía al callback de creación
      onCreate(datosGasto);
    }

    limpiarFormulario();
  };

  const handleCancelarEdicion = () => {
    setGastoAEditar(null);
    limpiarFormulario();
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <h3 className="card-title h5 mb-3 text-secondaryfw-bold">
        {gastoAEditar ? '📝 Editar Gasto Hormiga' : '➕ Registrar Gasto Hormiga'}
      </h3>
      
      {error && <div className="alert alert-danger py-2 h6 small">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label small fw-bold">Detalle / Concepto</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Ej. Café al paso, Snack, Suscripción"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label small fw-bold">Monto ($ CLP)</label>
          <input 
            type="number" 
            className="form-control" 
            placeholder="Ej. 2500"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label small fw-bold">Categoría</label>
          <select 
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccione una categoría...</option>
            <option value="Comida / Snacks">Comida / Snacks</option>
            <option value="Transporte diario">Transporte diario</option>
            <option value="Vicios / Cigarros">Vicios / Cigarros</option>
            <option value="Suscripciones">Suscripciones Digitales</option>
            <option value="Otros Antojos">Otros Antojos</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label small fw-bold">Fecha del Gasto</label>
          <input 
            type="date" 
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className={`btn w-100 fw-bold ${gastoAEditar ? 'btn-warning' : 'btn-primary'}`}>
            {gastoAEditar ? 'Guardar Cambios' : 'Añadir Gasto'}
          </button>
          {gastoAEditar && (
            <button type="button" className="btn btn-outline-secondary w-100" onClick={handleCancelarEdicion}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}