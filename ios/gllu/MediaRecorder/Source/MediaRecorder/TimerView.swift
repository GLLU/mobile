

import UIKit

class TimerView : UIView {
    
    fileprivate var start: TimeInterval = 0.0;
    fileprivate var end: TimeInterval = 0.0;
    
    var countDownTimer : Timer = Timer()
    fileprivate var timerValue = 0
    fileprivate var label : UILabel!
    fileprivate var beeper : UIView!
    let beeperHeight : CGFloat = 14.0
    
    
    override init (frame : CGRect) {
        super.init(frame : frame)
        
        self.label = createLabel()
        self.beeper = createBeeper()
        let container = UIView()
        
        self.label.translatesAutoresizingMaskIntoConstraints = false
        self.beeper.translatesAutoresizingMaskIntoConstraints = false
        container.translatesAutoresizingMaskIntoConstraints = false
        
        self.addSubview(container)
        container.addSubview(self.label)
        container.addSubview(self.beeper)
        
        self.addConstraints([
            NSLayoutConstraint(item: self.beeper, attribute: .leading, relatedBy: .equal, toItem: container, attribute: .leading, multiplier: 1.0, constant: 0.0),
            NSLayoutConstraint(item: self.beeper, attribute: .centerY, relatedBy: .equal, toItem: container, attribute: .centerY, multiplier: 1.0, constant: 0.0),
            NSLayoutConstraint(item: self.label, attribute: .trailing, relatedBy: .equal, toItem: container, attribute: .trailing, multiplier: 1.0, constant: 0.0),
            NSLayoutConstraint(item: self.label, attribute: .leading, relatedBy: .equal, toItem: self.beeper, attribute: .trailing, multiplier: 1.0, constant: 10.0),
            NSLayoutConstraint(item: self.label, attribute: .centerY, relatedBy: .equal, toItem: container, attribute: .centerY, multiplier: 1.0, constant: 0.0),
            NSLayoutConstraint(item: self.beeper, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1.0, constant: beeperHeight),
            NSLayoutConstraint(item: self.beeper, attribute: .width, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1.0, constant: beeperHeight),
            NSLayoutConstraint(item: container, attribute: .centerX, relatedBy: .equal, toItem: self, attribute: .centerX, multiplier: 1.0, constant: 0.0),
            NSLayoutConstraint(item: container, attribute: .top, relatedBy: .equal, toItem: self, attribute: .top, multiplier: 1.0, constant: 10.0),
            NSLayoutConstraint(item: container, attribute: .bottom, relatedBy: .equal, toItem: self, attribute: .bottom, multiplier: 1.0, constant: -10.0)])
        
        self.layer.masksToBounds = false
        self.layer.cornerRadius = 6.0
        
        self.setNeedsLayout()
    }
    
    required init(coder aDecoder: NSCoder) {
        fatalError("This class does not support NSCoding")
    }
    
    fileprivate func createLabel() -> UILabel{
        let label = UILabel()
        label.font = getFont()
        label.textColor = UIColor.white
        return label
    }
  
  func getFont() -> UIFont{
    if #available(iOS 8.2, *) {
      return UIFont.systemFont(ofSize: 20.0, weight: UIFontWeightMedium)
    } else {
      return UIFont.systemFont(ofSize: 20.0)
    }
  }
  
    func createBeeper() -> UIView{
        let beeper = UIView()
        beeper.backgroundColor = UIColor.red
        beeper.layer.masksToBounds = true
        beeper.layer.cornerRadius = beeperHeight / 2.0
        return beeper
    }
    
    
    
    fileprivate func updateLabel(_ value: Int) {
        self.setLabelText(self.timeFormatted(value))
    }
    
    fileprivate func setLabelText(_ value: String) {
        self.label.text = value
        self.label.sizeToFit()
    }
    
    fileprivate func timeFormatted(_ totalSeconds: Int) -> String {
        let seconds: Int = totalSeconds % 60
        let minutes: Int = (totalSeconds / 60) % 60
        return String(format: "%02d:%02d", minutes, seconds)
    }
    
    @objc func countdown() {
        self.timerValue += 1
        self.setLabelText(self.timeFormatted(self.timerValue))
    }
    
    func setTimer(_ value: Int) {
        self.timerValue = value
        self.updateLabel(value)
    }
    
    func startClockTimer() {
        self.countDownTimer.invalidate()
        self.setTimer(0)
        self.countDownTimer = Timer.scheduledTimer(
            timeInterval: 1.0,
            target: self,
            selector:#selector(countdown),
            userInfo: nil,
            repeats: true
        )
        self.startAnimation()
    }
    
    func stopClock(){
        self.countDownTimer.invalidate()
        self.setTimer(0)
        self.beeper.layer.removeAllAnimations()
    }
    
    func startAnimation(){
        UIView.animate(withDuration: 0.65, delay: 0.0, options: [.curveEaseInOut, .autoreverse, .repeat], animations: {
            self.beeper.alpha = 0.0
        }, completion: { b in
            self.beeper.alpha = 1.0
        })
    }
    
}
