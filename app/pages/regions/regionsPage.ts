import {Component} from 'angular2/core';
import {Router} from "angular2/router";
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
//import {SearchList, ISearchEvent} from "../../controls/searchList/searchList";

/* data */
import { ProviderService } from "../../providers/leagues/leagues";
import { IProvider } from "../../models/models"

/* directive */
import {Http} from 'angular2/http';
import {Settings} from "../../providers/routes/routes";
import {StartNav} from "../nav/start.nav"

import {topmost} from "ui/frame";
import {ActionItem} from "ui/action-bar";

@Page({
    selector: "regions-page",
    templateUrl: "pages/regions/regionsPage.html",
    providers: [ProviderService],
    directives: [StartNav]
})
export class RegionsPage 
{
    constructor(
        private http: Http,
        private logger: Logger, 
        private router: Router,
        private regions: ProviderService)
    {

        this.logger.Notify("Regions page started");
    }
    
    public list : Array<IProvider> = [];
        
    public back(): void 
    {
        this.logger.Notify("regions - page - back pressed");
        //todo- back pressed
        this.router.navigate(["Start"])
    }
    
    public start() : void
    {
        this.logger.Notify("regions - page - start pressed");
        this.router.navigate(["Start"])
    }
    
    //passed to the child component
    public regionsHintText = "Hi from regions";
    
    //action to 
    public regionSearch($event : any)
    {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    } 
    
    /* angular2 lifecycle */
    public ngOnInit(){
        
        
        this.logger.Notify("Region-page ngAfterViewInit");
        
        //time to load the data
        var response = this.regions.List();
        
        //transform the data to json -> array of IProvider
        response
            .map(response => response.json())
            .subscribe((items : Array<IProvider>) => {
                this.list = items;
            },(error) => {
                this.logger.Error("Could not map items");
                this.logger.Error(error);
            });
    }
    
    public ngAfterViewInit(){
        topmost().currentPage.actionBarHidden = true;
    }
    
}