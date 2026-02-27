import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, getDb } from '../utils/firebaseLazy';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInstance, setAuthInstance] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // Lazy load Firebase auth when provider mounts (only for admin routes)
  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      try {
        const auth = await getAuth();
        if (mounted) {
          setAuthInstance(auth);

          // Set up auth state listener
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!mounted) return;

            if (!user) {
              setCurrentUser(null);
              setUserProfile(null);
              setLoading(false);
              return;
            }

            setCurrentUser(user);
            setLoading(true);

            const loadUserProfile = async () => {
              try {
                const db = await getDb();
                const userRef = doc(db, 'users', user.uid);
                const snapshot = await getDoc(userRef);

                if (!mounted) return;

                if (snapshot.exists()) {
                  setUserProfile({
                    id: snapshot.id,
                    ...snapshot.data()
                  });
                } else {
                  setUserProfile(null);
                }
              } catch (error) {
                console.error('Kullanıcı profili alınırken hata:', error);
                if (mounted) {
                  setUserProfile(null);
                }
              } finally {
                if (mounted) {
                  setLoading(false);
                }
              }
            };

            loadUserProfile();
          });

          return unsubscribe;
        }
      } catch (error) {
        console.error('Firebase auth initialization error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const unsubscribePromise = initAuth();

    return () => {
      mounted = false;
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) unsubscribe();
      });
    };
  }, []);

  const login = async (email, password) => {
    try {
      if (!authInstance) {
        const auth = await getAuth();
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
      }
      const result = await signInWithEmailAndPassword(authInstance, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const register = async ({ firstName, lastName, phone, email, password }) => {
    try {
      const auth = authInstance || await getAuth();
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const user = credential.user;

      const db = await getDb();
      const userRef = doc(db, 'users', user.uid);
      const profileData = {
        firstName,
        lastName,
        phone,
        email: user.email,
        role: 'user',
        createdAt: serverTimestamp()
      };

      await setDoc(userRef, profileData, { merge: true });

      setUserProfile((prev) => ({
        id: user.uid,
        ...(prev || {}),
        ...profileData
      }));

      return credential;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const auth = authInstance || await getAuth();
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (!currentUser) throw new Error('Kullanıcı giriş yapmamış');
    const auth = authInstance || await getAuth();
    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
    await reauthenticateWithCredential(currentUser, credential);
    await updatePassword(currentUser, newPassword);
  };

  const isAdmin = userProfile?.role === 'admin';

  const value = {
    currentUser,
    userProfile,
    isAdmin,
    login,
    register,
    logout,
    changePassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
