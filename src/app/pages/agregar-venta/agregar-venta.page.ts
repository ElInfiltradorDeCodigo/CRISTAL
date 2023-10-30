import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.page.html',
  styleUrls: ['./agregar-venta.page.scss'],
})
export class AgregarVentaPage implements OnInit {

  ventaForm: FormGroup;
  fechaFormateada: string;
  productores: any[] = [];
  insumos: any[] = [];

  constructor(public toastController: ToastController, private fb: FormBuilder, 
              private db: AngularFireDatabase, private afAuth: AngularFireAuth, 
              private router: Router, private loadingController: LoadingController,
              private storage: AngularFireStorage,) { 

    this.ventaForm = this.fb.group({
      nombre_cliente: ['', [Validators.required, Validators.maxLength(50)]],
      telefono_cliente: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      empleado: ['', [Validators.maxLength(50)]],
      productos: this.fb.array([
        this.crearProducto(),
      ]),
      total: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      mostrarCampos: [false],
      totalDiferir: [{value: '', disabled: true}, [Validators.maxLength(10)]],
      meses: [{value: '', disabled: true}, [Validators.maxLength(10)]],
      observaciones: ['', [Validators.maxLength(200)]],
    });

    const fechaActual: Date = new Date();
    this.fechaFormateada = format(fechaActual, 'dd/MM/yyyy');

  }

  get productos(): FormArray {
    return this.ventaForm.get('productos') as FormArray;
  }

