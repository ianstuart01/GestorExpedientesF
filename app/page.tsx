"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Cuentas hardcodeadas para testing
    const cuentasValidas = [
        { email: 'admin@utn.com', password: 'admin123', rol: 'admin' },
        { email: 'usuario@utn.com', password: 'user123', rol: 'user' },
        { email: 'test@test.com', password: 'test', rol: 'user' },
        { email: 'linsi@utn.com', password: 'linsi', rol: 'admin' }
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        setError(''); // Limpiar error anterior

        console.log('--- INTENTO DE INICIO DE SESIÓN ---');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        // Validar credenciales
        const cuentaValida = cuentasValidas.find(
            cuenta => cuenta.email === email && cuenta.password === password
        );

        if (cuentaValida) {
            console.log('✅ Login exitoso');
            console.log(`Rol: ${cuentaValida.rol}`);
            
            // Aquí podrías guardar en localStorage o context
            localStorage.setItem('usuario', JSON.stringify({
                email: cuentaValida.email,
                rol: cuentaValida.rol
            }));
            
            // Redirigir a la página de inicio
            router.push('/Inicio');
        } else {
            console.log('❌ Credenciales incorrectas');
            setError('Email o contraseña incorrectos');
        }
    };

    return (
        <main className="min-h-screen flex flex-col bg-cyan-50">
            {/* Header idéntico al de las otras páginas */}
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

                {/* Espacio vacío para mantener la simetría */}
                <div className="w-[100px] mr-6"></div>
            </header>

            {/* Contenido del Login - Centrado */}
            <section className="flex-1 flex items-center justify-center p-6 bg-cyan-50">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6 border border-gray-200">
                    
                    {/* Encabezado del Formulario */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Iniciar Sesión
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Bienvenido al Gestor de Expedientes
                        </p>
                    </div>

                    {/* Mensaje de error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-700 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Información de testing (solo para desarrollo) */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-700 text-sm text-center font-medium">
                            Cuentas de prueba:
                        </p>
                        <div className="text-blue-600 text-xs text-center mt-1 space-y-1">
                            <p>admin@utn.com / admin123</p>
                            <p>usuario@utn.com / user123</p>
                            <p>test@test.com / test</p>
                        </div>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Campo de Correo Electrónico */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
                                placeholder="tu.correo@ejemplo.com"
                            />
                        </div>

                        {/* Campo de Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Botón de Acceso */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                            >
                                Acceder
                            </button>
                        </div>
                    </form>

                    {/* Enlace de Registro y Contraseña */}
                    <div className="flex justify-between text-sm">
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150">
                            ¿Olvidaste tu contraseña?
                        </a>
                        <a href="/Registro" className="font-medium text-gray-600 hover:text-gray-700 transition duration-150">
                            ¿Crear una cuenta?
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}