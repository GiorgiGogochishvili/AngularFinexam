import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterComponent } from '../register/register.component';


@Injectable({
  providedIn: 'root'
})
export class preventGuard implements CanDeactivate<RegisterComponent> {
  canDeactivate(component: RegisterComponent,currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot)

  {
    return component.canExit();
  }
  
}