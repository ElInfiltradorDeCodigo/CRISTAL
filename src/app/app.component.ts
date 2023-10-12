import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home'},
    { title: 'Mi Perfil', url: '/perfil', icon: 'person-circle' },
    { title: 'Sucursales', url: '/sucursales', icon: 'business' },
    { title: 'Departamentos', url: '/departamentos', icon: 'briefcase' },
    { title: 'Empleados', url: '/empleados', icon: 'people' },
    { title: 'Productores', url: '/clientes', icon: 'people-circle' },
    { title: 'Insumos', url: '/insumos', icon: 'layers' },
    { title: 'Ventas', url: '/ventas', icon: 'wallet' },
    { title: 'Adeudos', url: '/adeudos', icon: 'cash' },
  ];
  public opciones = [
    { title: 'Acerca De', url: '/acerca', icon: 'help' },
    { title: 'Cerrar Sesión', url: '/inicio-sesion', icon: 'log-out' },
  ];
  constructor() {}
}
