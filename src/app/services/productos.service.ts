import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
	
  cargando = true;
  productos: Producto[]=[];
  productosFiltrado: Producto[]=[];


  constructor(private http:HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise<void>((resolve,reject)=>{

      this.http.get<Producto[]>('https://angular-html-57b14-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe((resp:Producto[])=>{
        console.log(resp);
        
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });


    
  }

    getProducto(id:string){
      return this.http.get(`https://angular-html-57b14-default-rtdb.firebaseio.com/productos/${id}.json`);
    }

    buscarProducto(termino:string){
      

      if(this.productos.length == 0){
        //cargar productos
        this.cargarProductos().then(()=>{
          //ejecutar despues de tener los productos
          //aplicar filtro
          this.filtrarProductos(termino);
        });
      }else{
        //aplicar filtro
        this.filtrarProductos(termino);
      }

      // this.productosFiltrado =this.productos.filter(producto=>{
        

      //   console.log(this.productosFiltrado);
      //   return true;

      // });

    }

    private filtrarProductos(termino:string){
      
      this.productosFiltrado = [];
        
      termino = termino.toLocaleLowerCase();

      this.productos.forEach(prod =>{
        
        
        if (prod.categoria && prod.categoria.indexOf(termino)>=0 || prod.titulo && prod.titulo.toLocaleLowerCase().indexOf(termino)>=0){
          this.productosFiltrado.push(prod);
        }

      });

    }

}