  generarPDF(ventaData: any): Promise<Blob> {
    return new Promise((resolve, reject) => {
    const productosTableBody = [
        [{ text: 'Producto', bold: true }, { text: 'Cantidad', bold: true }, { text: 'Precio', bold: true }, { text: 'Total', bold: true }]
    ];

    ventaData.productos.forEach((prod: any) => {
        const totalProd = prod.cantidad * prod.precio;
        productosTableBody.push([prod.nombre, prod.cantidad, prod.precio, totalProd.toFixed(2)]);
    });

    const creditString = ventaData.mostrarCampos 
        ? [
            { text: `Total A Diferir: ${ventaData.totalDiferir}`, margin: [0, 5] },
            { text: `Pago Por Mes: ${ventaData.meses}`, margin: [0, 5] },
            { text: `Observaciones: ${ventaData.observaciones}`, margin: [0, 5] }
        ]
        : [{ text: `Venta a Crédito: NO`, margin: [0, 5] }];

    const documentDefinition = {
        content: [
            {
                image: 'data:image/jpeg;base64,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',
                width: 150,
                alignment: 'center',
                margin: [0, 0, 0, 10]
            },
            { text: 'TICKET DE VENTA', fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
            { text: `Cliente: ${ventaData.nombre_cliente.nombre} ${ventaData.nombre_cliente.apellido_p} ${ventaData.nombre_cliente.apellido_m}`, margin: [0, 5] },
            { text: `Teléfono: ${ventaData.telefono_cliente}`, margin: [0, 5] },
            { text: `Empleado: ${ventaData.empleado}`, margin: [0, 5] },
            { text: `Fecha: ${this.fechaFormateada}`, margin: [0, 5] },
            {
                table: {
                    widths: ['*', 'auto', 'auto', 'auto'],
                    body: productosTableBody
                }
            },
            { text: `Total Venta: ${ventaData.total}`, fontSize: 14, bold: true, alignment: 'right', margin: [0, 10] },
            ...creditString
        ],
        pageSize: 'A5',
        pageOrientation: 'portrait',
        styles: {
            tableExample: {
                margin: [0, 5, 0, 15]
            }
        }
    } as TDocumentDefinitions;

    try {
      const blob = pdfMake.createPdf(documentDefinition).getBlob(blob => {
        resolve(blob);
      });
    } catch (err) {
      console.error("Error al generar PDF:", err);
      reject(err);
    }    
  });
}
  

  crearProducto(): FormGroup {
    return this.fb.group({
      nombre: [''],
      cantidad: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      precio: [''],
    });
  }


  agregarProducto() {
    this.productos.push(this.crearProducto());
  }


  toggleCampos() {
    if (this.ventaForm.get('mostrarCampos')?.value) {
      
      const total = this.ventaForm.get('total')?.value;
      this.ventaForm.get('totalDiferir')?.setValue(total);
      this.ventaForm.get('meses')?.setValue((total / 3).toFixed(2));
    } else {
      
      this.ventaForm.get('totalDiferir')?.reset();
      this.ventaForm.get('meses')?.reset();
      this.ventaForm.get('observaciones')?.reset();
    }
  }
  

  async datosCambiados() {
    if (this.ventaForm.valid) {
        console.log(this.ventaForm.value);

        const loading = await this.loadingController.create({
            message: 'Registrando...',
            backdropDismiss: false,
        });
        await loading.present();

        const ventaData = this.ventaForm.getRawValue();
        const uid = this.db.createPushId();
        const pdfBlob = await this.generarPDF(ventaData);

        const ref = this.storage.ref(`ventas/${uid}.pdf`);
        const task = ref.put(pdfBlob);

        try {
            
            const ventasRef = this.db.list('/VENTAS');
            const uid = this.db.createPushId();
            await ventasRef.set(uid, {
                nombre_cliente: ventaData.nombre_cliente,
                telefono_cliente: ventaData.telefono_cliente,
                empleado: ventaData.empleado,
                productos: ventaData.productos,
                total: ventaData.total,
                fecha: this.fechaFormateada
            });

            const updatePromises = [];

            for (let producto of ventaData.productos) {
              updatePromises.push(this.updateExistenciaProducto(producto));
          }

            if (ventaData.mostrarCampos) {
                const adeudosRef = this.db.list('/ADEUDOS');
                await adeudosRef.push({
                    nombre_cliente: ventaData.nombre_cliente,
                    telefono_cliente: ventaData.telefono_cliente,
                    totalDiferir: ventaData.totalDiferir,
                    meses: ventaData.meses,
                    observaciones: ventaData.observaciones,
                    fecha: this.fechaFormateada,
                    numero_pago: 0 
                });            

            }

            await Promise.all(updatePromises);
            await this.router.navigate(['/ventas']);
            await this.presentToast('Venta registrada exitosamente!', 'success');
        } catch (error) {
            
            console.error("Error al registrar venta: ", error);
            await this.presentToast('Error al registrar la venta. Intente nuevamente.', 'danger');
        } finally {
            
            await loading.dismiss();
        }

    } else {
        this.presentToast('Formulario inválido', 'danger');
        console.log('Formulario inválido');
    }
}


  private updateExistenciaProducto(producto: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const insumoRef = this.db.list('/INSUMOS', ref => ref.orderByChild('nombre').equalTo(producto.nombre));
        const sub = insumoRef.snapshotChanges().subscribe(async (res) => {
            try {
                if (res.length > 0 && res[0].key !== null) { 
                    const key = res[0].key;
                    const payload: { val(): { existencia: number } } = res[0].payload as any;
                    const existenciaActual = payload.val().existencia;
                    
                    if (existenciaActual - producto.cantidad >= 0) {
                      await this.db.list('/INSUMOS').update(key, {existencia: existenciaActual - producto.cantidad});
                      resolve();
                  } else {
                      reject("La cantidad vendida es mayor a la existencia del producto: " + producto.nombre);
                  }
                  
                }
            } catch (error) {
                reject(error);
              } finally {
                sub.unsubscribe();
            }
        });
    });
  }


  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }


  ngOnInit() {

    this.obtenerProductores();
    this.cargarUsuarioActual();
    this.cargarInsumos();

  }


  obtenerProductores() {
    this.db.list('/PRODUCTORES').valueChanges().subscribe((productores: any[]) => {
      this.productores = productores;
    }, error => {
      console.log(error); 
    });
  }


  productorSeleccionado(event: any) {
    const productorSeleccionado = event.detail.value;
    if (productorSeleccionado) {
        this.ventaForm.get('telefono_cliente')?.setValue(productorSeleccionado.telefono);
    }
  }


  cargarUsuarioActual() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.ventaForm.get('empleado')?.setValue(`${user.email}`);
      }
    });
  }


  cargarInsumos() {
    this.db.list('/INSUMOS').valueChanges().subscribe((insumos: any[]) => {
      this.insumos = insumos;
    }, error => {
      console.log(error); 
    });
  }


  cargarPrecio(event: any, productoIndex: number) {
    const nombreInsumoSeleccionado = event.detail.value;
    const insumoSeleccionado = this.insumos.find(insumo => insumo.nombre === nombreInsumoSeleccionado);
    if (insumoSeleccionado) {
      this.productos.at(productoIndex).get('precio')?.setValue(insumoSeleccionado.precio);
    }
  }


  calcularTotal() {
    let total = 0;

    this.productos.controls.forEach(control => {
      const cantidad = control.get('cantidad')?.value || 0;
      const precio = control.get('precio')?.value || 0;
  
      total += cantidad * precio;
    });
  
    this.ventaForm.get('total')?.setValue(total.toFixed(2));
  }


  eliminarProducto(index: number) {
    this.productos.removeAt(index);
    this.calcularTotal(); 
  }

  
  verificarCantidad(productoIndex: number) {
    const nombreInsumoSeleccionado = this.productos.at(productoIndex).get('nombre')?.value;
    const cantidadIngresada = this.productos.at(productoIndex).get('cantidad')?.value;
    const insumoSeleccionado = this.insumos.find(insumo => insumo.nombre === nombreInsumoSeleccionado);
  
    if (insumoSeleccionado && cantidadIngresada > insumoSeleccionado.existencia) {
      
      this.productos.at(productoIndex).get('cantidad')?.setErrors({excedeExistencia: true});
    } else {
      
      this.productos.at(productoIndex).get('cantidad')?.setErrors(null);
    }
  
    this.calcularTotal();
  } 
  
}
