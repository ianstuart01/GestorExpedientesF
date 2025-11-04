"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function ListaMovimientos() {
  const router = useRouter();
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroExpediente, setFiltroExpediente] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    // Cargar datos directamente sin delay de carga
    setMovimientos(movimientosEjemplo);
  }, []);

  // Filtrar movimientos
  const movimientosFiltrados = movimientos.filter(movimiento => {
    const coincideBusqueda = 
      movimiento.detalle.toLowerCase().includes(busqueda.toLowerCase()) ||
      movimiento.usuarioNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      movimiento.sectorDestino.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideTipo = filtroTipo === "todos" || movimiento.tipoMovimiento === filtroTipo;
    
    const coincideExpediente = filtroExpediente === "todos" || movimiento.expedienteId === filtroExpediente;
    
    return coincideBusqueda && coincideTipo && coincideExpediente;
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

  const handleVerExpediente = (expedienteId: string) => {
    router.push(`/Expediente/Detalle/${expedienteId}`);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  // Obtener expedientes únicos para el filtro
  const expedientesUnicos = Array.from(new Set(movimientos.map(m => m.expedienteId)))
    .map(id => expedientesEjemplo.find(exp => exp.id === id))
    .filter(Boolean) as Expediente[];

  return (
    <main className="min-h-screen flex flex-col bg-cyan-50">
      {/* Header */}
      <header className="w-full bg-sky-200 shadow-md flex items-center justify-between h-[100px]">
        <div className="flex items-center h-full">
          <div className="h-full w-[100px] flex items-center justify-center bg-sky-200">
            <Image
              src="/linsi-logo.png"
              alt="Logo LINSI"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </div>
          <div className="h-full w-[100px] flex items-center justify-center bg-sky-200">
            <Image
              src="/utn-logo.png"
              alt="Logo UTN La Plata"
              width={100}
              height={120}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="text-center text-blue-900 font-bold text-lg leading-tight">
          Gestor de Expedientes
          <span className="block text-gray-700 text-sm font-medium">
            Laboratorio de Innovaciones en Sistemas de Información
          </span>
        </h1>

        <button
          onClick={handleLogout}
          className="text-black font-semibold text-[14px] mr-6 hover:text-gray-700"
        >
          Cerrar Sesión
        </button>
      </header>

      {/* Navegación */}
      <nav className="w-full bg-sky-400 text-black font-medium flex justify-center items-center py-3 shadow">
        <button 
          onClick={() => router.push("/Inicio")}
          className="px-30 hover:text-white transition"
        >
          Inicio
        </button>
        <div className="border-l border-black h-6 mx-4"></div>
        <button 
          onClick={() => router.push("/Usuario")}
          className="px-30 hover:text-white transition"
        >
          Usuarios
        </button>
        <div className="border-l border-black h-6 mx-4"></div>
        <button 
          onClick={() => router.push("/Expediente")}
          className="px-30 hover:text-white transition"
        >
          Expedientes
        </button>
        <div className="border-l border-black h-6 mx-4"></div>
        <button className="px-30 hover:text-white transition font-semibold text-white">
          Historial Movimientos
        </button>
      </nav>

      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-cyan-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Historial de Movimientos
              </h1>
              <p className="text-gray-600">
                Vista completa de todos los movimientos del sistema
              </p>
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
                    Tipo de movimiento
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

                {/* Filtro por expediente */}
                <div className="w-full md:w-48">
                  <label htmlFor="expediente" className="block text-sm font-medium text-gray-900 mb-2">
                    Expediente
                  </label>
                  <select
                    id="expediente"
                    value={filtroExpediente}
                    onChange={(e) => setFiltroExpediente(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  >
                    <option value="todos">Todos los expedientes</option>
                    {expedientesUnicos.map(expediente => (
                      <option key={expediente.id} value={expediente.id}>
                        #{expediente.numero} - {expediente.tema}
                      </option>
                    ))}
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
                Todos los Movimientos ({movimientosFiltrados.length})
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
                    {busqueda || filtroTipo !== "todos" || filtroExpediente !== "todos"
                      ? "Intenta con otros términos de búsqueda" 
                      : "No hay movimientos registrados en el sistema"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {movimientosFiltrados.map((movimiento) => {
                    const expedienteInfo = expedientesEjemplo.find(exp => exp.id === movimiento.expedienteId);
                    
                    return (
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

                            {/* Información del expediente */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-gray-700">Expediente:</span>
                              <button
                                onClick={() => handleVerExpediente(movimiento.expedienteId)}
                                className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1 hover:underline"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                #{expedienteInfo?.numero} - {expedienteInfo?.tema}
                              </button>
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
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}