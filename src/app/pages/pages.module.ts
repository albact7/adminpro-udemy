import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';

//
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ProgressBarComponent } from './progress/progress-bar/progress-bar.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        ProgressBarComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule
    ]
})
export class PagesModule{}