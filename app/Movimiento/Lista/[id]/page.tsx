"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

// Interfaces basadas en tu modelo de datos
interface Movimiento {
  id: string;
  expedienteId: string;
  fecha: string;
  detalle: string;
  sectorOrigen: string | null;
  sectorDestino: string;
  usuarioId: string;
  usuarioNombre: string;
  estadoExpediente: string;
  tipoMovimiento: string;
  observaciones?: string;
  fechaCreacion: string;
}

interface Expediente {
  id: string;
  numero: string;
  tema: string;
  estado: string;
  sectorActual: string;
  usuario: string;
}

// Datos de ejemplo para movimientos
const movimientosEjemplo: Movimiento[] = [
  {
    id: "1",
    expedienteId: "001",
    fecha: "2025-01-20 10:30:00",
    detalle: "Expediente creado y asignado a Desarrollo",
    sectorOrigen: null,
    sectorDestino: "Desarrollo",
    usuarioId: "user-123",
    usuarioNombre: "Juan Pérez",
    estadoExpediente: "Creado",
    tipoMovimiento: "creacion",
    observaciones: "Inicio del proceso de práctica supervisada",
    fechaCreacion: "2025-01-20"
  },
  {
    id: "2",
    expedienteId: "001",
    fecha: "2025-01-20 14:15:00",
    detalle: "Revisión inicial completada, enviado a Calidad",
    sectorOrigen: "Desarrollo",
    sectorDestino: "Calidad",
    usuarioId: "user-456",
    usuarioNombre: "María González",
    estadoExpediente: "En revisión",
    tipoMovimiento: "traslado",
    observaciones: "Se completó la fase de desarrollo inicial",
    fechaCreacion: "2025-01-20"
  },
  {
    id: "3",
    expedienteId: "001",
    fecha: "2025-01-21 09:45:00",
    detalle: "Aprobado por calidad, enviado a Dirección",
    sectorOrigen: "Calidad",
    sectorDestino: "Dirección",
    usuarioId: "user-789",
    usuarioNombre: "Carlos Rodríguez",
    estadoExpediente: "Aprobado",
    tipoMovimiento: "traslado",
    observaciones: "Cumple con todos los estándares de calidad",
    fechaCreacion: "2025-01-21"
  },
  {
    id: "4",
    expedienteId: "002",
    fecha: "2025-01-22 11:20:00",
    detalle: "Expediente creado y asignado a Diseño",
    sectorOrigen: null,
    sectorDestino: "Diseño",
    usuarioId: "user-123",
    usuarioNombre: "Juan Pérez",
    estadoExpediente: "Creado",
    tipoMovimiento: "creacion",
    fechaCreacion: "2025-01-22"
  },
  {
    id: "5",
    expedienteId: "002",
    fecha: "2025-01-23 16:30:00",
    detalle: "Diseño aprobado, enviado a Desarrollo",
    sectorOrigen: "Diseño",
    sectorDestino: "Desarrollo",
    usuarioId: "user-456",
    usuarioNombre: "María González",
    estadoExpediente: "En progreso",
    tipoMovimiento: "traslado",
    observaciones: "Wireframes y prototipos aprobados",
    fechaCreacion: "2025-01-23"
  }
];

// Datos de ejemplo para expedientes
const expedientesEjemplo: Expediente[] = [
  {
    id: "001",
    numero: "001",
    tema: "Práctica Supervisada",
    estado: "Aprobado",
    sectorActual: "Dirección",
    usuario: "Juan Pérez"
  },
  {
    id: "002",
    numero: "002",
    tema: "Tesis de Grado",
    estado: "En progreso",
    sectorActual: "Desarrollo",
    usuario: "María González"
  }
];

