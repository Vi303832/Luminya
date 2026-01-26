import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { getAuth } from '../utils/firebaseLazy';

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
            if (mounted) {
              setCurrentUser(user);
              setLoading(false);
            }
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

  const logout = async () => {
    try {
      const auth = authInstance || await getAuth();
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
