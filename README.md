# VIT Verse Firebase Functions

This project contains Firebase Cloud Functions that send FCM (Firebase Cloud Messaging) notifications to users subscribed to specific topics in the VIT Verse app.

## Functions

- **sendCabShareNotification**: Sends notifications for cab sharing updates
- **sendLostFoundNotification**: Sends notifications for lost and found items

## Setup

1. Install dependencies:
   ```bash
   cd functions
   npm install
   ```

2. Build the functions:
   ```bash
   npm run build
   ```

## Deployment

Deploy to Firebase:
```bash
firebase deploy --only functions
```