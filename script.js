// ________________________________
// crearCategoria con id encriptado
// --------------------------------
const crearCategoria = (nombre)  => {
  return { id: uuidv4(), nombre };
}

// ___________________________________
// Categorias iniciales para restaurar
// -----------------------------------
const categoriasInicio = [
  crearCategoria('Comida'),
  crearCategoria('Educación'),
  crearCategoria('Salidas'),
  crearCategoria('Servicios'),
  crearCategoria('Transporte'),
  crearCategoria('Trabajo')
];


// ________________________
// Guardar en Local Storage
// ------------------------
const grabar = (categoria) => {
    console.log('estoy en grabar categoria', categoria); 
    localStorage.setItem("categorias", JSON.stringify(categoria)); 
}


// _______________________________
// Funcion Mostrar las categorias
// -------------------------------
let $muestraCategorias = document.getElementById("muestraCategorias");
const mostrar = () => {
    console.log('estoy en mostrar categorias')
    $muestraCategorias.innerHTML = "";    // Borrar el contenido actual del div
    categorias = JSON.parse(localStorage.getItem("categorias"));
    categorias.forEach(categoria => {        
        
        if ($muestraCategorias !== null) {    // Verificar si el elemento existe 
            let div = document.createElement("div"); // div para la categoría
            let spanCategoria = document.createElement("span"); // span para nombre
            spanCategoria.classList.add("spanCategoria");  // Agregar una clase al nuevo elemento <span>
            spanCategoria.innerHTML = categoria.nombre;
            
            let btnEditar = document.createElement("button");  // <button> para editar y llamado
            btnEditar.innerHTML = "Editar";
            btnEditar.addEventListener("click", () => {   
                console.log("Editar categoría:", categoria);  
                editarCategoria(categoria.id);
            });
            
            let btnBorrar = document.createElement("button");  // <button> para borrar y llamado
            btnBorrar.innerHTML = "Borrar";
            btnBorrar.addEventListener("click", () => {   
                console.log("Borrar categoría:", categoria);
                borrarCategoria(categoria.id);     
            });

            // Agregar los elementos al <div>
            div.appendChild(spanCategoria);
            div.appendChild(btnEditar);
            div.appendChild(btnBorrar);

            // Agregar el nuevo <div> como hijo del elemento con ID "muestraCategorias"
            $muestraCategorias.appendChild(div);
        } else {
            console.log("El elemento con ID 'muestraCategorias' no existe en el DOM.");
        };
    });
};

// _________________________
// Funcion inicia categorias
// -------------------------
let valorGuardado;
let categorias;
let iniciaCategorias = () => {
    valorGuardado = localStorage.getItem("categorias");
    // Verificar si el valor es null o representa un array vacío
    if (valorGuardado === null ){
       console.log("Local Storage no tiene nada guardado para la clave 'categorias'");
        categorias = categoriasInicio;
        grabar(categorias);  // guarda las categorías con localStorage
        mostrar(categorias);
    } else {
        console.log('Hay algo guardado', valorGuardado)
        mostrar(categorias);
    }
}


// Preparacion del array para guardar
const armadoArrayGuardar = (categoria) =>{
    categoria = Array.isArray(categoria) ? categoria : [categoria]; // Convertir la variable categoria en un array si no lo es
    let categoriasParaGuardar = categoria.map(categoria => ({ id: categoria.id, nombre: categoria.nombre })); // Mapear las categorías para guardar solo id y nombre
    let categoriasAlmacenadas = localStorage.getItem("categorias"); // Obtener las categorías almacenadas anteriormente del almacenamiento local
    let arrayListoParaGuardar;
    if (categoriasAlmacenadas) { // Verificar si hay categorías almacenadas
        categoriasAlmacenadas = JSON.parse(categoriasAlmacenadas); // Convertir las categorías almacenadas de JSON a un objeto JavaScript
        let categoriasUnicas = revisarCategoriasDuplicadas(categoriasParaGuardar, categoriasAlmacenadas);
        arrayListoParaGuardar = categoriasAlmacenadas.concat(categoriasUnicas); // Concatenar las nuevas categorías con las almacenadas
        localStorage.setItem("categorias", JSON.stringify(arrayListoParaGuardar)); // Guardar las categorías actualizadas en el almacenamiento local
        console.log(arrayListoParaGuardar);
    } else {
        arrayListoParaGuardar = categoriasParaGuardar; // Si no hay categorías almacenadas, guardar las nuevas categorías directamente
        localStorage.setItem("categorias", JSON.stringify(arrayListoParaGuardar)); // Guardar las categorías en el almacenamiento local
    }
    return arrayListoParaGuardar;
}


//--------------------------   
// Función ingreso nueva categoría
// -------------------------
let $categoria = document.getElementById("categoria");
let nuevaCategoria = '';
const ingresarCategoria = () => {
    console.log('estoy ingresando nueva categoria',$categoria.value)
    return nuevaCategoria = $categoria.value.trim();
    

    // categorias = crearCategoria($categoria.value);
    // console.log('resultado de crear categoria',nuevaCategoria);
    // grabar(categorias);  // guarda las categorías con localStorage
    // mostrar(categorias);
}

