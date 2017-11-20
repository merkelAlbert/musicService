import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {UploaderComponent} from './uploader/uploader.component';
import {MenuItems} from './shared/MenuItems';
import {NoveltiesComponent} from './novelties/novelties.component';
import {TopComponent} from './top/top.component';
import {CommonModule} from '@angular/common';

const appRoutes: Routes = [
  {path: MenuItems.upload.url, component: UploaderComponent},
  {path: MenuItems.novelties.url, component: NoveltiesComponent},
  {path: MenuItems.topSongs.url, component: TopComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
