import { Control } from "../../decorators/control";
import { ViewChild, ViewChildren, ElementRef, HostListener, Host, Directive, Component, ContentChild, TemplateRef, ViewContainerRef} from 'angular2/core';

import { Logger} from "../../providers/logger";

@Directive({
    selector: "[nav-title]",
    properties: [
        "class: nav-title" 
    ]
})
export class NxTitle {
    @ViewChild('item') private container: ElementRef
    
    public constructor(private logger: Logger ){
        //this.logger.Notify("nx-nav-title");
    }
          
    private ngAfterViewInit()
    {
        
    }
}