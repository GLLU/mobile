
#import "VideoTrimmerViewController.h"
#import "ICGVideoTrimmerView.h"
#import <MobileCoreServices/MobileCoreServices.h>
#import <AVFoundation/AVFoundation.h>
#import "gllu-Swift.h"

@interface VideoTrimmerViewController () <ICGVideoTrimmerDelegate>

@property (assign, nonatomic) BOOL isPlaying;
@property (strong, nonatomic) AVPlayer *player;
@property (strong, nonatomic) AVPlayerItem *playerItem;
@property (strong, nonatomic) AVPlayerLayer *playerLayer;
@property (strong, nonatomic) NSTimer *playbackTimeCheckerTimer;
@property (assign, nonatomic) CGFloat videoPlaybackPosition;

@property (weak, nonatomic) IBOutlet ICGVideoTrimmerView *trimmerView;

@property (weak, nonatomic) IBOutlet UIView *videoPlayer;
@property (weak, nonatomic) IBOutlet UIView *videoLayer;

@property (strong, nonatomic) NSString *tempVideoPath;
@property (strong, nonatomic) AVAssetExportSession *exportSession;
@property (strong, nonatomic) AVAsset *asset;

@property (assign, nonatomic) CGFloat startTime;
@property (assign, nonatomic) CGFloat stopTime;

@property (strong, nonatomic) NSURL* assetUrl;

@property (assign, nonatomic) BOOL restartOnPlay;

@end

@implementation VideoTrimmerViewController

- (instancetype)initWithAssetUrl:(NSURL*)url{
    self = [super init];
    _assetUrl = url;
    
    return self;
}

- (BOOL)prefersStatusBarHidden{
    return YES;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.tempVideoPath = [NSTemporaryDirectory() stringByAppendingPathComponent:@"tmpMov.mp4"];
    
    if (self.assetUrl){
        [self processSelectedAsset:self.assetUrl];
    }
    
    CGFloat buttonY = 10.0;
    
    UIButton* lB = [[UIButton alloc] initWithFrame:CGRectMake(10.0f, buttonY, 44.0f, 44.0f)];
    [lB setImage:[UIImage imageNamed:@"back-button"] forState:UIControlStateNormal];
    [lB addTarget:self action:@selector(didCancel) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:lB];
    
    UIButton* rB = [[UIButton alloc] initWithFrame:CGRectMake([UIScreen mainScreen].bounds.size.width - 10.0f - 44.0f, buttonY, 44.0f, 44.0f)];
    [rB setTitle:@"Next" forState:UIControlStateNormal];
    
    [rB setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    
    [rB addTarget:self action:@selector(trimVideo) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:rB];
    
    [self.navigationController setNavigationBarHidden:YES];
}

- (void)viewDidDisappear:(BOOL)animated{
    [super viewDidDisappear:animated];
    
    [self.playbackTimeCheckerTimer invalidate];
    [self.player pause];
    [self.playerLayer removeFromSuperlayer];
    self.playerLayer = nil;
    self.player = nil;
}

- (void)didCancel{
     [self.navigationController popViewControllerAnimated:YES];
}

#pragma mark - ICGVideoTrimmerDelegate

- (void)trimmerView:(ICGVideoTrimmerView *)trimmerView didChangeLeftPosition:(CGFloat)startTime rightPosition:(CGFloat)endTime
{
    _restartOnPlay = YES;
    [self.player pause];
    self.isPlaying = NO;
    [self stopPlaybackTimeChecker];
    
    [self.trimmerView hideTracker:true];
    
    if (startTime != self.startTime) {
        //then it moved the left position, we should rearrange the bar
        [self seekVideoToPos:startTime];
    }
    else{ // right has changed
        [self seekVideoToPos:endTime];
    }
    self.startTime = startTime;
    self.stopTime = endTime;
    
}

- (void)processSelectedAsset:(NSURL*)url{
    self.asset = [AVAsset assetWithURL:url];
    
    AVPlayerItem *item = [AVPlayerItem playerItemWithAsset:self.asset];
    
    self.player = [AVPlayer playerWithPlayerItem:item];
    self.playerLayer = [AVPlayerLayer playerLayerWithPlayer:self.player];
    self.playerLayer.contentsGravity = AVLayerVideoGravityResizeAspect;
    self.player.actionAtItemEnd = AVPlayerActionAtItemEndNone;
    
    [self.videoLayer.layer addSublayer:self.playerLayer];
    
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tapOnVideoLayer:)];
    [self.videoLayer addGestureRecognizer:tap];
    
    self.videoPlaybackPosition = 0;
    
    [self tapOnVideoLayer:tap];
    
    // set properties for trimmer view
    [self.trimmerView setThemeColor:[UIColor lightGrayColor]];
    [self.trimmerView setAsset:self.asset];
    [self.trimmerView setShowsRulerView:NO];
    [self.trimmerView setMaxLength:20.0f];
    [self.trimmerView setTrackerColor:[UIColor lightGrayColor]];
    [self.trimmerView setDelegate:self];
    
    // important: reset subviews
    [self.trimmerView resetSubviews];

}


#pragma mark - Actions

