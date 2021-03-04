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
            /*li.addEventListener('click', (event) => getPosts(event))*/
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
        var detalles = target.childNodes[1];

        cleanPosts();

        if(detalles){
            detalles.style.display = 'block';
        } else {
            var list = document.createElement("ul");

            for (var i = 0; i < datousuario.length; i++) {

                var item = document.createElement("li");
                var iduser = document.createElement("strong");
                var nameuser = document.createElement("p");
                var mailuser = document.createElement("p");
                var cityuser = document.createElement("p");
                var button_one = document.createElement("button");
                var div_one = document.createElement("div");
                div_one.setAttribute("id","div_one")
                var button_two = document.createElement("button");
                idus = datousuario[i].id;
                iduser.innerHTML = "ID de usuario: "+datousuario[i].id;
                nameuser.innerHTML = "Nombre: "+datousuario[i].name;
                mailuser.innerHTML = "Correo: "+datousuario[i].email;
                cityuser.innerHTML = "Ciudad: "+datousuario[i].address.city;
                button_one.innerHTML = "Posts";
                button_one.addEventListener("click", (event) => getPosts(event))
                button_two.innerHTML = "Todos";

                item.appendChild(iduser);
                item.appendChild(nameuser);
                item.appendChild(mailuser);
                item.appendChild(cityuser);
                item.appendChild(button_one);
                item.appendChild(div_one);
                item.appendChild(button_two);
                list.appendChild(item);
            }

            target.appendChild(list);
        }

    }

    function cleanPosts() {
        var users = document.querySelectorAll('.item ul');
        for(var i = 0; i < users.length; i++) {
            if(users[i]) {
                users[i].style.display = 'none';
            }
        }
    }

    function getPosts(event) {

        var userId = event.target.dataset.userId;

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(json => renderPosts(json, event.target))
    }

    

    function renderPosts(posts, target) {
        var postsList = target.childNodes[1];

        cleanPosts();

        if(postsList){
            postsList.style.display = 'block';
        } else {
            var divs = document.createElement("div");
            /*divs.setAttribute("style","display: block");*/
            divs.setAttribute("id","divs");
            var list = document.createElement("ul");

            for (var i = 0; i < posts.length; i++) {

                var item = document.createElement("li");
                var liTitle = document.createElement("strong");
                var liBody = document.createElement("p");

                liTitle.innerHTML = posts[i].title;
                liBody.innerHTML = posts[i].body;

                item.appendChild(liTitle);
                item.appendChild(liBody);
                list.appendChild(item);
            }
            divs.appendChild(list);
            target.appendChild(divs);
        }

    }

    /*function verPosts(){
    document.addEventListener("DOMContentLoaded", function () {
        var y = document.getElementById("divs");
        var x = y.style.display;
        if(x.style.display === "none"){
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    });
    }*/