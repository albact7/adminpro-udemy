import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';


const appRoutes: Routes = [
    {//Rutas que quiero que funcionen dentro del pagecomponent
        path: '', 
        component: PagesComponent,
        children: [
            { path: 'dashboard', component:DashboardComponent },
            { path: 'progress', component:ProgressComponent },
            { path: 'graficas1', component:Graficas1Component },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ] 
    },
    { path: '', component:PagesComponent },
    
    { path: 'login', component:LoginComponent },
    { path: 'register', component:RegisterComponent },
    { path: '**', component: NopagefoundComponent }

];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });