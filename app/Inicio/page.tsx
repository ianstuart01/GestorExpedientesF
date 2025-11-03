"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Datos de ejemplo para las métricas
  const metricas = {
    expedientesTotales: 124,
    expedientesActivos: 89,
    usuariosRegistrados: 24,
    movimientosHoy: 15
  };

  // Actividad reciente
  const actividadReciente = [
    {
      id: 1,
      tipo: "expediente",
      accion: "creado",
      descripcion: "Expediente #2025-001 - Práctica Supervisada",
      usuario: "María González",
      tiempo: "Hace 5 min",
      icono: "📄"
    },
    {
      id: 2,
      tipo: "usuario",
      accion: "registrado",
      descripcion: "Nuevo usuario: Carlos Rodríguez",
      usuario: "Admin Sistema",
      tiempo: "Hace 15 min",
      icono: "👤"
    },
    {
      id: 3,
      tipo: "movimiento",
      accion: "actualizado",
      descripcion: "Expediente #2024-125 movido a Calidad",
      usuario: "Ana López",
      tiempo: "Hace 30 min",
      icono: "🔄"
    },
    {
      id: 4,
      tipo: "documento",
      accion: "agregado",
      descripcion: "3 fojas agregadas a #2024-120",
      usuario: "Juan Pérez",
      tiempo: "Hace 1 hora",
      icono: "📎"
    }
  ];

  const handleLogout = () => {
    window.location.href = "/";
  };

  const getCardColor = (index: number) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-orange-500 to-orange-600"
    ];
    return colors[index % colors.length];
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
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
        <button className="px-30 hover:text-white transition font-semibold text-white">
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
      <section className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Bienvenida */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ¡Bienvenido al Gestor de Expedientes!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sistema integral para la gestión y seguimiento de expedientes del Laboratorio LINSI
            </p>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { 
                titulo: "Expedientes Totales", 
                valor: metricas.expedientesTotales, 
                icono: "📊",
                descripcion: "Total en el sistema"
              },
              { 
                titulo: "Expedientes Activos", 
                valor: metricas.expedientesActivos, 
                icono: "✅",
                descripcion: "En proceso actual"
              },
              { 
                titulo: "Usuarios Registrados", 
                valor: metricas.usuariosRegistrados, 
                icono: "👥",
                descripcion: "Usuarios activos"
              },
              { 
                titulo: "Movimientos Hoy", 
                valor: metricas.movimientosHoy, 
                icono: "🔄",
                descripcion: "Actividad del día"
              }
            ].map((metrica, index) => (
              <div
                key={index}
                className={`${getCardColor(index)} text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{metrica.titulo}</p>
                    <p className="text-3xl font-bold mt-2">{metrica.valor}</p>
                    <p className="text-xs opacity-80 mt-1">{metrica.descripcion}</p>
                  </div>
                  <span className="text-3xl">{metrica.icono}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Accesos Rápidos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>🚀</span> Accesos Rápidos
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => router.push("/Expediente")}
                  className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition duration-200 group"
                >
                  <div className="text-2xl mb-2">📄</div>
                  <p className="font-semibold text-blue-800">Ver Expedientes</p>
                  <p className="text-xs text-blue-600 mt-1">Explorar todos</p>
                </button>

                <button
                  onClick={() => router.push("/Expediente?crear=true")}
                  className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition duration-200 group"
                >
                  <div className="text-2xl mb-2">➕</div>
                  <p className="font-semibold text-green-800">Nuevo Expediente</p>
                  <p className="text-xs text-green-600 mt-1">Crear uno nuevo</p>
                </button>

                <button
                  onClick={() => router.push("/Usuarios")}
                  className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-center transition duration-200 group"
                >
                  <div className="text-2xl mb-2">👥</div>
                  <p className="font-semibold text-purple-800">Gestionar Usuarios</p>
                  <p className="text-xs text-purple-600 mt-1">Administrar acceso</p>
                </button>

                <button
                  onClick={() => router.push("/Historial")}
                  className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 text-center transition duration-200 group"
                >
                  <div className="text-2xl mb-2">📋</div>
                  <p className="font-semibold text-orange-800">Ver Historial</p>
                  <p className="text-xs text-orange-600 mt-1">Auditar movimientos</p>
                </button>
              </div>
            </div>

            {/* Actividad Reciente */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>🔥</span> Actividad Reciente
              </h2>
              <div className="space-y-4">
                {actividadReciente.map((actividad) => (
                  <div
                    key={actividad.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                  >
                    <span className="text-xl">{actividad.icono}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {actividad.descripcion}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>Por {actividad.usuario}</span>
                        <span>•</span>
                        <span>{actividad.tiempo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 font-medium text-sm py-2">
                Ver toda la actividad →
              </button>
            </div>
          </div>

          {/* Información del Sistema */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Sistema de Gestión LINSI</h3>
              <p className="opacity-90 max-w-2xl mx-auto">
                Plataforma desarrollada para optimizar la gestión documental y el seguimiento 
                de expedientes dentro del Laboratorio de Innovaciones en Sistemas de Información
              </p>
              <div className="flex justify-center gap-6 mt-4 text-sm opacity-80">
                <span>🛡️ Seguro</span>
                <span>⚡ Rápido</span>
                <span>🔍 Auditado</span>
                <span>📈 Escalable</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}