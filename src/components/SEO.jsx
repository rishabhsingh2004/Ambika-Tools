import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteName = 'Ambika Tools';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || 'High-quality industrial weighing scales, cash counting machines, gold melting machines, and security lockers by Ambika Tools.';
  const metaKeywords = keywords || 'weighing scales, cash counting machine, gold melting machine, safe lockers, Ambika Tools, industrial tools';
  const metaImage = image || '/og-image.jpg'; // We can assume a default social image here
  const metaUrl = url || 'https://ambikatools.in'; // Add appropriate domain

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={metaDescription} />
      <meta name='keywords' content={metaKeywords} />

      {/* Open Graph tags for Facebook, LinkedIn, etc. */}
      <meta property='og:type' content='website' />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:image' content={metaImage} />
      <meta property='og:url' content={metaUrl} />
      <meta property='og:site_name' content={siteName} />

      {/* Twitter Card tags */}
      <meta name='twitter:creator' content='@AmbikaTools' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:image' content={metaImage} />
    </Helmet>
  );
};

export default SEO;
