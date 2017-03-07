import * as Rx from 'rxjs/Rx';

import { AbsoluteLayout } from "ui/layouts/absolute-layout";
import { AnimationPromise } from "ui/animation";
import { Button } from "ui/button";
import { Component } from '@angular/core';
import { ContentChildren } from '@angular/core';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { GridLayout } from "ui/layouts/grid-layout";
import { Logger } from "../../providers/logger";
import { NxNav } from "../nav/nav";
import { PanGestureEventData } from "ui/gestures";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular"
import { StackLayout } from "ui/layouts/stack-layout";
import { ViewChild } from '@angular/core';

@Directive({
    selector : "[nx-drawer-close]",
})
export class NxCloseDrawer
{

} 

@Component({
    selector:"nx-drawer",
    moduleId: module.id,
    styleUrls: ["drawer.common.css"],
    template:`
        <RadSideDrawer #main [transition]="sideDrawerTransition" tkExampleTitle tkToggleNavButton>
        
            <!-- drawer -->
            <StackLayout tkDrawerContent class="side-page" #asideLeft>
                <ng-content select="[drawer-aside-left]"></ng-content>
            </StackLayout>
            <!-- end of drawer -->
            <!-- main content --> 
            <StackLayout #centerContent tkMainContent>
                <ng-content></ng-content>
            </StackLayout> 
            <!-- Main content --> 
        </RadSideDrawer>
    `
    // template:`
    
    //     <GridLayout #grid rows="*" columns="300, *">
            
    //         <StackLayout  row="0" col="0" colSpan="2">
    //             <StackLayout #centerContent>
    //                 <ng-content></ng-content>
    //             </StackLayout>
    //         </StackLayout> 

    //         <AbsoluteLayout class="side-page" #asideLeftParent  opacity="0">
              
    //             <StackLayout #asideLeft col="0">
    //                 <ng-content select="[drawer-aside-left]"></ng-content>
    //             </StackLayout>   
                        
    //         </AbsoluteLayout>
             
    //     </GridLayout>

    // `
})
export class NxDrawer {
    private childNavs : Array<NxNav>;
    private asideLeftContent : ElementRef;
    private asideRightContent: ElementRef;
    private centerContent: ElementRef;
    private sidebar : RadSideDrawerComponent;
    
    public constructor(private logger: Logger ){
        //this.logger.Notify("nx-drawer");
    }
    
    private State = {
        Open : false,
        HasLeft : false,
        HasRight: false,
        NavAttached: false
    };
    
    public OpenLeftAside() {
        this.sidebar.sideDrawer.toggleDrawerState();
    }
    
    public CloseLeftAside() {
        this.sidebar.sideDrawer.toggleDrawerState();
    }

    

    private ngOnInit(){
        //let center: StackLayout = this.centerContent.nativeElement;
    } 

    
    
    @ViewChild('asideLeft') 
    set _asideLeft(item: ElementRef){
        this.asideLeftContent = item;
        this.State.HasLeft = true;
    }
    
    @ViewChild('asideRight') 
    set _asideRight(item: ElementRef){
        this.asideRightContent = item;
        this.State.HasRight = true;    
    }
    
    @ViewChild('centerContent')
    set _setCenter(item: ElementRef){
        this.centerContent = item;
    }

    @ViewChild(RadSideDrawerComponent)
    set _setMain(item: RadSideDrawerComponent){
        this.sidebar = item;
    }
        
    @ContentChildren(NxNav)
    set _setNav(items: any) {
        if(this.State.NavAttached){ return; }
        
        ///this.logger.Notify("drawer.nav set: " + items);
        this.State.NavAttached = true;
        this.childNavs = items.toArray();
        
        //this.logger.Notify("nav items: " + this.childNavs.length);
        
        var anySelected = this.childNavs.map((item) => item.menuSelected);
                
        Rx.Observable.from(anySelected).flatMap(x=>x).subscribe(() => { 
            this.logger.Notify("nav menu tapped -> open side");
            //let grid: StackLayout = this.grid.nativeElement;

            if(this.State.Open){ this.CloseLeftAside(); }
            else{ this.OpenLeftAside(); }

        });
    }
}