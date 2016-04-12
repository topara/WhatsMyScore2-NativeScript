import {OnInit, OnDestroy} from 'angular2/core';

import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {CompetitionService} from "../../providers/leagues/competitions";
import {ClubService} from "../../providers/leagues/club";
import {GradeService} from "../../providers/leagues/grade";
import {RegionCache, CompetitionCache, GradeCache, ClubCache} from "../../providers/leagues/cache";

import {RouteParams} from "angular2/router";
import {ICompetition} from "../../models/models"
import {CompetitionNav} from "../nav/competition.nav";
import {AppRoutingService} from "../../context/router.context";
import {Subscription} from 'rxjs/Rx';

@Page({
    selector: "Competiton",
	templateUrl: "pages/competition/page.html",
    directives: [CompetitionNav],
    providers: [CompetitionService, GradeService, ClubService]
})
export class CompetitionPage implements OnInit, OnDestroy
{
    private subscription: Subscription;
    
    constructor(
        private logger: Logger, 
        private context: AppRoutingService,
        private competitionCache: CompetitionCache,
        private competitionService: CompetitionService,
        private clubService: ClubService,
        private gradeService: GradeService)
    {
        this.logger.Notify("region page loaded");
        
        let subscription = this.competitionCache.CompetitionChanges.subscribe(competition => {
            let clubObservable = this.clubService.List(competition.Id);
            let gradeObservable = this.gradeService.List(competition.Id);
            
            clubObservable.map(e=> e.json()).subscribe(e  => {
                this.competitionCache.Clubs = e;
            });
            gradeObservable.map(e=> e.json()).subscribe(e=> {
                this.competitionCache.Grades = e;
            });
        });

        this.subscription = subscription;
    }
  
    public list : Array<ICompetition> = []; 
    
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
    
    ngOnInit()
    {
        this.logger.Notify("ngOnInit: RegionPage");
        let competitionId = this.context.CompetitionId;
        let observable = this.competitionService.Get(competitionId);
        
        observable
            .map((response)=> response.json())
            .subscribe((competition : ICompetition) => { 
                this.competitionCache.Competition = competition;
            }, (error)=> {
                this.logger.Error(error);
            });
    } 
}

