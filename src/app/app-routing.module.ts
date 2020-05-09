import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post/post-main/post-list/post-list.component';
import { PostMainComponent } from './post/post-main/post-main.component';
import { PostDetailComponent } from './post/post-main/post-detail/post-detail.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: PostMainComponent, children:[
    {path: '', component: PostListComponent},
      {path: 'post-list', component: PostListComponent},
      {path: 'post-detail', component: PostDetailComponent}
  ]},
  {path: 'profile', component: ProfileComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
