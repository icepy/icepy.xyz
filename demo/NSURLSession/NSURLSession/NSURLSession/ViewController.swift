//
//  ViewController.swift
//  NSURLSession
//
//  Created by xiangwenwen on 15/12/14.
//  Copyright © 2015年 xiangwenwen. All rights reserved.
//

//192.168.0.101

import UIKit

private let cacheDirPath:NSString = NSSearchPathForDirectoriesInDomains(NSSearchPathDirectory.CachesDirectory, NSSearchPathDomainMask.UserDomainMask, true)[0] as NSString
private let docDirPath:NSString = NSSearchPathForDirectoriesInDomains(NSSearchPathDirectory.DocumentDirectory, NSSearchPathDomainMask.UserDomainMask, true)[0] as NSString

let boundary = "WenUGl0YXlh"

extension String {
    var STNSData: NSData {
        return self.dataUsingEncoding(NSUTF8StringEncoding)!
    }
    var STBase64: String! {
        let utf8EncodeData: NSData! = self.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: true)
        let base64EncodingData = utf8EncodeData.base64EncodedStringWithOptions(NSDataBase64EncodingOptions.Encoding64CharacterLineLength)
        return base64EncodingData
    }
}

struct STFile{
    let fileName:String!
    let fileURL:String?
    let fileData:NSData?
    internal init(name:String,url:String?,data:NSData?){
        self.fileName = name
        self.fileURL = url
        self.fileData = data
    }
}

struct STFType{
    let fileName:String!
    let fileType:String!
    internal init(name:String,type:String){
        self.fileName = name
        self.fileType = type
    }
}

class ViewController: UIViewController {
    
    lazy var url:NSURL = {
        var _url:NSURL? = NSURL(string: "http://127.0.0.1:8900/add")
        return _url!
    }()
    
    lazy var manager:NSFileManager = {
        return NSFileManager.defaultManager()
    }()
    
    @IBOutlet weak var imageView: UIImageView!
    
    var doc:NSString?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    /**
     普通GET请求
     
     - parameter sender: <#sender description#>
     */
    @IBAction func URLGet(sender: UIButton) {
        let requets:NSURLRequest = NSURLRequest(URL: self.url)
        let configuration:NSURLSessionConfiguration = NSURLSessionConfiguration.defaultSessionConfiguration()
        let session:NSURLSession = NSURLSession(configuration: configuration)
        let task:NSURLSessionDataTask = session.dataTaskWithRequest(requets, completionHandler: {
            [unowned self](data:NSData?,response:NSURLResponse?,error:NSError?)->Void in
            if error == nil{
                do{
                    let responseData:NSDictionary = try NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.AllowFragments) as! NSDictionary
                    print("普通GET请求 --- > \(responseData)")
                }catch{
                
                }
            }
        })
        task.resume()
    }
    
    /**
     设置头以及带参数
     
     - parameter sender: <#sender description#>
     */
    @IBAction func URLGetSetHeaders(sender: UIButton) {
        let url:NSURL = NSURL(string: "http://127.0.0.1:8900/add?id=1&session=icepyquery")!
        let request:NSMutableURLRequest = NSMutableURLRequest(URL:url)
        request.addValue("ICEPY", forHTTPHeaderField: "Session-Control-Key")
        let configuration:NSURLSessionConfiguration = NSURLSessionConfiguration.defaultSessionConfiguration()
        let session:NSURLSession = NSURLSession(configuration: configuration)
        let task:NSURLSessionDataTask = session.dataTaskWithRequest(request, completionHandler: {
            [unowned self](data:NSData?,response:NSURLResponse?,error:NSError?)->Void in
            if error == nil{
                do{
                    let responseData:NSDictionary = try NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.AllowFragments) as! NSDictionary
                    print("普通带头与参数的GET请求 --- > \(responseData)")
                }catch{
                
                }
            }
        })
        task.resume()
    }
    
    /**
     post请求
     
     - parameter sender: <#sender description#>
     */
    @IBAction func URLPost(sender: UIButton) {
        let request:NSMutableURLRequest = NSMutableURLRequest(URL: self.url)
        request.HTTPMethod = "POST"
        do{
            let data:NSData = try NSJSONSerialization.dataWithJSONObject(NSDictionary(object: "icepy", forKey: "name"), options: NSJSONWritingOptions.PrettyPrinted)
            request.HTTPBody = data
        }catch{
        
        }
        request.addValue("wen", forHTTPHeaderField: "Session-Control-Key")
        let configuration:NSURLSessionConfiguration = NSURLSessionConfiguration.defaultSessionConfiguration()
        let session:NSURLSession = NSURLSession(configuration: configuration)
        let task:NSURLSessionDataTask = session.dataTaskWithRequest(request, completionHandler: {
            [unowned self](data:NSData?,response:NSURLResponse?,error:NSError?) -> Void in
            if error == nil{
                do{
                    let responseData:NSDictionary = try NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.AllowFragments) as! NSDictionary
                    print("普通空的POST请求 --- > \(responseData)")
                }catch{
                    
                }
            }
        })
        task.resume()
    }
    
    /**
     下载
     
     - parameter sender: <#sender description#>
     */
    @IBAction func URLDownloadFile(sender: UIButton) {
        let url:NSURL = NSURL(string: "http://content.battlenet.com.cn/wow/media/screenshots/screenshot-of-the-day/warlords-of-draenor/warlords-of-draenor-ss0420-large.jpg")!
        
        let request:NSURLRequest = NSURLRequest(URL: url)
        let configuration:NSURLSessionConfiguration = NSURLSessionConfiguration.defaultSessionConfiguration()
        let session:NSURLSession = NSURLSession(configuration: configuration)
        let task = session.downloadTaskWithRequest(request, completionHandler: {
            [unowned self](location:NSURL?,response:NSURLResponse?,error:NSError?) -> Void in
            if error == nil{
                if let fromPath = location!.path{
                    let file:NSString = docDirPath.stringByAppendingPathComponent("wow.png")
                    if self.removeFile(){
                        do{
                            try self.manager.moveItemAtPath(fromPath, toPath: file as String)
                            dispatch_async(dispatch_get_main_queue(), {
                                [unowned self] _ in
                                self.imageView.image = UIImage(named: file as String)
                            })
                        }catch{
                            print("移动临时数据到保存目录出错")
                        }
                    }
                }
            }
        })
        task.resume()
    }
    
    private func removeFile() -> Bool{
        let file:NSString = docDirPath.stringByAppendingPathComponent("wow.png")
        if self.manager.fileExistsAtPath(file as String){
            do{
                try self.manager.removeItemAtPath(file as String)
            }catch{
                return false
            }
        }
        return true
    }
    
    /**
     POST上传
     
     - parameter sender: <#sender description#>
     */
    @IBAction func URLUpdatesFile(sender: UIButton) {
        let url:NSURL = NSURL(string: "http://pitayaswift.sinaapp.com/pitaya.php")!
        //模拟表单提交
        let request:NSMutableURLRequest = NSMutableURLRequest(URL:url)
        request.HTTPMethod = "POST"
        request.addValue("Content-Type", forHTTPHeaderField: "multipart/form-data; boundary=\(boundary)")
        request.HTTPBody = self.setRequestFile(request)
        let configuration:NSURLSessionConfiguration = NSURLSessionConfiguration.defaultSessionConfiguration()
        let session:NSURLSession = NSURLSession(configuration: configuration)
        let task:NSURLSessionDataTask = session.dataTaskWithRequest(request, completionHandler: {
            [unowned self](data:NSData?,response:NSURLResponse?,error:NSError?) -> Void in
                print(error)
        })
        task.resume()
    }
    
    private func setRequestFile(request:NSMutableURLRequest)-> NSData{
        var header = request.allHTTPHeaderFields
        let body = NSMutableData()
        let fileType:STFType = STFType(name: "logo", type: "jpg")
        let codeName:String = "file"
        let fileUrl:String? =  NSBundle.mainBundle().pathForResource(fileType.fileName, ofType:fileType.fileType)
        //multipart/form-data  上传所使用的Content-Type
        //image/jpg  upload task
        if let contentType:AnyObject = header!["Content-Type"]{
            print("set Content-Type --- \(contentType)")
        }else{
            print("set Content-Type --- empty")
        }
        let STFileParams:[STFile] = [STFile(name: codeName, url: fileUrl,data:nil)]
        for file:STFile in STFileParams{
            if file.fileData == nil{
                body.appendData("--\(boundary)\r\n".STNSData)
                let _fileURL = NSURL(fileURLWithPath: file.fileURL!)
                body.appendData("Content-Disposition: form-data; name=\"\(file.fileName)\"; filename=\"\(_fileURL.lastPathComponent)\"\r\n\r\n".STNSData)
                if let fileData = NSData(contentsOfFile: file.fileURL!){
                    body.appendData(fileData)
                    body.appendData("\r\n".STNSData)
                }
            }else{
                body.appendData(file.fileData!)
            }
        }
        body.appendData("--\(boundary)--\r\n".STNSData)
        return body
    }
}

