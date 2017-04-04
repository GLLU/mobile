package com.gllu;


import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.modules.i18nmanager.I18nUtil;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.xxsnakerxx.flurryanalytics.FlurryAnalyticsPackage;
import cl.json.RNSharePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.bugsnag.BugsnagReactNative;
import com.oblador.keychain.KeychainPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application
        implements ReactApplication {

    private static CallbackManager mCallbackManager =
            CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }


                @Override
                protected boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    return Arrays.<ReactPackage>asList(
                            new MainReactPackage(),
            new GoogleAnalyticsBridgePackage(),
            new FlurryAnalyticsPackage(),
            new RNSharePackage(),
            new RNFetchBlobPackage(),
            BugsnagReactNative.getPackage(),
            new KeychainPackage(),
                            new ReactNativeConfigPackage(),
                            new LinearGradientPackage(),
                            new ReactVideoPackage(),
                            new ExtraDimensionsPackage(),
                            new PickerPackage(),
                            new ReactMaterialKitPackage(),
                            new VectorIconsPackage(),
                            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
                            new FBSDKPackage(mCallbackManager)
                    );
                }
            };

    @Override
    public void onCreate() {
        super.onCreate();
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
        // FORCE LTR
            I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
            sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);

    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}