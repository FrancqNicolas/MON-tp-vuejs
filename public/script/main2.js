var app = new Vue({
  el: '.container',
   data: {
      taches: []
  },
  
  created: function () {
    console.log("D�marrage TODO-APP");
	
  },
   
   beforeMount: function() {
   fetch('api/liste.php', {method: "GET", credentials: 'same-origin'})
	.then(function(response){
	return response.json();
})

.then(function(response) {
  app.taches = response;
})
.catch(function(error) {
  console.log('R�cup�ration impossible: ' + error.message);
});
  }
})






if(self.fetch) {
 console.log('c bon il a fetch');
}else{
	alert('Votre navigateur est trop ancien pour ce site, redirection...');
	document.location = 'http://www.mozilla.org';
}