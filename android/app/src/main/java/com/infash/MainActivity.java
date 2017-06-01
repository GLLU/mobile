package com.infash;

import android.content.Intent;
import com.facebook.CallbackManager;

import com.facebook.react.ReactActivity;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    CallbackManager mCallbackManager =
            MainApplication.getCallbackManager();

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "infash";
    }

    protected List<ReactPackage> getPackages() {
        mCallbackManager = new CallbackManager.Factory().create();
        ReactPackage packages[] = new ReactPackage[]{
                new MainReactPackage(),
                new ExtraDimensionsPackage(),
                new FBSDKPackage(mCallbackManager),
        };
        return Arrays.<ReactPackage>asList(packages);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }
}