
fetch('https://jsonplaceholder.typicode.com/users?_start=0&_limit=10')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    appendData(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});

function appendData(data) {
    var mainContainer = document.getElementById("users");
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement("li");
        li.innerHTML =  "Username: "+data[i].username;
        li.classList.add('item');
        li.dataset.userId = data[i].id;
        li.addEventListener('click', (event) => obtenerdatos(event))
        /*li.addEventListener('click', (event) => obtenerTareas(event))*/
        mainContainer.appendChild(li);
    }

}

function obtenerdatos(event){
    var Id_user = event.target.dataset.userId;

    fetch(`https://jsonplaceholder.typicode.com/users?id=${Id_user}`)
        .then(response => response.json())
        .then(json => mostrardatos(json, event.target))
}

function mostrardatos(datousuario, target) {
        var list = document.createElement("ul");
        for (var i = 0; i < datousuario.length; i++) {

            var item = document.createElement("li");
            var iduser = document.createElement("strong");
            var nameuser = document.createElement("p");
            var mailuser = document.createElement("p");
            var cityuser = document.createElement("p");
            var button_one = document.createElement("button");
            var button_two = document.createElement("button");
            idus = datousuario[i].id;
            nameu = datousuario[i].name;
            iduser.innerHTML = "ID de usuario: "+datousuario[i].id;
            nameuser.innerHTML = "Nombre: "+datousuario[i].name;
            mailuser.innerHTML = "Correo: "+datousuario[i].email;
            cityuser.innerHTML = "Ciudad: "+datousuario[i].address.city;
            button_one.innerHTML = "Posts";
            button_one.onclick=function() {mostrarPosts(idus,nameu)};
            button_two.innerHTML = "Todos";
            button_two.onclick=function() {mostrarTodos(idus,nameu)};

            item.appendChild(iduser);
            item.appendChild(nameuser);
            item.appendChild(mailuser);
            item.appendChild(cityuser);
            item.appendChild(button_one);
            item.appendChild(button_two);
            list.appendChild(item);
        }

        target.appendChild(list);
}

function mostrarPosts(idus,nameu) {
    var userId = idus;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(json => enlistarPosts(json,nameu))
}

function enlistarPosts(posts,nameu) {
    var mainContainer2 = document.getElementById("posts");
    var mainContainer3 = document.getElementById("usuario");

    mainContainer2.innerHTML = "";
    mainContainer3.innerHTML = "Posts de: "+nameu;
        var list = document.createElement("ul");

        for (var i = 0; i < posts.length; i++) {
            var item = document.createElement("li");
            var liTitle = document.createElement("strong");
            var liBody = document.createElement("p");

            liTitle.innerHTML = "Título: "+posts[i].title;
            liBody.innerHTML = "Post: "+posts[i].body;

            item.appendChild(liTitle);
            item.appendChild(liBody);
            list.appendChild(item);
        }
    mainContainer2.appendChild(list);
}

function mostrarTodos(idus,nameu) {
    var userId = idus;
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
        .then(response => response.json())
        .then(json => enlistarTareas(json,idus,nameu))
}

function enlistarTareas(tareas,idus,nameu) {
    var mainContainer4 = document.getElementById("todos");
    var mainContainer5 = document.getElementById("usuario2");
    var textone = document.getElementById("textid");
    var texttwo = document.getElementById("iduser2");
    var forms = document.getElementById("form");

    mainContainer4.innerHTML = "";
    mainContainer5.innerHTML = "Tareas de: "+nameu;
    textone.innerHTML = "ID de usuario: ";
    texttwo.innerHTML = idus;

    forms.style.display ="block";
        var list = document.createElement("ul");
        for (var i = 0; i < tareas.length; i++) {
            var item = document.createElement("li");
            var liID = document.createElement("p");
            var liTitle = document.createElement("strong");
            var liBody = document.createElement("p");
            
            liID.innerHTML = "ID de tarea: "+tareas[i].id;
            liTitle.innerHTML = "Tarea: "+tareas[i].title;
            liBody.innerHTML = "¿Completada?: "+tareas[i].completed;
            
            item.appendChild(liID);
            item.appendChild(liTitle);
            item.appendChild(liBody);
            list.appendChild(item);
        }
    list.setAttribute("reverse","true");
    mainContainer4.appendChild(list);
}

var form = document.getElementById("form")

form.addEventListener("submit",function (e){
    e.preventDefault();

    var titletask = document.getElementById("titletask").value
    var idusr = document.getElementById("iduser2").value
    var check;

    if (document.getElementById("checkbox").checked) {
        check="true";
    }else{
        check="false";
    }

    fetch("https://jsonplaceholder.typicode.com/todos",{
        method: "POST",
        body: JSON.stringify({
            userId:idusr,
            title:titletask,
            completed:check
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function (data){
        console.log(data)
        var results = document.getElementById("resultados")
        results.innerHTML = `<p>Tarea agregada</p> <p>Tarea: ${data.title}</p> <p>¿Completada?: ${data.completed}</p>`
    })

})