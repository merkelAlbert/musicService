import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {UploaderComponent} from './uploader/uploader.component';
import {MenuItems} from './shared/MenuItems';
import {CommonModule} from '@angular/common';
import {NoveltiesComponent} from './novelties/novelties.component';

const appRoutes: Routes = [
  {path: MenuItems.upload.url, component: UploaderComponent},
  {path: MenuItems.novelties.url, component: NoveltiesComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
