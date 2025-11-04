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
    estado: "Activo",
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
    estado: "Activo",
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
    estado: "Inactivo",
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
    estado: "Activo",
    fechaCreacion: "2025-03-05",
    documento: "30.456.789"
  }
];

//Base de datos de usuarios disponibles para agregar
const usuariosDisponibles = [
  {
    id: "5",
    nombre: "Laura",
    apellido: "Martínez",
    email: "laura.martinez@ejemplo.com",
    documento: "30.567.890",
    sector: ["Investigación"]
  },
  {
    id: "6",
    nombre: "Pedro",
    apellido: "Gómez",
    email: "pedro.gomez@ejemplo.com",
    documento: "30.678.901",
    sector: ["Desarrollo", "Calidad"]
  },
  {
    id: "7",
    nombre: "Sofía",
    apellido: "Hernández",
    email: "sofia.hernandez@ejemplo.com",
    documento: "30.789.012",
    sector: ["Diseño"]
  },
  {
    id: "8",
    nombre: "Diego",
    apellido: "Ramírez",
    email: "diego.ramirez@ejemplo.com",
    documento: "30.890.123",
    sector: ["Administración"]
  }
];

//Lista de sectores disponibles para asignar
const sectoresDisponibles = ["Desarrollo", "Diseño", "Calidad", "Investigación", "Administración"];

//Lista de roles disponibles
const rolesDisponibles = ["Administrador", "Usuario", "Supervisor"];

export default function Usuarios() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState(usuariosEjemplo);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaAgregar, setBusquedaAgregar] = useState("");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroSector, setFiltroSector] = useState("todos");
  const [mostrarAgregarUsuario, setMostrarAgregarUsuario] = useState(false);

  const handleEliminarClick = (usuario: any) => {
    router.push(`/Usuario/Eliminar/${usuario.id}`);
  };

  const handleVerDetalle = (usuario: any) => {
    router.push(`/Usuario/Detalle/${usuario.id}`);
  };

  //Función para agregar usuario desde la búsqueda
  const handleAgregarUsuario = (usuario: any) => {
    const nuevoUsuario = {
      ...usuario,
      rol: "Usuario", // Rol por defecto
      estado: "Activo", // Estado por defecto
      fechaCreacion: new Date().toISOString().split('T')[0] // Fecha actual
    };

    setUsuarios(prevUsuarios => [...prevUsuarios, nuevoUsuario]);
    setBusquedaAgregar(""); // Limpiar búsqueda
    setMostrarAgregarUsuario(false); // Ocultar panel
  };

  //Función para asignar/remover sectores a usuario
  const handleAsignarSector = (usuarioId: string, sector: string) => {
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
    const coincideEstado = filtroEstado === "todos" || usuario.estado === filtroEstado;
    const coincideSector = filtroSector === "todos" || usuario.sector.includes(filtroSector);
    
    return coincideBusqueda && coincideRol && coincideEstado && coincideSector;
  });

  //Filtrar usuarios disponibles para agregar
  const usuariosParaAgregar = usuariosDisponibles.filter(usuario => 
    !usuarios.some(u => u.id === usuario.id) && // No mostrar usuarios ya agregados
    (usuario.nombre.toLowerCase().includes(busquedaAgregar.toLowerCase()) ||
     usuario.apellido.toLowerCase().includes(busquedaAgregar.toLowerCase()) ||
     usuario.documento.includes(busquedaAgregar))
  );

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
      case "Supervisor":
        return "bg-orange-100 text-orange-800 border-orange-200";
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
        <button 
          onClick={() => router.push("/Movimiento/Lista")}
          className="px-30 hover:text-white transition"
        >
          Historial Movimientos
        </button>
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

              {/* Botón Agregar Usuario */}
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <button 
                  onClick={() => setMostrarAgregarUsuario(!mostrarAgregarUsuario)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Agregar Usuario
                </button>
              </div>
            </div>

            {/* ✅ Panel para agregar usuarios */}
            {mostrarAgregarUsuario && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Agregar Nuevo Usuario</h3>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                  <div className="flex-1">
                    <label htmlFor="buscarAgregar" className="block text-sm font-medium text-gray-700 mb-2">
                      Buscar por nombre, apellido o DNI
                    </label>
                    <input
                      type="text"
                      id="buscarAgregar"
                      placeholder="Ej: Laura Martínez o 30.567.890"
                      value={busquedaAgregar}
                      onChange={(e) => setBusquedaAgregar(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900"
                    />
                  </div>
                  
                  <div className="w-full md:w-auto">
                    <button 
                      onClick={() => setBusquedaAgregar("")}
                      className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                      Limpiar
                    </button>
                  </div>
                </div>

                {/* Lista de usuarios encontrados */}
                {busquedaAgregar && (
                  <div className="mt-4 max-h-40 overflow-y-auto">
                    {usuariosParaAgregar.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-2">
                        No se encontraron usuarios con esos datos
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {usuariosParaAgregar.map(usuario => (
                          <div
                            key={usuario.id}
                            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                          >
                            <div>
                              <p className="font-medium text-gray-900">
                                {usuario.nombre} {usuario.apellido}
                              </p>
                              <p className="text-sm text-gray-600">
                                {usuario.email} • DNI: {usuario.documento}
                              </p>
                              <p className="text-xs text-gray-500">
                                Sectores: {usuario.sector.join(", ")}
                              </p>
                            </div>
                            <button
                              onClick={() => handleAgregarUsuario(usuario)}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition duration-200 flex items-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                              Agregar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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
                          <div className="mt-3 flex flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-700">Cambiar rol:</span>
                              <select
                                value={usuario.rol}
                                onChange={(e) => handleCambiarRol(usuario.id, e.target.value)}
                                className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 bg-gray-800 text-white" // ✅ Más oscuro
                              >
                                {rolesDisponibles.map(rol => (
                                  <option key={rol} value={rol}>{rol}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-700">Asignar sectores:</span>
                              <div className="flex flex-wrap gap-1">
                                {sectoresDisponibles.map(sector => (
                                  <button
                                    key={sector}
                                    onClick={() => handleAsignarSector(usuario.id, sector)}
                                    className={`text-xs px-2 py-1 rounded border transition ${
                                      usuario.sector.includes(sector)
                                        ? "bg-blue-100 text-blue-800 border-blue-300"
                                        : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                                    }`}
                                  >
                                    {sector} {usuario.sector.includes(sector) ? "✓" : "+"}
                                  </button>
                                ))}
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