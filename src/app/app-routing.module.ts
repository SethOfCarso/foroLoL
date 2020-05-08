import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post/post-main/post-list/post-list.component';
import { PostMainComponent } from './post/post-main/post-main.component';
import { PostDetailComponent } from './post/post-main/post-detail/post-detail.component';


const routes: Routes = [
  {path: 'home', component: PostMainComponent, children:[
      {path: 'post-list', component: PostListComponent},
      {path: 'post-detail/:id', component: PostDetailComponent},
      {path: '', component: PostListComponent},
  ]},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
