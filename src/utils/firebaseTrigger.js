// Firebase yükleme tetikleyicileri
// Kullanıcı scroll yaptığında veya form açıldığında Firebase'i yükler

import { loadFirebase } from './firebaseLazy';

let hasTriggered = false;
let scrollListenerAdded = false;

// Scroll event listener ekle
export const setupFirebaseScrollTrigger = () => {
  if (scrollListenerAdded || hasTriggered) return;

  scrollListenerAdded = true;

  const handleScroll = () => {
    if (!hasTriggered && window.scrollY > 100) {
      hasTriggered = true;
      // Firebase'i arka planda yükle
      loadFirebase().catch(console.error);
      // Listener'ı kaldır
      window.removeEventListener('scroll', handleScroll, { passive: true });
    }
  };

  // Throttle ile scroll listener ekle
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });
};

// Form açıldığında Firebase'i yükle
export const triggerFirebaseOnFormOpen = () => {
  if (!hasTriggered) {
    hasTriggered = true;
    loadFirebase().catch(console.error);
  }
};

// Manuel tetikleme (ihtiyaç durumunda)
export const triggerFirebaseLoad = () => {
  if (!hasTriggered) {
    hasTriggered = true;
    return loadFirebase();
  }
  return Promise.resolve();
};
