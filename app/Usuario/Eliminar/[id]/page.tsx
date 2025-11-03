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

export default function EliminarUsuario() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [eliminando, setEliminando] = useState(false);

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

  const handleConfirmarEliminar = async () => {
    setEliminando(true);
    
    try {
      // Simular llamada a API para eliminar
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí iría la llamada real al backend:
      // await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
      
      console.log("Usuario eliminado:", id);
      
      alert(`Usuario ${usuario.nombre} ${usuario.apellido} eliminado exitosamente`);
      router.push("/Usuarios");
      
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar el usuario");
    } finally {
      setEliminando(false);
    }
  };

  const handleCancelar = () => {
    router.push("/Usuario");
  };

  const handleLogout = () => {
    window.location.href = "/";
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
          onClick={() => router.push("/Usuario")}
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
        <div className="max-w-2xl mx-auto">
          {/* Tarjeta de Confirmación */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header de advertencia */}
            <div className="bg-red-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h1 className="text-xl font-bold text-white">Confirmar Eliminación</h1>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-700 text-lg mb-4">
                  ¿Estás seguro de que deseas eliminar el siguiente usuario?
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Esta acción no se puede deshacer. El usuario perderá el acceso al sistema y todos sus datos asociados.
                </p>
              </div>

              {/* Información del usuario a eliminar */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-red-800 mb-3">Usuario a eliminar:</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-900 font-medium">Nombre completo: </span>
                    <span className="text-gray-900 font-semibold">{usuario.nombre} {usuario.apellido}</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Email: </span>
                    <span className="text-gray-900 font-semibold">{usuario.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Documento: </span>
                    <span className="text-gray-900 font-semibold">{usuario.documento}</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Rol: </span>
                    <span className="text-gray-900 font-semibold">{usuario.rol}</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Estado: </span>
                    <span className="text-gray-900 font-semibold">{usuario.estado}</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Sectores: </span>
                    <span className="text-gray-900 font-semibold">{usuario.sector.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Fecha de creación: </span>
                    <span className="text-gray-900 font-semibold">{usuario.fechaCreacion}</span>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleCancelar}
                  disabled={eliminando}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmarEliminar}
                  disabled={eliminando}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {eliminando ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Eliminando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Sí, Eliminar Usuario
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}