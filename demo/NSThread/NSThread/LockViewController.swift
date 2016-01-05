//
//  LockViewController.swift
//  NSThread
//
//  Created by xiangwenwen on 16/1/5.
//  Copyright © 2016年 xiangwenwen. All rights reserved.
//

import UIKit

class LockViewController: UIViewController {
    
    var theLock:NSLock?
    var condition:NSCondition?
    var threadOne:NSThread?
    var threadTwo:NSThread?
    var index:Int?
    var count:Int?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.index = 0
        self.count = 100
        self.theLock = NSLock()
        self.condition = NSCondition()
        self.threadOne = NSThread(target: self, selector: "threadRun", object: nil)
        self.threadOne?.name = "icepy-one"
        self.threadOne?.start()
        self.threadTwo = NSThread(target: self, selector: "threadRun", object: nil)
        self.threadTwo?.name = "icepy-two"
        self.threadTwo?.start()
    }
    
    func threadRun(){
        while true{
            self.theLock?.lock()
            if self.count! >= 0 {
                NSThread.sleepForTimeInterval(0.08)
                self.index = 100 - self.count!
                print("数目-----> \(self.count) 出售 ----> \(self.index) 线程名 ----> \(NSThread.currentThread().name)")
                self.count!--
            }else{
                break
            }
            self.theLock?.unlock()
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
        //释放内存，内存警告的时候
    }
}
