import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, FileText, CreditCard, Calendar, AlertTriangle, Shield, Scale, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const TermsPage = () => {
    const { t } = useTranslation('common');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            id: 1,
            title: "Definiciones",
            icon: FileText,
            content: [
                { term: "Cliente", desc: "Persona que contrata los servicios ofrecidos por la Empresa." },
                { term: "Servicios", desc: "Paquetes de senderismo, trekking, alojamiento y actividades relacionadas." },
                { term: "Proveedor", desc: "Terceros independientes que prestan directamente servicios como alojamiento, guías o transporte." }
            ]
        },
        {
            id: 2,
            title: "Objeto del Contrato",
            icon: FileText,
            text: "La Empresa actúa como organizador de experiencias turísticas e intermediario de servicios, gestionando la contratación de proveedores locales para la prestación de los servicios incluidos en cada paquete."
        },
        {
            id: 3,
            title: "Proceso de Reserva",
            icon: Calendar,
            bullets: [
                "La reserva se considera provisional hasta que se reciba el pago del anticipo correspondiente.",
                "Una vez recibido el pago inicial, la Empresa enviará confirmación por escrito al cliente.",
                "La Empresa se reserva el derecho de rechazar una reserva si no hay disponibilidad con los proveedores."
            ]
        },
        {
            id: 4,
            title: "Pagos",
            icon: CreditCard,
            subsections: [
                {
                    subtitle: "4.1 Anticipo",
                    text: "Para confirmar la reserva se requiere un pago mínimo del 50% del precio total del paquete."
                },
                {
                    subtitle: "4.2 Pago Final",
                    text: "El 100% del monto debe liquidarse a más tardar 45 días antes del inicio del viaje. La información detallada de hoteles, refugios y logística final será proporcionada únicamente una vez recibido el pago completo."
                },
                {
                    subtitle: "4.3 Falta de Pago",
                    text: "Si el cliente no realiza el pago final en el plazo indicado, la Empresa podrá cancelar la reserva sin derecho a reembolso del anticipo."
                }
            ]
        },
        {
            id: 5,
            title: "Precios",
            icon: CreditCard,
            text: "Los precios se cotizan en euros y están sujetos a:",
            bullets: [
                "Tipo de cambio",
                "Disponibilidad de proveedores",
                "Cambios en tarifas de terceros",
                "Impuestos locales"
            ],
            note: "La Empresa se reserva el derecho de ajustar precios antes de la confirmación definitiva."
        },
        {
            id: 6,
            title: "Cambios de Itinerario",
            icon: AlertTriangle,
            text: "La Empresa podrá modificar rutas, alojamientos o actividades por razones de:",
            bullets: [
                "Seguridad",
                "Clima",
                "Disponibilidad",
                "Fuerza mayor"
            ],
            note: "Se ofrecerán alternativas similares siempre que sea posible, sin que ello implique reembolso automático."
        },
        {
            id: 7,
            title: "Cancelaciones por Parte del Cliente",
            icon: AlertTriangle,
            text: "Las políticas de cancelación dependen de los proveedores involucrados. De forma general:",
            bullets: [
                "Cancelaciones con más de 45 días: reembolso parcial según gastos ya incurridos",
                "Cancelaciones con menos de 45 días: no reembolsable"
            ],
            warning: "Algunos servicios pueden ser 100% no reembolsables desde el momento de la reserva."
        },
        {
            id: 8,
            title: "Cancelaciones por Parte de la Empresa",
            icon: AlertTriangle,
            text: "La Empresa podrá cancelar el viaje por causas de fuerza mayor, falta de mínimo de participantes o imposibilidad operativa. En estos casos, el cliente podrá optar por:",
            bullets: [
                "Reprogramación del viaje",
                "Crédito para futuro viaje",
                "Reembolso parcial o total, según gastos ya comprometidos con proveedores"
            ]
        },
        {
            id: 9,
            title: "Transferencia de Reserva",
            icon: CheckCircle,
            text: "El cliente podrá transferir su reserva a otra persona, siempre que:",
            bullets: [
                "Cumpla los requisitos físicos del tour",
                "Notifique por escrito con anticipación mínima de 45 días",
                "Asuma posibles costos administrativos"
            ]
        },
        {
            id: 10,
            title: "Obligaciones del Cliente",
            icon: CheckCircle,
            text: "El cliente se compromete a:",
            bullets: [
                "Contar con la condición física adecuada",
                "Seguir las normas de seguridad",
                "Respetar instrucciones de guías y proveedores",
                "Informar condiciones médicas relevantes"
            ],
            warning: "El incumplimiento podrá resultar en la exclusión de la actividad sin derecho a reembolso."
        },
        {
            id: 11,
            title: "Tours Autoguiados",
            icon: AlertTriangle,
            text: "En tours autoguiados, el cliente acepta que:",
            bullets: [
                "No contará con acompañamiento de guía durante las rutas",
                "Es responsable de evaluar condiciones de seguridad",
                "Debe seguir indicaciones generales proporcionadas"
            ],
            note: "La Empresa no es responsable por incidentes durante rutas sin guía."
        },
        {
            id: 12,
            title: "Responsabilidad de Proveedores",
            icon: Shield,
            text: "Los proveedores locales son responsables directos de la correcta prestación de sus servicios. La Empresa no se hace responsable por actos u omisiones de dichos proveedores, aunque apoyará al cliente en la gestión de soluciones cuando sea posible."
        },
        {
            id: 13,
            title: "Límites de Responsabilidad",
            icon: Shield,
            text: "La responsabilidad de la Empresa se limita al monto pagado por el cliente por los servicios contratados, excepto en casos de negligencia grave comprobada."
        },
        {
            id: 14,
            title: "Seguro de Viaje",
            icon: Shield,
            text: "El cliente es responsable de contratar un seguro de viaje que cubra:",
            bullets: [
                "Actividades de montaña",
                "Accidentes",
                "Evacuación",
                "Cancelaciones"
            ],
            warning: "El seguro no está incluido en nuestros paquetes."
        },
        {
            id: 15,
            title: "Ley Aplicable",
            icon: Scale,
            text: "Este contrato se rige por las leyes de los Estados Unidos Mexicanos. Las actividades realizadas en el extranjero están sujetas también a la normativa local del país donde se realicen."
        },
        {
            id: 16,
            title: "Aceptación",
            icon: CheckCircle,
            text: "El pago del anticipo o del monto total implica la aceptación expresa de estas Condiciones de Reserva."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-pizarra to-pizarra pt-28 pb-16">
                <div className="container mx-auto px-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Volver
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Condiciones de Reserva
                    </h1>
                    <p className="text-white/80 text-lg max-w-2xl">
                        Estas Condiciones de Reserva regulan la contratación de los servicios ofrecidos por
                        Dolovibes S de RL, operando como Dolo Vibes.
                    </p>
                    <p className="text-white/60 text-sm mt-4">
                        Al realizar una reserva, el cliente acepta estas condiciones.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-12 md:py-16">
                <div className="max-w-4xl mx-auto space-y-8">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className="bg-nieve rounded-2xl p-6 md:p-8 border border-niebla"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-pizarra rounded-xl flex items-center justify-center flex-shrink-0">
                                    <section.icon className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-grafito">
                                    {section.id}. {section.title}
                                </h2>
                            </div>

                            {/* Contenido con definiciones */}
                            {section.content && (
                                <div className="ml-14 space-y-3">
                                    {section.content.map((item, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <span className="font-semibold text-pizarra">{item.term}:</span>
                                            <span className="text-pizarra">{item.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Texto simple */}
                            {section.text && (
                                <p className="ml-14 text-pizarra leading-relaxed">
                                    {section.text}
                                </p>
                            )}

                            {/* Subsecciones */}
                            {section.subsections && (
                                <div className="ml-14 space-y-4 mt-4">
                                    {section.subsections.map((sub, idx) => (
                                        <div key={idx}>
                                            <h3 className="font-semibold text-grafito mb-1">{sub.subtitle}</h3>
                                            <p className="text-pizarra">{sub.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Lista de puntos */}
                            {section.bullets && (
                                <ul className="ml-14 mt-4 space-y-2">
                                    {section.bullets.map((bullet, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-pizarra">
                                            <span className="w-1.5 h-1.5 bg-pizarra rounded-full mt-2 flex-shrink-0"></span>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Nota */}
                            {section.note && (
                                <div className="ml-14 mt-4 p-4 bg-white rounded-xl border border-niebla">
                                    <p className="text-niebla text-sm italic">{section.note}</p>
                                </div>
                            )}

                            {/* Advertencia */}
                            {section.warning && (
                                <div className="ml-14 mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                                    <p className="text-amber-800 text-sm font-medium">⚠️ {section.warning}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Call to action */}
                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <div className="bg-gradient-to-r from-pizarra/5 to-pizarra/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-grafito mb-3">¿Tienes preguntas?</h3>
                        <p className="text-pizarra mb-6">
                            Si tienes dudas sobre nuestras condiciones de reserva, no dudes en contactarnos.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-pizarra text-white px-8 py-3 rounded-full font-semibold hover:bg-pizarra/90 transition-colors"
                        >
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TermsPage;
