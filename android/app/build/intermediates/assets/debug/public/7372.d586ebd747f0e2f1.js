"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7372],{7372:(P,m,i)=>{i.r(m),i.d(m,{AdeudosPageModule:()=>y});var c=i(6814),p=i(95),t=i(7027),u=i(2891),h=i(5861),g=i(5619),e=i(5879),A=i(7523);function f(o,d){if(1&o){const n=e.EpF();e.TgZ(0,"ion-col",6),e.NdJ("click",function(){const s=e.CHM(n).$implicit,l=e.oxw();return e.KtG(l.presentActionSheet(s.key,s))}),e.TgZ(1,"ion-card")(2,"ion-card-header")(3,"ion-card-title"),e._uU(4),e.qZA(),e.TgZ(5,"ion-card-subtitle"),e._uU(6),e.qZA()(),e.TgZ(7,"ion-card-content")(8,"ion-list")(9,"ion-item")(10,"ion-label"),e._uU(11),e.qZA()(),e.TgZ(12,"ion-item")(13,"ion-label"),e._uU(14),e.qZA()(),e.TgZ(15,"ion-item")(16,"ion-label"),e._uU(17),e.qZA()()()()()()}if(2&o){const n=d.$implicit;e.xp6(4),e.hij("Fecha Adeudo Generado: ",n.fecha,""),e.xp6(2),e.hij("Total a Diferir: ",n.totalDiferir,""),e.xp6(5),e.lnq("Nombre Cliente: ",n.nombre_cliente.nombre," ",n.nombre_cliente.apellido_p," ",n.nombre_cliente.apellido_m,""),e.xp6(3),e.hij("Pago Por Mes: ",n.meses,""),e.xp6(3),e.hij("Observaciones: ",n.observaciones,"")}}const v=[{path:"",component:(()=>{var o;class d{constructor(a,r,s,l,Z){this.actionSheetCtrl=a,this.router=r,this.alertController=s,this.db=l,this.toastController=Z,this.adeudosData=new g.X([]),this.adeudos=this.adeudosData.asObservable()}presentActionSheet(a,r){var s=this;return(0,h.Z)(function*(){yield(yield s.actionSheetCtrl.create({header:"Opciones De Adeudo",backdropDismiss:!1,buttons:[{text:"Eliminar Adeudo",role:"destructive",data:{action:"delete"},handler:()=>{s.eliminacion(a)}},{text:"Ver Detalle",data:{action:"actualizarDatos"},handler:()=>{s.verEmpleados(r)}},{text:"Actualizar Adeudo",data:{action:"actualizarDatos"},handler:()=>{s.actualizarVenta()}},{text:"Cerrar",role:"cancel",data:{action:"cancel"}}]})).present()})()}presentToast(a,r){var s=this;return(0,h.Z)(function*(){(yield s.toastController.create({message:a,duration:2e3,color:r,position:"bottom"})).present()})()}eliminacion(a){var r=this;return(0,h.Z)(function*(){yield(yield r.alertController.create({header:"\xa1Advertencia!",message:"\xbfRealmente desea eliminar este adeudo?",buttons:[{text:"S\xed",handler:()=>{r.db.list("ADEUDOS").remove(a).then(()=>{r.presentToast("Adeudo eliminado con \xe9xito","success")}).catch(l=>{r.presentToast("Error al eliminar el adeudo","danger")})}},"No"],backdropDismiss:!1})).present()})()}verEmpleados(a){this.router.navigate(["/detalle-adeudo",{adeudo:JSON.stringify(a)}])}actualizarVenta(){this.router.navigate(["/actualizar-adeudo"])}ngOnInit(){this.subscription=this.db.list("ADEUDOS").snapshotChanges().subscribe(a=>{const r=a.map(s=>{const l=s.payload.val();return"object"==typeof l&&null!==l?{key:s.key,...l}:{key:s.key}});this.adeudosData.next(r)})}}return(o=d).\u0275fac=function(a){return new(a||o)(e.Y36(t.BX),e.Y36(u.F0),e.Y36(t.Br),e.Y36(A.KQ),e.Y36(t.yF))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-adeudos"]],decls:12,vars:4,consts:[[3,"translucent"],["color","primary"],["slot","start"],["slot","start","color","secondary"],["fullscreen","true"],[3,"click",4,"ngFor","ngForOf"],[3,"click"]],template:function(a,r){1&a&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),e._UZ(3,"ion-back-button",3)(4,"ion-menu-button",2),e.qZA(),e.TgZ(5,"ion-title"),e._uU(6,"Adeudos"),e.qZA()()(),e.TgZ(7,"ion-content",4)(8,"ion-grid")(9,"ion-row"),e.YNc(10,f,18,7,"ion-col",5),e.ALo(11,"async"),e.qZA()()()),2&a&&(e.Q6J("translucent",!0),e.xp6(10),e.Q6J("ngForOf",e.lcZ(11,2,r.adeudos)))},dependencies:[c.sg,t.oU,t.Sm,t.PM,t.FN,t.Zi,t.tO,t.Dq,t.wI,t.W2,t.jY,t.Gu,t.Ie,t.Q$,t.q_,t.fG,t.Nd,t.wd,t.sr,t.cs,c.Ov]}),d})()}];let b=(()=>{var o;class d{}return(o=d).\u0275fac=function(a){return new(a||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[u.Bz.forChild(v),u.Bz]}),d})(),y=(()=>{var o;class d{}return(o=d).\u0275fac=function(a){return new(a||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[c.ez,p.u5,t.Pc,b]}),d})()}}]);