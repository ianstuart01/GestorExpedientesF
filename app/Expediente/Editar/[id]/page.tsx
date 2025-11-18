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

export default function EditarExpediente() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    usuario: "",
    numero: "",
    tema: "",
    subTema: "",
    fechaAlta: "",
    alcance: "",
    caratula: "",
    observaciones: "",
    estado: ""
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simular carga de datos desde API
    const cargarExpediente = async () => {
      setCargando(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const expediente = expedientesEjemplo.find(exp => exp.id === id);
      
      if (expediente) {
        setFormData({
          usuario: expediente.usuario,
          numero: expediente.numero,
          tema: expediente.tema,
          subTema: expediente.subTema,
          fechaAlta: expediente.fechaAlta,
          alcance: expediente.alcance,
          caratula: expediente.caratula,
          observaciones: expediente.observaciones,
          estado: expediente.estado
        });
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí iría la lógica para actualizar el expediente
    console.log("Expediente actualizado:", formData);
    
    // Simulamos la actualización
    alert("Expediente actualizado exitosamente");
    router.push("/Expediente");
  };

  const handleVolver = () => {
    router.push("/Expediente");
  };

  const handleLogout = () => {
    window.location.href = "/";
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

  return (
    <main className="min-h-screen flex flex-col bg-cyan-50">

      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-cyan-50">
        <div className="max-w-4xl mx-auto">
          {/* Título */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Editar Expediente</h1>
              <p className="text-gray-600">Modifique los datos del expediente #{formData.numero}</p>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            {/* Primera fila: Usuario y Número */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="usuario" className="block text-sm font-medium text-gray-900 mb-2">
                  Usuario *
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  placeholder="Nombre del usuario"
                />
              </div>
              <div>
                <label htmlFor="numero" className="block text-sm font-medium text-gray-900 mb-2">
                  Número *
                </label>
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  placeholder="Número de expediente"
                />
              </div>
            </div>

            {/* Segunda fila: Tema y Subtema */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="tema" className="block text-sm font-medium text-gray-900 mb-2">
                  Tema *
                </label>
                <select
                  id="tema"
                  name="tema"
                  value={formData.tema}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                >
                  <option value="">Seleccione un tema</option>
                  <option value="Práctica Supervisada">Práctica Supervisada</option>
                  <option value="Tesis de Grado">Tesis de Grado</option>
                  <option value="Proyecto Final">Proyecto Final</option>
                  <option value="Práctica Profesional">Práctica Profesional</option>
                  <option value="Investigación">Investigación</option>
                </select>
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

            {/* Tercera fila: Fecha Alta, Alcance y Estado */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="fechaAlta" className="block text-sm font-medium text-gray-900 mb-2">
                  Fecha Alta *
                </label>
                <input
                  type="date"
                  id="fechaAlta"
                  name="fechaAlta"
                  value={formData.fechaAlta}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="alcance" className="block text-sm font-medium text-gray-900 mb-2">
                  Alcance
                </label>
                <select
                  id="alcance"
                  name="alcance"
                  value={formData.alcance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                >
                  <option value="">Seleccione alcance</option>
                  <option value="Interno">Interno</option>
                  <option value="Externo">Externo</option>
                  <option value="Mixto">Mixto</option>
                </select>
              </div>
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

            {/* Cuarta fila: Carátula */}
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

            {/* Quinta fila: Observaciones */}
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