// Función cerrar mensaje por categorías duplicadas
const $mjeCatDuplicada = document.getElementById("mjeCatDuplicada");
const $cerrar = document.getElementById("cerrar");
$cerrar.addEventListener('click', ()=>{
    $mjeCatDuplicada.classList.remove("visible");
    $categoria.value = " ";
});

// _______________________________________________
// Función evitar ingreso de categorías duplicadas
// -----------------------------------------------
const revisarCategoriasDuplicadas = (categoriasParaGuardar, categoriasAlmacenadas) => {
    console.log('estoy en categorias duplicadas');
    return categoriasParaGuardar.filter(nuevaCategoria => {
        // Convertir nombres de categoría a mayúsculas para comparación
        const nombreNuevaCategoria = nuevaCategoria.nombre.toUpperCase();

        // Verificar si alguna categoría almacenada tiene el mismo nombre (en mayúsculas) que la nueva categoría
        const categoriaDuplicada = categoriasAlmacenadas.some(categoria => categoria.nombre.toUpperCase() === nombreNuevaCategoria);
        
        if (categoriaDuplicada) {
            console.log(`La categoría ${nuevaCategoria.nombre} ya está almacenada.`);
            $mjeCatDuplicada.classList.add("visible"); 
        }
        
        console.log('estoy en categorias duplicadas', categoriaDuplicada);
        return !categoriaDuplicada; // Devolver true si no hay categorías duplicadas
    });
}

    
$categoria.addEventListener('input', (e)=>{
    $categoria.value = ingresarCategoria ();
    // console.log('estoy en evento input ingresar categoria', $categoria.value)
})

const $cerrarCatVacia = document.getElementById("cerrarCatVacia");
const $mjeCatVacia = document.getElementById("mjeCatVacia");
$cerrarCatVacia.addEventListener('click', () => $mjeCatVacia.classList.remove("visible"))

let $botonIngresoCategoria = document.getElementById('botonIngresoCategoria');
$botonIngresoCategoria.addEventListener('click', (e) => {
    let valorCategoria = $categoria.value.trim();    // Obtener el valor del input de la categoría  
    if (valorCategoria !== "") {  //evita ingreso de categoría vacía
       let nuevaCategEncrip = crearCategoria(valorCategoria);
        console.log(nuevaCategEncrip, typeof(nuevaCategEncrip));
        let categoriasParaGuardar = armadoArrayGuardar(nuevaCategEncrip);
        grabar(categoriasParaGuardar);
        mostrar();
    } else {
        $mjeCatVacia.classList.add("visible");
        return;
    }
});


// const editarCategoria = (id) => {
//     const $contenedorEditarCategoria = document.getElementById("contenedorEditarCategoria");
//     $contenedorEditarCategoria.classList.add("visible");
//     const $editarCategoria = document.getElementById("editarCategoria");
//     const $botonCancelarEditarCategoria = document.getElementById("botonCancelarEditarCategoria");
//     const $botonGrabarEditarCategoria = document.getElementById("botonGrabarEditarCategoria");
    
//     console.log('Estoy editando categoría');
    
//     // Obtener categorías del localStorage
//     let categorias = JSON.parse(localStorage.getItem("categorias"));
    
//     // Encontrar la categoría a editar
//     let categoriaAEditar = categorias.find(categoria => categoria.id === id);
    
//     // Mostrar el nombre de la categoría a editar en el input
//     $editarCategoria.value = categoriaAEditar.nombre;
    
//     // Event listener para el botón "Cancelar"
//     $botonCancelarEditarCategoria.addEventListener('click', () => {
//         // Limpiar el valor del input al hacer clic en el botón "Cancelar"
//         $editarCategoria.value = "";
//         $contenedorEditarCategoria.classList.remove("visible");
//     });
    
//     // Event listener para el botón "Grabar"
//     $botonGrabarEditarCategoria.addEventListener('click', () => {
//         const nuevoNombre = $editarCategoria.value.trim();
        
//         if (nuevoNombre !== "") {
//             // Actualizar el nombre de la categoría en el arreglo de categorías
//             categoriaAEditar.nombre = nuevoNombre;
            
//             // Llamar a la función grabar con todas las categorías
//             grabar(categorias);
            
//             // Mostrar las categorías actualizadas
//             mostrar();
//             $contenedorEditarCategoria.classList.remove("visible");
//         } else {
//             console.log("El nuevo nombre de la categoría no puede estar vacío.");
//         }
//     });
// };


// const editarCategoria = (id) => {
//     const $contenedorEditarCategoria = document.getElementById("contenedorEditarCategoria");
//     $contenedorEditarCategoria.classList.add("visible");
//     const $editarCategoria = document.getElementById("editarCategoria");
//     const $botonCancelarEditarCategoria = document.getElementById("botonCancelarEditarCategoria");
//     const $botonGrabarEditarCategoria = document.getElementById("botonGrabarEditarCategoria");
    
