const Notification = require('../models/Notification');
const smtpConfig = require('../../config/smtpConfig');
const pushNotificationConfig = require('../../config/pushNotificationConfig');
const mailgun = require('mailgun-js')(smtpConfig);
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(pushNotificationConfig),
});

exports.sendPushNotification = async (data) => {
    const message = {
        notification: {
            title: data.title,
            body: data.body,
        },
        token: data.token,
    };
    await admin.messaging().send(message);
    await Notification.create({
        userId: data.userId,
        type: 'push',
        message: data.body,
        status: 'sent',
    });
    return { success: true };
};

exports.updatePreferences = async (data) => {
    // Implement logic to update user preferences
    return { success: true };
};

exports.sendEmailNotification = async (data) => {
    const emailData = {
        from: smtpConfig.sender,
        to: data.email,
        subject: data.subject,
        text: data.body,
    };
    await mailgun.messages().send(emailData);
    await Notification.create({
        userId: data.userId,
        type: 'email',
        message: data.body,
        status: 'sent',
    });
    return { success: true };
};

exports.getNotificationHistory = async (userId) => {
    const notifications = await Notification.findAll({ where: { userId } });
    return notifications;
};
