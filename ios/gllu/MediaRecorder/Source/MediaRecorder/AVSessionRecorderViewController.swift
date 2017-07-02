
import UIKit
import AVFoundation

open class AVSessionRecorderViewController: UIViewController {

	// MARK: Enumeration Declaration

	/// Enumeration for Camera Selection

	public enum CameraSelection {

		/// Camera on the back of the device
		case rear

		/// Camera on the front of the device
		case front
	}

	/// Enumeration for video quality of the capture session. Corresponds to a AVCaptureSessionPreset


	public enum VideoQuality {

		/// AVCaptureSessionPresetHigh
		case high

		/// AVCaptureSessionPresetMedium
		case medium

		/// AVCaptureSessionPresetLow
		case low

		/// AVCaptureSessionPreset352x288
		case resolution352x288

		/// AVCaptureSessionPreset640x480
		case resolution640x480

		/// AVCaptureSessionPreset1280x720
		case resolution1280x720

		/// AVCaptureSessionPreset1920x1080
		case resolution1920x1080

		/// AVCaptureSessionPreset3840x2160
		case resolution3840x2160

		/// AVCaptureSessionPresetiFrame960x540
		case iframe960x540

		/// AVCaptureSessionPresetiFrame1280x720
		case iframe1280x720
	}

	/**

	Result from the AVCaptureSession Setup

	- success: success
	- notAuthorized: User denied access to Camera of Microphone
	- configurationFailed: Unknown error
	*/

	fileprivate enum SessionSetupResult {
		case success
		case notAuthorized
		case configurationFailed
	}

	// MARK: Public Variable Declarations

	/// Public Camera Delegate for the Custom View Controller Subclass

	open weak var cameraDelegate: AVSessionRecorderViewControllerDelegate?

	/// Maxiumum video duration if recorder button is used

	open var maximumVideoDuration : Double     = 0.0

	/// Video capture quality

	open var videoQuality : VideoQuality       = .high

	/// Sets whether flash is enabled for photo and video capture

	open var flashEnabled                      = false

	/// Sets whether Pinch to Zoom is enabled for the capture session

	open var pinchToZoom                       = true

	/// Sets the maximum zoom scale allowed during gestures gesture

	open var maxZoomScale				         = CGFloat.greatestFiniteMagnitude
  
	/// Sets whether Tap to Focus and Tap to Adjust Exposure is enabled for the capture session

	open var tapToFocus                        = true

	/// Sets whether the capture session should adjust to low light conditions automatically
	///
	/// Only supported on iPhone 5 and 5C

	open var lowLightBoost                     = true

	/// Set whether should allow background audio from other applications

	open var allowBackgroundAudio              = true

	/// Sets whether a double tap to switch cameras is supported

	open var doubleTapCameraSwitch            = true
    
    /// Sets whether swipe vertically to zoom is supported
    
    open var swipeToZoom                     = true
    
    /// Sets whether swipe vertically gestures should be inverted
    
    open var swipeToZoomInverted             = false

	/// Set default launch camera

	open var defaultCamera                   = CameraSelection.rear

	/// Sets wether the taken photo or video should be oriented according to the device orientation

	open var shouldUseDeviceOrientation      = false


	// MARK: Public Get-only Variable Declarations

	/// Returns true if video is currently being recorded

	fileprivate(set) open var isVideoRecording      = false

	/// Returns true if the capture session is currently running

	fileprivate(set) open var isSessionRunning     = false

	/// Returns the CameraSelection corresponding to the currently utilized camera

	fileprivate(set) open var currentCamera        = CameraSelection.rear

	// MARK: Private Constant Declarations

	/// Current Capture Session

	fileprivate let session                      = AVCaptureSession()

	/// Serial queue used for setting up session

	fileprivate let sessionQueue                 = DispatchQueue(label: "session queue", attributes: [])

	// MARK: Private Variable Declarations

	/// Variable for storing current zoom scale

	fileprivate var zoomScale                    = CGFloat(1.0)

	/// Variable for storing initial zoom scale before Pinch to Zoom begins

	fileprivate var beginZoomScale               = CGFloat(1.0)

	/// Returns true if the torch (flash) is currently enabled

	fileprivate var isCameraTorchOn              = false

	/// Variable to store result of capture session setup

	fileprivate var setupResult                  = SessionSetupResult.success

	/// BackgroundID variable for video recording

	fileprivate var backgroundRecordingID        : UIBackgroundTaskIdentifier? = nil

