import {promises as fs} from "fs"

export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, image, code, stock) =>{
        
        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts =  async () =>{
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) =>{
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(respuesta3.find(product => product.id === id))
        }
    }
    deleteProductsById = async (id) =>{
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto eliminado")
    }
    updateProducts = async({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts()
        let productsModif = [{ ...producto, id },...productOld]
        await fs.writeFile(this.patch, JSON.stringify(productsModif));

    }

}

//const productos = new ProductManager

/*productos.addProduct("Title1", "Description1", 2000, "Image1", "abc123", 5);
productos.addProduct("Title2", "Description2", 3000, "Image2", "abc124", 6);
productos.addProduct("Title3", "Description3", 4000, "Image3", "abc125", 7);
productos.addProduct("Title4", "Description4", 1000, "Image4", "abc126", 8);
productos.addProduct("Title5", "Description5", 3000, "Image5", "abc127", 9);
productos.addProduct("Title6", "Description6", 4000, "Image6", "abc128", 10);
productos.addProduct("Title7", "Description7", 2000, "Image7", "abc129", 11);
productos.addProduct("Title8", "Description8", 3000, "Image8", "abc130", 12);
productos.addProduct("Title9", "Description9", 4000, "Image9", "abc131", 13);
productos.addProduct("Title10", "Description10", 2000, "Image10", "abc132", 14);*/


//productos.getProducts()
//productos.getProductsById(3)
//productos.deleteProductsById(2)

/*productos.updateProducts({title: 'Title3',
    description: 'Description3',
    price: 4500,
    image: 'Image3',
    code: 'abc125',
    stock: 7,
    id: 3})*/