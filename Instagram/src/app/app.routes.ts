import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from '../app/components/login/login.component';
import {PhotosComponent} from '../app/components/photos/photos.component';
import {TimelineComponent} from '../app/components/timeline/timeline.component';
import {UploadComponent} from '../app/components/upload/upload.component';

const app_routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'timeline/:usuario', component: TimelineComponent },
  { path: 'upload/:usuario', component: UploadComponent },
  { path: 'photos/:usuario', component: PhotosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
