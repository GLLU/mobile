
#import "MediaRecorderModule.h"
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "gllu-Swift.h"
#import <React/RCTBridgeModule.h>

@interface MediaRecorderModule()<RCTBridgeModule>

@property (nonatomic, strong) RCTPromiseResolveBlock resolve;
@property (nonatomic, strong) RCTPromiseRejectBlock reject;
@property (nonatomic, assign) BOOL videoEnabled;

@end


@implementation MediaRecorderModule
RCT_EXPORT_MODULE(CameraUtils);

- (void)setConfiguration: (BOOL)videoEnabled
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject {
    
    self.resolve = resolve;
    self.reject = reject;

    self.videoEnabled = videoEnabled;
}

RCT_EXPORT_METHOD(openCamera:(BOOL)videoEnabled
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didComplete:) name:MediaRecorderCompleted object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didCancel:) name:MediaRecorderCanceled object:nil];
  
    [self setConfiguration:videoEnabled resolver:resolve rejecter:reject];
    dispatch_async(dispatch_get_main_queue(), ^{
        MediaRecorderViewController* mediaRecorder = [MediaRecorderViewController MediaRecorder:videoEnabled];
        UINavigationController* nav = [[UINavigationController alloc] initWithRootViewController:mediaRecorder];
        
        [[self getRootVC] presentViewController:nav animated:YES completion:nil];
    });
}

- (UIViewController*)getRootVC {
    UIViewController* root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
    while (root.presentedViewController != nil) {
        root = root.presentedViewController;
    }
    
    return root;
}

- (void)flowComplete{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
  [[self getRootVC] dismissViewControllerAnimated:YES completion:nil];
}

- (void)didComplete:(NSNotification*)notif{
  [self flowComplete];
  NSString* url = notif.userInfo[@"url"];
  if (url){
    self.resolve(url);
  }
  else {
    self.reject(nil, @"Failed to save media", nil);
  }
  
}

- (void)didCancel:(NSNotification*)notif{
  [self flowComplete];
  self.resolve(nil);
}

@end