- (void)deleteTempFile
{
    NSURL *url = [NSURL fileURLWithPath:self.tempVideoPath];
    NSFileManager *fm = [NSFileManager defaultManager];
    BOOL exist = [fm fileExistsAtPath:url.path];
    NSError *err;
    if (exist) {
        [fm removeItemAtURL:url error:&err];
        NSLog(@"file deleted");
        if (err) {
            NSLog(@"file remove error, %@", err.localizedDescription );
        }
    } else {
        NSLog(@"no file by that name");
    }
}

- (void)trimVideo
{
    [self deleteTempFile];
    
    NSArray *compatiblePresets = [AVAssetExportSession exportPresetsCompatibleWithAsset:self.asset];
    if ([compatiblePresets containsObject:AVAssetExportPresetMediumQuality]) {
        
        self.exportSession = [[AVAssetExportSession alloc]
                              initWithAsset:self.asset presetName:AVAssetExportPresetPassthrough];
        // Implementation continues.
        
        NSURL *furl = [NSURL fileURLWithPath:self.tempVideoPath];
        
        self.exportSession.outputURL = furl;
        self.exportSession.outputFileType = AVFileTypeMPEG4;
        
        CMTime start = CMTimeMakeWithSeconds(self.startTime, self.asset.duration.timescale);
        CMTime duration = CMTimeMakeWithSeconds(self.stopTime - self.startTime, self.asset.duration.timescale);
        CMTimeRange range = CMTimeRangeMake(start, duration);
        self.exportSession.timeRange = range;
        
        [self.exportSession exportAsynchronouslyWithCompletionHandler:^{
            
            switch ([self.exportSession status]) {
                case AVAssetExportSessionStatusFailed:
                    
                    NSLog(@"Export failed: %@", [[self.exportSession error] localizedDescription]);
                    break;
                case AVAssetExportSessionStatusCancelled:
                    
                    NSLog(@"Export canceled");
                    break;
                default:
                    NSLog(@"NONE");
                    dispatch_async(dispatch_get_main_queue(), ^{
                        NSURL *movieUrl = [NSURL fileURLWithPath:self.tempVideoPath];
                        [self video:movieUrl didFinishSavingWithError:nil contextInfo:nil];
                    });
                    
                    break;
            }
        }];
        
    }
}

- (void)video:(NSURL*)videoPath didFinishSavingWithError:(NSError*)error contextInfo:(void*)contextInfo {
    if (error) {
        UIAlertController* alert = [UIAlertController
                                    alertControllerWithTitle:@"Error" message:@"Failed to complete the process" preferredStyle:UIAlertControllerStyleAlert];
        
        UIAlertAction* dismissButton = [UIAlertAction
                                        actionWithTitle:@"Ok"
                                        style:UIAlertActionStyleCancel
                                        handler:nil];
        
        [alert addAction:dismissButton];
        [self presentViewController:alert animated:YES completion:nil];
    }
    
    [[NSNotificationCenter defaultCenter] postNotificationName:MediaRecorderCompleted object:self userInfo:@{@"url": [videoPath absoluteString]}];
}

- (void)viewDidLayoutSubviews
{
    self.playerLayer.frame = CGRectMake(0, 0.0, self.view.frame.size.width, self.view.frame.size.height);
}

- (void)tapOnVideoLayer:(UITapGestureRecognizer *)tap
{
    if (self.isPlaying) {
        [self.player pause];
        [self stopPlaybackTimeChecker];
    }else {
        if (_restartOnPlay){
            [self seekVideoToPos: self.startTime];
            [self.trimmerView seekToTime:self.startTime];
            _restartOnPlay = NO;
        }
        [self.player play];
        [self startPlaybackTimeChecker];
    }
    self.isPlaying = !self.isPlaying;
    [self.trimmerView hideTracker:!self.isPlaying];
}

- (void)startPlaybackTimeChecker
{
    [self stopPlaybackTimeChecker];
    
    self.playbackTimeCheckerTimer = [NSTimer scheduledTimerWithTimeInterval:0.1f target:self selector:@selector(onPlaybackTimeCheckerTimer) userInfo:nil repeats:YES];
}

- (void)stopPlaybackTimeChecker
{
    if (self.playbackTimeCheckerTimer) {
        [self.playbackTimeCheckerTimer invalidate];
        self.playbackTimeCheckerTimer = nil;
    }
}

#pragma mark - PlaybackTimeCheckerTimer

- (void)onPlaybackTimeCheckerTimer
{
    CMTime curTime = [self.player currentTime];
    Float64 seconds = CMTimeGetSeconds(curTime);
    if (seconds < 0){
        seconds = 0;
    }
    self.videoPlaybackPosition = seconds;
    
    [self.trimmerView seekToTime:seconds];
    
    if (self.videoPlaybackPosition >= self.stopTime) {
        self.videoPlaybackPosition = self.startTime;
        [self seekVideoToPos: self.startTime];
        [self.trimmerView seekToTime:self.startTime];
    }
}

- (void)seekVideoToPos:(CGFloat)pos
{
    self.videoPlaybackPosition = pos;
    CMTime time = CMTimeMakeWithSeconds(self.videoPlaybackPosition, self.player.currentTime.timescale);
    [self.player seekToTime:time toleranceBefore:kCMTimeZero toleranceAfter:kCMTimeZero];
}

@end
