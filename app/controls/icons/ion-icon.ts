import { Component, Directive, ElementRef, EventEmitter, ViewChild } from "@angular/core";

import { Label } from "ui/label";
import { Logger } from "../../providers/logger";

@Directive({
    selector:"nav-icon",
    // properties: [
    //     'class: ion-icon nav-icon'
    // ]
})
export class NavIcon { }

@Directive({
    selector:"[align-left]",
    host: {
        "class" : "text-left"
    }
})
export class AlignLeft { }
@Directive({
    selector: "[align-right]",
    host: {
        "class" : "text-right"
    }
})
export class AlignRight { }

@Component({
    selector:"ion-icon",
    template: `
    <label (tap)="tapIcon($event)" #item style="text-align:center;"
        class="ion-icon text-center"
        [text]="GetIcon()"></label>
    `,
    providers: [],
    inputs:["icon", "nav"],
    outputs:["tap"],
    moduleId: module.id,
    styleUrls: ["ion-icon.css"]
})
export class IonIcon {
    private container: ElementRef;

    constructor(private logger:Logger) {
    }

    @ViewChild("item")
    set _listItems(item: ElementRef){
        this.container = item;
    }
    public GetIcon(): string {
        let key: string = this.icon ? this.icon : "";
        key = this.Match(this.icon);

        return key;
    }

    public color = "#FF0000";
    public icon : string;
    public nav : boolean = false;
    public tap = new EventEmitter();
    public tapIcon($event: any): void {
        let label : Label = this.container.nativeElement;

        label.animate({
            opacity: 0.7
        }).then(() => {
            return label.animate({
                opacity: 1
            });
        });
        this.tap.next($event);
    }

    //http://ionicons.com/cheatsheet.html
    private Match(key: string): string {
        switch (key) {
            case "ion-alert":
                return "\uf101";
            case "ion-alert-circled":
                return "\uf100";
            case "ion-android-add":
                return "\uf2c7";
            case "ion-android-add-circle":
                return "\uf359";
            case "ion-calendar":
                return "\uf117";
            case "ion-flame":
                return "\uf31a";
            // ..

            case "ion-map" :
                return "\uf203";
            case "ion-search" :
                return "\uf21f";
            case "ion-chevron-left":
                return "\uf124";
            case "ion-chevron-right":
                return "\uf125";
            case "ion-clipboard":
                return "\uf127";
            case "ion-android-favorite":
                return "\uf388";
            case "ion-android-menu":
                return "\uf394";
            case "ion-ribbon-a":
                return "\uf348;";
            case "ion-ribbon-b":
                return "\uf349;";
            /*
                ios
             */
            case "ion-ios-star":
                return "\uf4b3";
            case "ion-ios-people" :
                return "\uf47c";

            default:
                //ion-alert
                return key;
        }
    }
}