"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

// Datos de ejemplo (en un caso real vendrían de una API)
const expedientesEjemplo = [
  {
    id: "001",
    numero: "001",
    tema: "Práctica Supervisada",
    fecha: "15/10/2025",
    observacion: "Laboratorio LINSI - Desarrollo Web",
    usuario: "Juan Pérez",
    estado: "Activo",
    subTema: "Desarrollo Frontend",
    fechaAlta: "2025-10-15",
    alcance: "Interno",
    caratula: "Sistema de Gestión de Expedientes",
    observaciones: "Expediente de práctica supervisada para el laboratorio LINSI"
  },
  {
    id: "002", 
    numero: "002",
    tema: "Tesis de Grado",
    fecha: "12/10/2025",
    observacion: "Sistema de Gestión Académica",
    usuario: "María González",
    estado: "En revisión",
    subTema: "Base de Datos",
    fechaAlta: "2025-10-12",
    alcance: "Externo",
    caratula: "Plataforma Educativa Integral",
    observaciones: "Tesis de grado sobre sistemas de gestión académica"
  }
];

export default function EliminarExpediente() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [expediente, setExpediente] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    // Simular carga de datos desde API
    const cargarExpediente = async () => {
      setCargando(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const expedienteEncontrado = expedientesEjemplo.find(exp => exp.id === id);
      
      if (expedienteEncontrado) {
        setExpediente(expedienteEncontrado);
      } else {
        alert("Expediente no encontrado");
        router.push("/Expediente");
      }
      
      setCargando(false);
    };

    cargarExpediente();
  }, [id, router]);

  const handleConfirmarEliminar = async () => {
    setEliminando(true);
    
    try {
      // Simular llamada a API para eliminar
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí iría la llamada real al backend:
      // await fetch(`/api/expedientes/${id}`, { method: 'DELETE' });
      
      console.log("Expediente eliminado:", id);
      
      alert(`Expediente #${expediente.numero} eliminado exitosamente`);
      router.push("/Expediente");
      
    } catch (error) {
      console.error("Error al eliminar expediente:", error);
      alert("Error al eliminar el expediente");
    } finally {
      setEliminando(false);
    }
  };

  const handleCancelar = () => {
    router.push("/Expediente");
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
            <p className="mt-4 text-gray-600">Cargando expediente...</p>
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
                  ¿Estás seguro de que deseas eliminar el siguiente expediente?
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Esta acción no se puede deshacer y se perderán todos los datos asociados al expediente.
                </p>
              </div>

              {/* Información del expediente a eliminar */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-red-800 mb-3">Expediente a eliminar:</h3>
                <div className="space-y-2 text-sm">
                    <div>
                    <span className="text-gray-900 font-medium">Número: </span>
                    <span className="text-gray-900 font-semibold">#{expediente.numero}</span>
                    </div>
                    <div>
                    <span className="text-gray-900 font-medium">Tema: </span>
                    <span className="text-gray-900 font-semibold">{expediente.tema}</span>
                    </div>
                    <div>
                    <span className="text-gray-900 font-medium">Usuario: </span>
                    <span className="text-gray-900 font-semibold">{expediente.usuario}</span>
                    </div>
                    <div>
                    <span className="text-gray-900 font-medium">Estado: </span>
                    <span className="text-gray-900 font-semibold">{expediente.estado}</span>
                    </div>
                    <div>
                    <span className="text-gray-900 font-medium">Fecha Alta: </span>
                    <span className="text-gray-900 font-semibold">{expediente.fecha}</span>
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
                      Sí, Eliminar Expediente
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