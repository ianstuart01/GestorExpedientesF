"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    domicilio: "",
    password: "",
    confirmarPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("--- REGISTRO DE USUARIO ---");
    console.table(formData);
    // Aquí luego conectamos con el backend (POST /usuarios)
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        
        {/* Encabezado */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Crear cuenta
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Completá tus datos para registrarte
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre
            </label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Apellido
            </label>
            <input
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Tipo de documento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de Documento
            </label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Seleccionar</option>
              <option value="DNI">DNI</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="CUIL">CUIL</option>
            </select>
          </div>

          {/* Número de documento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Número de Documento
            </label>
            <input
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleChange}
              required
              type="number"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correo Electrónico
            </label>
            <input
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              type="email"
              placeholder="tu.correo@ejemplo.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Número de Teléfono
            </label>
            <input
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              type="tel"
              placeholder="Ej: 351-555-1234"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de Nacimiento
            </label>
            <input
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
              type="date"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Domicilio */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Domicilio
            </label>
            <input
              name="domicilio"
              value={formData.domicilio}
              onChange={handleChange}
              required
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Repetir Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Repetir Contraseña
            </label>
            <input
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
              required
              type="password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Botón de registro */}
          <div className="sm:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition duration-150 transform hover:scale-[1.01] active:scale-95"
            >
              Registrarme
            </button>
          </div>
        </form>

        {/* Volver al login */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          >
            ¿Ya tenés una cuenta? Iniciá sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
