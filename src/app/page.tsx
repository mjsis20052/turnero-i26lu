"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVGs and Icons
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

// Sample Data
const SERVICES = [
  { id: "srv-1", name: "Asesoría de Negocios", duration: "45 min", price: "$45", color: "from-blue-500 to-indigo-600" },
  { id: "srv-2", name: "Desarrollo Web & UX", duration: "60 min", price: "$80", color: "from-purple-500 to-pink-600" },
  { id: "srv-3", name: "Mentoría 1-a-1 Tech", duration: "30 min", price: "$30", color: "from-emerald-400 to-teal-600" },
];

const TIME_SLOTS = ["09:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  clientName: string;
  color: string;
}

export default function Home() {
  // Scheduling Wizard State
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState("");

  // Appointments List State
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "apt-1",
      service: "Desarrollo Web & UX",
      date: "2026-06-02",
      time: "10:30 AM",
      clientName: "Sofia Rodríguez",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "apt-2",
      service: "Asesoría de Negocios",
      date: "2026-06-03",
      time: "03:30 PM",
      clientName: "Mateo Silva",
      color: "from-blue-500 to-indigo-600",
    },
  ]);

  const handleNextStep = () => {
    if (step === 1 && selectedService) setStep(2);
    else if (step === 2 && selectedDate && selectedTime) setStep(3);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime || !clientName) return;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      service: selectedService.name,
      date: selectedDate,
      time: selectedTime,
      clientName,
      color: selectedService.color,
    };

    setAppointments([newApt, ...appointments]);
    
    // Reset Form
    setStep(1);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
    setClientName("");
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-xl text-white">T</span>
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Turnero
              </span>
              <span className="text-[10px] block text-indigo-400 font-semibold tracking-widest uppercase">
                Smart Scheduler
              </span>
            </div>
          </motion.div>

          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium"
          >
            <a href="#reservar" className="hover:text-white transition-colors">Nuevo Turno</a>
            <a href="#turnos" className="hover:text-white transition-colors">Mis Turnos</a>
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Next.js Docs</a>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Framer Motion Active
            </span>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16">
        
        {/* Hero Section */}
        <section className="text-center md:text-left flex flex-col md:flex-row items-center gap-12 justify-between">
          <div className="flex-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400"
            >
              <SparklesIcon />
              <span>Experiencia de reservas interactiva</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none"
            >
              Gestiona tus turnos con{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
                fluidez absoluta
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 max-w-xl"
            >
              Turnero es un gestor de citas moderno potenciado por **Next.js App Router**, diseñado con micro-interacciones pulidas y animaciones fluidas impulsadas por **Framer Motion**.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 justify-center md:justify-start"
            >
              <a 
                href="#reservar" 
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:translate-y-[-2px] flex items-center gap-2"
              >
                Agendar Turno
                <ArrowRightIcon />
              </a>
              <a 
                href="#turnos" 
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 font-semibold text-slate-300 transition-all"
              >
                Ver Citas Activas
              </a>
            </motion.div>
          </div>

          {/* Interactive Hero Widget Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="flex-1 w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all duration-700" />
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-400">
              <CalendarIcon /> Estadísticas del Día
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-2xl">
                <span className="text-xs text-slate-500 block uppercase tracking-wider">Hoy</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  {appointments.length + 3}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
                  ↑ 24% vs ayer
                </span>
              </div>
              <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-2xl">
                <span className="text-xs text-slate-500 block uppercase tracking-wider">Pendientes</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  {appointments.length}
                </span>
                <span className="text-[10px] text-indigo-400 font-semibold flex items-center gap-0.5 mt-1">
                  En bandeja de entrada
                </span>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <CheckIcon />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Tasa de Asistencia</h4>
                  <p className="text-xs text-slate-500">Promedio mensual</p>
                </div>
              </div>
              <span className="text-xl font-bold text-white">98.4%</span>
            </div>
          </motion.div>
        </section>

        {/* Core Layout Split */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Scheduling Wizard (7 cols) */}
          <section id="reservar" className="md:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-900/40 border border-slate-900 p-6 md:p-8 rounded-3xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold">Solicitar un Turno</h2>
                  <p className="text-xs text-slate-400 mt-1">Completa los pasos para agendar tu cita.</p>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div 
                      key={s} 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        s === step 
                          ? "w-8 bg-indigo-500" 
                          : s < step 
                            ? "w-2 bg-indigo-400/50" 
                            : "w-2 bg-slate-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Steps Widget wrapper */}
              <div className="relative min-h-[300px]">
                <AnimatePresence mode="wait">
                  {/* STEP 1: Service Selection */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-slate-200">1. Selecciona un Servicio</h3>
                      <div className="flex flex-col gap-3">
                        {SERVICES.map((service) => {
                          const isSelected = selectedService?.id === service.id;
                          return (
                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              key={service.id}
                              onClick={() => setSelectedService(service)}
                              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between relative overflow-hidden group ${
                                isSelected 
                                  ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/5" 
                                  : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-tr ${service.color}`} />
                                <div>
                                  <h4 className="font-semibold text-white">{service.name}</h4>
                                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                    <ClockIcon /> {service.duration}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="font-bold text-white block">{service.price}</span>
                                {isSelected && (
                                  <motion.span 
                                    layoutId="selected-indicator" 
                                    className="inline-block mt-1 text-xs text-indigo-400 font-semibold"
                                  >
                                    Seleccionado
                                  </motion.span>
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          disabled={!selectedService}
                          onClick={handleNextStep}
                          className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                            selectedService
                              ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
                              : "bg-slate-800 text-slate-500 cursor-not-allowed"
                          }`}
                        >
                          Siguiente
                          <ArrowRightIcon />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Date & Time Selection */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-semibold text-slate-200">2. Elige Fecha y Hora</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Fecha</label>
                          <div className="relative">
                            <input
                              type="date"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              min="2026-05-29"
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Horas Disponibles</label>
                          <div className="grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map((time) => {
                              const isSelected = selectedTime === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-2 px-3 text-xs rounded-xl font-medium border text-center transition-all ${
                                    isSelected 
                                      ? "bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow" 
                                      : "bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700"
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4">
                        <button
                          onClick={handlePrevStep}
                          className="px-6 py-2.5 rounded-xl font-semibold border border-slate-800 text-slate-300 hover:bg-slate-900 transition-all"
                        >
                          Atrás
                        </button>
                        <button
                          disabled={!selectedDate || !selectedTime}
                          onClick={handleNextStep}
                          className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                            selectedDate && selectedTime
                              ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
                              : "bg-slate-800 text-slate-500 cursor-not-allowed"
                          }`}
                        >
                          Siguiente
                          <ArrowRightIcon />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Client Info & Confirmation */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-semibold text-slate-200">3. Confirma tu Datos</h3>

                      <form onSubmit={handleBookAppointment} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Nombre Completo</label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="Ej: Sofía Rodríguez"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                            />
                          </div>
                        </div>

                        {/* Summary Box */}
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 space-y-3">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resumen del Turno</h4>
                          <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-tr ${selectedService?.color}`} />
                            <span className="font-semibold text-sm">{selectedService?.name}</span>
                            <span className="ml-auto text-xs text-slate-400">{selectedService?.price}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-900">
                            <div className="flex items-center gap-1">
                              <CalendarIcon /> {selectedDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon /> {selectedTime}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-6 py-2.5 rounded-xl font-semibold border border-slate-800 text-slate-300 hover:bg-slate-900 transition-all"
                          >
                            Atrás
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                          >
                            Agendar Cita
                            <PlusIcon />
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* RIGHT: List of Appointments (5 cols) */}
          <section id="turnos" className="md:col-span-5 flex flex-col gap-6">
            <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-3xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Mis Turnos Agendados</h2>
                  <p className="text-xs text-slate-400 mt-1">Citas reservadas en el sistema.</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-950 text-indigo-400 border border-slate-800">
                  {appointments.length} total
                </span>
              </div>

              {/* Animated Appointments List */}
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {appointments.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 bg-slate-950/30 rounded-2xl border border-dashed border-slate-900"
                    >
                      <span className="text-slate-600 block text-3xl mb-2">📅</span>
                      <p className="text-sm font-semibold text-slate-400">No hay turnos agendados</p>
                      <p className="text-xs text-slate-600 mt-1">Usa el formulario para crear uno nuevo.</p>
                    </motion.div>
                  ) : (
                    appointments.map((apt) => (
                      <motion.div
                        layout
                        key={apt.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -30, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-900 flex items-start justify-between gap-4 group"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-tr ${apt.color}`} />
                            <h4 className="font-bold text-sm text-slate-200">{apt.service}</h4>
                          </div>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <UserIcon /> {apt.clientName}
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarIcon /> {apt.date}
                            </span>
                            <span className="flex items-center gap-1 text-indigo-400 font-medium">
                              <ClockIcon /> {apt.time}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteAppointment(apt.id)}
                          className="p-2 rounded-xl bg-slate-900 hover:bg-red-500/10 border border-slate-900 hover:border-red-500/20 text-slate-500 hover:text-red-400 transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
                          title="Eliminar turno"
                        >
                          <TrashIcon />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-8 mt-20 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Turnero Smart Scheduler. Creado con amor usando Next.js & Framer Motion.</p>
          <div className="flex items-center gap-4">
            <a href="https://nextjs.org" className="hover:text-slate-300">Next.js</a>
            <span>•</span>
            <a href="https://framer.com/motion" className="hover:text-slate-300">Framer Motion</a>
            <span>•</span>
            <a href="https://tailwindcss.com" className="hover:text-slate-300">Tailwind CSS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

