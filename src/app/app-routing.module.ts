import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';

export const APPLICATION_ROUTES: Routes = [
    {
        path: '',
        component: AlertsComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [RouterModule.forRoot(APPLICATION_ROUTES, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
