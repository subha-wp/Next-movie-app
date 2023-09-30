import { ExpoConfig, ConfigContext } from "@expo/config";
import {
  withAppBuildGradle,
  withProjectBuildGradle,
  withDangerousMod,
  withAndroidManifest,
  AndroidConfig,
} from "@expo/config-plugins";
const { addMetaDataItemToMainApplication, getMainApplicationOrThrow } =
  AndroidConfig.Manifest;

import path from "path";
import fs from "fs";

// You can find it everywhere, even in the documentation if you're logged in to your account!
// https://dash.applovin.com/documentation/mediation/react-native/getting-started/integration
const appLovinApiKey =
  "aC7SwvMv0Nfu_2ITaGyzEcbTKw8a1aNplcIrKdvxWb4plEB5p3BBTBF3SxfZConUOV69w_kuiaMhcKanDgKN2w";

// These are your AdMob app IDs (https://support.google.com/admob/answer/7356431)
const GADApplicationIdentifier_iOS = "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX";
const GADApplicationIdentifier_Android =
  "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX";

export default ({ config }: ConfigContext): ExpoConfig => {
  let output: ExpoConfig = {
    ...config,
    name: "App",
    slug: "app",
    ios: {
      ...config.ios,
      infoPlist: {
        ...config.ios?.infoPlist,

        // This is the string for the message that asks users about tracking permissions. If you need to localize it, read here: https://docs.expo.dev/distribution/app-stores/#localizing-your-ios-app
        NSUserTrackingUsageDescription:
          "This only uses device info for more interesting and relevant ads.", // "This identifier will be used to deliver personalized ads to you.",

        // MAX configuration: https://dash.applovin.com/documentation/mediation/react-native/getting-started/integration#ios-15-global-skadnetwork-reporting
        NSAdvertisingAttributionReportEndpoint: "https://postbacks-app.com",

        // Google AdMob and Google Ad Manager integration: https://dash.applovin.com/documentation/mediation/react-native/mediation-adapters/ios?network=ADMOB_NETWORK
        GADApplicationIdentifier: GADApplicationIdentifier_iOS,
        GADIsAdManagerApp: true,
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },

        // Let's implement Apple's SKAdNetwork.
        // https://developer.apple.com/documentation/storekit/skadnetwork/configuring_a_source_app
        // https://dash.applovin.com/documentation/mediation/react-native/getting-started/skadnetwork-info#skadnetwork
        // See at the and of this file
        SKAdNetworkItems: skadnetwork_ids.map((v) => ({
          [v.key]: v.string,
        })),
      },
    },
  };

  output = withProjectBuildGradle(output, (c) => {
    // https://dash.applovin.com/documentation/mediation/react-native/getting-started/integration#android-instructions

    c.modResults.contents += `
buildscript {
    repositories {
        maven { url 'https://artifacts.applovin.com/android' }
    }
    dependencies {
        classpath "com.applovin.quality:AppLovinQualityServiceGradlePlugin:3.+"
    }
}
`;
    return c;
  });

  output = withAppBuildGradle(output, (c) => {
    c.modResults.contents += `
apply plugin: 'applovin-quality-service'
applovin {
    apiKey "${appLovinApiKey}"
}
`;

    //////////////////////
    // MEDIATIONS:
    // https://dash.applovin.com/documentation/mediation/react-native/mediation-adapters/android?network=GOOGLE_AD_MANAGER_NETWORK
    // https://dash.applovin.com/documentation/mediation/react-native/mediation-adapters/android?network=ADMOB_NETWORK
    // https://dash.applovin.com/documentation/mediation/react-native/mediation-adapters/android?network=FACEBOOK_MEDIATE

    // With this regular expression we put these lines at the end of dependencies {}, skipping nested parenthesis
    c.modResults.contents = c.modResults.contents.replace(
      /(dependencies {[\w\W]+?)(?<=\n)}/,
      `$1
    implementation 'com.applovin:applovin-sdk:+'
    implementation 'com.applovin.mediation:google-ad-manager-adapter:+'
    implementation 'com.applovin.mediation:google-adapter:+'
    implementation 'com.applovin.mediation:facebook-adapter:+'
}`
    );

    return c;
  });

  output = withAndroidManifest(output, (c) => {
    const androidManifest = c.modResults;
    const mainApplication = getMainApplicationOrThrow(androidManifest);

    // AdMob: https://dash.applovin.com/documentation/mediation/react-native/mediation-adapters/android?network=ADMOB_NETWORK#add-your-google-admob-app-id
    addMetaDataItemToMainApplication(
      mainApplication,
      "com.google.android.gms.ads.APPLICATION_ID",
      GADApplicationIdentifier_Android
    );

    // Ad Manager: https://dash.applovin.com/documentation/mediation/react-native/mediation-adapters/android?network=GOOGLE_AD_MANAGER_NETWORK#enable-google-ad-manager
    addMetaDataItemToMainApplication(
      mainApplication,
      "com.google.android.gms.ads.AD_MANAGER_APP",
      "true"
    );

    // Meta: https://dash.applovin.com/documentation/mediation/react-native/mediation-adapters/android?network=FACEBOOK_MEDIATE#network-security-configuration-file
    const applicationAttributes =
      androidManifest.manifest.application![0]!["$"];
    applicationAttributes["android:networkSecurityConfig"] =
      "@xml/network_security_config";
    c.modResults = androidManifest;

    const resXmlDirPath = path.join(
      c.modRequest.platformProjectRoot,
      "app/src/main/res/xml"
    );

    fs.mkdirSync(resXmlDirPath);

    // We must add this file. I copied it from the documentation and created a new file in my project. It will be copied in the right place at every build.
    const networkSecurityConfigFileName = "network_security_config.xml";
    fs.copyFileSync(
      path.join(
        c.modRequest.projectRoot,
        "src/__build/android/", // this is the path where I keep it
        networkSecurityConfigFileName
      ),
      path.join(resXmlDirPath, networkSecurityConfigFileName) // the destination path
    );

    return c;
  });

  ////////////////////////////////////////////////////////////////////////

  // https://dash.applovin.com/documentation/mediation/react-native/mediation-adapters/ios?network=GOOGLE_AD_MANAGER_NETWORK#cocoapods
  // https://dash.applovin.com/documentation/mediation/react-native/mediation-adapters/ios?network=ADMOB_NETWORK#cocoapods
  // https://dash.applovin.com/documentation/mediation/react-native/mediation-adapters/ios?network=FACEBOOK_MEDIATE#cocoapods
  output = withDangerousMod(output, [
    "ios",
    async (config) => {
      const filePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      );

      let contents = fs.readFileSync(filePath, "utf-8");

      contents = contents.replace(
        /end[\n ]*?$/g,
        `
  pod 'AppLovinSDK'
  pod 'AppLovinMediationGoogleAdManagerAdapter'
  pod 'AppLovinMediationGoogleAdapter'
  pod 'AppLovinMediationFacebookAdapter'
end
  `
      );

      fs.writeFileSync(filePath, contents);

      return config;
    },
  ]);

  return output;
};

// SKAdNetwork: https://dash.applovin.com/documentation/mediation/react-native/getting-started/skadnetwork-info
// In this page you can get the set of networks you need, in XML format. Just make sure that all the platforms that you use are checked.
// I found it easy to batch convert them in JSON, using some online tool.
// For example: https://www.utilities-online.info/xmltojson
// (you need to wrap everything in an outer tag like "<ALL>...</ALL>" or you will get an error, then copy the "dict" array)

const skadnetwork_ids = [
  {
    key: "SKAdNetworkIdentifier",
    string: "2fnua5tdw4.skadnetwork",
  },
  {
    key: "SKAdNetworkIdentifier",
    string: "2u9pt9hc89.skadnetwork",
  },
  // .........
  // It's a very long list, I stripped it out
];
