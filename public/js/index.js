// DOM FORM

let title=document.getElementById('title')
let price=document.getElementById('price')
let thumbnail=document.getElementById('thumbnail')
let submitItem=document.getElementById('submitBtn')

// DOM PRODUCT CARDS

let productContainer=document.getElementById("productContainer")
let displayProductsBtn=document.getElementById("displayProductsBtn")


// FORMULARIO DE INGRESO DE PRODUCTOS 

const displayForm=async()=>{
    const template = await fetch("views/form-template.hbs");
    const templateText = await template.text();
    const templateCompiled = Handlebars.compile(templateText);
    return templateCompiled();
}

const renderForm=async()=>{
    const template = await displayForm();
    document.getElementById("container").innerHTML = template;
    let updateBtn=document.getElementById('updateBtn')
    updateBtn.addEventListener('click', async (e)=>{
        e.preventDefault()
        let idInput=document.getElementById('idInput')
        let title =document.getElementById('title')
        let description =document.getElementById('description')
        let code =document.getElementById('code')
        let thumbnail =document.getElementById('thumbnail')
        let price =document.getElementById('price')
        let stock =document.getElementById('stock')
        let newData={title:title.value,description:description.value,code:code.value,thumbnail:thumbnail.value,price:price.value,stock:stock.value}
        console.log(newData)
        await fetch(`api/products/${idInput.value}`,{method: 'PUT',body:newData})
    })
  };

renderForm()

// TARJETAS DE PRODUCTOS //

displayProductsBtn.addEventListener('click', async()=>{
    const fetchData=await fetch('/api/products')
    const products=await fetchData.json()
    productContainer.innerHTML=await renderProducts(products)
    if(products.length>0){
        let buttonsCollection=document.getElementsByClassName('removeProduct')
        for (let btn of buttonsCollection) {
            btn.addEventListener('click', async ()=>{
                await fetch(`api/products/${btn.id}`,{method: 'DELETE'})
                let rowParent =btn.parentElement.parentElement.parentElement;
                let row=btn.parentElement.parentElement
                rowParent.removeChild(row)
            })
        }
    }
})

const renderProducts=async(products)=>{
    const archivoTemplate = await fetch("views/table-products.hbs");
    const templateText = await archivoTemplate.text();
    const templateCompiled = Handlebars.compile(templateText);
    return templateCompiled({ products });
}

