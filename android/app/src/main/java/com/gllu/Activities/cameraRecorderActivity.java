package com.gllu.Activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.afollestad.materialcamera.MaterialCamera;

/**
 * Created by martin on 25/04/2017.
 */

public class cameraRecorderActivity extends Activity {
    String msg = "Android : ";
    private final static int CAMERA_RQ = 6969;
    public final static String MAX_LENGTH = "MAX_LENGTH";
    public final static String VIDEO_PATH = "VIDEO_PATH";

    private boolean mAllowVideo;

    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = getIntent();
        int mMaxLength = intent.getIntExtra(MAX_LENGTH, 15);

        mAllowVideo = intent.getBooleanExtra("ALLOW_VIDEO", true);

        new MaterialCamera(this, mAllowVideo)
                .defaultToFrontFacing(true)
                .videoPreferredAspect(16f / 9f)
                .autoSubmit(true)
                .allowRetry(false)
                .qualityProfile(MaterialCamera.QUALITY_480P)
                .start(CAMERA_RQ);
        Log.d(msg, "The onCreate() event");
    }

    /**
     * Called when the activity is about to become visible.
     */
    @Override
    protected void onStart() {
        super.onStart();
        Log.d(msg, "The onStart() event");
    }

    /**
     * Called when the activity has become visible.
     */
    @Override
    protected void onResume() {
        super.onResume();
        Log.d(msg, "The onResume() event");
    }

    /**
     * Called when another activity is taking focus.
     */
    @Override
    protected void onPause() {
        super.onPause();
        Log.d(msg, "The onPause() event");
    }

    /**
     * Called when the activity is no longer visible.
     */
    @Override
    protected void onStop() {
        super.onStop();
        Log.d(msg, "The onStop() event");
    }

    /**
     * Called just before the activity is destroyed.
     */
    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(msg, "The onDestroy() event");
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Received recording or error from MaterialCamera
        if (requestCode == CAMERA_RQ) {

            if (resultCode == RESULT_OK) {
                Intent intent = new Intent();
                intent.putExtra(VIDEO_PATH, data.getDataString());

                setResult(RESULT_OK, intent);
                finish();

            } else if (resultCode == 1234) {
                setResult(resultCode, data);
                finish();
            } else if (resultCode == 1001) {
                setResult(resultCode, data);
                finish();
            } else if (resultCode == RESULT_CANCELED) {
                finish();
            }
        }
    }

}