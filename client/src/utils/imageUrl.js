/**
 * Resolves an image path to a full URL safely without throwing TypeErrors.
 * Supports absolute URLs (Cloudinary, Unsplash, external), data URLs, and relative upload paths.
 */
export const getImageUrl = (path) => {
  if (!path || typeof path !== 'string') return '';

  // Return absolute or local static paths directly
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const apiUrl = import.meta.env.VITE_API_URL || 'https://chakroun-portfolio.onrender.com/api';
  // Strip trailing '/api' or '/api/' safely
  const baseUrl = typeof apiUrl === 'string' ? apiUrl.replace(/\/api\/?$/, '') : '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
};

export default getImageUrl;
