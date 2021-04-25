// Storage Documentation: https://developer.chrome.com/extensions/storage
document.addEventListener('DOMContentLoaded', function() {
  var SteamLink = document.getElementById('Links');
  var injectButton = document.getElementById('inject');

  chrome.tabs.query({active: true},function(tab) {
    var url = tab[0].url;
    injectButton.addEventListener('click', function() {
        let Inject =`
          let y = document.getElementsByClassName("btn_profile_action btn_medium")[0]
          
          y.getElementsByTagName("span")[0].innerHTML = "Edit Profile"
          y.href= "`+`${SteamLink.value}`+`"

          let x = { 10 : document.getElementsByClassName("submenu_username")[1].getElementsByTagName("a")[1], 11 :document.getElementsByClassName("user_avatar playerAvatar offline")[0]}
          for(i in x  ) { x[i].href = "`+`${url}`+`" }

          

          var elements = document.getElementsByClassName('btn_profile_action btn_medium'),
              element;
            while (element = elements[1]) {
            element.parentNode.removeChild(element);
          }`;
      chrome.tabs.executeScript({
        code: Inject
      });
      // Save it using the Chrome extension storage API.
      var keypair = {};
      keypair[url] = Inject;
      chrome.storage.sync.set(keypair, function() {
        // Notify that we saved.
        console.log('SAVED ' + JSON.stringify(keypair));
      });
      window.close();
    });
  });

  

  
  


});