	/// Video Input variable

	fileprivate var videoDeviceInput             : AVCaptureDeviceInput!

	/// Movie File Output variable

	fileprivate var movieFileOutput              : AVCaptureMovieFileOutput?

	/// Photo File Output variable

	fileprivate var photoFileOutput              : AVCaptureStillImageOutput?

	/// Video Device variable

	fileprivate var videoDevice                  : AVCaptureDevice?

	/// PreviewView for the capture session

	fileprivate var previewLayer                 : PreviewView!

	/// UIView for front facing flash

	fileprivate var flashView                    : UIView?
    
    /// Pan Translation
    
    fileprivate var previousPanTranslation       : CGFloat = 0.0

	/// Last changed orientation

	fileprivate var deviceOrientation            : UIDeviceOrientation?

	/// Disable view autorotation for forced portrait recorindg

	override open var shouldAutorotate: Bool {
		return false
	}

	// MARK: ViewDidLoad

	/// ViewDidLoad Implementation

	override open func viewDidLoad() {
		super.viewDidLoad()
    
		previewLayer = PreviewView(frame: CGRect(x: 0.0, y: 0.0, width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height))

		self.view.addSubview(previewLayer)
		previewLayer.session = session

		// Test authorization status for Camera and Micophone

		switch AVCaptureDevice.authorizationStatus(forMediaType: AVMediaTypeVideo){
		case .authorized:

			// already authorized
			break
		case .notDetermined:

			// not yet determined
			sessionQueue.suspend()
			AVCaptureDevice.requestAccess(forMediaType: AVMediaTypeVideo, completionHandler: { [unowned self] granted in
				if !granted {
					self.setupResult = .notAuthorized
				}
				self.sessionQueue.resume()
			})
		default:

			// already been asked. Denied access
			setupResult = .notAuthorized
		}
		sessionQueue.async { [unowned self] in
			self.configureSession()
		}
	}
  
	override open func viewDidAppear(_ animated: Bool) {
		super.viewDidAppear(animated)

		sessionQueue.async {
			switch self.setupResult {
			case .success:
				// Begin Session
				self.session.startRunning()
				self.isSessionRunning = self.session.isRunning
                
                DispatchQueue.main.async {
                    self.previewLayer.videoPreviewLayer.connection?.videoOrientation = AVCaptureVideoOrientation.portrait
                }
                
			case .notAuthorized:
				// Prompt to App Settings
				self.promptToAppSettings()
			case .configurationFailed:
				// Unknown Error
				DispatchQueue.main.async(execute: { [unowned self] in
					let message = NSLocalizedString("Unable to capture media", comment: "Alert message when something goes wrong during capture session configuration")
					let alertController = UIAlertController(title: "Error", message: message, preferredStyle: .alert)
					alertController.addAction(UIAlertAction(title: NSLocalizedString("OK", comment: "Alert OK button"), style: .cancel, handler: nil))
					self.present(alertController, animated: true, completion: nil)
				})
			}
		}
	}

	override open func viewDidDisappear(_ animated: Bool) {
		super.viewDidDisappear(animated)

		// If session is running, stop the session
		if self.isSessionRunning == true {
			self.session.stopRunning()
			self.isSessionRunning = false
		}
	}

    
	// MARK: Public Functions

	/**

	Capture photo from current session

	UIImage will be returned with the AVSessionRecorderViewControllerDelegate function recorderDidTakePhoto(photo:)

	*/

	open func takePhoto() {
		guard let _ = videoDevice else { return }
        capturePhotoAsyncronously({ (_) in })
	}

	/**

	Begin recording video of current session

	AVSessionRecorderViewControllerDelegate function recorderCamDidBeginRecordingVideo() will be called

	*/

	open func startVideoRecording() {
		guard let movieFileOutput = self.movieFileOutput else {
			return
		}

        sessionQueue.async {
            [unowned self] in
			if !movieFileOutput.isRecording {
				if UIDevice.current.isMultitaskingSupported {
					self.backgroundRecordingID = UIApplication.shared.beginBackgroundTask(expirationHandler: nil)
				}

				// Update the orientation on the movie file output video connection before starting recording.
				let movieFileOutputConnection = self.movieFileOutput?.connection(withMediaType: AVMediaTypeVideo)


				//flip video output if front facing camera is selected
				if self.currentCamera == .front {
					movieFileOutputConnection?.isVideoMirrored = true
				}

				movieFileOutputConnection?.videoOrientation = .portrait

				// Start recording to a temporary file.
				let outputFileName = UUID().uuidString
				let outputFilePath = (NSTemporaryDirectory() as NSString).appendingPathComponent((outputFileName as NSString).appendingPathExtension("mov")!)
				movieFileOutput.startRecording(toOutputFileURL: URL(fileURLWithPath: outputFilePath), recordingDelegate: self)
				self.isVideoRecording = true
				DispatchQueue.main.async {
					self.cameraDelegate?.recorder(self, didBeginRecordingVideo: self.currentCamera)
				}
			}
			else {
				movieFileOutput.stopRecording()
			}
		}
	}

