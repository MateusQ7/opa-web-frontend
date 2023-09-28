import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserRegisterComponent } from "./user-register/user-register.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./services/auth/auth.guard";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: UserRegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path:'home',
      component:HomeComponent,
      canActivate: [AuthGuard],
      loadChildren:()=> import('./home/home-routing.module').then((m)=> m.HomeRoutingModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
