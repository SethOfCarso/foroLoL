import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post/post-main/post-list/post-list.component';


const routes: Routes = [
  {path: 'home', component: PostListComponent},
  {path: 'post', component: PostListComponent},
  {path: '', component: PostListComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
