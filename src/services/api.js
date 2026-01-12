/**
 * Servicios API para comunicación con Strapi
 * 
 * Proporciona funciones para obtener:
 * - Experiencias
 * - Paquetes
 * - Hero Section
 * - About Page
 * - Site Settings
 * - Guías
 * - Testimonios
 */
import strapiClient, { getStrapiMediaUrl } from './strapiClient';

// Locale de fallback cuando no hay contenido en el idioma solicitado
const FALLBACK_LOCALE = 'es';

/**
 * Wrapper para peticiones con fallback a español
 * Si el locale solicitado no devuelve resultados, intenta con español
 */
const fetchWithFallback = async (endpoint, params, transformFn, isSingleType = false) => {
  const response = await strapiClient.get(endpoint, { params });
  const data = response.data.data;
  
  // Para single types, verificar si hay datos
  if (isSingleType) {
    if (data && Object.keys(data).length > 0) {
      return transformFn ? transformFn(data) : data;
    }
    // Fallback a español si no hay datos y no estamos ya en español
    if (params.locale && params.locale !== FALLBACK_LOCALE) {
      const fallbackParams = { ...params, locale: FALLBACK_LOCALE };
      const fallbackResponse = await strapiClient.get(endpoint, { params: fallbackParams });
      return transformFn ? transformFn(fallbackResponse.data.data) : fallbackResponse.data.data;
    }
    return transformFn ? transformFn(data) : data;
  }
  
  // Para collection types, verificar si hay resultados
  if (Array.isArray(data) && data.length > 0) {
    return transformFn ? transformFn(data) : data;
  }
  
  // Fallback a español si no hay resultados y no estamos ya en español
  if (params.locale && params.locale !== FALLBACK_LOCALE) {
    const fallbackParams = { ...params, locale: FALLBACK_LOCALE };
    const fallbackResponse = await strapiClient.get(endpoint, { params: fallbackParams });
    return transformFn ? transformFn(fallbackResponse.data.data) : fallbackResponse.data.data;
  }
  
  return transformFn ? transformFn(data) : data;
};

// ============================================
// EXPERIENCIAS
// ============================================

/**
 * Obtiene todas las experiencias
 * @param {string} locale - Idioma (es/en)
 * @param {string} season - Filtro por temporada (summer/winter)
 * @returns {Promise<Array>} Lista de experiencias
 */
export const getExperiences = async (locale = 'es', season = null) => {
  const params = {
    locale,
    populate: '*',
    'pagination[pageSize]': 100,
  };
  
  if (season) {
    params['filters[season][$eq]'] = season;
  }
  
  return fetchWithFallback('/experiences', params, transformExperiences);
};

/**
 * Obtiene una experiencia por slug
 * @param {string} slug - Slug de la experiencia
 * @param {string} locale - Idioma
 * @returns {Promise<Object>} Experiencia
 */
export const getExperienceBySlug = async (slug, locale = 'es') => {
  const params = {
    locale,
    'filters[slug][$eq]': slug,
    populate: '*',
  };
  
  const experiences = await fetchWithFallback('/experiences', params, transformExperiences);
  return experiences[0] || null;
};

// ============================================
// PAQUETES
// ============================================

/**
 * Obtiene todos los paquetes
 * @param {string} locale - Idioma
 * @param {object} filters - Filtros adicionales
 * @returns {Promise<Array>} Lista de paquetes
 */
export const getPackages = async (locale = 'es', filters = {}) => {
  const params = {
    locale,
    populate: {
      thumbnail: true,
      heroImage: true,
      gallery: {
        populate: ['image']
      },
      itinerary: {
        populate: ['image']
      },
      includes: true,
      startDates: true,
      experience: true,
      locationInfo: true,
    },
    'pagination[pageSize]': 100,
  };
  
  // Aplicar filtros
  if (filters.experienceSlug) {
    params['filters[experience][slug][$eq]'] = filters.experienceSlug;
  }
  if (filters.season) {
    params['filters[season][$eq]'] = filters.season;
  }
  
  return fetchWithFallback('/packages', params, transformPackages);
};

/**
 * Obtiene un paquete por slug
 * @param {string} slug - Slug del paquete
 * @param {string} locale - Idioma
 * @returns {Promise<Object>} Paquete completo
 */
export const getPackageBySlug = async (slug, locale = 'es') => {
  const params = {
    locale,
    'filters[slug][$eq]': slug,
    populate: {
      thumbnail: true,
      heroImage: true,
      gallery: {
        populate: ['image']
      },
      itinerary: {
        populate: ['image']
      },
      includes: true,
      startDates: true,
      experience: true,
      locationInfo: true,
    },
  };
  
  const packages = await fetchWithFallback('/packages', params, transformPackages);
  return packages[0] || null;
};

