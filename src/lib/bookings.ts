import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    orderBy,
    serverTimestamp,
    doc,
    updateDoc,
    getDocs
} from 'firebase/firestore';
import { db } from './firebase';

export interface Booking {
    id?: string;
    userId: string;
    userName: string;
    userEmail: string;
    carId: string;
    carName: string;
    carBrand: string;
    carImage: string;
    pickupDate: string;
    returnDate: string;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    addons: {
        childSeat: boolean;
        additionalDriver: boolean;
        unlimitedKM: boolean;
    };
    createdAt?: any;
}

export const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    try {
        const docRef = await addDoc(collection(db, 'bookings'), {
            ...booking,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const subscribeToUserBookings = (userId: string, callback: (bookings: Booking[]) => void) => {
    const q = query(
        collection(db, 'bookings'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const bookings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Booking[];
        callback(bookings);
    });
};

export const cancelBooking = async (bookingId: string) => {
    const docRef = doc(db, 'bookings', bookingId);
    await updateDoc(docRef, { status: 'cancelled' });
};
