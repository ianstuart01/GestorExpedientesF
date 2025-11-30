"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Dropzone from "../../components/Dropzone";

// Datos de ejemplo para sectores
const sectoresEjemplo = [
  { id: "1", nombre: "Desarrollo" },
  { id: "2", nombre: "Investigación" },
  { id: "3", nombre: "Calidad" },
  { id: "4", nombre: "Administración" }
];

export default function CrearExpediente() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vieneDeInicio = searchParams.get("inicio") === "true";
  const [formData, setFormData] = useState({
    tema: "",
    subTema: "",
    fechaAlta: new Date().toISOString().split('T')[0],
    caratula: "",
    observaciones: "",
    sector: ""
  });

  const [fojas, setFojas] = useState<File[]>([]);
  const [numeroGenerado, setNumeroGenerado] = useState("");

  // Generar número automáticamente al cargar el componente
  useEffect(() => {
    generarNumeroExpediente();
  }, []);

  const generarNumeroExpediente = async () => {
    try {
      // En un caso real, esto llamaría a la API para obtener el último número del año actual
      const añoActual = new Date().getFullYear();
      
      // Simular llamada a API para obtener el último número
      const ultimoNumero = 33; // Esto vendría de la base de datos
      
      const nuevoNumero = ultimoNumero + 1;
      const numeroFormateado = nuevoNumero.toString().padStart(4, '0');
      const numeroCompleto = `${numeroFormateado}-${añoActual}-00`;
      
      setNumeroGenerado(numeroCompleto);
      
    } catch (error) {
      console.error("Error al generar número de expediente:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obligatorios
    if (!formData.sector) {
      alert("Por favor, seleccione un sector");
      return;
    }

    if (!numeroGenerado) {
      alert("Error al generar número de expediente");
      return;
    }

    const expedienteData = {
      ...formData,
      numero: numeroGenerado,
      fojas: fojas
    };

    console.log("Expediente a crear:", expedienteData);
    
    // Aquí iría la lógica para guardar el expediente en el backend
    alert("Expediente creado exitosamente");
    router.push("/Expediente");
  };

  const handleVolver = () => {
    if (vieneDeInicio) {
      router.push("/Inicio");
    } else {
      router.push("/Expediente");
    }
  };


  return (
    <main className="min-h-screen flex flex-col bg-cyan-50">
      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-cyan-50">
        <div className="max-w-4xl mx-auto">
          {/* Título */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Crear Expediente</h1>
              <p className="text-gray-600">Complete los datos del nuevo expediente</p>
              {numeroGenerado && (
                <div className="mt-2 p-3 bg-blue-100 text-blue-800 rounded-lg border border-blue-200">
                  <strong>Número generado automáticamente:</strong> 
                  <div className="text-xl font-mono font-bold mt-1">{numeroGenerado}</div>
                </div>
              )}
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            {/* Número generado automáticamente (solo lectura) */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Número de Expediente 
              </label>
              <input
                type="text"
                value={numeroGenerado}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 font-mono text-lg font-bold text-center"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                Generado automáticamente - Alcance inicial: 00
              </p>
            </div>

            {/* Sector */}
            <div className="mb-4">
              <label htmlFor="sector" className="block text-sm font-medium text-gray-900 mb-2">
                Sector 
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
            </div>

            {/* Tema y Subtema */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="tema" className="block text-sm font-medium text-gray-900 mb-2">
                  Tema 
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

            {/* Fecha Alta */}
            <div className="mb-4">
              <label htmlFor="fechaAlta" className="block text-sm font-medium text-gray-900 mb-2">
                Fecha Alta 
              </label>
              <input
                type="text"
                id="fechaAlta"
                name="fechaAlta"
                value={formData.fechaAlta}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>

            {/* Carátula */}
            <div className="mb-4">
              <label htmlFor="caratula" className="block text-sm font-medium text-gray-900 mb-2">
                Carátula 
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

            {/* Sección de Fojas */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Fojas (Documentos)
              </label>
              <Dropzone
                onFilesSelected={(files) =>
                  setFojas((prev) => [...prev, ...files])
                }
              />
                
                {/* Lista de archivos seleccionados */}
                {fojas.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Archivos seleccionados:</h4>
                    <ul className="space-y-2">
                      {fojas.map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
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
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}