export default function SchemaMarkup() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Mevoq',
        url: 'https://mevoq.life',
        logo: 'https://mevoq.life/favicon.ico', // Update with actual logo URL
        description: 'Global pharmaceutical regulatory consulting firm specializing in FDA, EMA, and global agency submissions.',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'US', // Update with actual address if available
        },
        sameAs: [
            'https://www.linkedin.com/company/mevoq', // Example placeholder
        ],
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Mevoq',
        url: 'https://mevoq.life',
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
}
