
import { EventEmitter, ViewChildren, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { Router, Instruction,  } from "@angular/router-deprecated";
import { Location,LocationStrategy } from '@angular/common';

import { Control } from "../../decorators/control";
import { Logger} from "../../providers/logger";

import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { MaterialIcon } from "../icons/material-icon";

@Control({
    selector:"nx-nav-back",
    styleUrls: ["./controls/nav/nav.common.css"], 
    // template: `
    //     <ion-icon item-left icon="ion-chevron-left" ></ion-icon>
    // `,
    template: `
        <StackLayout orientation="horizontal" (tap)="back($event)">
            <Label text="chevron_left" [material-icon] class="title nav-icon nav-icon-bold"></Label>
            <Label text="Back" class="title"></Label>
            
        </StackLayout>
    `,
    directives: [MaterialIcon],
    providers: [],
})
export class NxNavBack {
    
    public constructor(
        private router: Router, 
        private location: Location,
        private element: ElementRef,
        private logger: Logger) {       
    }

    public back()
    {
        this.logger.Notify("Back");
        try{this.location.back();}
        catch(ex){}
        
        
    }
       
    public menuSelected = new Subject<boolean>();
       
    public tapWrapper = (args: any) => {
        this.logger.Notify("tap clicked on menu");
        this.menuSelected.next(true);
        
    };
        
    private ngAfterViewInit()
    {
        
    }
}