//     console.log('Estoy editando categoría');
    
//     // Obtener categorías del localStorage
//     let categorias = JSON.parse(localStorage.getItem("categorias"));
    
//     // Encontrar la categoría a editar
//     let categoriaAEditar = categorias.find(categoria => categoria.id === id);
    
//     // Mostrar el nombre de la categoría a editar en el input
//     $editarCategoria.value = categoriaAEditar.nombre;
    
//     // Event listener para el botón "Cancelar"
//     $botonCancelarEditarCategoria.addEventListener('click', () => {
//         // Limpiar el valor del input al hacer clic en el botón "Cancelar"
//         $editarCategoria.value = "";
//         $contenedorEditarCategoria.classList.remove("visible");
//     });
    
//     // Event listener para el botón "Grabar"
//     $botonGrabarEditarCategoria.addEventListener('click', () => {
//         const nuevoNombre = $editarCategoria.value.trim();
        
//         if (nuevoNombre !== "") {
//             // Actualizar el nombre de la categoría en el arreglo de categorías
//             categoriaAEditar.nombre = nuevoNombre;
            
//             // Verificar duplicados con la función revisarCategoriasDuplicadas
//             let categoriasSinDuplicados = revisarCategoriasDuplicadas([categoriaAEditar], categorias);
            
//             if (categoriasSinDuplicados.length === 1) { // Si el arreglo tiene solo 1 elemento, significa que no hay duplicados
//                 // Llamar a la función grabar con todas las categorías
//                 grabar(categorias);
                
//                 // Mostrar las categorías actualizadas
//                 mostrar();
//                 $contenedorEditarCategoria.classList.remove("visible");
//             } else {
//                 console.log("La categoría editada ya existe.");
//             }
//         } else {
//             console.log("El nuevo nombre de la categoría no puede estar vacío.");
//         }
//     });
// };


const editarCategoria = (id) => {
    const $contenedorEditarCategoria = document.getElementById("contenedorEditarCategoria");
    $contenedorEditarCategoria.classList.add("visible");
    const $editarCategoria = document.getElementById("editarCategoria");
    const $botonCancelarEditarCategoria = document.getElementById("botonCancelarEditarCategoria");
    const $botonGrabarEditarCategoria = document.getElementById("botonGrabarEditarCategoria");
    
    console.log('Estoy editando categoría');
    
    // Obtener categorías del localStorage
    let categorias = JSON.parse(localStorage.getItem("categorias"));
    
    // Encontrar la categoría a editar
    let categoriaAEditar = categorias.find(categoria => categoria.id === id);
    
    // Mostrar el nombre de la categoría a editar en el input
    $editarCategoria.value = categoriaAEditar.nombre;
    
    // Event listener para el botón "Cancelar"
    $botonCancelarEditarCategoria.addEventListener('click', () => {
        // Limpiar el valor del input al hacer clic en el botón "Cancelar"
        $editarCategoria.value = "";
        $contenedorEditarCategoria.classList.remove("visible");
    });
    
    // Event listener para el botón "Grabar"
    $botonGrabarEditarCategoria.addEventListener('click', () => {
        const nuevoNombre = $editarCategoria.value.trim();
        
        if (nuevoNombre !== "") {
            // Verificar si el nuevo nombre es igual al nombre original
            if (nuevoNombre.toLowerCase() === categoriaAEditar.nombre.toLowerCase()) {
                // Si son iguales, simplemente actualizar el nombre y guardar
                categoriaAEditar.nombre = nuevoNombre;
                grabar(categorias);
                mostrar();
                $contenedorEditarCategoria.classList.remove("visible");
            } else {
                // Si son diferentes, verificar duplicados con la función revisarCategoriasDuplicadas
                const categoriaEditada = { id: categoriaAEditar.id, nombre: nuevoNombre };
                let categoriasSinDuplicados = revisarCategoriasDuplicadas([categoriaEditada], categorias);
                
                if (categoriasSinDuplicados.length === 1) { // Si el arreglo tiene solo 1 elemento, significa que no hay duplicados
                    // Llamar a la función grabar con todas las categorías
                    categoriaAEditar.nombre = nuevoNombre;
                    grabar(categorias);
                    mostrar();
                    $contenedorEditarCategoria.classList.remove("visible");
                } else {
                    console.log("La categoría editada ya existe.");
                }
            }
        } else {
            console.log("El nuevo nombre de la categoría no puede estar vacío.");
        }
    });
};







//--------------------------   
// Función borrar categoría
// -------------------------
const borrarCategoria = (id) => {
    const categorias = JSON.parse(localStorage.getItem("categorias")); //si no hay datos almacenados será array vacío 
    const nuevasCategorias = categorias.filter(categoria => categoria.id !== id);  // Filtrar las categorías, excluyendo la del id
    console.log(nuevasCategorias.nombre);
    grabar(nuevasCategorias);  // Guardar las nuevas categorías en el localStorage   
    mostrar();  // Mostrar las categorías actualizadas
};

iniciaCategorias();

 

