import {onCall} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {getMessaging} from "firebase-admin/messaging";

initializeApp();

export const sendCabShareNotification = onCall(
  {
    region: "us-central1",
    enforceAppCheck: true,
  },
  async (request) => {
    const {
      title,
      fromLocation,
      toLocation,
      travelDate,
      travelTime,
      cabType,
      postedByName,
    } = request.data ?? {};

    if (!title || !fromLocation || !toLocation) {
      throw new Error("Invalid payload");
    }

    const formattedBody =
      `${fromLocation} → ${toLocation}\n` +
      `${cabType ?? ""} | ${travelDate ?? ""} | ${travelTime ?? ""}`;

    await getMessaging().send({
      topic: "cab_share_updates",
      notification: {
        title,
        body: formattedBody,
      },
      data: {
        fromLocation: fromLocation ?? "",
        toLocation: toLocation ?? "",
        travelDate: travelDate ?? "",
        travelTime: travelTime ?? "",
        cabType: cabType ?? "",
        postedByName: postedByName ?? "",
      },
      android: {
        priority: "high",
      },
    });

    return {success: true};
  }
);
