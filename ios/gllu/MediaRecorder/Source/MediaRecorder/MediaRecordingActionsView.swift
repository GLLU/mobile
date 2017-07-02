
import UIKit

class MediaRecordingActionsView: UIView {
    
    @IBOutlet var contentView: UIView!
    
    @IBOutlet open weak var galleryButton: UIButton!

    @IBOutlet open weak var switchCameraButton: UIButton!

    @IBOutlet open weak var textLabel: UILabel!
    @IBOutlet open weak var recordButton: RoundedRecordButton!
    
    let defaultText = "Hold for video, tap for photo"
    let defaultNoVideoText = "Tap to take a photo"
    let actionText = "Release to stop video"
    
    public required init?(coder aDecoder: NSCoder){
        super.init(coder: aDecoder)
        setup()
    }
    
    open func setDefaultText(videoEnabled: Bool){
        self.textLabel.text = videoEnabled ? defaultText : defaultNoVideoText
    }
    
    open func setActionText(){
        self.textLabel.text = actionText
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    open func setup(){
        contentView = self.loadViewFromNib()
      let ff = contentView.frame
      contentView.frame = CGRect(x: ff.origin.x, y: ff.origin.y, width: UIScreen.main.bounds.width, height: ff.size.height)
        self.addSubview(contentView)
    }
    
    func loadViewFromNib() -> UIView!{
        let bundle = Bundle(for: type(of: self))
        let nib = UINib(nibName: String(describing: type(of: self)), bundle: bundle)
        let view = nib.instantiate(withOwner: self, options: nil)[0] as! UIView
        return view
    }
}
