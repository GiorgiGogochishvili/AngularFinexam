import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookComponent} from "./book/book.component";
import {AuthorComponent} from "./author/author.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {EditBookComponent} from "./edit-book/edit-book.component";
import {AddBookComponent} from "./add-book/add-book.component";
import {AuthorDetailComponent} from "./author-detail/author-detail.component";
import {AddAuthorComponent} from "./add-author/add-author.component";
import { trulyPreventGuard } from './guards/truly-prevent.guard';
import { preventGuard } from './guards/prevent.guard';

const routes: Routes = [

  { path: 'books/edit', component: EditBookComponent , canActivate:[trulyPreventGuard] },
  { path: 'books/add', component: AddBookComponent , canActivate:[trulyPreventGuard] },
  { path: 'authors/add', component: AddAuthorComponent , canActivate:[trulyPreventGuard] },
  { path: 'authors/:id', component: AuthorDetailComponent, canActivate:[trulyPreventGuard]  },
  { path: 'books/:id', component: BookDetailsComponent, canActivate:[trulyPreventGuard]  },
  { path: 'books', component: BookComponent, canActivate:[trulyPreventGuard]  },
  { path: 'authors', component: AuthorComponent, canActivate:[trulyPreventGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent , canDeactivate: [preventGuard]},
  

  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', redirectTo: '/books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