	/**

	Stop video recording video of current session

	AVSessionRecorderViewControllerDelegate function recorderCamDidFinishRecordingVideo() will be called

	When video has finished processing, the URL to the video location will be returned by recorderCamDidFinishProcessingVideoAt(url:)

	*/

	open func stopVideoRecording() {
        self.isVideoRecording = false
		if self.movieFileOutput?.isRecording == true {
			movieFileOutput!.stopRecording()

			DispatchQueue.main.async {
				self.cameraDelegate?.recorder(self, didFinishRecordingVideo: self.currentCamera)
			}
		}
	}

	/**

	Switch between front and rear camera

	AVSessionRecorderViewControllerDelegate function recorderCamDidSwitchCameras(camera:  will be return the current camera selection

	*/


	open func switchCamera() {
		guard isVideoRecording != true else {
			//TODO: Look into switching camera during video recording
			print("cannot switch cameras while recording")
			return
		}
        
        guard session.isRunning == true else {
            return
        }
        
		switch currentCamera {
		case .front:
			currentCamera = .rear
		case .rear:
			currentCamera = .front
		}

		session.stopRunning()

		sessionQueue.async { [unowned self] in

			// remove and re-add inputs and outputs

			for input in self.session.inputs {
				self.session.removeInput(input as! AVCaptureInput)
			}

			self.addInputs()
			DispatchQueue.main.async {
				self.cameraDelegate?.recorder(self, didSwitchCameras: self.currentCamera)
			}

			self.session.startRunning()
		}
	}

	// MARK: Private Functions

	/// Configure session, add inputs and outputs

	fileprivate func configureSession() {
		guard setupResult == .success else {
			return
		}

		// Set default camera

		currentCamera = defaultCamera

		// begin configuring session

		session.beginConfiguration()
		configureVideoPreset()
		addVideoInput()
		addAudioInput()
		configureVideoOutput()
		configurePhotoOutput()

		session.commitConfiguration()
	}

	/// Add inputs after changing camera()

	fileprivate func addInputs() {
		session.beginConfiguration()
		configureVideoPreset()
		addVideoInput()
		addAudioInput()
		session.commitConfiguration()
	}


	// Front facing camera will always be set to VideoQuality.high
	// If set video quality is not supported, videoQuality variable will be set to VideoQuality.high
	/// Configure image quality preset

	fileprivate func configureVideoPreset() {

		if currentCamera == .front {
			session.sessionPreset = videoInputPresetFromVideoQuality(.high)
		} else {
			if session.canSetSessionPreset(videoInputPresetFromVideoQuality(videoQuality)) {
				session.sessionPreset = videoInputPresetFromVideoQuality(videoQuality)
			} else {
				session.sessionPreset = videoInputPresetFromVideoQuality(.high)
			}
		}
	}

	/// Add Video Inputs

	fileprivate func addVideoInput() {
		switch currentCamera {
		case .front:
			videoDevice = AVSessionRecorderViewController.deviceWithMediaType(AVMediaTypeVideo, preferringPosition: .front)
		case .rear:
			videoDevice = AVSessionRecorderViewController.deviceWithMediaType(AVMediaTypeVideo, preferringPosition: .back)
		}

		if let device = videoDevice {
			do {
				try device.lockForConfiguration()
				if device.isFocusModeSupported(.continuousAutoFocus) {
					device.focusMode = .continuousAutoFocus
					if device.isSmoothAutoFocusSupported {
						device.isSmoothAutoFocusEnabled = true
					}
				}

				if device.isExposureModeSupported(.continuousAutoExposure) {
					device.exposureMode = .continuousAutoExposure
				}

				if device.isWhiteBalanceModeSupported(.continuousAutoWhiteBalance) {
					device.whiteBalanceMode = .continuousAutoWhiteBalance
				}

				if device.isLowLightBoostSupported && lowLightBoost == true {
					device.automaticallyEnablesLowLightBoostWhenAvailable = true
				}

				device.unlockForConfiguration()
			} catch {
				print("Error locking configuration")
			}
		}

		do {
			let videoDeviceInput = try AVCaptureDeviceInput(device: videoDevice)

			if session.canAddInput(videoDeviceInput) {
				session.addInput(videoDeviceInput)
				self.videoDeviceInput = videoDeviceInput
			} else {
				print("Could not add video device input to the session")
				print(session.canSetSessionPreset(videoInputPresetFromVideoQuality(videoQuality)))
				setupResult = .configurationFailed
				session.commitConfiguration()
				return
			}
		} catch {
			print("[recorder]: Could not create video device input: \(error)")
			setupResult = .configurationFailed
			return
		}
	}

