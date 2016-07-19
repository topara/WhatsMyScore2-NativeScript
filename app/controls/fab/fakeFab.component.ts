import { Component, ViewChild, ElementRef, Directive, Input, Output, EventEmitter, ContentChildren } from "@angular/core";
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { registerElement, ViewClass } from "nativescript-angular/element-registry";
import { StackLayout} from "ui/layouts/stack-layout";
import { AnimationPromise } from "ui/animation";

@Component({
  selector: '',
  template: `
    <AbsoluteLayout class="fab-container"
        [class.left]="horizontalAlign == 'left'"
        [class.right]="horizontalAlign == 'right'"
        [class.h-center]="horizontalAlign == 'center'"
        [class.top]="veritcalAlign == 'top'"
        [class.bottom]="veritcalAlign == 'bottom'"
        [class.v-center]="veritcalAlign == 'center'"
    >
        <StackLayout class="fab-button-content" style="z-index: 1;">
            <!--<ng-content></ng-content>
            -->
            <Label [text]="text" class="fab-icon material-icons md-light" 
                [class.md-18]="fontSize == 'md-18'"
                [class.md-24]="fontSize == 'md-24'"
                [class.md-36]="fontSize == 'md-36'"
                [class.md-48]="fontSize == 'md-48'"
            textWrap="false"></Label>
        </StackLayout>
    
        <GridLayout>
            <StackLayout>
                
            </StackLayout>
            
        </GridLayout>
    </AbsoluteLayout>
  `
})
export class NxFakeFab {

  constructor() {

  }

  @Input("horizontal-align")
    public horizontalAlign : string = "right";
    @Input("vertical-align")
    public veritcalAlign : string = "top";
    
    @Input("text")
    public text : string = "face"
    
    @Input("font-size")
    public fontSize : string = "md-24"; 
        
    @ViewChild("fab")
    public element : ElementRef; 
            
    public tapped($event){
        console.log("tapped on fab");
        this.tap.next($event);
    }
    
    public fabTap(){
        console.log("fab pressed");
        this.tap.next({
            source : this.element.nativeElement
        })
    }
       
    public tap = new EventEmitter(); 
}