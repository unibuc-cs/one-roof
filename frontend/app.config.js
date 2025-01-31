export default {
  "expo": {
    "name": "frontend",
    "slug": "frontend",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.anonymous.frontend"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.anonymous.frontend",
      "googleServicesFile": process.env.GOOGLE_SERVICES_FILE ?? "./google-services.json"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-font",
      "expo-build-properties"
    ],
    "owner": "one-roof",
    "extra": {
      "eas": {
        "plugins": [
          [
            "expo-build-properties",
            {
              "android": {
                "compileSdkVersion": 34,
                "targetSdkVersion": 34,
                "buildToolsVersion": "34.0.0"
              },
              "ios": {
                "deploymentTarget": "13.4"
              }
            }
          ]
        ]
      }
    }
  }
}
