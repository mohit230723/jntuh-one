// Mock data is only for local UI work without a backend:
//   frontend/.env.local  ->  VITE_USE_MOCKS=true   (then `npm run dev`)
// Production builds (Docker, Kubernetes) never use mocks, so a broken
// backend shows up as a real error instead of fake data.
export const USE_MOCKS = import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === 'true';

// Use inside a service's catch block: returns the mock when mocks are on,
// otherwise re-throws the real error so the page can show it.
export function mockOr(err, fallback) {
  if (!USE_MOCKS) throw err;
  console.warn('[mock] API failed, using mock data:', err.message);
  return typeof fallback === 'function' ? fallback() : fallback;
}

// Turns an axios error into a message we can show to the user.
export function errorMessage(err, fallback = 'Something went wrong. Please try again.') {
  if (!err?.response) return 'Cannot reach the server. Please check your connection and try again.';
  return err.response.data?.message || err.response.data?.error || fallback;
}
