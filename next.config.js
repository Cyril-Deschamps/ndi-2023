/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */


const { i18n } = require('./next-i18next.config.js');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  output: 'standalone',
  reactStrictMode: true,
  i18n,
  env: {
    REACT_APP_API_HOST: process.env.REACT_APP_API_HOST,
    REACT_APP_HOST: process.env.REACT_APP_HOST,
  }
});