	/// Add Audio Inputs

	fileprivate func addAudioInput() {
		do {
			let audioDevice = AVCaptureDevice.defaultDevice(withMediaType: AVMediaTypeAudio)
			let audioDeviceInput = try AVCaptureDeviceInput(device: audioDevice)

			if session.canAddInput(audioDeviceInput) {
				session.addInput(audioDeviceInput)
			}
			else {
				print("[recorder]: Could not add audio device input to the session")
			}
		}
		catch {
			print("[recorder]: Could not create audio device input: \(error)")
		}
	}

	/// Configure Movie Output

	fileprivate func configureVideoOutput() {
		let movieFileOutput = AVCaptureMovieFileOutput()

		if self.session.canAddOutput(movieFileOutput) {
			self.session.addOutput(movieFileOutput)
			if let connection = movieFileOutput.connection(withMediaType: AVMediaTypeVideo) {
				if connection.isVideoStabilizationSupported {
					connection.preferredVideoStabilizationMode = .auto
				}
			}
			self.movieFileOutput = movieFileOutput
		}
	}

	/// Configure Photo Output

	fileprivate func configurePhotoOutput() {
		let photoFileOutput = AVCaptureStillImageOutput()

		if self.session.canAddOutput(photoFileOutput) {
			photoFileOutput.outputSettings  = [AVVideoCodecKey: AVVideoCodecJPEG]
			self.session.addOutput(photoFileOutput)
			self.photoFileOutput = photoFileOutput
		}
	}

	fileprivate func getImageOrientation(_ forCamera: CameraSelection) -> UIImageOrientation {
		guard shouldUseDeviceOrientation, let deviceOrientation = self.deviceOrientation else { return forCamera == .rear ? .right : .leftMirrored }

		switch deviceOrientation {
		case .landscapeLeft:
			return forCamera == .rear ? .up : .downMirrored
		case .landscapeRight:
			return forCamera == .rear ? .down : .upMirrored
		case .portraitUpsideDown:
			return forCamera == .rear ? .left : .rightMirrored
		default:
			return forCamera == .rear ? .right : .leftMirrored
		}
	}

	/**
	Returns a UIImage from Image Data.

	- Parameter imageData: Image Data returned from capturing photo from the capture session.

	- Returns: UIImage from the image data, adjusted for proper orientation.
	*/

	fileprivate func processPhoto(_ imageData: Data) -> UIImage {
		let dataProvider = CGDataProvider(data: imageData as CFData)
		let cgImageRef = CGImage(jpegDataProviderSource: dataProvider!, decode: nil, shouldInterpolate: true, intent: CGColorRenderingIntent.defaultIntent)

		// Set proper orientation for photo
		// If camera is currently set to front camera, flip image

		let image = UIImage(cgImage: cgImageRef!, scale: 1.0, orientation: self.getImageOrientation(self.currentCamera))

		return image
	}

	fileprivate func capturePhotoAsyncronously(_ completionHandler: @escaping(Bool) -> ()) {
		if let videoConnection = photoFileOutput?.connection(withMediaType: AVMediaTypeVideo) {

			photoFileOutput?.captureStillImageAsynchronously(from: videoConnection, completionHandler: {(sampleBuffer, error) in
				if (sampleBuffer != nil) {
					let imageData = AVCaptureStillImageOutput.jpegStillImageNSDataRepresentation(sampleBuffer)
					let image = self.processPhoto(imageData!)

					// Call delegate and return new image
					DispatchQueue.main.async {
						self.cameraDelegate?.recorder(self, didTake: image)
					}
					completionHandler(true)
				} else {
					completionHandler(false)
				}
			})
		} else {
			completionHandler(false)
		}
	}

