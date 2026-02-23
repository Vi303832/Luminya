import { collection, doc, addDoc, updateDoc, getDoc, query, where, orderBy, getDocs, serverTimestamp } from 'firebase/firestore';
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
  const q = query(
    ordersRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};
