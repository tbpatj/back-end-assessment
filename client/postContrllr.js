let container = document.getElementById("post-container");
let imageIndex = 0;

function loadUpImages(){
    axios.get("http://localhost:4000/api/images/")
    .then(function (response) {
      const images = response.data;
      for(let i = 0; i < images.length; i ++){
          console.log(images);
          let imgContainer = document.createElement("div");
          imgContainer.classList.add("img-post-container");
          imgContainer.id = `container-${imageIndex}`;
          imgContainer.innerHTML = `<img src="${images[i]}" class="img-post" id="img-${imageIndex}">`;
          let delButtn = document.createElement("div");
          delButtn.classList.add("delete-btn");
          delButtn.id = `del-${imageIndex}`;
          delButtn.textContent = "x";
          delButtn.addEventListener('click',deleteImage);
          imgContainer.appendChild(delButtn);
          imageIndex++;
          container.appendChild(imgContainer);
      }
    });
}

loadUpImages();

function deleteImage( event ) {
    console.log("yup");
    event.target.parentElement.remove();
    axios.delete(`http://localhost:4000/api/images/${event.target.id.split("-")[1]}`).then( (res) => {
        console.log("Removed Image");
    }).catch( error => {console.log(error);});
}