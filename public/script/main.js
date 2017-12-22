
var app = new Vue({
  el: '.container',
  data:{
    todos: [],
    isShare: navigator.share?true:false
  },
  created: function () {
    console.log("D�marrage TODO-APP");
  },
  beforeMount: function() {
    this.recupererListe();
  },
  methods:{
    share: function(texte){
      navigator.share({
        title: 'VueJS-Todo',
        text: texte,
        url: ""})
        .then(function(){})
        .catch(function(){})
    },
    recupererListe: function (){
      // R�cup�ration des todos
      get_data("api/liste.php").then(function(todos){
        // Apr�s la r�ussite de l�appel, sauvegarde des todos
        app.todos = todos;
      }).catch(function(e){
        show_error("R�cup�ration impossible");
      });
    },
    ajout: function () {
      var data = {"texte": document.getElementById("texte").value}
      post_data("api/creation.php", data).then(function(r){
        if(r){
          app.recupererListe();
        }else{
          show_error("Cr�ation impossible");
        }
      }).catch(function(e){
        show_error("Cr�ation impossible");
      });
    },
    terminerSupprimer: function(action, id){
      // Action must be � terminer � or � suppression �
      if(["terminer", "suppression"].indexOf(action) < 0){
        return;
      }

      get_data("api/" + action + ".php?id=" + id).then(function(s){
        if(s.success){
          app.recupererListe();
        }else{
          show_error("Erreur de traitement de l�id : " + id);
        }
      }).catch(function(e){
        show_error("Erreur de traitement de l�id : " + id);
      });
    }
  }
});

function show_error(message){
  swal("D�sol�", message, "error");
}

/**
 * GET Ajax
 */
function get_data(uri){
  return new Promise(function(resolve, reject){
    fetch(uri, {method: "GET", credentials: 'same-origin'}).then(function(response){
      // On d�code le JSON, et on continue
      return response.json();
    }).then(function(response) {
      resolve(response);
    }).catch(function(error) {
      reject(error);
    });
  });
}

/**
 * POST Ajax
 */
function post_data(uri, data){
  // Construction des parametres pour la requete.
  var form = new FormData();
  for(var k in data){
    form.append(k, data[k]);
  }

  return new Promise(function(resolve, reject){
    fetch("api/creation.php", {
      method: "POST",
      body: form,
      credentials: 'same-origin'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(response) {
      resolve(response);
    })
    .catch(function(error) {
      reject(error);
    });
  })
}
