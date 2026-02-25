import { collection, doc, addDoc, updateDoc, getDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { getDb } from '../utils/firebaseLazy';

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled',
  FAILED: 'failed'
};

export const createOrder = async ({ userId, items, total }) => {
  const db = await getDb();
  const ordersRef = collection(db, 'orders');
  const orderData = {
    userId,
    items,
    total,
    status: ORDER_STATUS.PENDING,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  const docRef = await addDoc(ordersRef, orderData);
  return { id: docRef.id, ...orderData };
};

export const getOrderById = async (orderId) => {
  const db = await getDb();
  const orderRef = doc(db, 'orders', orderId);
  const snapshot = await getDoc(orderRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const getOrdersByUserId = async (userId) => {
  const db = await getDb();
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  list.sort((a, b) => {
    const ta = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds ?? 0;
    const tb = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds ?? 0;
    return tb - ta;
  });
  return list;
};

/** Admin paneli için tüm siparişleri getirir. Firestore admins koleksiyonunda uid olan kullanıcılar erişebilir. */
export const getAllOrdersForAdmin = async () => {
  const db = await getDb();
  const ordersRef = collection(db, 'orders');
  const snapshot = await getDocs(ordersRef);
  const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  list.sort((a, b) => {
    const ta = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds ?? 0;
    const tb = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds ?? 0;
    return tb - ta;
  });
  return list;
};
