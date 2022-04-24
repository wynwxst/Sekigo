const sleep = ms => new Promise(r => setTimeout(r, ms));
function postRequest(url, params) {
    url = url + "/api/"
    console.log([url])
    /* Send a POST request to url with params, return the xhr. */
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params)
    return xhr;
}
async function Add(uri) {
    var text = await navigator.clipboard.readText();
    console.log([text])
    var ct = await navigator.clipboard.readText();
    if (text == ""){
      text = prompt("please enter a source: ")
      if (text.startsWith("https://") == false){
        text = "https://" + text
      }
    } else {
      if (ct.startsWith("https://") == true){
      x = confirm("Use\n - '" + text + "' ?")
        if (x == false){
          text = prompt("please enter a source: ")
          if (text.startsWith("https://") == false){
            text = "https://" + text
          }          
        }
      } else {
        text = prompt("please enter a source: ")
        if (text.startsWith("https://") == false){
          text = "https://" + text
      }
      }
    }
    

    if (!text) return;
    let params = "command=add"
    params += "&src=" + text;
    let url = uri

    postRequest(url, params);
    pnt.presets.success(`Added ${url} as a source.\nReloading...`)
    await sleep(4)
    location.replace(window.location.href)
}
//Function to get variables from URL
function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(null);
}

// Function to load files (async) (bypass cross-origin [CORS] errors)
async function corsBypass(URL) {
    
    return console.log("corsbypass ;-;")
}

//Function to set cookie
function setCookie(name,value) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + 999999999);
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//Function to get cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Set Dark Mode Cookie if non-existant
if (!document.cookie) {
    setCookie("enableDarkMode","false")
} else {
    refreshDarkMode()
}

// Function called by buttons that toggle dark mode on/off
function toggleDarkMode() {
    console.log("toggled dm!")
    let darkModeStatus = getCookie("enableDarkMode")
    if (darkModeStatus == "true") {
        setCookie("enableDarkMode","false")
    } else {
        setCookie("enableDarkMode","true")
    }
    refreshDarkMode()
}

// Function to enable/disable Dark Mode
function refreshDarkMode() {
    console.log("refreshed dm!")
    let darkModeStatus = getCookie("enableDarkMode")
    //Check Browser is not IE
    if (navigator.userAgent.indexOf("Trident") < 0) {
        if (darkModeStatus == "true") {
            console.log("enabled dm!")
            document.getElementsByTagName('html')[0].classList.add("darkMode")
            document.getElementsByTagName('body')[0].classList.add("darkMode")
        } else {
            console.log("disabled dm!")
            document.getElementsByTagName('html')[0].classList.remove("darkMode")
            document.getElementsByTagName('body')[0].classList.remove("darkMode")
        }
    } else {
        alert("Sorry Internet Explorer does not support this feature!")
    }
}