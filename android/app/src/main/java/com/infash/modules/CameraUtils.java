package com.infash.modules;

/**
 * Created by martin on 25/04/2017.
 */

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import android.webkit.MimeTypeMap;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.infash.Activities.TrimmerActivity;
import com.infash.Activities.cameraRecorderActivity;
import com.infash.utils.FileUtils;
import com.theartofdev.edmodo.cropper2.CropImage;
import com.theartofdev.edmodo.cropper2.CropImageView;

import java.io.File;

import static android.app.Activity.RESULT_OK;


public class CameraUtils extends ReactContextBaseJavaModule {

    private ReactApplicationContext mReactContext;
    private Promise mPromise;
    public static final int RECORD_VIDEO = 1;
    private static final int PICK_GALLERY = 2;
    private static final int TRIM_VIDEO = 3;
    private boolean mImageTaken = false;
    private boolean mVideoTaken = false;
    private Uri mOriginalFile;
    private boolean mAllowVideo = true;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {

            switch (requestCode) {
                case RECORD_VIDEO:
                    if (resultCode == RESULT_OK) {
                        String mFilePath = intent.getStringExtra(cameraRecorderActivity.VIDEO_PATH);
                        mOriginalFile = Uri.parse(mFilePath);

                        if (MimeTypeMap.getFileExtensionFromUrl(mFilePath).equals("mp4")) {
                            Intent timmerIntent = new Intent(getCurrentActivity(), TrimmerActivity.class);
                            timmerIntent.putExtra(TrimmerActivity.EXTRA_VIDEO_PATH, mFilePath);
                            getCurrentActivity().startActivityForResult(timmerIntent, TRIM_VIDEO);
                        } else {
                            mImageTaken = true;
                            CropImage.activity(Uri.parse(mFilePath))
                                    .setAspectRatio(9, 16)
                                    .setFlipHorizontally(true)
                                    .start(getCurrentActivity());
                        }
                    } else if (resultCode == 1001) {
                        openGallery();
                    }
                    break;

                case PICK_GALLERY:
                    if (resultCode == RESULT_OK) {
                        Uri uri = intent.getData();
                        mOriginalFile = uri;
                        String mFileType = mReactContext.getContentResolver().getType(mOriginalFile);
                        if (mFileType.contains("image")) {
                            // start cropping activity for pre-acquired image saved on the device
                            CropImage.activity(uri)
                                    .setAspectRatio(9, 16)
                                    .setGuidelines(CropImageView.Guidelines.ON)
                                    .start(getCurrentActivity());
                        } else {

                            Intent timmerIntent = new Intent(getCurrentActivity(), TrimmerActivity.class);
                            timmerIntent.putExtra(TrimmerActivity.EXTRA_VIDEO_PATH, uri.toString());
                            getCurrentActivity().startActivityForResult(timmerIntent, TRIM_VIDEO);


                        }
                    }
                    break;

                case TRIM_VIDEO:

                    if (resultCode == RESULT_OK) {
                        String realPath = FileUtils.getPath(getReactApplicationContext(), (Uri)intent.getParcelableExtra(TrimmerActivity.EXTRA_VIDEO_PATH));
                        Log.d("martin", realPath);
                        mPromise.resolve("file://" + realPath);
                    } else {
                        Intent intent2 = new Intent(getCurrentActivity(), cameraRecorderActivity.class);
                        getCurrentActivity().startActivityForResult(intent2, RECORD_VIDEO);
                    }
                    break;

                case CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE:
                    CropImage.ActivityResult result = CropImage.getActivityResult(intent);

                    File mfileToDelete = new File(mOriginalFile.getPath());
                    if (mfileToDelete.exists()) {
                        mfileToDelete.delete();
                    }
                    if (resultCode == RESULT_OK) {
                        Uri resultUri = result.getUri();
                        String realPath = FileUtils.getPath(getReactApplicationContext(), resultUri);
                        Log.d("martinResult", realPath);
                        Log.d("martin", "image cropper request promise");
                        mPromise.resolve("file://" + realPath);
                    } else if (mImageTaken) {
                        Intent intent2 = new Intent(getCurrentActivity(), cameraRecorderActivity.class);
                        intent2.putExtra("ALLOW_VIDEO", mAllowVideo);
                        getCurrentActivity().startActivityForResult(intent2, RECORD_VIDEO);
                    }
                    mImageTaken = false;
            }
        }
    };

    private void openGallery() {

        String fileTypes = mAllowVideo ? "image/* video/*" : "image/*";
        String[] fileTypesObject = mAllowVideo ? new String[]{"image/*", "video/*"} : new String[]{"image/*"};

        if (Build.VERSION.SDK_INT < 19) {
            Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
            intent.setType("image/* video/*");
            getCurrentActivity().startActivityForResult(Intent.createChooser(intent, "select a file to upload"), PICK_GALLERY);
        } else {
            Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
            intent.addCategory(Intent.CATEGORY_OPENABLE);
            intent.setType("image/*");
            intent.putExtra(Intent.EXTRA_MIME_TYPES, fileTypesObject);
            getCurrentActivity().startActivityForResult(intent, PICK_GALLERY);
        }

/*
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType(fileType + "*/
/*");
        intent.addCategory(Intent.CATEGORY_OPENABLE);

        try {
            getCurrentActivity().startActivityForResult(
                    Intent.createChooser(intent, "Select a File to Upload"),
                    PICK_GALLERY);
        } catch (android.content.ActivityNotFoundException ex) {
            mPromise.reject("error", "activity not found");
        }
*/
    }

    public CameraUtils(ReactApplicationContext reactContext) {

        super(reactContext);
        mReactContext = reactContext;
        reactContext.addActivityEventListener(mActivityEventListener);
    }


    @ReactMethod
    public void openCamera(boolean allowVideo, Promise promise) {

        mPromise = promise;
        mAllowVideo = allowVideo;

        Intent intent = new Intent(getCurrentActivity(), cameraRecorderActivity.class);
        intent.putExtra("ALLOW_VIDEO", mAllowVideo);
        getCurrentActivity().startActivityForResult(intent, RECORD_VIDEO);
    }

    @Override
    public String getName() {
        return "CameraUtils";
    }
}