/**
 * Obtiene paquetes por experiencia
 * @param {string} experienceSlug - Slug de la experiencia
 * @param {string} locale - Idioma
 * @returns {Promise<Array>} Lista de paquetes
 */
export const getPackagesByExperience = async (experienceSlug, locale = 'es') => {
  return getPackages(locale, { experienceSlug });
};

// ============================================
// HERO SECTION (Single Type)
// ============================================

/**
 * Obtiene el contenido del Hero Section
 * @param {string} locale - Idioma
 * @returns {Promise<Object>} Datos del hero
 */
export const getHeroSection = async (locale = 'es') => {
  const params = {
    locale,
    populate: '*',
  };
  
  return fetchWithFallback('/hero-section', params, transformHeroSection, true);
};

// ============================================
// ABOUT PAGE (Single Type)
// ============================================

/**
 * Obtiene el contenido de la página About
 * @param {string} locale - Idioma
 * @returns {Promise<Object>} Datos de about
 */
export const getAboutPage = async (locale = 'es') => {
  const params = {
    locale,
    populate: {
      mainPhoto: true,
      team: {
        populate: ['photo']
      },
      values: true,
    },
  };
  
  return fetchWithFallback('/about-page', params, transformAboutPage, true);
};

// ============================================
// SITE SETTINGS (Single Type)
// ============================================

/**
 * Obtiene la configuración del sitio
 * @param {string} locale - Idioma
 * @returns {Promise<Object>} Configuración
 */
export const getSiteSettings = async (locale = 'es') => {
  const params = {
    locale,
    populate: '*',
  };
  
  return fetchWithFallback('/site-setting', params, transformSiteSettings, true);
};

// ============================================
// GUÍAS
// ============================================

/**
 * Obtiene todos los guías
 * @param {string} locale - Idioma
 * @param {boolean} featured - Solo destacados
 * @returns {Promise<Array>} Lista de guías
 */
export const getGuides = async (locale = 'es', featured = false) => {
  const params = {
    locale,
    populate: '*',
  };
  
  if (featured) {
    params['filters[featured][$eq]'] = true;
  }
  
  return fetchWithFallback('/guides', params, transformGuides);
};

// ============================================
// TESTIMONIOS
// ============================================

/**
 * Obtiene testimonios
 * @param {string} locale - Idioma
 * @param {boolean} featured - Solo destacados
 * @returns {Promise<Array>} Lista de testimonios
 */
export const getTestimonials = async (locale = 'es', featured = false) => {
  const params = {
    locale,
    populate: '*',
  };
  
  if (featured) {
    params['filters[featured][$eq]'] = true;
  }
  
  return fetchWithFallback('/testimonials', params, transformTestimonials);
};

// ============================================
// TRANSFORMADORES DE DATOS
// Convierte formato Strapi al formato del frontend
// ============================================

/**
 * Transforma experiencias de Strapi al formato del frontend
 */
const transformExperiences = (data) => {
  if (!data) return [];
  const items = Array.isArray(data) ? data : [data];
  
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    season: item.season === 'summer' ? 'verano' : 'invierno',
    tags: item.tags?.map(t => t.name) || [],
    image: getStrapiMediaUrl(item.thumbnail?.url),
    heroImage: getStrapiMediaUrl(item.heroImage?.url),
    shortDescription: item.shortDescription,
    longDescription: item.longDescription,
    highlights: item.highlights?.map(h => h.text) || [],
    whatToExpect: item.whatToExpect,
    difficulty: item.difficulty,
    bestFor: item.bestFor,
  }));
};

/**
 * Transforma paquetes de Strapi al formato del frontend
 */
const transformPackages = (data) => {
  if (!data) return [];
  const items = Array.isArray(data) ? data : [data];
  
  return items.map((item) => ({
    id: item.id,
    experienceSlug: item.experience?.slug || '',
    title: item.title,
    slug: item.slug,
    location: item.location,
    // Precios: siempre en MXN (moneda base), se convierten en el frontend
    price: `MXN ${item.priceAmount?.toLocaleString()}`,
    priceAmount: item.priceAmount,
    originalPrice: item.originalPriceAmount 
      ? `MXN ${item.originalPriceAmount?.toLocaleString()}`
      : null,
    originalPriceAmount: item.originalPriceAmount,
    duration: item.duration,
    rating: item.rating,
    image: getStrapiMediaUrl(item.thumbnail?.url),
    heroImage: getStrapiMediaUrl(item.heroImage?.url),
    // Gallery ahora es un componente con imagen y caption
    gallery: item.gallery?.map(g => ({
      url: getStrapiMediaUrl(g.image?.url),
      caption: g.caption || '',
      alt: g.caption || item.title,
    })) || [],
    tags: item.tags?.map(t => t.name) || [],
    hasDiscount: item.hasDiscount,
    season: item.season === 'summer' ? 'verano' : 'invierno',
    description: item.description,
    itinerary: item.itinerary?.map(day => ({
      day: day.day,
      title: day.title,
      description: day.description,
      image: getStrapiMediaUrl(day.image?.url),
    })) || [],
    includes: item.includes?.map(inc => ({
      label: inc.label,
      detail: inc.detail,
    })) || [],
    notIncludes: item.notIncludes?.map(ni => ni.text) || [],
    difficulty: item.difficulty,
    groupSize: item.groupSize,
    guideType: item.guideType,
    availableDates: item.availableDates,
    startDates: item.startDates?.map(sd => sd.displayText || sd.date) || [],
    // Información de ubicación
    locationInfo: item.locationInfo ? {
      howToGetThere: item.locationInfo.howToGetThere,
      latitude: item.locationInfo.latitude,
      longitude: item.locationInfo.longitude,
      googleMapsUrl: item.locationInfo.googleMapsUrl,
      nearestAirport: item.locationInfo.nearestAirport,
      nearestCity: item.locationInfo.nearestCity,
    } : null,
  }));
};

/**
 * Transforma Hero Section
 */
const transformHeroSection = (data) => {
  if (!data) return null;
  
  return {
    title: data.title,
    titleHighlight: data.titleHighlight,
    badge: data.badge,
    subtitle: data.subtitle,
    videoDesktop: getStrapiMediaUrl(data.videoDesktop?.url),
    videoMobile: getStrapiMediaUrl(data.videoMobile?.url),
    fallbackImage: getStrapiMediaUrl(data.fallbackImage?.url),
  };
};

/**
 * Transforma About Page
 */
const transformAboutPage = (data) => {
  if (!data) return null;
  
  return {
    pageTitle: data.pageTitle,
    mainPhoto: getStrapiMediaUrl(data.mainPhoto?.url),
    photoAlt: data.photoAlt,
    origin: {
      title: data.origin?.title,
      text: data.origin?.content,
    },
    essence: {
      title: data.essence?.title,
      text: data.essence?.content,
    },
    vision: {
      title: data.vision?.title,
      text: data.vision?.content,
    },
    mission: {
      title: data.mission?.title,
      text: data.mission?.content,
    },
  };
};

/**
 * Transforma Site Settings
 */
const transformSiteSettings = (data) => {
  if (!data) return null;
  
  return {
    siteName: data.siteName,
    logo: getStrapiMediaUrl(data.logo?.url),
    logoDark: getStrapiMediaUrl(data.logoDark?.url),
    favicon: getStrapiMediaUrl(data.favicon?.url),
    location: data.location,
    phone: data.phone,
    email: data.email,
    whatsappNumber: data.whatsappNumber,
    instagramUrl: data.instagramUrl,
    facebookUrl: data.facebookUrl,
    tiktokUrl: data.tiktokUrl,
    footerDescription: data.footerDescription,
    copyrightText: data.copyrightText,
    defaultCurrency: data.defaultCurrency,
    legalPages: data.legalPages?.map(page => ({
      title: page.title,
      slug: page.slug,
      content: page.content,
    })) || [],
  };
};

/**
 * Transforma Guías
 */
const transformGuides = (data) => {
  if (!data) return [];
  const items = Array.isArray(data) ? data : [data];
  
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    photo: getStrapiMediaUrl(item.photo?.url),
    certifications: item.certifications?.map(c => c.text) || [],
    yearsExperience: item.yearsExperience,
    specialty: item.specialty,
    bio: item.bio,
    languages: item.languages?.map(l => l.text) || [],
    featured: item.featured,
  }));
};

/**
 * Transforma Testimonios
 */
const transformTestimonials = (data) => {
  if (!data) return [];
  const items = Array.isArray(data) ? data : [data];
  
  return items.map((item) => ({
    id: item.id,
    clientName: item.clientName,
    country: item.country,
    rating: item.rating,
    comment: item.comment,
    photo: getStrapiMediaUrl(item.photo?.url),
    tripDate: item.tripDate,
    packageSlug: item.package?.slug,
    featured: item.featured,
  }));
};

export default {
  getExperiences,
  getExperienceBySlug,
  getPackages,
  getPackageBySlug,
  getPackagesByExperience,
  getHeroSection,
  getAboutPage,
  getSiteSettings,
  getGuides,
  getTestimonials,
};
