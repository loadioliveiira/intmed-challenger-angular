import { Routes } from '@angular/router';
import { LoginComponent } from './module/auth/login/login.component';
import { RegisterComponent } from './module/auth/register/register.component';
import { HomeComponent } from './module/user/home/home.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: '**', redirectTo: 'login', pathMatch: 'full'},
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];
