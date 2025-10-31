"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ✅ DATOS SEGUROS - Emails genéricos sin información real
const usuariosEjemplo = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Pérez",
    email: "usuario1@ejemplo.com",
    sector: "Desarrollo",
    rol: "Administrador",
    estado: "Activo",
    fechaCreacion: "2025-01-15"
  },
  {
    id: "2",
    nombre: "María",
    apellido: "González",
    email: "usuario2@ejemplo.com",
    sector: "Diseño",
    rol: "Usuario",
    estado: "Activo",
    fechaCreacion: "2025-02-20"
  },
  {
    id: "3",
    nombre: "Carlos",
    apellido: "Rodríguez",
    email: "usuario3@ejemplo.com",
    sector: "Calidad",
    rol: "Usuario",
    estado: "Inactivo",
    fechaCreacion: "2025-01-10"
  },
  {
    id: "4",
    nombre: "Ana",
    apellido: "López",
    email: "usuario4@ejemplo.com",
    sector: "Desarrollo",
    rol: "Administrador",
    estado: "Activo",
    fechaCreacion: "2025-03-05"
  }
];

export default function Usuarios() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState(usuariosEjemplo);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const handleEditar = (usuario: any) => {
    router.push(`/Usuarios/Editar/${usuario.id}`);
  };

  const handleEliminarClick = (usuario: any) => {
    router.push(`/Usuarios/Eliminar/${usuario.id}`);
  };

  const handleVerDetalle = (usuario: any) => {
    router.push(`/Usuarios/Detalle/${usuario.id}`);
  };

  const filtrarUsuarios = usuarios.filter(usuario => {
    const coincideBusqueda = 
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.sector.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideRol = filtroRol === "todos" || usuario.rol === filtroRol;
    const coincideEstado = filtroEstado === "todos" || usuario.estado === filtroEstado;
    
    return coincideBusqueda && coincideRol && coincideEstado;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Activo":
        return "bg-green-100 text-green-800 border-green-200";
      case "Inactivo":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRolColor = (rol: string) => {
    switch (rol) {
      case "Administrador":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Usuario":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
          onClick={() => window.location.href = "/"}
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
        <button className="px-30 hover:text-white transition font-semibold text-white">
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
        <button className="px-30 hover:text-white transition">Historial</button>
      </nav>

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
                    Buscar por nombre, apellido, email o sector
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  >
                    <option value="todos">Todos los roles</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                  </select>
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
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              {/* Botón Agregar Usuario */}
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <button 
                  onClick={() => router.push('/Usuarios/Crear')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Agregar Usuario
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Usuarios */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header de la tabla */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
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
                            <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getEstadoColor(usuario.estado)}`}>
                              {usuario.estado}
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
                              {usuario.sector}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Creado: {usuario.fechaCreacion}
                            </span>
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
                            Ver
                          </button>
                          <button 
                            onClick={() => handleEditar(usuario)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                          <button 
                            onClick={() => handleEliminarClick(usuario)}
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