export default function ListaMovimientosExpediente() {
  const router = useRouter();
  const params = useParams();
  const expedienteId = params.id as string;

  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [expediente, setExpediente] = useState<Expediente | null>(null);
  const [cargando, setCargando] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Cargar expediente
      const expedienteEncontrado = expedientesEjemplo.find(exp => exp.id === expedienteId);
      setExpediente(expedienteEncontrado || null);
      
      // Filtrar movimientos por expediente
      const movimientosFiltrados = movimientosEjemplo.filter(mov => mov.expedienteId === expedienteId);
      
      setMovimientos(movimientosFiltrados);
      setCargando(false);
    };

    cargarDatos();
  }, [expedienteId]);

  // Filtrar movimientos
  const movimientosFiltrados = movimientos.filter(movimiento => {
    const coincideBusqueda = 
      movimiento.detalle.toLowerCase().includes(busqueda.toLowerCase()) ||
      movimiento.usuarioNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      movimiento.sectorDestino.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideTipo = filtroTipo === "todos" || movimiento.tipoMovimiento === filtroTipo;
    
    return coincideBusqueda && coincideTipo;
  });

  const getTipoMovimientoColor = (tipo: string) => {
    switch (tipo) {
      case "creacion":
        return "bg-green-100 text-green-800 border-green-200";
      case "traslado":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "modificacion":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTipoMovimientoTexto = (tipo: string) => {
    switch (tipo) {
      case "creacion":
        return "Creación";
      case "traslado":
        return "Traslado";
      case "modificacion":
        return "Modificación";
      default:
        return tipo;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Creado":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "En revisión":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "En progreso":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Aprobado":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rechazado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleVolver = () => {
    router.push("/Expediente");
  };

  const handleVerDetalleExpediente = () => {
    router.push(`/Expediente/Detalle/${expedienteId}`);
  };

  const handleRegistrarMovimiento = () => {
    router.push(`/Movimiento/Registrar/${expediente?.id}`);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  if (cargando) {
    return (
      <main className="min-h-screen flex flex-col bg-cyan-50">
        
        <section className="flex-1 p-6 bg-cyan-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando movimientos...</p>
          </div>
        </section>
      </main>
    );
  }

  if (!expediente) {
    return (
      <main className="min-h-screen flex flex-col bg-cyan-50">
        <section className="flex-1 p-6 bg-cyan-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Expediente no encontrado</p>
            <button
              onClick={() => router.push("/Expediente")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Volver a la lista
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-cyan-50">

      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-cyan-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Movimientos - Expediente #{expediente.numero}
                  </h1>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getEstadoColor(expediente.estado)}`}>
                    {expediente.estado}
                  </span>
                </div>
                <p className="text-gray-600">
                  Tema: <span className="font-semibold">{expediente.tema}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Sector actual: <span className="font-medium">{expediente.sectorActual}</span>
                </p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={handleVolver}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Volver
                </button>
                <button
                  onClick={handleVerDetalleExpediente}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Ver Expediente
                </button>
                <button
                  onClick={handleRegistrarMovimiento}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Movimiento
                </button>
              </div>
            </div>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                {/* Buscador */}
                <div className="flex-1">
                  <label htmlFor="buscar" className="block text-sm font-medium text-gray-900 mb-2">
                    Buscar por detalle, usuario o sector
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="buscar"
                      placeholder="Buscar en movimientos..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Filtro por tipo */}
                <div className="w-full md:w-48">
                  <label htmlFor="tipo" className="block text-sm font-medium text-gray-900 mb-2">
                    Filtrar por tipo
                  </label>
                  <select
                    id="tipo"
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  >
                    <option value="todos">Todos los tipos</option>
                    <option value="creacion">Creación</option>
                    <option value="traslado">Traslado</option>
                    <option value="modificacion">Modificación</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Movimientos */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header de la tabla */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white text-center">
                Historial de Movimientos ({movimientosFiltrados.length})
              </h2>
            </div>

            {/* Contenido de movimientos */}
            <div className="p-6">
              {movimientosFiltrados.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron movimientos</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {busqueda || filtroTipo !== "todos" 
                      ? "Intenta con otros términos de búsqueda" 
                      : "No hay movimientos registrados para este expediente"}
                  </p>
                  <button
                    onClick={handleRegistrarMovimiento}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2 mx-auto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Registrar Primer Movimiento
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {movimientosFiltrados.map((movimiento) => (
                    <div
                      key={movimiento.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200 bg-white"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                        <div className="flex-1">
                          {/* Header del movimiento */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getTipoMovimientoColor(movimiento.tipoMovimiento)}`}>
                              {getTipoMovimientoTexto(movimiento.tipoMovimiento)}
                            </span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getEstadoColor(movimiento.estadoExpediente)}`}>
                              {movimiento.estadoExpediente}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatFecha(movimiento.fecha)}
                            </span>
                          </div>

                          {/* Detalle del movimiento */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {movimiento.detalle}
                          </h3>

                          {/* Información del flujo */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            {movimiento.sectorOrigen && (
                              <div className="flex items-center gap-1">
                                <span className="font-medium">De:</span>
                                <span className="bg-blue-50 px-2 py-1 rounded text-xs">{movimiento.sectorOrigen}</span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <span className="font-medium">A:</span>
                              <span className="bg-green-50 px-2 py-1 rounded text-xs">{movimiento.sectorDestino}</span>
                            </div>
                          </div>

                          {/* Información adicional */}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {movimiento.usuarioNombre}
                            </span>
                          </div>

                          {/* Observaciones */}
                          {movimiento.observaciones && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Observaciones: </span>
                                {movimiento.observaciones}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}