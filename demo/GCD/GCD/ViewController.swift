//
//  ViewController.swift
//  GCD
//
//  Created by xiangwenwen on 15/12/21.
//  Copyright © 2015年 xiangwenwen. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        //串行与并行的区别
        
        // 将一个block提交到并行任务队列中
        let phone:dispatch_queue_t = dispatch_queue_create("com.wen.iphone", DISPATCH_QUEUE_CONCURRENT)
        dispatch_async(phone){
            [unowned self] _ in
            
            let myPhone:String = "iPhone 6 Plus"
            print("my Phone is \(myPhone)")
            
            //切换到主线程
            dispatch_async(dispatch_get_main_queue()){
                [unowned self] _ in
                let myPhoneMain:String = "main queue iPhone";
                print("main queue is \(myPhoneMain)")
            }
        }
        
        //将一个block提交到串行任务队列中
        let window:dispatch_queue_t = dispatch_queue_create("com.wen.window", DISPATCH_QUEUE_SERIAL)
        dispatch_async(window){
            [unowned self] _ in
            let myWindow:String = "window 7"
            print("我的电脑操作系统：\(myWindow)")
        }
        
        //将一个block提交到延迟任务队列中
        // NSEC_PER_SEC 一秒有多少纳秒
        // USEC_PER_SEC 一秒有多少毫秒
        // NSEC_PER_USEC 一毫秒有多少纳秒
        
        let exeTime:dispatch_time_t = dispatch_time(DISPATCH_TIME_NOW, 10)
        let mac:dispatch_queue_t = dispatch_queue_create("com.wen.mac", DISPATCH_QUEUE_CONCURRENT)
        dispatch_after(exeTime, mac){
            [unowned self] _ in
            
            let myMac:String = "MacBook Pro"
            print("my mac is \(myMac)")
        }
        
        
        //将一个block提交到只执行一次的任务中，dispatch_once_t必须要是全局或者static变量
        struct oneToken{
            static var onePred:String? = nil
            static var toKen:dispatch_once_t = 0;
        }
        dispatch_once(&oneToken.toKen){
            [unowned self] _ in
            oneToken.onePred = "icepy"
        }
        print("once pred is \(oneToken.onePred)")
        
        
        //将block挂起或者恢复（虽然可以挂起，但是不能保证可以立即停止对列上正在运行的block）
        let icepy:dispatch_queue_t = dispatch_queue_create("com.wen.suspend", DISPATCH_QUEUE_SERIAL)
        dispatch_async(icepy){
            NSThread.sleepForTimeInterval(8)
            let callback:String = "Swift ---"
            print("延迟执行第一个提交:\(callback)")
        }
        dispatch_async(icepy){
            NSThread.sleepForTimeInterval(8)
            let callback:String = "Objective-C ---"
            print("延迟执行第二个提交:\(callback)")
        }
        
        
        print("延迟1秒")
        NSThread.sleepForTimeInterval(1)
        print("--- 挂起")
        dispatch_suspend(icepy)
        
        print("延迟10秒")
        NSThread.sleepForTimeInterval(8)
        print("--- 恢复")
        dispatch_resume(icepy)
        
        //向一个队列添加多少block，会阻塞外部线程
        let more:dispatch_queue_t = dispatch_queue_create("com.wen.more", DISPATCH_QUEUE_SERIAL)
        dispatch_apply(3, more){
            [unowned self] (i:Int) -> Void in
            
            print("apply loop \(i)")
        }
        print("after apply")
        
        //dispatch_group  ---------------
        //创建dispatch_group
        //添加任务
        //添加结束任务
        let group:dispatch_group_t = dispatch_group_create()
        let thread1:dispatch_queue_t = dispatch_queue_create("com.wen.thread1", DISPATCH_QUEUE_CONCURRENT)
        let thread2:dispatch_queue_t = dispatch_queue_create("com.wen.thread2", DISPATCH_QUEUE_CONCURRENT)
        let notify:dispatch_queue_t = dispatch_queue_create("com.wen.notify", DISPATCH_QUEUE_SERIAL)
        dispatch_group_async(group, thread1){
            _ in
            let myBook:String = "JavaScript"
            print("my book is \(myBook)")
        }
        
        dispatch_group_async(group, thread2){
            _ in
            let myBook:String = "Swift"
            print("my book is \(myBook)")
        }
        dispatch_group_notify(group, notify){
            _ in
            let myPro:String = "web developer and iOS developer"
            print("my pro is \(myPro)")
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

