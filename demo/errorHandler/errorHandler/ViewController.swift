//
//  ViewController.swift
//  errorHandler
//
//  Created by xiangwenwen on 16/1/12.
//  Copyright © 2016年 xiangwenwen. All rights reserved.
//

import UIKit


/*

    自己设计的场景，假设在魔兽世界中，熊猫人可以成为中立阵营（翻墙出岛，正常流程是需要选择一个阵营的），其他两个阵营为联盟与部落
    
    如果是熊猫人（假设翻墙了），那么就抛出一个无分组的错误
    
    如果人类选择了部落，那么将抛出一个LGroup错误

    如果兽人选择了联盟，那么将抛出一个BGroup错误

*/

enum GroupError:ErrorType{
    case NoneGroup
    case LGroup
    case BGroup
}

func selectorGroup(tag:Int,type:String) throws{
    switch tag{
        case 1:
            if type != "human"{
                throw GroupError.LGroup
            }
            break
        case 2:
            if type != "orc"{
                throw GroupError.BGroup
            }
            break
        default:
            if type == "panda"{
                throw GroupError.NoneGroup
            }
            break
    }
}

func selectorNSError(inout error:NSError){
    error = NSError(domain: "Selector Group Error", code: 500, userInfo: ["message":"选择错误"])
}

class ViewController: UIViewController {
    
    var error:NSError?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let num = UnsafeMutablePointer<Int>.alloc(12)
        num.memory = 1
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func NSErrorHandler(sender: UIButton) {
        var error:NSError = NSError(domain: "", code: 100, userInfo: nil)
        selectorNSError(&error)
        print("\(error)")
    }
    
    @IBAction func orcSelector(sender: UIButton) {
        do{
            try selectorGroup(1, type: "orc")
        }catch{
            print("兽人，请不要选择联盟")
        }
    }
    
    @IBAction func pandaSelector(sender: UIButton) {
        do{
            try selectorGroup(0, type: "panda")
        }catch{
            print("熊猫人必须选择一个阵营")
        }
    }

    @IBAction func humanSelector(sender: UIButton) {
        do{
            try selectorGroup(2, type: "human")
        }catch{
            print("人类，请不要选择部落")
        }
    }
}

