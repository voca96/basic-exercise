Enunciado

Crea una aplicación para buscar películas

API a usar: - https://www.omdbapi.com/ Consigue la API Key en la propia página web registrando tu email.
https://www.omdbapi.com/?s=%22star%20wars%22&page=1&apikey=${key}

Requerimientos:

    ✅Necesita mostrar un input para buscar la película y un botón para buscar.

    ✅Lista las películas y muestra el título, año y poster.

    ✅Que el formulario funcione

    Haz que las películas se muestren en un grid responsive.

    ✅Hacer el fetching de datos a la API

Primera iteración:

    Evitar que se haga la misma búsqueda dos veces seguidas.

    Hacer un sorted de peliculas por nombre

    Haz que la búsqueda se haga automáticamente al escribir.

    Evita que se haga la búsqueda continuamente al escribir (debounce)

    <!-- esto puede ocacionar un raice condition una solicitud puede terminar antes que otra y ocasionar que se muestra la data incorrecta -->


    un debounce espera a que el user termine de escribir, espera un timer y ejecuta una funcion, si el usuario vuelve a escribir antes que se ejecute entonces se desuscribe el timer y el timer se reinicia, si se selecciona el boton de busqueda antes de que termine el timer se desuscribe el timer, si se sale del componente tambien
