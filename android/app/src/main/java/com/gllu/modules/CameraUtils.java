package com.gllu.modules;

/**
 * Created by martin on 25/04/2017.
 */

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.gllu.Activities.cameraRecorderActivity;
import com.gllu.utils.FileUtils;
import com.theartofdev.edmodo.cropper.CropImage;

import static android.app.Activity.RESULT_OK;


public class CameraUtils extends ReactContextBaseJavaModule {

    private ReactApplicationContext mReactContext;
    private Promise mPromise;
    public static final int RECORD_VIDEO = 1;
    private static final int PICK_GALLERY = 2;
    private String mFileType = "";
    private boolean mImageTaken = false;


    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {

            switch (requestCode) {
                case RECORD_VIDEO:
                    if (resultCode == RESULT_OK) {
                        String mVideoPath = intent.getStringExtra(cameraRecorderActivity.VIDEO_PATH);

                        mPromise.resolve(mVideoPath);
                    }
                    else if (resultCode == 1234){

                        mImageTaken = true;
                        String mStringUri = intent.getStringExtra("stringUri");
                        CropImage.activity(Uri.parse(mStringUri))
                                .setAspectRatio(9,16)
                                .start(getCurrentActivity());
                    }
                    else if (resultCode == 1001) {

                        mFileType = intent.getStringExtra("file_type");
                        openGallery(mFileType);
                    }
                    break;

                case PICK_GALLERY:
                    if (resultCode == RESULT_OK) {
                        Uri uri = intent.getData();
                        if (mFileType.equals("image")) {
                            // start cropping activity for pre-acquired image saved on the device
                            CropImage.activity(uri)
                                    .setAspectRatio(9,16)
                                    .start(getCurrentActivity());
                        } else {
                            String realPath = FileUtils.getPath(getReactApplicationContext(), uri);
                            mPromise.resolve("file://" + realPath);
                        }
                    }
                    break;

                case CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE:
                    CropImage.ActivityResult result = CropImage.getActivityResult(intent);
                    if (resultCode == RESULT_OK) {
                        Uri resultUri = result.getUri();
                        String realPath = FileUtils.getPath(getReactApplicationContext(), resultUri);
                        Log.d("martinResult", realPath);
                        mPromise.resolve("file://" + realPath);
                    }
                    else if (mImageTaken){
                        Intent intent2 = new Intent(getCurrentActivity(), cameraRecorderActivity.class);
                        getCurrentActivity().startActivityForResult(intent2, RECORD_VIDEO);
                    }
                    mImageTaken = false;
            }
        }
    };

    private void openGallery(final String fileType) {

        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType(fileType + "/*");
        intent.addCategory(Intent.CATEGORY_OPENABLE);

        try {
            getCurrentActivity().startActivityForResult(
                    Intent.createChooser(intent, "Select a File to Upload"),
                    PICK_GALLERY);
        } catch (android.content.ActivityNotFoundException ex) {
            mPromise.reject("error", "activity not found");
        }
    }

    public CameraUtils(ReactApplicationContext reactContext) {

        super(reactContext);
        mReactContext = reactContext;
        reactContext.addActivityEventListener(mActivityEventListener);
    }


    @ReactMethod
    public void openCamera(Promise promise) {

        mPromise = promise;

        Intent intent = new Intent(getCurrentActivity(), cameraRecorderActivity.class);
        getCurrentActivity().startActivityForResult(intent, RECORD_VIDEO);
    }

    @Override
    public String getName() {
        return "CameraUtils";
    }
}


