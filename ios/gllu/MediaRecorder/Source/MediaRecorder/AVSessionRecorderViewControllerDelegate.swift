
import UIKit

// MARK: Public Protocol Declaration

/// Delegate for AVSessionRecorderViewController

public protocol AVSessionRecorderViewControllerDelegate: class {
    
    /**
     AVSessionRecorderViewControllerDelegate function called when the takePhoto() function is called.
     
     - Parameter recorder: Current AVSessionRecorderViewController session
     - Parameter photo: UIImage captured from the current session
     */
    
    func recorder(_ recorder: AVSessionRecorderViewController, didTake photo: UIImage)
    
    /**
     AVSessionRecorderViewControllerDelegate function called when AVSessionRecorderViewController begins recording video.
     
     - Parameter recorder: Current AVSessionRecorderViewController session
     - Parameter camera: Current camera orientation
     */
    
    func recorder(_ recorder: AVSessionRecorderViewController, didBeginRecordingVideo camera: AVSessionRecorderViewController.CameraSelection)
    
    /**
     AVSessionRecorderViewControllerDelegate function called when AVSessionRecorderViewController finishes recording video.
     
     - Parameter recorder: Current AVSessionRecorderViewController session
     - Parameter camera: Current camera orientation
     */
    
    func recorder(_ recorder: AVSessionRecorderViewController, didFinishRecordingVideo camera: AVSessionRecorderViewController.CameraSelection)
    
    /**
     AVSessionRecorderViewControllerDelegate function called when AVSessionRecorderViewController is done processing video.
     
     - Parameter recorder: Current AVSessionRecorderViewController session
     - Parameter url: URL location of video in temporary directory
     */
    
    func recorder(_ recorder: AVSessionRecorderViewController, didFinishProcessVideoAt url: URL, error: Error?)
    
    /**
     AVSessionRecorderViewControllerDelegate function called when AVSessionRecorderViewController switches between front or rear camera.
     
     - Parameter recorder: Current AVSessionRecorderViewController session
     - Parameter camera: Current camera selection
     */
    
    func recorder(_ recorder: AVSessionRecorderViewController, didSwitchCameras camera: AVSessionRecorderViewController.CameraSelection)
}

public extension AVSessionRecorderViewControllerDelegate {
    
    func recorder(_ recorder: AVSessionRecorderViewController, didTake photo: UIImage) {
        // Optional
    }

    
    func recorder(_ recorder: AVSessionRecorderViewController, didBeginRecordingVideo camera: AVSessionRecorderViewController.CameraSelection) {
        // Optional
    }

    
    func recorder(_ recorder: AVSessionRecorderViewController, didFinishRecordingVideo camera: AVSessionRecorderViewController.CameraSelection) {
        // Optional
    }

    
    func recorder(_ recorder: AVSessionRecorderViewController, didFinishProcessVideoAt url: URL, error: Error?) {
        // Optional
    }

    
    func recorder(_ recorder: AVSessionRecorderViewController, didSwitchCameras camera: AVSessionRecorderViewController.CameraSelection) {
        // Optional
    }
}



