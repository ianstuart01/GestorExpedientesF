"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

// Datos de ejemplo basados en tu modelo
const sectoresDisponibles = [
  "Desarrollo",
  "Diseño", 
  "Calidad",
  "Investigación",
  "Administración",
  "Dirección"
];

const estadosExpediente = [
  "Creado",
  "En revisión",
  "En progreso",
  "Aprobado",
  "Rechazado",
  "Completado"
];

// Datos de ejemplo para expedientes
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
    caratula: "Sistema de Gestión de Expedientes Digitales para el Laboratorio LINSI",
    observaciones: "Expediente de práctica supervisada para el laboratorio LINSI.",
    sectorActual: "Desarrollo"
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
    caratula: "Plataforma Educativa Integral para Instituciones Terciarias",
    observaciones: "Tesis de grado sobre sistemas de gestión académica.",
    sectorActual: "Diseño"
  }
];

export default function RegistrarMovimiento() {
  const router = useRouter();
  const params = useParams();
  
  // ✅ CORREGIDO: Usar params.id en lugar de params.expedienteId
  const expedienteId = params.id as string;

  const [expediente, setExpediente] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    sectorOrigen: "",
    sectorDestino: "",
    detalle: "",
    observaciones: "",
    estadoExpediente: ""
  });

  useEffect(() => {
    console.log("=== 🔍 DEBUG ===");
    console.log("expedienteId:", expedienteId);
    console.log("params:", params);
    
    if (!expedienteId) {
      console.log("❌ expedienteId es null/undefined");
      setCargando(false);
      return;
    }

    // Simular carga del expediente
    const cargarExpediente = async () => {
      setCargando(true);
      
      console.log("Buscando expediente con ID:", expedienteId);
      
      const expedienteEncontrado = expedientesEjemplo.find(exp => exp.id === expedienteId);
      
      console.log("Expediente encontrado:", expedienteEncontrado);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (expedienteEncontrado) {
        console.log("✅ EXPEDIENTE ENCONTRADO");
        setExpediente(expedienteEncontrado);
        // Pre-cargar sector origen con el sector actual del expediente
        setFormData(prev => ({
          ...prev,
          sectorOrigen: expedienteEncontrado.sectorActual,
          estadoExpediente: expedienteEncontrado.estado
        }));
      } else {
        console.log("❌ EXPEDIENTE NO ENCONTRADO");
        alert("Expediente no encontrado");
        router.push("/Expediente");
      }
      
      setCargando(false);
    };

    cargarExpediente();
  }, [expedienteId, router]);

  // ... el resto del código permanece igual
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const movimientoData = {
        ...formData,
        expedienteId,
        fecha: new Date().toISOString(),
        usuarioId: "user-123",
        usuarioNombre: "Usuario Actual",
        tipoMovimiento: formData.sectorOrigen ? "traslado" : "creacion"
      };

      console.log("Movimiento registrado:", movimientoData);
      
      alert("Movimiento registrado exitosamente");
      router.push(`/Expediente/Detalle/${expedienteId}`);
      
    } catch (error) {
      console.error("Error al registrar movimiento:", error);
      alert("Error al registrar el movimiento");
    } finally {
      setEliminando(false);
    }
  };

  const handleVolver = () => {
    router.push(`/Expediente/Detalle/${expedienteId}`);
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
            <p className="text-sm text-gray-500 mt-2">ID: {expedienteId || "No disponible"}</p>
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
            <p className="text-sm text-gray-500 mt-2">ID buscado: {expedienteId}</p>
            <p className="text-xs text-gray-400 mt-1">
              Expedientes disponibles: {expedientesEjemplo.map(e => e.id).join(", ")}
            </p>
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
        <button className="px-30 hover:text-white transition">Historial</button>
      </nav>

      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-cyan-50">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Registrar Movimiento
                </h1>
                <p className="text-gray-600">
                  Expediente: <span className="font-semibold">#{expediente.numero} - {expediente.tema}</span>
                </p>
                <p className="text-xs text-gray-500">ID: {expediente.id}</p>
              </div>
              <button
                onClick={handleVolver}
                className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Volver
              </button>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Nuevo Movimiento</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Sector Origen */}
                <div>
                  <label htmlFor="sectorOrigen" className="block text-sm font-medium text-gray-900 mb-2">
                    Sector Origen
                  </label>
                  <select
                    id="sectorOrigen"
                    name="sectorOrigen"
                    value={formData.sectorOrigen}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900"
                  >
                    <option value="">Seleccionar sector origen</option>
                    {sectoresDisponibles.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Sector actual del expediente: <span className="font-semibold">{expediente.sectorActual}</span>
                  </p>
                </div>

                {/* Sector Destino */}
                <div>
                  <label htmlFor="sectorDestino" className="block text-sm font-medium text-gray-900 mb-2">
                    Sector Destino *
                  </label>
                  <select
                    id="sectorDestino"
                    name="sectorDestino"
                    value={formData.sectorDestino}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900"
                  >
                    <option value="">Seleccionar sector destino</option>
                    {sectoresDisponibles.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                {/* Estado del Expediente */}
                <div>
                  <label htmlFor="estadoExpediente" className="block text-sm font-medium text-gray-900 mb-2">
                    Estado del Expediente *
                  </label>
                  <select
                    id="estadoExpediente"
                    name="estadoExpediente"
                    value={formData.estadoExpediente}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900"
                  >
                    <option value="">Seleccionar estado</option>
                    {estadosExpediente.map(estado => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                </div>

                {/* Detalle */}
                <div>
                  <label htmlFor="detalle" className="block text-sm font-medium text-gray-900 mb-2">
                    Detalle del Movimiento *
                  </label>
                  <textarea
                    id="detalle"
                    name="detalle"
                    value={formData.detalle}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder="Describa el movimiento, los cambios realizados o las acciones tomadas..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900 resize-none"
                  />
                </div>

                {/* Observaciones */}
                <div>
                  <label htmlFor="observaciones" className="block text-sm font-medium text-gray-900 mb-2">
                    Observaciones Adicionales
                  </label>
                  <textarea
                    id="observaciones"
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Observaciones o notas adicionales (opcional)..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900 resize-none"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleVolver}
                  disabled={enviando}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={enviando}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {enviando ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Registrando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Registrar Movimiento
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Información de ayuda */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Información</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• El movimiento quedará registrado en el historial del expediente</li>
              <li>• El sector destino será el nuevo sector asignado del expediente</li>
              <li>• El estado del expediente se actualizará automáticamente</li>
              <li>• Todos los movimientos son auditables y no se pueden modificar</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}