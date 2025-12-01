"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { login } from "../services/AuthService";

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('--- INTENTO DE INICIO DE SESIÓN ---');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        setErrorMessage(""); // limpiar error antes del intento

        const result = await login(email, password);

        if (!result.isSuccess) {
            setErrorMessage(result.error || "Usuario o contraseña incorrectos");
            return;
        }

        localStorage.setItem("token", result.token);

        window.location.href = "/Inicio";
    };

    return (
        <main className="min-h-screen flex flex-col bg-cyan-50">

            <section className="flex flex-1 justify-center items-start p-6 pt-[10vh] bg-cyan-50">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6 border border-gray-200">
                    
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Iniciar Sesión
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Bienvenido al Gestor de Expedientes
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
                                placeholder="tu.correo@ejemplo.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
                                placeholder="••••••••"
                            />

                            {/* 🔥 Mensaje de error aquí */}
                            {errorMessage && (
                                <p className="mt-2 text-sm text-red-600 font-medium">
                                    {errorMessage}
                                </p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                            >
                                Acceder
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-between text-sm">
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150">
                            ¿Olvidaste tu contraseña?
                        </a>
                        <a href="/Registro" className="font-medium text-blue-600 hover:text-gray-700 transition duration-150">
                            ¿Crear una cuenta?
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
