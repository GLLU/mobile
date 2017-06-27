
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "MediaFileWriter.h"

@implementation MediaFileWriter

+ (void)saveTempImage:(UIImage*)imageToSave withName:(NSString*)imageName {
    NSURL *tmpDirURL = [NSURL fileURLWithPath:NSTemporaryDirectory() isDirectory:YES];
    NSURL *fileURL = [[tmpDirURL URLByAppendingPathComponent:imageName] URLByAppendingPathExtension:@"png"];
    
    NSLog(@"fileURL: %@", [fileURL path]);
    [MediaFileWriter deleteTempFile:fileURL];
    NSData *pngData = UIImagePNGRepresentation(imageToSave);
    
    [MediaFileWriter saveData:pngData withURL:fileURL];
}

+ (void)deleteTempFile:(NSURL*)url
{
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


+ (void)saveData:(NSData*)data withURL:(NSURL*)url{
    [data writeToFile:[url path] atomically:YES];
}

@end
