"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const usuariosEjemplo = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Pérez",
    email: "usuario1@ejemplo.com",
    sector: ["Desarrollo"],
    rol: "Administrador",
    fechaCreacion: "2025-01-15",
    documento: "30.123.456"
  },
  {
    id: "2",
    nombre: "María",
    apellido: "González",
    email: "usuario2@ejemplo.com",
    sector: ["Diseño", "Calidad"],
    rol: "Usuario",
    fechaCreacion: "2025-02-20",
    documento: "30.234.567"
  },
  {
    id: "3",
    nombre: "Carlos",
    apellido: "Rodríguez",
    email: "usuario3@ejemplo.com",
    sector: ["Calidad"],
    rol: "Usuario",
    fechaCreacion: "2025-01-10",
    documento: "30.345.678"
  },
  {
    id: "4",
    nombre: "Ana",
    apellido: "López",
    email: "usuario4@ejemplo.com",
    sector: ["Desarrollo", "Investigación"],
    rol: "Administrador",
    fechaCreacion: "2025-03-05",
    documento: "30.456.789"
  }
];


//Lista de sectores disponibles para asignar
const sectoresDisponibles = ["Desarrollo", "Diseño", "Calidad", "Investigación", "Administración"];

//Lista de roles disponibles
const rolesDisponibles = ["Administrador", "Usuario"];

