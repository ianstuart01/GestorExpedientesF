"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CrearExpediente() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    usuario: "",
    numero: "",
    tema: "",
    subTema: "",
    fechaAlta: "",
    alcance: "",
    caratula: "",
    observaciones: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el expediente
    console.log("Expediente a crear:", formData);
    
    // Simulamos el guardado y volvemos a la lista
    alert("Expediente creado exitosamente");
    router.push("/Expediente");
  };

  const handleVolver = () => {
    router.push("/Expediente");
  };

  const handleLogout = () => {
    window.location.href = "/";
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

            {/* Tercera fila: Fecha Alta y Alcance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}