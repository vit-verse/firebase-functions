import {onCall} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {getMessaging} from "firebase-admin/messaging";

initializeApp();

export const sendLostFoundNotification = onCall(
  {
    region: "us-central1",
    enforceAppCheck: true,
  },
  async (request) => {
    const {
      title,
      message,
      imageUrl,
      itemName,
      place,
      type,
    } = request.data ?? {};

    if (!title || !message) {
      throw new Error("Invalid payload");
    }

    if (title.length > 60 || message.length > 120) {
      throw new Error("Payload too large");
    }

    await getMessaging().send({
      topic: "lost_found_update",
      notification: {
        title,
        body: message,
        imageUrl,
      },
      data: {
        type: type ?? "",
        itemName: itemName ?? "",
        place: place ?? "",
      },
      android: {
        priority: "high",
      },
    });

    return {success: true};
  }
);