export default function Usuarios() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState(usuariosEjemplo);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [filtroSector, setFiltroSector] = useState("todos");
  const [desplegableAbierto, setDesplegableAbierto] = useState<string | null>(null);

  const handleEliminarClick = (usuario: any) => {
    router.push(`/Usuario/Eliminar/${usuario.id}`);
  };

  const handleVerDetalle = (usuario: any) => {
    router.push(`/Usuario/Detalle/${usuario.id}`);
  };


  //Función para alternar desplegable
  const toggleDesplegable = (usuarioId: string) => {
    setDesplegableAbierto(desplegableAbierto === usuarioId ? null : usuarioId);
  };

  //Función para manejar selección de sectores
  const handleSeleccionarSector = (usuarioId: string, sector: string) => {
    setUsuarios(prevUsuarios => 
      prevUsuarios.map(usuario => {
        if (usuario.id === usuarioId) {
          const sectoresActuales = usuario.sector;
          const nuevosSectores = sectoresActuales.includes(sector)
            ? sectoresActuales.filter(s => s !== sector)
            : [...sectoresActuales, sector];
          
          return { ...usuario, sector: nuevosSectores };
        }
        return usuario;
      })
    );
  };

  //Función para quitar un sector específico
  const handleQuitarSector = (usuarioId: string, sector: string) => {
    setUsuarios(prevUsuarios => 
      prevUsuarios.map(usuario => 
        usuario.id === usuarioId 
          ? { ...usuario, sector: usuario.sector.filter(s => s !== sector) }
          : usuario
      )
    );
  };

  //Función para cambiar rol de usuario
  const handleCambiarRol = (usuarioId: string, nuevoRol: string) => {
    setUsuarios(prevUsuarios =>
      prevUsuarios.map(usuario =>
        usuario.id === usuarioId ? { ...usuario, rol: nuevoRol } : usuario
      )
    );
  };

  //Filtrar usuarios para la lista principal
  const filtrarUsuarios = usuarios.filter(usuario => {
    const coincideBusqueda = 
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.documento.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.sector.some(s => s.toLowerCase().includes(busqueda.toLowerCase()));
    
    const coincideRol = filtroRol === "todos" || usuario.rol === filtroRol;
    const coincideSector = filtroSector === "todos" || usuario.sector.includes(filtroSector);
    
    return coincideBusqueda && coincideRol && coincideSector;
  });



  const getRolColor = (rol: string) => {
    switch (rol) {
      case "Administrador":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Usuario":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Supervisor":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-cyan-50">
      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-cyan-50">
        <div className="max-w-7xl mx-auto">
          {/* Barra de búsqueda y filtros */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
               <div className="flex flex-col md:flex-row md:items-end gap-4 flex-1 w-full">
                {/* Buscador */}
                <div className="flex-1">
                  <label htmlFor="buscar" className="block text-sm font-medium text-gray-900 mb-2">
                    Buscar por nombre, apellido, email, documento o sector
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="buscar"
                      placeholder="Buscar usuarios..."
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

                {/* Filtro por rol */}
                <div className="w-full md:w-48">
                  <label htmlFor="rol" className="block text-sm font-medium text-gray-900 mb-2">
                    Filtrar por rol
                  </label>
                  <select
                    id="rol"
                    value={filtroRol}
                    onChange={(e) => setFiltroRol(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 bg-white"
                  >
                    <option value="todos">Todos los roles</option>
                    {rolesDisponibles.map(rol => (
                      <option key={rol} value={rol}>{rol}</option>
                    ))}
                  </select>
                </div>

                {/* Filtro por sector */}
                <div className="w-full md:w-48">
                  <label htmlFor="sector" className="block text-sm font-medium text-gray-900 mb-2">
                    Filtrar por sector
                  </label>
                  <select
                    id="sector"
                    value={filtroSector}
                    onChange={(e) => setFiltroSector(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  >
                    <option value="todos">Todos los sectores</option>
                    {sectoresDisponibles.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

          </div>

          {/* Lista de Usuarios */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header de la tabla */}
            <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white text-center">
                Lista de Usuarios ({filtrarUsuarios.length})
              </h2>
            </div>

            {/* Contenido de usuarios */}
            <div className="p-6">
              {filtrarUsuarios.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron usuarios</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Intenta con otros términos de búsqueda o agrega un nuevo usuario.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filtrarUsuarios.map((usuario) => (
                    <div
                      key={usuario.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200 bg-white"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getRolColor(usuario.rol)}`}>
                              {usuario.rol}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {usuario.nombre} {usuario.apellido}
                          </h3>
                          <p className="text-gray-600 mb-2">{usuario.email}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {usuario.sector.join(", ")}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Doc: {usuario.documento}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Creado: {usuario.fechaCreacion}
                            </span>
                          </div>

                          {/* Gestión de roles y sectores */}
                          <div className="mt-3 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-700">Cambiar rol:</span>
                              <select
                                value={usuario.rol}
                                onChange={(e) => handleCambiarRol(usuario.id, e.target.value)}
                                className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 bg-gray-800 text-white"
                              >
                                {rolesDisponibles.map(rol => (
                                  <option key={rol} value={rol}>{rol}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <span className="text-xs font-medium text-gray-700">Asignar sectores:</span>
                              <div className="flex flex-col md:flex-row gap-3 items-start">
                                {/* Desplegable de sectores */}
                                <div className="relative">
                                  <button
                                    type="button"
                                    onClick={() => toggleDesplegable(usuario.id)}
                                    className="flex items-center gap-2 text-xs border border-gray-300 rounded px-3 py-2 bg-white hover:bg-gray-50 focus:ring-1 focus:ring-blue-500"
                                  >
                                    <span>Seleccionar sectores</span>
                                    <svg 
                                      className={`w-4 h-4 transition-transform ${
                                        desplegableAbierto === usuario.id ? 'rotate-180' : ''
                                      }`} 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>

                                  {/* Lista desplegable con checkboxes */}
                                  {desplegableAbierto === usuario.id && (
                                    <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                      <div className="p-2 space-y-1">
                                        {sectoresDisponibles.map(sector => (
                                          <label
                                            key={sector}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                                          >
                                            <input
                                              type="checkbox"
                                              checked={usuario.sector.includes(sector)}
                                              onChange={() => handleSeleccionarSector(usuario.id, sector)}
                                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{sector}</span>
                                            {usuario.sector.includes(sector) && (
                                              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                              </svg>
                                            )}
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Sectores seleccionados */}
                                <div className="flex flex-wrap gap-1">
                                  {usuario.sector.map(sector => (
                                    <div
                                      key={sector}
                                      className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs border border-blue-200"
                                    >
                                      <span>{sector}</span>
                                      <button
                                        onClick={() => handleQuitarSector(usuario.id, sector)}
                                        className="text-blue-600 hover:text-blue-800 text-xs font-bold"
                                        title="Quitar sector"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                  {usuario.sector.length === 0 && (
                                    <span className="text-xs text-gray-500">No hay sectores seleccionados</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <button 
                            onClick={() => handleVerDetalle(usuario)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Ver Detalle
                          </button>
                          <button 
                            onClick={() => handleEliminarClick(usuario)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Inactivar
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