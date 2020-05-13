import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post/post-main/post-list/post-list.component';
import { PostMainComponent } from './post/post-main/post-main.component';
import { PostDetailComponent } from './post/post-main/post-detail/post-detail.component';
import { PostCreateComponent } from './post/post-main/post-create/post-create.component';
import { ProfileComponent } from './users/profile/profile.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { PostSearchedComponent } from './post/post-main/post-searched/post-searched.component';
import { UserComponent } from './users/user/user.component';
import { UserMatchComponent } from './users/historical/user-matches/user-match/user-match.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'google/redirect', component: PostMainComponent},
  {path: 'home', component: PostMainComponent, children: [
      {path: 'post-list', component: PostListComponent},
      {path: 'post-detail/:id', component: PostDetailComponent},
      {path: 'post-create', component: PostCreateComponent},
      {path: 'searchedPost/:postType', component: PostSearchedComponent},
      {path: '', component: PostListComponent},
  ]},
  {path: 'user', component: UserComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
