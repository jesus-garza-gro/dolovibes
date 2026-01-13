import { useEffect } from 'react';

/**
 * SEO Component - Gestiona meta tags dinámicos para SEO
 * Compatible con React 19 sin dependencias externas
 */
const SEO = ({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType = 'website',
    structuredData,
    noIndex = false
}) => {
    const siteName = 'DoloVibes';
    const defaultDescription = 'Experiencias de trekking y senderismo únicas en las Dolomitas italianas. Viajes guiados y autoguiados con alojamiento en refugios de montaña.';
    const defaultImage = 'https://dolovibes.com/og-image.jpg';
    const baseUrl = 'https://dolovibes.com';

    useEffect(() => {
        // Update document title
        const fullTitle = title ? `${title} | ${siteName}` : siteName;
        document.title = fullTitle;

        // Helper function to update or create meta tags
        const updateMetaTag = (name, content, property = false) => {
            const attribute = property ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${name}"]`);

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Basic Meta Tags
        updateMetaTag('description', description || defaultDescription);
        if (keywords) {
            updateMetaTag('keywords', keywords);
        }

        // Robots
        if (noIndex) {
            updateMetaTag('robots', 'noindex, nofollow');
        } else {
            updateMetaTag('robots', 'index, follow');
        }

        // Open Graph Tags
        updateMetaTag('og:title', fullTitle, true);
        updateMetaTag('og:description', description || defaultDescription, true);
        updateMetaTag('og:type', ogType, true);
        updateMetaTag('og:site_name', siteName, true);
        updateMetaTag('og:image', ogImage || defaultImage, true);
        updateMetaTag('og:locale', 'es_MX', true);

        if (canonicalUrl) {
            updateMetaTag('og:url', `${baseUrl}${canonicalUrl}`, true);
        }

        // Twitter Card Tags
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', fullTitle);
        updateMetaTag('twitter:description', description || defaultDescription);
        updateMetaTag('twitter:image', ogImage || defaultImage);

        // Canonical URL
        let canonicalElement = document.querySelector('link[rel="canonical"]');
        if (canonicalUrl) {
            if (!canonicalElement) {
                canonicalElement = document.createElement('link');
                canonicalElement.setAttribute('rel', 'canonical');
                document.head.appendChild(canonicalElement);
            }
            canonicalElement.setAttribute('href', `${baseUrl}${canonicalUrl}`);
        } else if (canonicalElement) {
            canonicalElement.remove();
        }

        // Structured Data (JSON-LD)
        const existingScript = document.querySelector('script[data-seo="structured-data"]');
        if (existingScript) {
            existingScript.remove();
        }

        if (structuredData) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.setAttribute('data-seo', 'structured-data');
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }

        // Cleanup function
        return () => {
            // Reset to defaults on unmount if needed
        };
    }, [title, description, keywords, canonicalUrl, ogImage, ogType, structuredData, noIndex]);

    return null; // This component doesn't render anything
};

export default SEO;
