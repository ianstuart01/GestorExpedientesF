"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Datos de ejemplo para los expedientes con nuevo formato
const expedientesEjemplo = [
  {
    id: "001",
    numero: "0034-2025-00",
    tema: "Práctica Supervisada",
    fecha: "15/10/2025",
    observacion: "Laboratorio LINSI - Desarrollo Web",
    usuario: "Juan Pérez",
    estado: "Activo",
    subTema: "Desarrollo Frontend",
    fechaAlta: "2025-10-15",
    caratula: "Sistema de Gestión de Expedientes",
    sector: "Desarrollo"
  },
  {
    id: "002",
    numero: "0035-2025-00", 
    tema: "Tesis de Grado",
    fecha: "12/10/2025",
    observacion: "Sistema de Gestión Académica",
    usuario: "María González",
    estado: "En revisión",
    subTema: "Base de Datos",
    fechaAlta: "2025-10-12",
    caratula: "Plataforma Educativa Integral",
    sector: "Investigación"
  },
  {
    id: "003",
    numero: "0036-2025-01",
    tema: "Proyecto Final",
    fecha: "10/10/2025",
    observacion: "Sistema de Gestión Documental",
    usuario: "Carlos López",
    estado: "Completado",
    subTema: "Backend Development",
    fechaAlta: "2025-10-10",
    caratula: "Plataforma de Gestión Documental Cloud",
    sector: "Desarrollo"
  }
];

export default function Expedientes() {
  const router = useRouter();
  const [expedientes, setExpedientes] = useState(expedientesEjemplo);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [expedienteAEliminar, setExpedienteAEliminar] = useState<any>(null);

  const handleEditar = (expediente: any) => {
    router.push(`/Expediente/Editar/${expediente.id}`);
  };

  const handleEliminarClick = (expediente: any) => {
    router.push(`/Expediente/Eliminar/${expediente.id}`);
  };

  const confirmarEliminar = () => {
    if (expedienteAEliminar) {
      const nuevosExpedientes = expedientes.filter(exp => exp.id !== expedienteAEliminar.id);
      setExpedientes(nuevosExpedientes);
      console.log("Eliminando expediente:", expedienteAEliminar.id);
      alert(`Expediente ${expedienteAEliminar.numero} eliminado exitosamente`);
    }
    setMostrarModalEliminar(false);
    setExpedienteAEliminar(null);
  };

  const cancelarEliminar = () => {
    setMostrarModalEliminar(false);
    setExpedienteAEliminar(null);
  };

  const filtrarExpedientes = expedientes.filter(expediente => {
    const coincideBusqueda = expediente.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
                            expediente.tema.toLowerCase().includes(busqueda.toLowerCase()) ||
                            expediente.numero.includes(busqueda) ||
                            expediente.sector.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideEstado = filtroEstado === "todos" || expediente.estado === filtroEstado;
    
    return coincideBusqueda && coincideEstado;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Activo":
        return "bg-green-100 text-green-800 border-green-200";
      case "En revisión":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completado":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAlcanceColor = (numero: string) => {
    const alcance = parseInt(numero.split('-')[2]);
    if (alcance === 0) return "bg-gray-100 text-gray-800 border-gray-200";
    if (alcance <= 2) return "bg-green-100 text-green-800 border-green-200";
    if (alcance <= 5) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <main className="min-h-screen flex flex-col bg-cyan-50">
      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-cyan-50">
        <div className="max-w-7xl mx-auto">
          {/* Barra de búsqueda y filtros */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                {/* Buscador */}
                <div className="flex-1">
                  <label htmlFor="buscar" className="block text-sm font-medium text-gray-900 mb-2">
                    Buscar por número, usuario, tema o sector
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="buscar"
                      placeholder="Número, nombre, tema o sector..."
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

                {/* Filtro por estado */}
                <div className="w-full md:w-48">
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-900 mb-2">
                    Filtrar por estado
                  </label>
                  <select
                    id="estado"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  >
                    <option value="todos">Todos los estados</option>
                    <option value="Activo">Activo</option>
                    <option value="En revisión">En revisión</option>
                    <option value="Completado">Completado</option>
                  </select>
                </div>
              </div>

              {/* Botón Agregar Expediente */}
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <button 
                  onClick={() => router.push('/Expediente/Crear')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Agregar Expediente
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Expedientes */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header de la tabla */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white text-center">
                Lista de Expedientes ({filtrarExpedientes.length})
              </h2>
            </div>

            {/* Contenido de expedientes */}
            <div className="p-6">
              {filtrarExpedientes.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron expedientes</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Intenta con otros términos de búsqueda o crea un nuevo expediente.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filtrarExpedientes.map((expediente) => (
                    <div
                      key={expediente.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200 bg-white"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full font-mono">
                              {expediente.numero}
                            </span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getEstadoColor(expediente.estado)}`}>
                              {expediente.estado}
                            </span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getAlcanceColor(expediente.numero)}`}>
                              Alcance: {expediente.numero.split('-')[2]}
                            </span>
                            <span className="text-xs font-medium px-2 py-1 rounded-full border bg-purple-100 text-purple-800 border-purple-200">
                              {expediente.sector}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {expediente.tema}
                          </h3>
                          <p className="text-gray-600 mb-2">{expediente.observacion}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {expediente.usuario}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {expediente.fecha}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <button 
                            onClick={() => router.push(`/Expediente/Detalle/${expediente.id}`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Detalle
                          </button>
                          
                          <button 
                            onClick={() => router.push(`/Movimiento/Lista/${expediente.id}`)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Movimientos
                          </button>
                          
                          <button 
                            onClick={() => handleEditar(expediente)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                          <button 
                            onClick={() => handleEliminarClick(expediente)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                          </button>
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