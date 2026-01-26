// Lazy Firebase Loader
// Firebase'i sadece gerektiğinde yükler (scroll veya form açıldığında)

let firebaseModule = null;
let isLoading = false;
let loadPromise = null;

// Firebase modülünü dinamik olarak yükle
export const loadFirebase = async () => {
  // Eğer zaten yüklenmişse direkt döndür
  if (firebaseModule) {
    return firebaseModule;
  }

  // Eğer şu anda yükleniyorsa, mevcut promise'i döndür
  if (isLoading && loadPromise) {
    return loadPromise;
  }

  // Yükleme başlat
  isLoading = true;
  loadPromise = import('../firebase').then((module) => {
    firebaseModule = module;
    isLoading = false;
    return module;
  });

  return loadPromise;
};

// Firebase servislerini lazy getter'lar olarak export et
export const getAuth = async () => {
  const { auth } = await loadFirebase();
  return auth;
};

export const getDb = async () => {
  const { db } = await loadFirebase();
  return db;
};

export const getStorage = async () => {
  const { storage } = await loadFirebase();
  return storage;
};

// Firebase'in yüklenip yüklenmediğini kontrol et
export const isFirebaseLoaded = () => {
  return firebaseModule !== null;
};
