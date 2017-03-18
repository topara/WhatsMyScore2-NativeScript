import {Component, Inject, OnInit} from '@angular/core';
import {Headers, Http, RequestOptionsArgs} from "@angular/http";

import {ActionItem} from "ui/action-bar";
import {AppRoutingService} from '../../context/router.context';
import {Logger} from "../../providers/logger";
import {NxDrawer} from "../../controls/drawer/drawer";
import {PageRoute} from 'nativescript-angular';
import {Settings} from "../../providers/routes/routes";
import {StartListControl} from "./stat.list.start.control";
import {StartListSearchControl} from "./start.list.search.control";
import {StartNav} from "../nav/start.nav.control";
import {alert} from "ui/dialogs";

//import {Observable, EventData } from "data/observable";


@Component({
    selector: "start",
    templateUrl: "pages/start/start.page.html",
})
export class StartPage implements OnInit
{
    constructor(private logger:Logger, 
        private http: Http, 
        private appRouteingService: AppRoutingService
        )
    {
        this.logger.Notify("Start Page - constructor hit"); 
    }
    
    ngOnInit()
    {
    }

  
    public refresh(args: any){
        console.log(args);
        setTimeout(()=> {
            args.completed();
        }, 1000);
        
    }
}
