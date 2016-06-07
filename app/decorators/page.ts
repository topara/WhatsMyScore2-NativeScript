import { Component, provide, ChangeDetectionStrategy } from "@angular/core";
import {NgIf, NgFor} from "@angular/common";
import {RouteParams} from "@angular/router-deprecated";
import {controls} from "../controls/all";

//import {LoadingService} from "../providers/loadingService/loadingService";

import {NS_ROUTER_DIRECTIVES,NS_ROUTER_PROVIDERS} from "nativescript-angular/router";

//providers
import {AppRoutingService} from "../context/router.context";
import {Logger} from "../providers/logger";
//pipes 
import {TitleTransform} from "../pipes/title";
import {DisplayDate} from "../pipes/dates";
import {GroupByPipe, OrderByPipe} from "../pipes/orderBy";
import {FormScoreFormatter, ScoreFormatter} from "../pipes/score";
const _reflect: any = Reflect;

/*
<Page xmlns="http://www.nativescript.org/tns.xsd" loaded="pageLoaded">
  <StackLayout>
    <Label text="Loading..." cssClass="title"/>
  </StackLayout>
</Page>
*/

export interface IPageConfig {
    selector?: string;
    //onLoaded? : (args: EventData) => void;
    //onNavigatingTo? : (arg: EventData) => void;
    template?: string;
    templateUrl?: string;
    //template?: string;
    directives?: any[];
    providers?: any[];
    pipes?: any[];
    changeDetection? : ChangeDetectionStrategy
}

export function Page(config: IPageConfig={})
{
    return (cls) =>
    {

        var annotations = _reflect.getMetadata('annotations', cls) || [];
        var componentConfig: any = config;
        
        var coreProviders = [
            provide(AppRoutingService, {
                useFactory : (routeParams, logger) => { return new AppRoutingService(routeParams, logger); },
                deps: [RouteParams, Logger] 
            })
        ];
        
        var coreDirectives = [
            controls, 
            NgIf, 
            NgFor
        ];
        
        var corePipes = [TitleTransform, DisplayDate, GroupByPipe, OrderByPipe, ScoreFormatter, FormScoreFormatter];
        
        
        config.directives = config.directives 
            ? config.directives.concat(coreDirectives) 
            : coreDirectives;
       
        config.providers = config.providers
            ? config.providers.concat(coreProviders)
            : coreProviders;
       
        config.pipes = config.pipes 
            ? config.pipes.concat() 
            : corePipes;
            
        ///config.changeDetection = ChangeDetectionStrategy.OnPush;
        
        let component = new Component(componentConfig);

        annotations.push(component);

        _reflect.defineMetadata('annotations', annotations, cls);

        return cls;
    }
}