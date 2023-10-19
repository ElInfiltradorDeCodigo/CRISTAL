import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PerfilEmpleadoPage } from './pages/perfil-empleado/perfil-empleado.page';

const routes: Routes = [
  
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'sucursales',
    loadChildren: () => import('./pages/sucursales/sucursales.module').then( m => m.SucursalesPageModule)
  },
  {
    path: 'departamentos',
    loadChildren: () => import('./pages/departamentos/departamentos.module').then( m => m.DepartamentosPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./pages/empleados/empleados.module').then( m => m.EmpleadosPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'insumos',
    loadChildren: () => import('./pages/insumos/insumos.module').then( m => m.InsumosPageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./pages/ventas/ventas.module').then( m => m.VentasPageModule)
  },
  {
    path: 'adeudos',
    loadChildren: () => import('./pages/adeudos/adeudos.module').then( m => m.AdeudosPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'acerca',
    loadChildren: () => import('./pages/acerca/acerca.module').then( m => m.AcercaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'cambiar-datos',
    loadChildren: () => import('./pages/cambiar-datos/cambiar-datos.module').then( m => m.CambiarDatosPageModule)
  },
  {
    path: 'actualizar-sucursal',
    loadChildren: () => import('./pages/actualizar-sucursal/actualizar-sucursal.module').then( m => m.ActualizarSucursalPageModule)
  },
  {
    path: 'perfil-empleado',
    loadChildren: () => import('./pages/perfil-empleado/perfil-empleado.module').then( m => m.PerfilEmpleadoPageModule)
  },
  {
    path: 'actualizar-empleado',
    loadChildren: () => import('./pages/actualizar-empleado/actualizar-empleado.module').then( m => m.ActualizarEmpleadoPageModule)
  },
  {
    path: 'agregar-sucursal',
    loadChildren: () => import('./pages/agregar-sucursal/agregar-sucursal.module').then( m => m.AgregarSucursalPageModule)
  },
  {
    path: 'agregar-departamento',
    loadChildren: () => import('./pages/agregar-departamento/agregar-departamento.module').then( m => m.AgregarDepartamentoPageModule)
  },
  {
    path: 'agregar-empleado',
    loadChildren: () => import('./pages/agregar-empleado/agregar-empleado.module').then( m => m.AgregarEmpleadoPageModule)
  },
  {
    path: 'perfil-productor',
    loadChildren: () => import('./pages/perfil-productor/perfil-productor.module').then( m => m.PerfilProductorPageModule)
  },
  {
    path: 'actualizar-productor',
    loadChildren: () => import('./pages/actualizar-productor/actualizar-productor.module').then( m => m.ActualizarProductorPageModule)
  },
  {
    path: 'agregar-productor',
    loadChildren: () => import('./pages/agregar-productor/agregar-productor.module').then( m => m.AgregarProductorPageModule)
  },
  {
    path: 'agregar-insumo',
    loadChildren: () => import('./pages/agregar-insumo/agregar-insumo.module').then( m => m.AgregarInsumoPageModule)
  },
  {
    path: 'actualizar-insumo',
    loadChildren: () => import('./pages/actualizar-insumo/actualizar-insumo.module').then( m => m.ActualizarInsumoPageModule)
  },
  {
    path: 'actualizar-venta',
    loadChildren: () => import('./pages/actualizar-venta/actualizar-venta.module').then( m => m.ActualizarVentaPageModule)
  },
  {
    path: 'agregar-venta',
    loadChildren: () => import('./pages/agregar-venta/agregar-venta.module').then( m => m.AgregarVentaPageModule)
  },
  {
    path: 'detalle-venta',
    loadChildren: () => import('./pages/detalle-venta/detalle-venta.module').then( m => m.DetalleVentaPageModule)
  },
  {
    path: 'detalle-adeudo',
    loadChildren: () => import('./pages/detalle-adeudo/detalle-adeudo.module').then( m => m.DetalleAdeudoPageModule)
  },
  {
    path: 'actualizar-adeudo',
    loadChildren: () => import('./pages/actualizar-adeudo/actualizar-adeudo.module').then( m => m.ActualizarAdeudoPageModule)
  },
  {
    path: 'dedicatorias',
    loadChildren: () => import('./pages/dedicatorias/dedicatorias.module').then( m => m.DedicatoriasPageModule)
  },
  {
    path: 'perfil-empleado/:id',
    loadChildren: () => import('./pages/perfil-empleado/perfil-empleado.module').then(m => m.PerfilEmpleadoPageModule)
  },
  {
    path: 'actualizar-empleado/:id',
    loadChildren: () => import('./pages/actualizar-empleado/actualizar-empleado.module').then(m => m.ActualizarEmpleadoPageModule)
  },
  {
    path: 'actualizar-insumo/:id',
    loadChildren: () => import('./pages/actualizar-insumo/actualizar-insumo.module').then(m => m.ActualizarInsumoPageModule)
  },
  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
