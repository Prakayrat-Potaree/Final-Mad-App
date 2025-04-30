import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';  // สำหรับ Realtime Database
import { getAuth } from 'firebase/auth';  // สำหรับ Firebase Authentication


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database
export const database = getDatabase(app);

// Firebase Authentication
export const auth = getAuth(app);  // สำหรับการจัดการผู้ใช้ เช่น การลงทะเบียนและเข้าสู่ระบบ
