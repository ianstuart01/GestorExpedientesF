"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

// Datos de ejemplo
const expedientesEjemplo = [
  {
    id: "001",
    numero: "0034-2025-00",
    tema: "Práctica Supervisada",
    fecha: "15/10/2025",
    observacion: "Laboratorio LINSI - Desarrollo Web",
    estado: "Activo",
    subTema: "Desarrollo Frontend",
    fechaAlta: "2025-10-15",
    caratula: "Sistema de Gestión de Expedientes",
    observaciones: "Expediente de práctica supervisada para el laboratorio LINSI",
    sector: "1",
    fojas: []
  },
  {
    id: "002",
    numero: "0035-2025-00", 
    tema: "Tesis de Grado",
    fecha: "12/10/2025",
    observacion: "Sistema de Gestión Académica",
    estado: "En revisión",
    subTema: "Base de Datos",
    fechaAlta: "2025-10-12",
    caratula: "Plataforma Educativa Integral",
    observaciones: "Tesis de grado sobre sistemas de gestión académica",
    sector: "2",
    fojas: []
  }
];

const sectoresEjemplo = [
  { id: "1", nombre: "Desarrollo" },
  { id: "2", nombre: "Investigación" },
  { id: "3", nombre: "Calidad" },
  { id: "4", nombre: "Administración" }
];

