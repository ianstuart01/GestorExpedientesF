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
    },
    {
      id: 2,
      tipo: "usuario",
      accion: "registrado",
      descripcion: "Nuevo usuario: Carlos Rodríguez",
      usuario: "Admin Sistema",
      tiempo: "Hace 15 min",
    },
    {
      id: 3,
      tipo: "movimiento",
      accion: "actualizado",
      descripcion: "Expediente #2024-125 movido a Calidad",
      usuario: "Ana López",
      tiempo: "Hace 30 min",
    },
    {
      id: 4,
      tipo: "documento",
      accion: "agregado",
      descripcion: "3 fojas agregadas a #2024-120",
      usuario: "Juan Pérez",
      tiempo: "Hace 1 hora",
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
          
          {/* Logo UTN primero */}
          <div className="relative h-[55%] aspect-[3/2] flex items-center justify-center bg-sky-200 px-2 mr-2">
            <Image
              src="/utnlogo.png"
              alt="Logo UTN La Plata"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Logo LINSI después, con el mismo estilo */}
          <div className="relative h-[60%] aspect-[4/3] flex items-center justify-center bg-sky-200 px-2">
            <Image
              src="/linsilogo.png"
              alt="Logo LINSI"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="text-center text-blue-900 font-bold text-xl leading-tight">
          Gestor de Expedientes
          <span className="block text-gray-700 text-sm font-medium">
            Laboratorio de Innovaciones en Sistemas de Información
          </span>
        </h1>

        <button
          onClick={handleLogout}
          className="text-black font-semibold text-sm mr-6 px-5 py-2 rounded-xl transition-all duration-200 hover:bg-gray-100 hover:shadow-md active:translate-y-[1px]"
        >
          Cerrar sesión
        </button>


      </header>

      {/* Navegación */}
        <nav className="w-full flex justify-center items-center py-3 shadow mb-6 font-semibold" style={{ backgroundColor: "#21BCEE" }}>
          {[
            { label: "Inicio" },
            { label: "Usuarios", path: "/Usuario" },
            { label: "Expedientes", path: "/Expediente" },
            { label: "Historial Movimientos", path: "/Movimiento/Lista" },
          ].map((item, index) => (
            <React.Fragment key={item.path}>
              <button
                onClick={() => {
                  if (router.pathname !== item.path) {
                    router.push(item.path);
                  }
                }}
                className={`px-15 transition-all duration-200 text-blue-900 hover:text-white hover:scale-[1.05]
                  ${router.pathname === item.path ? "text-white scale-[1.07]" : ""}`}
              >
                {item.label}
              </button>

              {/* divisor excepto después del último */}
              {index < 3 && <div className="border-l h-6 mx-6" style={{ borderColor: "#116BF8" }}></div>}
            </React.Fragment>
          ))}
        </nav>

      {/* Contenido Principal */}
      <section className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { 
                titulo: "Expedientes Totales", 
                valor: metricas.expedientesTotales, 
                icono: "/chart.png",
                descripcion: "Total en el sistema"
              },
              { 
                titulo: "Expedientes Activos", 
                valor: metricas.expedientesActivos, 
                icono: "/check.png",
                descripcion: "En proceso actual"
              },
              { 
                titulo: "Usuarios Registrados", 
                valor: metricas.usuariosRegistrados, 
                icono: "/users.png",
                descripcion: "Usuarios activos"
              },
              { 
                titulo: "Movimientos Hoy", 
                valor: metricas.movimientosHoy, 
                icono: "/mov.png",
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

                  {metrica.titulo === "Expedientes Totales" ? (
                    <img
                      src="/chart.png"
                      alt="Expedientes Totales"
                      className="w-10 h-10 object-contain"
                    />
                  ) : metrica.titulo === "Expedientes Activos" ? (
                    <img
                      src="/check.png"
                      alt="Expedientes Activos"
                      className="w-10 h-10 object-contain"
                    />
                  ) : metrica.titulo === "Movimientos Hoy" ? (
                    <img
                      src="/mov.png"
                      alt="Movimientos Hoy"
                      className="w-10 h-10 object-contain"
                    />
                   ) : metrica.titulo === "Usuarios Registrados" ? (
                    <img
                      src="/users.png"
                      alt="Usuarios Registrados"
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="text-3xl">{metrica.icono}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Accesos Rápidos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Acceso Rápido
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => router.push("/Expediente")}
                  className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition duration-200 group"
                >
                  <img
                    src="/search.png"
                    alt="Nuevo Expediente"
                    className="w-8 h-8 mx-auto mb-2 object-contain"
                  />
                  <p className="font-semibold text-blue-800">Ver Expedientes</p>
                  <p className="text-xs text-blue-600 mt-1">Explorar todos</p>
                </button>

                <button
                  onClick={() => router.push("/Expediente/Crear?crear=true")}
                  className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition duration-200 group"
                >
                  <img
                    src="/plus2.png"
                    alt="Nuevo Expediente"
                    className="w-8 h-8 mx-auto mb-2 object-contain"
                  />
                  <p className="font-semibold text-green-800">Nuevo Expediente</p>
                  <p className="text-xs text-green-600 mt-1">Crear uno nuevo</p>
                </button>

                <button
                  onClick={() => router.push("/Usuario")}
                  className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-center transition duration-200 group"
                >
                  <img
                    src="/users2.png"
                    alt="Nuevo Expediente"
                    className="w-8 h-8 mx-auto mb-2 object-contain"
                  />
                  <p className="font-semibold text-purple-800">Gestionar Usuarios</p>
                  <p className="text-xs text-purple-600 mt-1">Administrar acceso</p>
                </button>

                <button
                  onClick={() => router.push("/Usuario/Nuevo")}
                  className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 text-center transition duration-200 group"
                >
                  <img
                    src="/adduser.png"
                    alt="Nuevo Expediente"
                    className="w-8 h-8 mx-auto mb-2 object-contain"
                  />
                  <p className="font-semibold text-orange-800">Nuevo Usuario</p>
                  <p className="text-xs text-orange-600 mt-1">Agregar uno nuevo</p>
                </button>
              </div>
            </div>

            {/* Actividad Reciente */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Actividad Reciente
              </h2>

              <div className="space-y-4">
                {actividadReciente.map((actividad) => {
                  // Selecciona el ícono según el tipo
                  let iconSrc = "";
                  switch (actividad.tipo) {
                    case "expediente":
                      iconSrc = "/file.png";
                      break;
                    case "usuario":
                      iconSrc = "/usersolo.png";
                      break;
                    case "movimiento":
                      iconSrc = "/mov2.png";
                      break;
                    case "documento":
                      iconSrc = "/clip.png";
                  }

                  return (
                    <div
                      key={actividad.id}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                      <img
                        src={iconSrc}
                        alt={actividad.tipo}
                        width={28}
                        height={28}
                        className="object-contain"
                      />

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
                  );
                })}
              </div>

              <button
                onClick={() => router.push("/Movimiento/Lista")}
                className="w-full mt-4 text-center text-blue-600 font-medium text-sm py-2 rounded-lg border border-transparent hover:border-blue-600 hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Ver toda la actividad →
              </button>
            </div>
          </div>

          {/* Información del Sistema */}
          <div className="mt-8 rounded-xl shadow-lg p-6 text-white" style={{ backgroundColor: "#37A8CF" }}>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Sistema de Gestión LINSI</h3>
              <p className="opacity-90 max-w-2xl mx-auto">
                Plataforma desarrollada para optimizar la gestión documental y el seguimiento 
                de expedientes dentro del Laboratorio de Innovaciones en Sistemas de Información
              </p>
              <div className="flex justify-center gap-6 mt-4 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <Image src="/shield.png" alt="Seguro" width={20} height={20} className="object-contain" />
                  <span>Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/rayo.png" alt="Rápido" width={20} height={20} className="object-contain" />
                  <span>Rápido</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/lupa.png" alt="Auditado" width={20} height={20} className="object-contain" />
                  <span>Auditado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/plane.png" alt="Escalable" width={20} height={20} className="object-contain" />
                  <span>Escalable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}