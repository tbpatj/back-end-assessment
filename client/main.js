let inspireContainer = document.getElementById("image-container");
let insprElem = document.getElementById("inspiration");
let insprElem2 = document.getElementById("inspiration2");
let hideBtn = document.getElementById("hide-insp-bttn");

let loaded=false;
let animationFin=false;

insprElem.addEventListener("load",loadedImg);
insprElem2.addEventListener("load",loadedImg);
inspireContainer.addEventListener('transitionend',transitionFinish);

document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

document.getElementById("fortune-button").onclick = function() {
    axios.get("http://localhost:4000/api/fortune")
    .then( (res) => {
        alert(res.data);
    }).catch( error => {console.log(error)})
}

document.getElementById("submit-cypher").onclick = function() {
    let cyperTextBox = document.getElementById("cypher-text");
    let keyEl = document.getElementById("key-text");
    axios.post("http://localhost:4000/api/cypher",{text:cyperTextBox.value, key:keyEl.value})
    .then( (res) => {
        if(res.data.key){
            //if a key was given back then we'll print out the key, if we gave the key then we know it already so it won't print it out
            if(res.data.key != "given"){ 
                alert(`Encrypted Text: ${res.data.text}\nKey: ${res.data.key}`);
                //automatically update the key box with the new key
                keyEl.value = res.data.key;
            } else alert(`Encrypted Text: ${res.data.text}`);
            //clear the input box if successful
            cyperTextBox.value = "";

        } else alert(res.data.text);
    }).catch( error => {console.log(error)})
    
}

document.getElementById("submit-decypher").onclick = () => {
    let cyperTextBox = document.getElementById("cypher-text");
    let keyEl = document.getElementById("key-text");
    axios.post("http://localhost:4000/api/decypher/",{text:cyperTextBox.value, key:keyEl.value})
    .then( (res) => {
        alert(res.data.text);
    }).catch( error => {console.log(error)})
}


document.getElementById("hide-insp-bttn").onclick = (event) => {
    hideBtn.classList.add("hidden");
    inspireContainer.classList.remove("container-show");

    insprElem.classList.add("initialH");
    insprElem.classList.add("hidden");
    insprElem.classList.remove("imageShow");

    insprElem2.classList.add("hidden");
    insprElem2.classList.remove("imageShow");
    animationFin = false;
    loaded = false;
}

document.getElementById("inspiration-bttn").onclick = () => {//Inspiration button is clicked
    //if we haven't even clicked it once it will run this script finding an image and adding the needed animation classes
    if(insprElem.classList.contains("initialH")){ 
        hideBtn.classList.remove("hidden");
        inspireContainer.classList.add("container-show");
         insprElem.classList.remove("initialH");
         insprElem.classList.remove("hidden");
         insprElem.classList.add("imageShow");
         axios.get("https://dog.ceo/api/breeds/image/random")
        .then( (res) => {
            insprElem.src = res.data.message;
        })
    } else { //if we have already clicked for an image before just add the animation classes
        //make sure adding of classes starts before you do axios
        inspireContainer.classList.remove("container-show");
        inspireContainer.classList.add("swapping");
        animationFin = false;
        loaded = false;
        if(insprElem.classList.contains("hidden")){
            axios.get("https://dog.ceo/api/breeds/image/random")
            .then( (res) => {
                insprElem.src = res.data.message;
            })
        } else {
            axios.get("https://dog.ceo/api/breeds/image/random")
            .then( (res) => {
                insprElem2.src = res.data.message;
            })
        }
        
    }
    
}
function transitionFinish( event ){ //this just starts to load up the image
    animationFin = true;
    if(loaded){
        console.log("yeah324");
        loaded = false;
        swapTheClasses()
    }
}

function loadedImg( event ){
    loaded = true;
    if(animationFin){
        swapTheClasses()
    }
}

function swapTheClasses(){
    if(inspireContainer.classList.contains("swapping")){
        inspireContainer.classList.remove("swapping");
        inspireContainer.classList.add("container-show");
        if(insprElem.classList.contains("hidden")){
            insprElem.classList.remove("hidden");
            insprElem.classList.add("imageShow");
            insprElem2.classList.add("hidden");
            insprElem2.classList.remove("imageShow");
        } else {
            insprElem.classList.add("hidden");
            insprElem.classList.remove("imageShow");
            insprElem2.classList.remove("hidden");
            insprElem2.classList.add("imageShow");
        }
    }
}

console.log("yeah");