export default function EditarExpediente() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    numero: "",
    tema: "",
    subTema: "",
    caratula: "",
    observaciones: "",
    estado: "",
    sector: ""
  });

  const [fojas, setFojas] = useState<File[]>([]);
  const [fojasExistentes, setFojasExistentes] = useState<any[]>([]);
  const [sectorOriginal, setSectorOriginal] = useState("");
  const [cargando, setCargando] = useState(true);
  const [nuevoSectorSeleccionado, setNuevoSectorSeleccionado] = useState("");

  useEffect(() => {
    const cargarExpediente = async () => {
      setCargando(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const expediente = expedientesEjemplo.find(exp => exp.id === id);
      
      if (expediente) {
        setFormData({
          numero: expediente.numero,
          tema: expediente.tema,
          subTema: expediente.subTema,
          caratula: expediente.caratula,
          observaciones: expediente.observaciones,
          estado: expediente.estado,
          sector: expediente.sector
        });
        setSectorOriginal(expediente.sector);
        setNuevoSectorSeleccionado(expediente.sector);
        setFojasExistentes(expediente.fojas || []);
      } else {
        alert("Expediente no encontrado");
        router.push("/Expediente");
      }
      
      setCargando(false);
    };

    cargarExpediente();
  }, [id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "sector") {
      setNuevoSectorSeleccionado(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const nuevosArchivos = Array.from(e.target.files);
      setFojas(prev => [...prev, ...nuevosArchivos]);
    }
  };

  const removeFile = (index: number) => {
    setFojas(prev => prev.filter((_, i) => i !== index));
  };

  const removeFojaExistente = (index: number) => {
    setFojasExistentes(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obligatorios
    if (!formData.sector) {
      alert("Por favor, seleccione un sector");
      return;
    }

    // Incrementar alcance solo si cambió el sector y se confirma la actualización
    let numeroActualizado = formData.numero;
    let alcanceIncrementado = false;

    if (nuevoSectorSeleccionado !== sectorOriginal) {
      const partesNumero = formData.numero.split('-');
      if (partesNumero.length === 3) {
        const alcanceActual = parseInt(partesNumero[2]);
        const nuevoAlcance = (alcanceActual + 1).toString().padStart(2, '0');
        numeroActualizado = `${partesNumero[0]}-${partesNumero[1]}-${nuevoAlcance}`;
        alcanceIncrementado = true;
      }
    }

    const expedienteData = {
      ...formData,
      numero: numeroActualizado,
      fojasNuevas: fojas,
      fojasExistentes: fojasExistentes
    };

    console.log("Expediente actualizado:", expedienteData);
    
    // Mostrar mensaje si cambió el alcance
    if (alcanceIncrementado) {
      alert(`Expediente actualizado exitosamente. Alcance incrementado por cambio de sector. Nuevo número: ${numeroActualizado}`);
    } else {
      alert("Expediente actualizado exitosamente");
    }
    
    router.push("/Expediente");
  };

  const handleVolver = () => {
    router.push("/Expediente");
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

  const mostrarAdvertenciaAlcance = nuevoSectorSeleccionado !== sectorOriginal;

  return (
    <main className="min-h-screen flex flex-col bg-cyan-50">
      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-cyan-50">
        <div className="max-w-4xl mx-auto">
          {/* Título */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Editar Expediente</h1>
              <p className="text-gray-600">Modifique los datos del expediente</p>
              <div className="mt-2 p-3 bg-blue-100 text-blue-800 rounded-lg border border-blue-200">
                <strong>Número actual:</strong> 
                <div className="text-xl font-mono font-bold mt-1">{formData.numero}</div>
                {mostrarAdvertenciaAlcance && (
                  <p className="text-sm text-orange-600 mt-1 font-medium">
                    ⚠️ Al guardar, el alcance se incrementará a 01 por cambio de sector
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            {/* Número del expediente (solo lectura) */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Número de Expediente
              </label>
              <input
                type="text"
                value={formData.numero}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 font-mono text-lg font-bold text-center"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                Formato: NNNN-AAAA-AL | El alcance se actualiza al guardar si cambia el sector
              </p>
            </div>

            {/* Sector */}
            <div className="mb-4">
              <label htmlFor="sector" className="block text-sm font-medium text-gray-900 mb-2">
                Sector *
              </label>
              <select
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
              >
                <option value="">Seleccione un sector</option>
                {sectoresEjemplo.map(sector => (
                  <option key={sector.id} value={sector.id}>
                    {sector.nombre}
                  </option>
                ))}
              </select>
              {mostrarAdvertenciaAlcance && (
                <p className="text-sm text-orange-600 mt-1">
                  ⚠️ El alcance se incrementará al guardar los cambios
                </p>
              )}
            </div>

            {/* Tema y Subtema */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="tema" className="block text-sm font-medium text-gray-900 mb-2">
                  Tema *
                </label>
                <input
                  type="text"
                  id="tema"
                  name="tema"
                  value={formData.tema}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  placeholder="Escriba el tema"
                />
              </div>
              <div>
                <label htmlFor="subTema" className="block text-sm font-medium text-gray-900 mb-2">
                  Sub Tema
                </label>
                <input
                  type="text"
                  id="subTema"
                  name="subTema"
                  value={formData.subTema}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  placeholder="Sub tema del expediente"
                />
              </div>
            </div>

            {/* Fecha Alta y Estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-900 mb-2">
                  Estado *
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                >
                  <option value="">Seleccione estado</option>
                  <option value="Activo">Activo</option>
                  <option value="En revisión">En revisión</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>
            </div>

            {/* Carátula */}
            <div className="mb-4">
              <label htmlFor="caratula" className="block text-sm font-medium text-gray-900 mb-2">
                Carátula *
              </label>
              <input
                type="text"
                id="caratula"
                name="caratula"
                value={formData.caratula}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                placeholder="Descripción de la carátula"
              />
            </div>

            {/* Observaciones */}
            <div className="mb-6">
              <label htmlFor="observaciones" className="block text-sm font-medium text-gray-900 mb-2">
                Observaciones
              </label>
              <textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                placeholder="Observaciones adicionales..."
              />
            </div>

            {/* Sección de Fojas Existentes */}
            {fojasExistentes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Fojas Existentes
                </label>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <ul className="space-y-2">
                    {fojasExistentes.map((foja, index) => (
                      <li key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{foja.nombre}</span>
                          <p className="text-sm text-gray-500">{foja.fecha}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFojaExistente(index)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Sección para agregar nuevas Fojas */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Agregar Nuevas Fojas
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Puede seleccionar múltiples archivos para agregar al expediente
                </p>
                
                {/* Lista de nuevos archivos seleccionados */}
                {fojas.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Nuevos archivos a agregar:</h4>
                    <ul className="space-y-2">
                      {fojas.map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded border border-blue-200">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleVolver}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium"
              >
                Volver
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-medium"
              >
                Actualizar Expediente
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}