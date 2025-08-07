// Service Worker স্ক্রিপ্টটি ইম্পোর্ট করুন
importScripts("https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js");

// Firebase কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyCvars41WY81WmVy1Tueo_rrSO90aIv_Gw",
    authDomain: "try-382fa.firebaseapp.com",
    projectId: "try-382fa",
    storageBucket: "try-382fa.appspot.com",
    messagingSenderId: "952752280975",
    appId: "1:952752280975:web:9025fc4a4efe34f78be7fa",
    measurementId: "G-73PLMXERXX"
};

// Firebase অ্যাপ ইনিশিয়ালাইজ করুন
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ব্যাকগ্রাউন্ডে নোটিফিকেশন হ্যান্ডেল করার জন্য
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background message received.', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.png', // আপনার অ্যাপের আইকন
        data: payload.data // অতিরিক্ত ডেটা যদি থাকে
    };
    
    return self.registration.showNotification(notificationTitle, notificationOptions);
});