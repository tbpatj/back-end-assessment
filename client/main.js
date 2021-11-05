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

document.getElementById("submit-decypher").onclick = function() {
    let cyperTextBox = document.getElementById("cypher-text");
    let keyEl = document.getElementById("key-text");
    axios.post("http://localhost:4000/api/decypher/",{text:cyperTextBox.value, key:keyEl.value})
    .then( (res) => {
        alert(res.data.text);
    }).catch( error => {console.log(error)})
}

document.getElementById("inspiration-bttn").onclick = () => {
    axios.get("https://dog.ceo/api/breeds/image/random")
    .then( (res) => {
        let insprElem = document.getElementById("inspiration");
        if(insprElem.classList.contains("hidden")){
             insprElem.classList.remove("hidden");
             insprElem.classList.add("imageShow");
        }
        console.log(insprElem.classList);
        insprElem.src = res.data.message;
    })
}

console.log("yeah");