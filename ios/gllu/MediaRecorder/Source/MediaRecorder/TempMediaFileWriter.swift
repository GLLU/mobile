
import Foundation

struct TempMediaFileWriter{
    
    static func saveImageToTempDirectory(_ image: UIImage, withName: String) -> String? {
        if let data = UIImagePNGRepresentation(image) {
            let dirPath = NSTemporaryDirectory() as NSString
            let imageFileUrl = URL(fileURLWithPath: dirPath.appendingPathComponent(withName) as String)
            do {
                try data.write(to: imageFileUrl)
                print("Successfully saved image at path: \(imageFileUrl)")
                return imageFileUrl.absoluteString
            } catch {
                print("Error saving image: \(error)")
            }
        }
        return nil
    }

}

