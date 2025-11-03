"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

// Datos de ejemplo (en un caso real vendrían de una API)
const usuariosEjemplo = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@linsi.utn.edu.ar",
    documento: "30.123.456",
    sector: ["Desarrollo", "Investigación"],
    rol: "Administrador",
    estado: "Activo",
    fechaCreacion: "2025-01-15",
    telefono: "+54 221 123-4567",
    ultimoAcceso: "2025-01-20 14:30",
    descripcion: "Administrador principal del sistema con acceso completo a todas las funcionalidades."
  },
  {
    id: "2",
    nombre: "María",
    apellido: "González",
    email: "maria.gonzalez@linsi.utn.edu.ar",
    documento: "30.234.567",
    sector: ["Diseño", "Calidad"],
    rol: "Usuario",
    estado: "Activo",
    fechaCreacion: "2025-02-20",
    telefono: "+54 221 234-5678",
    ultimoAcceso: "2025-01-20 10:15",
    descripcion: "Usuario del laboratorio con permisos para gestionar expedientes en sus sectores asignados."
  },
  {
    id: "3",
    nombre: "Carlos",
    apellido: "Rodríguez",
    email: "carlos.rodriguez@linsi.utn.edu.ar",
    documento: "30.345.678",
    sector: ["Calidad"],
    rol: "Usuario",
    estado: "Inactivo",
    fechaCreacion: "2025-01-10",
    telefono: "+54 221 345-6789",
    ultimoAcceso: "2025-01-15 16:45",
    descripcion: "Usuario inactivo temporalmente. Sin acceso al sistema."
  },
  {
    id: "4",
    nombre: "Ana",
    apellido: "López",
    email: "ana.lopez@linsi.utn.edu.ar",
    documento: "30.456.789",
    sector: ["Desarrollo", "Investigación", "Calidad"],
    rol: "Supervisor",
    estado: "Activo",
    fechaCreacion: "2025-03-05",
    telefono: "+54 221 456-7890",
    ultimoAcceso: "2025-01-20 09:00",
    descripcion: "Supervisor con permisos de auditoría y revisión de expedientes en múltiples sectores."
  }
];

export default function DetalleUsuario() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simular carga de datos desde API
    const cargarUsuario = async () => {
      setCargando(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const usuarioEncontrado = usuariosEjemplo.find(user => user.id === id);
      
      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
      } else {
        alert("Usuario no encontrado");
        router.push("/Usuarios");
      }
      
      setCargando(false);
    };

    cargarUsuario();
  }, [id, router]);

  const handleVolver = () => {
    router.push("/Usuario");
  };

  const handleEditar = () => {
    router.push(`/Usuario/Editar/${id}`);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

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

  const getSectorColor = (sector: string) => {
    const colors = [
      "bg-blue-100 text-blue-800 border-blue-200",
      "bg-green-100 text-green-800 border-green-200",
      "bg-yellow-100 text-yellow-800 border-yellow-200",
      "bg-red-100 text-red-800 border-red-200",
      "bg-purple-100 text-purple-800 border-purple-200"
    ];
    const index = sector.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (cargando) {
    return (
      <main className="min-h-screen flex flex-col bg-cyan-50">
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
        
        <section className="flex-1 p-6 bg-cyan-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando usuario...</p>
          </div>
        </section>
      </main>
    );
  }

  if (!usuario) {
    return (
      <main className="min-h-screen flex flex-col bg-cyan-50">
        <section className="flex-1 p-6 bg-cyan-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Usuario no encontrado</p>
            <button
              onClick={() => router.push("/Usuarios")}
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
          onClick={() => router.push("/Usuarios")}
          className="px-30 hover:text-white transition font-semibold text-white"
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
        <button className="px-30 hover:text-white transition">Historial</button>
      </nav>

      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-cyan-50">
        <div className="max-w-4xl mx-auto">
          {/* Header del usuario */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {usuario.nombre} {usuario.apellido}
                  </h1>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getEstadoColor(usuario.estado)}`}>
                    {usuario.estado}
                  </span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getRolColor(usuario.rol)}`}>
                    {usuario.rol}
                  </span>
                </div>
                <p className="text-gray-600">Detalle completo del usuario</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={handleVolver}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>

          {/* Información del usuario */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Información del Usuario</h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna izquierda */}
                <div className="space-y-6">
                  {/* Información personal */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">Información Personal</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-900 font-semibold">Nombre completo:</span>
                        <p className="text-gray-600">{usuario.nombre} {usuario.apellido}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Email:</span>
                        <p className="text-gray-600">{usuario.email}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Documento:</span>
                        <p className="text-gray-600">{usuario.documento}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Teléfono:</span>
                        <p className="text-gray-600">{usuario.telefono || "No especificado"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Roles y permisos */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">Rol y Permisos</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-900 font-semibold">Rol asignado:</span>
                        <div className="mt-1">
                          <span className={`text-sm font-medium px-3 py-1 rounded-full ${getRolColor(usuario.rol)}`}>
                            {usuario.rol}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Estado:</span>
                        <div className="mt-1">
                          <span className={`text-sm font-medium px-3 py-1 rounded-full ${getEstadoColor(usuario.estado)}`}>
                            {usuario.estado}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-6">
                  {/* Sectores asignados */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">Sectores Asignados</h3>
                    <div className="flex flex-wrap gap-2">
                      {usuario.sector.map((sector: string, index: number) => (
                        <span
                          key={index}
                          className={`text-sm font-medium px-3 py-1 rounded-full border ${getSectorColor(sector)}`}
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                    {usuario.sector.length === 0 && (
                      <p className="text-gray-500 text-sm">No hay sectores asignados</p>
                    )}
                  </div>

                  {/* Información de cuenta */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">Información de Cuenta</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-900 font-semibold">Fecha de creación:</span>
                        <p className="text-gray-600">{usuario.fechaCreacion}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Último acceso:</span>
                        <p className="text-gray-600">{usuario.ultimoAcceso || "No registrado"}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">ID de usuario:</span>
                        <p className="text-gray-600 font-mono">{usuario.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">Descripción y Notas</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 whitespace-pre-line">
                    {usuario.descripcion || "No hay descripción adicional para este usuario."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones disponibles */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Disponibles</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push(`/Usuario/Eliminar/${id}`)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar Usuario
              </button>
              <button
                onClick={handleVolver}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Volver a la Lista
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}