const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// যখন নতুন নোটিশ যোগ করা হবে, তখন এই ফাংশনটি চালু হবে
exports.sendNoticeNotification = functions.firestore
    .document('messes/{messId}/notices/{noticeId}')
    .onCreate(async (snap, context) => {
        const newNotice = snap.data();
        const messId = context.params.messId;

        // মেসের সব সদস্যদের FCM টোকেন পেতে Firestore-এ query করুন
        const usersSnapshot = await admin.firestore().collection('users')
            .where('messId', '==', messId)
            .get();

        const tokens = usersSnapshot.docs
            .map(doc => doc.data().fcmToken)
            .filter(token => token !== null && token !== undefined);

        if (tokens.length > 0) {
            const payload = {
                notification: {
                    title: `নতুন নোটিশ: ${newNotice.title}`,
                    body: newNotice.content,
                    icon: '/favicon.png'
                }
            };

            return admin.messaging().sendToDevice(tokens, payload);
        }
        return null;
    });

// যখন কোনো সদস্য মিল পরিবর্তনের মেসেজ দিবে, তখন এই ফাংশনটি চালু হবে
exports.sendMealRequestNotification = functions.firestore
    .document('messes/{messId}/mealRequests/{requestId}')
    .onCreate(async (snap, context) => {
        const newRequest = snap.data();
        const messId = context.params.messId;
        const messDoc = await admin.firestore().doc(`messes/${messId}`).get();
        const managerId = messDoc.data().managerId;

        const managerDoc = await admin.firestore().doc(`users/${managerId}`).get();
        const managerToken = managerDoc.data().fcmToken;

        if (managerToken) {
            const payload = {
                notification: {
                    title: `নতুন মিল মেসেজ: ${newRequest.userName}`,
                    body: newRequest.message,
                    icon: '/favicon.png'
                }
            };
            return admin.messaging().sendToDevice(managerToken, payload);
        }
        return null;
    });