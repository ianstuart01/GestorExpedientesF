"use client";
import React, { useState } from "react";
import Image from "next/image";
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
  };

  return (
    <main className="min-h-screen flex flex-col bg-cyan-100">
      {/* 🔹 Encabezado a todo el ancho con logos alineados */}
      <header className="w-full bg-sky-200 shadow-md flex items-center justify-start px-6 h-[100px]">
        <div className="flex items-center gap-6">
          <div className="h-[80px] w-auto flex items-center">
            <Image
              src="/linsi-logo.png"
              alt="Logo LINSI"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </div>

          <div className="h-[80px] w-auto flex items-center">
            <Image
              src="/utn-logo.png"
              alt="Logo UTN"
              width={100}
              height={150}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Franja azul a la derecha para completar el ancho */}
        <div className="flex-1 h-[100px] bg-[url('/header-bg.png')] bg-cover bg-center ml-6"></div>
      </header>

      {/* 🔹 Contenedor del formulario */}
      <section className="flex flex-1 justify-center items-start py-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 mt-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
            Registro de Usuario
          </h2>

          <form
            onSubmit={handleRegister}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Nombre */}
            <div>
              <label className="block text-gray-900 font-medium mb-1">Nombre</label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-400 rounded placeholder-gray-600 text-gray-900"
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-gray-900 font-medium mb-1">Apellido</label>
              <input
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-400 rounded placeholder-gray-600 text-gray-900"
              />
            </div>

            {/* Tipo y Nro Documento */}
            <div className="flex gap-3 items-end">
              <div className="w-1/3">
                <label className="block text-gray-900 font-medium mb-1">Tipo</label>
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-400 rounded text-gray-900"
                >
                  <option value="">Seleccionar</option>
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="CUIL">CUIL</option>
                </select>
              </div>
              <div className="w-2/3">
                <label className="block text-gray-900 font-medium mb-1">Nro Documento</label>
                <input
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-400 rounded placeholder-gray-600 text-gray-900"
                />
              </div>
            </div>

            {/* Correo */}
            <div>
              <label className="block text-gray-900 font-medium mb-1">Correo Electrónico</label>
              <input
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                type="email"
                placeholder="tu.correo@ejemplo.com"
                className="w-full px-3 py-2 border border-gray-400 rounded placeholder-gray-600 text-gray-900"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-gray-900 font-medium mb-1">Contraseña</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                type="password"
                className="w-full px-3 py-2 border border-gray-400 rounded placeholder-gray-600 text-gray-900"
              />
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-gray-900 font-medium mb-1">Confirmar Contraseña</label>
              <input
                name="confirmarPassword"
                value={formData.confirmarPassword}
                onChange={handleChange}
                required
                type="password"
                className="w-full px-3 py-2 border border-gray-400 rounded placeholder-gray-600 text-gray-900"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-gray-900 font-medium mb-1">Número de Teléfono</label>
              <input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                type="tel"
                placeholder="Ej: 351-555-1234"
                className="w-full px-3 py-2 border border-gray-400 rounded placeholder-gray-600 text-gray-900"
              />
            </div>

            {/* Fecha nacimiento */}
            <div>
              <label className="block text-gray-900 font-medium mb-1">Fecha de Nacimiento</label>
              <input
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
                type="date"
                className="w-full px-3 py-2 border border-gray-400 rounded placeholder-gray-600 text-gray-900"
              />
            </div>

            {/* Domicilio */}
            <div className="sm:col-span-2">
              <label className="block text-gray-900 font-medium mb-1">Domicilio</label>
              <input
                name="domicilio"
                value={formData.domicilio}
                onChange={handleChange}
                required
                type="text"
                className="w-full px-3 py-2 border border-gray-400 rounded placeholder-gray-600 text-gray-900"
              />
            </div>

            {/* Botones */}
            <div className="col-span-2 flex justify-between mt-4">
              <Link
                href="/"
                className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
              >
                Volver
              </Link>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
