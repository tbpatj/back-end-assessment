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
    let encodeTextBox = document.getElementById("cypher-text");
    let cypherBox = document.getElementById("key-text");
    axios.post("http://localhost:4000/api/encode",{text:encodeTextBox.value, key:cypherBox.value})
    .then( (res) => {
        if(res.data.key){
            if(res.data.key != "given"){ 
                alert(`Encrypted Text: ${res.data.text} \nKey: ${res.data.key}`);
                cypherBox.value = res.data.key;
            } else {
                alert(`Encrypted Text: ${res.data.text}`);
            }
            encodeTextBox.value = "";
            
        } else {
            alert(res.data.text);
        }
    }).catch( error => {console.log(error)})
    
}

document.getElementById("submit-decypher").onclick = function() {
    
}

console.log("yeah");