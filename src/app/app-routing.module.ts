import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserRegisterComponent } from "./user-register/user-register.component";
import { LoginComponent } from "./login/login.component";

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
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }