"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

// Datos de ejemplo (en un caso real vendrían de una API)
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
    caratula: "Sistema de Gestión de Expedientes Digitales para el Laboratorio LINSI",
    observaciones: "Expediente de práctica supervisada para el laboratorio LINSI. El proyecto consiste en desarrollar un sistema web moderno para la gestión de expedientes académicos utilizando tecnologías como Next.js, React y Tailwind CSS.",
    sector: "Desarrollo",
    fojas: [
      { id: "1", nombre: "Documentación técnica.pdf", fecha: "2025-10-15" },
      { id: "2", nombre: "Plan de trabajo.docx", fecha: "2025-10-16" },
      { id: "3", nombre: "Requerimientos funcionales.pdf", fecha: "2025-10-17" }
    ],
    movimientos: [
      { id: "1", fecha: "2025-10-15", descripcion: "Creación del expediente", sectorOrigen: "-", sectorDestino: "Desarrollo", usuario: "Juan Pérez" },
      { id: "2", fecha: "2025-10-18", descripcion: "Revisión inicial de documentación", sectorOrigen: "Desarrollo", sectorDestino: "Calidad", usuario: "Ana Martínez" },
      { id: "3", fecha: "2025-10-20", descripcion: "Aprobación de requerimientos", sectorOrigen: "Calidad", sectorDestino: "Desarrollo", usuario: "Carlos Rodríguez" }
    ]
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
    caratula: "Plataforma Educativa Integral para Instituciones Terciarias",
    observaciones: "Tesis de grado sobre sistemas de gestión académica. Investigación y desarrollo de una plataforma que integre gestión de alumnos, materias, horarios y calificaciones para instituciones de educación superior.",
    sector: "Investigación",
    fojas: [
      { id: "1", nombre: "Anteproyecto.pdf", fecha: "2025-10-12" },
      { id: "2", nombre: "Estado del arte.docx", fecha: "2025-10-14" }
    ],
    movimientos: [
      { id: "1", fecha: "2025-10-12", descripcion: "Creación del expediente", sectorOrigen: "-", sectorDestino: "Investigación", usuario: "María González" },
      { id: "2", fecha: "2025-10-16", descripcion: "Revisión de anteproyecto", sectorOrigen: "Investigación", sectorDestino: "Calidad", usuario: "Laura Fernández" }
    ]
  },
  {
    id: "003",
    numero: "0036-2025-01",
    tema: "Proyecto Final",
    fecha: "10/10/2025",
    observacion: "Sistema de Gestión Documental Cloud",
    usuario: "Carlos López",
    estado: "Completado",
    subTema: "Backend Development",
    fechaAlta: "2025-10-10",
    caratula: "Plataforma de Gestión Documental en la Nube para PyMEs",
    observaciones: "Desarrollo de una plataforma cloud para gestión documental orientada a pequeñas y medianas empresas. Incluye módulos de digitalización, almacenamiento seguro y flujos de trabajo colaborativos.",
    sector: "Desarrollo",
    fojas: [
      { id: "1", nombre: "Propuesta técnica.pdf", fecha: "2025-10-10" },
      { id: "2", nombre: "Arquitectura del sistema.docx", fecha: "2025-10-11" },
      { id: "3", nombre: "Manual de usuario.pdf", fecha: "2025-10-25" },
      { id: "4", nombre: "Certificado de calidad.pdf", fecha: "2025-10-28" }
    ],
    movimientos: [
      { id: "1", fecha: "2025-10-10", descripcion: "Creación del expediente", sectorOrigen: "-", sectorDestino: "Desarrollo", usuario: "Carlos López" },
      { id: "2", fecha: "2025-10-15", descripcion: "Revisión de arquitectura", sectorOrigen: "Desarrollo", sectorDestino: "Calidad", usuario: "Pedro Sánchez" },
      { id: "3", fecha: "2025-10-18", descripcion: "Correcciones de diseño", sectorOrigen: "Calidad", sectorDestino: "Desarrollo", usuario: "Carlos López" },
      { id: "4", fecha: "2025-10-22", descripcion: "Pruebas de integración", sectorOrigen: "Desarrollo", sectorDestino: "Calidad", usuario: "Ana Martínez" },
      { id: "5", fecha: "2025-10-26", descripcion: "Aprobación final", sectorOrigen: "Calidad", sectorDestino: "Archivo", usuario: "Laura Fernández" }
    ]
  }
];

export default function DetalleExpediente() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [expediente, setExpediente] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarExpediente = async () => {
      setCargando(true);
      
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

  const handleVolver = () => {
    router.push("/Expediente");
  };

  const handleEditar = () => {
    router.push(`/Expediente/Editar/${id}`);
  };

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


  if (cargando) {
    return (
      <main className="min-h-screen flex flex-col bg-cyan-50">
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
      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-cyan-50">
        <div className="max-w-4xl mx-auto">
          {/* Header del expediente */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900 font-mono">
                    {expediente.numero}
                  </h1>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getEstadoColor(expediente.estado)}`}>
                    {expediente.estado}
                  </span>
                </div>
                <p className="text-gray-600">Detalle completo del expediente</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={handleVolver}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Volver
                </button>
                <button
                  onClick={() => router.push(`/Movimiento/Registrar/${id}`)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Registrar Movimiento
                </button>
              </div>
            </div>
          </div>

          {/* Información del expediente */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Información del Expediente</h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna izquierda */}
                <div className="space-y-6">
                  {/* Información básica */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">Información Básica</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-900 font-semibold">Número:</span>
                        <p className="text-gray-600 font-mono">{expediente.numero}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Tema:</span>
                        <p className="text-gray-600">{expediente.tema}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Sub Tema:</span>
                        <p className="text-gray-600">{expediente.subTema || "No especificado"}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Usuario:</span>
                        <p className="text-gray-600">{expediente.usuario}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Sector:</span>
                        <p className="text-gray-600">{expediente.sector}</p>
                      </div>
                    </div>
                  </div>

                  {/* Fechas y estado */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">Fechas y Estado</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-900 font-semibold">Fecha de Alta:</span>
                        <p className="text-gray-600">{expediente.fechaAlta}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Última Actualización:</span>
                        <p className="text-gray-600">{expediente.fecha}</p>
                      </div>
                      <div>
                        <span className="text-gray-900 font-semibold">Estado:</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${getEstadoColor(expediente.estado)}`}>
                          {expediente.estado}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-6">
                  {/* Carátula */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">Carátula</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-600">{expediente.caratula}</p>
                    </div>
                  </div>

                  {/* Observaciones */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">Observaciones</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-600 whitespace-pre-line">
                        {expediente.observaciones || "No hay observaciones registradas."}
                      </p>
                    </div>
                  </div>

                  {/* Fojas adjuntas */}
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">Fojas Adjuntas ({expediente.fojas.length})</h3>
                    {expediente.fojas.length > 0 ? (
                      <div className="space-y-2">
                        {expediente.fojas.map((foja: any) => (
                          <div key={foja.id} className="flex items-center justify-between bg-gray-50 p-3 rounded border">
                            <div>
                              <span className="text-sm font-medium text-gray-900">{foja.nombre}</span>
                              <p className="text-sm text-gray-500">{foja.fecha}</p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Descargar
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No hay fojas adjuntas</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional o acciones */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Disponibles</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleEditar}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar Expediente
              </button>
              <button
                onClick={() => router.push(`/Expediente/Eliminar/${id}`)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar Expediente
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