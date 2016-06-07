import { Component, ChangeDetectionStrategy } from '@angular/core';
import {NgIf, NgFor} from "@angular/common";
// import {NxNav} from "../controls/nav/nav";
// import {NxList} from "../controls/list/list";
// import {NxListItem} from "../controls/list/list-item";
// import {NxHeader} from "../controls/list/header";
// import {NxCard} from "../controls/card/card.control";
// import {NxDrawer} from "../controls/drawer/drawer";
// import {NxContent} from "../controls/content/content.control";
// import {NxPullToRefresh} from "../controls/pullToRefresh/pullToRefresh.control";
import {controls} from "../controls/all";
import {IonIcon,NavIcon} from "../controls/icons/ion-icon";
import {TitleTransform} from "../pipes/title";
import {DisplayDate} from "../pipes/dates"
import {NS_ROUTER_DIRECTIVES,NS_ROUTER_PROVIDERS} from "nativescript-angular/router";


const _reflect: any = Reflect;

export interface IPageControlConfig {
    selector?: string;
    
    templateUrl?: string;
    template?: string;
    directives?: any[];
    providers?: any[];
    inputs?: any[];
    outputs?: any[];
    pipes?: any[];
    host?: {
        'class' : string 
    },
    changeDetection? : any;
    styleUrls?: string[];
}
export function PageControl(config: IPageControlConfig={}) {
    return (cls) =>
    {
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        var componentConfig: any = config;

        //componentConfig.changeDetection = ChangeDetectionStrategy.OnPush;
        
        var nxDirectives = [controls, NgIf, NgFor];
        var providers = [];
        var corePipes = [TitleTransform, DisplayDate];
        
        config.directives = config.directives 
            ? config.directives.concat(nxDirectives) 
            : nxDirectives;

        config.providers = config.providers
            ? config.providers.concat(providers)
            : providers;
            
        config.pipes = config.pipes 
            ? config.pipes.concat() 
            : corePipes;

        annotations.push(new Component(componentConfig));

        _reflect.defineMetadata('annotations', annotations, cls);

        return cls;
    }
}