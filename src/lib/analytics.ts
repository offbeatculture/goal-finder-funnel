export function trackEvent(name: string, properties?: Record<string, unknown>) {
  // Replace with your analytics provider (e.g., GA4, Mixpanel, Amplitude)
  console.log(`[Analytics] ${name}`, properties || {});
}
