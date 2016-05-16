import {Inject, Component, OnInit } from '@angular/core';
import {Router} from "@angular/router-deprecated";
//import {Observable, EventData } from "data/observable";
import {alert} from "ui/dialogs";
import {ActionItem} from "ui/action-bar";

import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";

import {Settings} from "../../providers/routes/routes";
import {NxDrawer} from "../../controls/drawer/drawer";
import {StartNav} from "../nav/start.nav.control";

@Page({
    selector: "start",
    //I've moved directives to Page decorator .. 
    templateUrl: "pages/start/start.page.html",
    directives: [StartNav]
})
export class StartPage implements OnInit
{
    constructor(private logger:Logger)
    {
        this.logger.Notify("Start Page - constructor hit"); 
    }
    
    ngOnInit()
    {
    }

  
    public refresh(args: any){
        setTimeout(()=> {
            args.completed();
        }, 1000);
        
    }
}