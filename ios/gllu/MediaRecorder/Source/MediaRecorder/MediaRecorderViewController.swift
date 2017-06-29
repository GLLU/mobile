
import UIKit
import MobileCoreServices
import Foundation
import AVKit

class MediaRecorderViewController: AVSessionRecorderViewController, AVSessionRecorderViewControllerDelegate {
    
    var actionsView: MediaRecordingActionsView!
    var backButton: UIButton!
    var timerView: TimerView!
    var videoEnabled: Bool = true
    
    class func MediaRecorder(_ videoEnabled: Bool) -> MediaRecorderViewController{
        let vc = MediaRecorderViewController()
        vc.videoEnabled = videoEnabled
        return vc
    }

	override func viewDidLoad() {
		super.viewDidLoad()
		cameraDelegate = self
		maximumVideoDuration = 1000.0
		addButtons()
    addBackButton()
	}
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        self.navigationController?.setNavigationBarHidden(true, animated: false)
    }
    
    func addBackButton(){
        backButton = UIButton(frame: CGRect(x: 10.0, y: 10.0, width: 44.0, height: 36.0))
        backButton.setImage(#imageLiteral(resourceName: "back-button"), for: UIControlState())
        backButton.addTarget(self, action: #selector(closeRecorder), for: .touchUpInside)
        backButton.alpha = 0.4
        self.view.addSubview(backButton)
    }
    
    func closeRecorder(){
        self.navigationController?.popViewController(animated: true)
        NotificationCenter.default.post(name: NSNotification.Name.init(MediaRecorderCanceled), object: nil)
    }

	override var prefersStatusBarHidden: Bool {
		return true
	}

	func recorder(_ recorder: AVSessionRecorderViewController, didTake photo: UIImage) {
		self.crop(photo)
	}

	func recorder(_ recorder: AVSessionRecorderViewController, didBeginRecordingVideo camera: AVSessionRecorderViewController.CameraSelection) {
		print("Did Begin Recording")
        animateVideoStart()
	}

	func recorder(_ recorder: AVSessionRecorderViewController, didFinishRecordingVideo camera: AVSessionRecorderViewController.CameraSelection) {
		print("Did finish Recording")
		animateVideoEnd()
	}

    func recorder(_ recorder: AVSessionRecorderViewController, didFinishProcessVideoAt url: URL, error: Error?) {
        if error != nil{
            animateVideoEnd()
            return
        }
        let trimmerVC = VideoTrimmerViewController(assetUrl: url)!
		self.navigationController?.pushViewController(trimmerVC, animated: true)
	}

	func recorder(_ recorder: AVSessionRecorderViewController, didSwitchCameras camera: AVSessionRecorderViewController.CameraSelection) {
		print(camera)
	}

	@objc fileprivate func cameraSwitchAction(_ sender: Any) {
		switchCamera()
	}
    
    @objc fileprivate func chooseFromGalery(_ sender: Any) {
        presentMediaPicker()
    }
    
    func animateVideoStart(){
        timerView.isHidden = false
        timerView.startClockTimer()
        actionsView.recordButton.growButton()
        
        actionsView.setActionText()
        UIView.animate(withDuration: 0.25, animations: {
            self.actionsView.switchCameraButton.alpha = 0.0
        })
    }
    
    func animateVideoEnd(){
        actionsView.recordButton.shrinkButton()
        timerView.isHidden = true
        timerView.stopClock()
        self.actionsView.setDefaultText(videoEnabled: self.videoEnabled)
        UIView.animate(withDuration: 0.25, animations: {
            self.actionsView.switchCameraButton.alpha = 1.0
        })
    }

	fileprivate func addButtons() {
        let actionViewHeight : CGFloat = 150.0
        actionsView = MediaRecordingActionsView(frame: CGRect(x: 0.0, y: view.frame.height - actionViewHeight, width: view.frame.width, height: view.frame.height))
        self.view.addSubview(actionsView)
        
        actionsView.recordButton.delegate = self
		actionsView.switchCameraButton.addTarget(self, action: #selector(cameraSwitchAction(_:)), for: .touchUpInside)
		actionsView.galleryButton.addTarget(self, action: #selector(chooseFromGalery(_:)), for: .touchUpInside)
		
        actionsView.setDefaultText(videoEnabled: self.videoEnabled)
        timerView = TimerView()
        timerView.backgroundColor = UIColor.black
        timerView.alpha = 0.6
        timerView.isHidden = true
        
        let timerWidth : CGFloat = 100.0
        timerView.frame = CGRect(x: (view.frame.width - timerWidth) / 2, y: 20, width: timerWidth, height: 40.0)
        
        timerView.sizeToFit()
        
        self.view.addSubview(timerView)
	}
    
    func presentMediaPicker(){
        if !UIImagePickerController.isSourceTypeAvailable(.savedPhotosAlbum){
            let alert = UIAlertController(title: "Oops", message: "Photos album is unavailable", preferredStyle: .alert)
            present(alert, animated: true, completion: nil)
            return
        }
        
        let mediaPicker = UIImagePickerController()
        if self.videoEnabled{
            mediaPicker.mediaTypes = UIImagePickerController.availableMediaTypes(for: .savedPhotosAlbum)!
        }
        else {
            mediaPicker.mediaTypes = [kUTTypeImage as String]
        }
        
        mediaPicker.sourceType = .savedPhotosAlbum
        mediaPicker.allowsEditing = false
        mediaPicker.delegate = self
        
        self.present(mediaPicker, animated: true, completion: nil)
    }
}

extension MediaRecorderViewController: UIImagePickerControllerDelegate {
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        guard let mediaType = info[UIImagePickerControllerMediaType] as? String else {
            return
        }
        
        if (mediaType  == (kUTTypeImage as String)){
            self.dismiss(animated: true, completion: {
              self.presentCropper(image: info[UIImagePickerControllerOriginalImage] as! UIImage)
            })
        }
            
        else if (mediaType  == (kUTTypeMovie as String)){
            self.dismiss(animated: true) {
                let vc = VideoTrimmerViewController(assetUrl: info[UIImagePickerControllerMediaURL] as! URL)!
                self.navigationController?.pushViewController(vc, animated: true)
            }
        }
    }
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        self.dismiss(animated: true, completion: { self.navigationController?.popViewController(animated: true)})
    }
    
    func presentCropper(assetURL: URL){
        let data = try! Data(contentsOf: assetURL)
        crop(UIImage(data: data)!)
    }
    
    func presentCropper(image: UIImage){
        crop(image)
    }

    func crop(_ image: UIImage){
        let cropper = RSKImageCropViewController(image: image, cropMode: RSKImageCropMode.square)
        cropper.delegate = self
        self.navigationController?.pushViewController(cropper, animated: true)
    }
}

extension MediaRecorderViewController: RSKImageCropViewControllerDelegate{
    
    func imageCropViewControllerDidCancelCrop(_ controller: RSKImageCropViewController){
        self.navigationController?.popViewController(animated: true)
    }

    func imageCropViewController(_ controller: RSKImageCropViewController, didCropImage croppedImage: UIImage, usingCropRect cropRect: CGRect) {
        
        let url = TempMediaFileWriter.saveImageToTempDirectory(croppedImage, withName: "tmpImg.png")
        NotificationCenter.default.post(name: Notification.Name.init(rawValue: MediaRecorderCompleted), object: self, userInfo: ["url": url ?? ""])
    }
}

extension MediaRecorderViewController: RecordButtonDelegate {
    public /// Sets the maximum duration of the video recording
    func setMaximumVideoDuration() -> Double {
        return maximumVideoDuration
    }
    
    /// Set UITapGesture to take photo
    
    public func buttonWasTapped() {
        takePhoto()
    }
    
    /// Set UILongPressGesture start to begin video
    
    public func buttonDidBeginLongPress() {
        if self.videoEnabled{
            startVideoRecording()
        }
        
    }
    
    /// Set UILongPressGesture begin to begin end video
    
    
    public func buttonDidEndLongPress() {
        if self.videoEnabled{
            stopVideoRecording()
        }
    }
    
    /// Called if maximum duration is reached
    
    public func longPressDidReachMaximumDuration() {
    }
}


extension MediaRecorderViewController: UINavigationControllerDelegate {
}

