//
//  ViewController.swift
//  NSOperation
//
//  Created by xiangwenwen on 15/12/29.
//  Copyright © 2015年 xiangwenwen. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        let queue:NSOperationQueue = NSOperationQueue()
        
        //读取文件
        let operation1:NSBlockOperation = NSBlockOperation(block: {
            _ in
            
            let path:String = NSBundle.mainBundle().pathForResource("gulpfile", ofType: "js")!
            let manager:NSFileManager = NSFileManager.defaultManager()
            let isTrue:Bool = manager.fileExistsAtPath(path)
            if isTrue {
                print("文件存在读取 \(path)")
                do{
                    let content:String = try NSString(contentsOfURL: NSURL(string: path)!, encoding: NSUTF8StringEncoding) as String
                    print("----------读取文件数据---------")
                    print("\(content)")
                    print("----------读取文件数据---------")
                }catch{
                    print("读取错误")
                }
            }
        })
        
        //网络请求
        let operation2:NSBlockOperation = NSBlockOperation(block: {
            _ in
            
            let url:String = "https://github.com/icepy"
            let urlObject:NSURL = NSURL(string: url)!
            let request:NSURLRequest = NSURLRequest(URL: urlObject)
            var response:NSURLResponse?
            do{
                let data:NSData = try NSURLConnection.sendSynchronousRequest(request, returningResponse: &response)
                if let HTTPResponse = response as? NSHTTPURLResponse{
                    print("状态码：\(HTTPResponse.statusCode)")
                    print("============数据===========")
                    print("\(data)")
                    print("============数据===========")
                }
            }catch{
                
            }
        })
        //网络请求在读取文件之前
        operation2.addDependency(operation1)
        
        queue.addOperation(operation2)
        queue.addOperation(operation1)
        //取消网络请求
        operation2.cancel()
        print("网络请求-同步不会阻塞显示这里")
        print("读取文件不会阻塞显示这里")
        
        //NSInvocationOperation 在 Swift不存在相关API
    
        let operation3 = NSBlockOperation(block: {
            _ in
            print("不用NSOperationQueue")
        })
        operation3.start()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}

