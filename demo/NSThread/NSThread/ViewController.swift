//
//  ViewController.swift
//  NSThread
//
//  Created by xiangwenwen on 16/1/5.
//  Copyright © 2016年 xiangwenwen. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var imageView: UIImageView!
    var clickLock:Bool?
    var thread:NSThread?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        NSThread.detachNewThreadSelector("detacThread", toTarget: self, withObject: nil)
        
        
    }
    
    func oneThread(){
        //需要管理线程的生命周期、同步、加锁问题，这会导致一定的性能开销
        let url:String = "http://content.battlenet.com.cn/wow/media/screenshots/selfie/selfie001-large.jpg"
        let urlObject:NSURL = NSURL(string: url)!
        let request:NSURLRequest = NSURLRequest(URL: urlObject)
        var response:NSURLResponse?
        do{
            let data:NSData = try NSURLConnection.sendSynchronousRequest(request, returningResponse: &response)
            if let HTTPResponse = response as? NSHTTPURLResponse{
                print("状态码：\(HTTPResponse.statusCode)")
                print("============数据===========")
                print("============数据===========")
                self.clickLock = nil
                let current:NSThread = NSThread.currentThread()
                let main:NSThread = NSThread.mainThread()
                self.performSelectorOnMainThread("updateUI:", withObject: data, waitUntilDone: true)
            }
        }catch{
            
        }
    }
    
    func updateUI(node:AnyObject?){
        print("\(node)")
        self.imageView.image = UIImage(data: node as! NSData)
        self.thread = nil
    }
    
    func detacThread(){
        let wow:String = "魔兽世界"
        print("\(wow)")
        let delay:NSTimeInterval = 3.0
        self.performSelector("stopThread", withObject: nil, afterDelay: delay)
    }
    
    @IBAction func downloadImages(sender: UIButton) {
        if self.clickLock == nil{
            self.clickLock = true
            self.thread = NSThread(target: self, selector: "oneThread", object: nil)
            self.thread!.threadPriority = 1.0
            self.thread!.start()
        }
    }
    
    func stopThread(){
        self.thread?.cancel()
        self.thread = nil
        print("\(self.thread)  --- > 释放")
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