	/// Handle Denied App Privacy Settings

	fileprivate func promptToAppSettings() {
		// prompt User with UIAlertView

		DispatchQueue.main.async(execute: { [unowned self] in
			let message = NSLocalizedString("It seems we don't have permission to use the camera, please change privacy settings", comment: "Alert message when the user has denied access to the camera")
			let alertController = UIAlertController(title: "Missing Permission", message: message, preferredStyle: .alert)
			alertController.addAction(UIAlertAction(title: NSLocalizedString("OK", comment: "Alert OK button"), style: .cancel, handler: nil))
			alertController.addAction(UIAlertAction(title: NSLocalizedString("Settings", comment: "Alert button to open Settings"), style: .default, handler: { action in
				if #available(iOS 10.0, *) {
					UIApplication.shared.openURL(URL(string: UIApplicationOpenSettingsURLString)!)
				} else {
					if let appSettings = URL(string: UIApplicationOpenSettingsURLString) {
						UIApplication.shared.openURL(appSettings)
					}
				}
			}))
			self.present(alertController, animated: true, completion: nil)
		})
	}

	/**
	Returns an AVCapturePreset from VideoQuality Enumeration

	- Parameter quality: ViewQuality enum

	- Returns: String representing a AVCapturePreset
	*/

	fileprivate func videoInputPresetFromVideoQuality(_ quality: VideoQuality) -> String {
		switch quality {
		case .high: return AVCaptureSessionPresetHigh
		case .medium: return AVCaptureSessionPresetMedium
		case .low: return AVCaptureSessionPresetLow
		case .resolution352x288: return AVCaptureSessionPreset352x288
		case .resolution640x480: return AVCaptureSessionPreset640x480
		case .resolution1280x720: return AVCaptureSessionPreset1280x720
		case .resolution1920x1080: return AVCaptureSessionPreset1920x1080
		case .iframe960x540: return AVCaptureSessionPresetiFrame960x540
		case .iframe1280x720: return AVCaptureSessionPresetiFrame1280x720
		case .resolution3840x2160:
			if #available(iOS 9.0, *) {
				return AVCaptureSessionPreset3840x2160
			}
			else {
				print("[recorder]: Resolution 3840x2160 not supported")
				return AVCaptureSessionPresetHigh
			}
		}
	}

	/// Get Devices

	fileprivate class func deviceWithMediaType(_ mediaType: String, preferringPosition position: AVCaptureDevicePosition) -> AVCaptureDevice? {
		if let devices = AVCaptureDevice.devices(withMediaType: mediaType) as? [AVCaptureDevice] {
			return devices.filter({ $0.position == position }).first
		}
		return nil
	}
}

// MARK: AVCaptureFileOutputRecordingDelegate

extension AVSessionRecorderViewController: AVCaptureFileOutputRecordingDelegate {

	/// Process newly captured video and write it to temporary directory

	public func capture(_ captureOutput: AVCaptureFileOutput!, didFinishRecordingToOutputFileAt outputFileURL: URL!, fromConnections connections: [Any]!, error: Error!) {
		if let currentBackgroundRecordingID = backgroundRecordingID {
			backgroundRecordingID = UIBackgroundTaskInvalid

			if currentBackgroundRecordingID != UIBackgroundTaskInvalid {
				UIApplication.shared.endBackgroundTask(currentBackgroundRecordingID)
			}
		}
		if error != nil {
            self.stopVideoRecording()
            
            DispatchQueue.main.async {
                self.cameraDelegate?.recorder(self, didFinishProcessVideoAt: URL(string:"error")!, error: error)
            }
            let alert = UIAlertController(title: "Error", message: nil, preferredStyle: .alert)
            var message = ""
            alert.addAction(UIAlertAction(title: NSLocalizedString("OK", comment: "Alert OK button"), style: .cancel, handler: {e in }))
            
            if (error! as NSError).code == -11807{ //Out Of Disk space
                message = "There is not enough available space to continue recording. Make room by deleting existing videos or photos."
            }
            
            else {
                message = "Something went wrong."
            }
            
            alert.message = message
            
            self.present(alert, animated: true, completion: nil)

			print("[recorder]: Movie file finishing error: \(error)")
		} else {
			//Call delegate function with the URL of the outputfile
			DispatchQueue.main.async {
                self.cameraDelegate?.recorder(self, didFinishProcessVideoAt: outputFileURL, error: nil)
			}
		}
	}
}




