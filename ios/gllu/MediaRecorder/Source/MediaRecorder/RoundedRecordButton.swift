
import UIKit

class RoundedRecordButton: RecorderButton {
    
    fileprivate var circleBorder: CALayer!
    fileprivate var innerCircle: UIView!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        drawButton()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        drawButton()
    }
    
    fileprivate func drawButton() {
        self.backgroundColor = UIColor.clear
        circleBorder = CALayer()
        circleBorder.backgroundColor = UIColor.clear.cgColor
        circleBorder.borderWidth = 5.0
        circleBorder.borderColor = UIColor.white.cgColor
        circleBorder.bounds = self.bounds
        circleBorder.position = CGPoint(x: self.bounds.midX, y: self.bounds.midY)
        circleBorder.cornerRadius = self.frame.size.width / 2
        layer.insertSublayer(circleBorder, at: 0)
        
        innerCircle = UIView(frame: CGRect(x: 0, y: 0, width: 62.0, height: 62.0))
        innerCircle.center = CGPoint(x: self.bounds.midX, y: self.bounds.midY)
        innerCircle.backgroundColor = UIColor.lightGray
        innerCircle.layer.cornerRadius = innerCircle.frame.size.width / 2
        innerCircle.clipsToBounds = true
        self.addSubview(innerCircle)
    }
    
    open func growButton() {
        UIView.animate(withDuration:0.3, animations: {
            self.innerCircle.backgroundColor = UIColor.red
            self.innerCircle.transform = CGAffineTransform(scaleX: 1.6, y: 1.6)
        }, completion: { b in
            
            UIView.animate(withDuration:0.1, animations:{
                self.innerCircle.transform = CGAffineTransform(scaleX: 1.0, y: 1.0)
            })})
    }
    
    open func shrinkButton() {
        UIView.animate(withDuration: 0.3, delay: 0.0, options: .curveEaseOut, animations: {
            self.innerCircle.backgroundColor = UIColor.lightGray
        }, completion: nil)
    }
}
