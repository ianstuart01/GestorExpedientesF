"use client";
import React, { useState } from 'react';

// Este es el componente principal de la página (Next.js page.tsx/jsx)
export default function Home() {
    // Definimos los estados para los campos de email y contraseña (no funcional por ahora)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Manejador del envío del formulario
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('--- INTENTO DE INICIO DE SESIÓN ---');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        // Aquí iría la lógica de autenticación real.
        // Por ahora, solo muestra el intento en la consola.
    };

    return (
        // Contenedor principal que centra el formulario en la pantalla
        <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-200 dark:border-gray-700 transition duration-300 hover:shadow-3xl">
                
                {/* Encabezado del Formulario */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        PPS Login
                    </h1>
                    <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
                        Bienvenido de vuelta.
                    </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Campo de Correo Electrónico */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm transition duration-150"
                            placeholder="tu.correo@ejemplo.com"
                        />
                    </div>

                    {/* Campo de Contraseña */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm transition duration-150"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Botón de Acceso */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 transform hover:scale-[1.01] active:scale-95"
                        >
                            Acceder
                        </button>
                    </div>
                </form>

                {/* Enlace de Registro y Contraseña */}
                <div className="flex justify-between text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition duration-150">
                        ¿Olvidaste tu contraseña?
                    </a>
                    <a href="/Registro" className="font-medium text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition duration-150">
                        ¿Crear una cuenta?
                    </a>
                </div>
            </div>
        </main>
    );
}
