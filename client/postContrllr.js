let container = document.getElementById("post-container");


function loadUpImages(){
    axios.get("http://localhost:4000/api/images/")
    .then(function (response) {
      const images = response.data;
      for(id in images){
          console.log(id);
          let imgContainer = document.createElement("div");
          imgContainer.classList.add("img-post-container");
          imgContainer.id = `container-${id}`;
          imgContainer.innerHTML = `<img src="${images[id].image}" class="img-post" id="img-${id}"><div id="imgText-${id}" class="img-text-stuff">${id.text}</div>`;
          let delButtn = document.createElement("div");
          delButtn.classList.add("delete-btn");
          delButtn.classList.add("delete-btn-hvr");
          delButtn.id = `del-${id}`;
          delButtn.textContent = "x";
          delButtn.addEventListener('click',initDelAnim);
          imgContainer.appendChild(delButtn);
          container.appendChild(imgContainer);
      }
    });
}

loadUpImages();

function initDelAnim(event){
    event.target.classList.add("going-to-explode");
    event.target.classList.remove("delete-btn-hvr");
    event.target.parentElement.classList.add("shrink");
    console.log(event.target.classList);
    event.target.addEventListener('transitionend',deleteImage);
}

function deleteImage( event ) {
    if(event.target.classList.contains("going-to-explode")){
        event.target.classList.remove("going-to-explode");
        
    }else{
        event.target.parentElement.remove();
        axios.delete(`http://localhost:4000/api/images/${event.target.id.split("-")[1]}`).then( (res) => {
            console.log(res.data);
        }).catch( error => {console.log(error);});
    }
    
}
function updateText(id,text,target) {
    console.log("yup");
    axios.put(`http://localhost:4000/api/images/${id}`,{text:text}).then( (res) => {
        console.log("Removed Image");
    }).catch( error => {console.log(error);});
}