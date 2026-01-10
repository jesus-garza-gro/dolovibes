import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Send, X } from 'lucide-react';

const PackageQuoteModal = ({ isOpen, onClose, packageTitle }) => {
    const { t } = useTranslation('quoteForm');
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        ciudad: '',
        estado: '',
        pais: '',
        email: '',
        telefono: '',
        contacto: 'whatsapp',
        mesViaje: '',
        pasajeros: '2',
        tipoViaje: 'guiado',
        serviciosAdicionales: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationError, setValidationError] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationError(false);
        setIsSubmitting(true);

        // Simular envío
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
                setIsSubmitted(false);
                setValidationError(false);
                setFormData({
                    nombre: '', apellido: '', ciudad: '', estado: '', pais: '',
                    email: '', telefono: '', contacto: 'whatsapp', mesViaje: '',
                    pasajeros: '2', tipoViaje: 'guiado', serviciosAdicionales: ''
                });
            }, 3000);
        }, 1500);
    };

    // Cuando el usuario intenta enviar pero el formulario es inválido (native HTML validation)
    const handleInvalid = (e) => {
        e.preventDefault();
        setValidationError(true);
        // Scroll hacia arriba para ver el mensaje de error
        e.target.closest('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleClose = () => {
        onClose();
        setIsSubmitted(false);
        setValidationError(false);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-pizarra/70 backdrop-blur-sm"
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in-up">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-pizarra hover:text-grafito transition-colors shadow-lg"
                >
                    <X className="w-5 h-5" />
                </button>

                {isSubmitted ? (
                    <div className="bg-gradient-to-br from-pizarra to-pizarra p-12 text-center text-white min-h-[400px] flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            {t('success.title')}
                        </h3>
                        <p className="text-white/80 text-lg">
                            {t('success.message')}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-gradient-to-r from-pizarra to-pizarra p-6 md:p-8 text-center">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                {packageTitle}
                            </h3>
                            <p className="text-white text-base font-medium mb-1">
                                {t('subtitle')}
                            </p>
                            <p className="text-white/60 text-sm">
                                {t('completeInfo')}
                            </p>
                        </div>

                        {/* Form */}
                        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
                            {/* Mensaje de error de validación */}
                            {validationError && (
                                <div className="mx-6 md:mx-8 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-pulse">
                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-red-500 font-bold">!</span>
                                    </div>
                                    <p className="text-red-700 text-sm font-medium">
                                        {t('validation.requiredFields')}
                                    </p>
                                </div>
                            )}
                            <form onSubmit={handleSubmit} onInvalid={handleInvalid} className="p-6 md:p-8 space-y-5">
                                {/* Nombre y Apellido */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-pizarra mb-1.5">
                                            {t('form.firstName')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            required
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all text-sm"
                                            placeholder={t('placeholders.firstName')}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-pizarra mb-1.5">
                                            {t('form.lastName')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="apellido"
                                            required
                                            value={formData.apellido}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all text-sm"
                                            placeholder={t('placeholders.lastName')}
                                        />
                                    </div>
                                </div>

                                {/* Ciudad, Estado, País */}
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-pizarra mb-1.5">
                                            {t('form.city')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="ciudad"
                                            required
                                            value={formData.ciudad}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all text-sm"
                                            placeholder={t('placeholders.city')}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-pizarra mb-1.5">
                                            {t('form.state')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="estado"
                                            required
                                            value={formData.estado}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all text-sm"
                                            placeholder={t('placeholders.state')}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-pizarra mb-1.5">
                                            {t('form.country')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="pais"
                                            required
                                            value={formData.pais}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all text-sm"
                                            placeholder={t('placeholders.country')}
                                        />
                                    </div>
                                </div>

                                {/* Email y Teléfono */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-pizarra mb-1.5">
                                            {t('form.email')} *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all text-sm"
                                            placeholder={t('placeholders.email')}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-pizarra mb-1.5">
                                            {t('form.phone')} *
                                        </label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            required
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all text-sm"
                                            placeholder={t('placeholders.phone')}
                                        />
                                    </div>
                                </div>

                                {/* Cómo te gustaría ser contactado */}
                                <div>
                                    <label className="block text-sm font-medium text-pizarra mb-1.5">
                                        {t('form.contactMethod')} *
                                    </label>
                                    <select
                                        name="contacto"
                                        value={formData.contacto}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all bg-white text-sm"
                                    >
                                        <option value="whatsapp">{t('contactOptions.whatsapp')}</option>
                                        <option value="telefono">{t('contactOptions.phone')}</option>
                                        <option value="correo">{t('contactOptions.email')}</option>
                                    </select>
                                </div>

                                {/* Mes del viaje y Número de pasajeros */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-pizarra mb-1.5">
                                            {t('form.travelMonth')} *
                                        </label>
                                        <input
                                            type="month"
                                            name="mesViaje"
                                            required
                                            value={formData.mesViaje}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-pizarra mb-1.5">
                                            {t('form.passengers')} *
                                        </label>
                                        <select
                                            name="pasajeros"
                                            value={formData.pasajeros}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all bg-white text-sm"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(n => (
                                                <option key={n} value={n}>{n}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Tipo de viaje */}
                                <div>
                                    <label className="block text-sm font-medium text-pizarra mb-1.5">
                                        {t('form.tripType')} *
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, tipoViaje: 'guiado' }))}
                                            className={`p-3 rounded-xl border-2 transition-all text-center ${formData.tipoViaje === 'guiado'
                                                ? 'border-pizarra bg-nieve text-pizarra'
                                                : 'border-pizarra hover:border-bruma text-pizarra'
                                                }`}
                                        >
                                            <span className="font-semibold block text-sm">{t('tripTypes.guided')}</span>
                                            <span className="text-xs opacity-70">{t('tripTypes.guidedDesc')}</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, tipoViaje: 'autoguiado' }))}
                                            className={`p-3 rounded-xl border-2 transition-all text-center ${formData.tipoViaje === 'autoguiado'
                                                ? 'border-pizarra bg-nieve text-pizarra'
                                                : 'border-pizarra hover:border-bruma text-pizarra'
                                                }`}
                                        >
                                            <span className="font-semibold block text-sm">{t('tripTypes.selfGuided')}</span>
                                            <span className="text-xs opacity-70">{t('tripTypes.selfGuidedDesc')}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Servicios adicionales */}
                                <div>
                                    <label className="block text-sm font-medium text-pizarra mb-1.5">
                                        {t('form.additionalServices')}
                                    </label>
                                    <textarea
                                        name="serviciosAdicionales"
                                        value={formData.serviciosAdicionales}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-4 py-2.5 border border-niebla rounded-xl focus:ring-2 focus:ring-pizarra focus:border-pizarra transition-all resize-none text-sm"
                                        placeholder={t('form.additionalServicesPlaceholder')}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-pizarra hover:bg-pizarra/90 disabled:bg-bruma text-white py-3.5 rounded-xl font-bold text-base transition-all transform hover:scale-[1.02] shadow-lg shadow-pizarra/30 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            {t('buttons.sending')}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {t('buttons.submit')}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PackageQuoteModal;
