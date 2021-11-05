let container = document.getElementById("post-container");

function loadUpImages(){
    axios.get("http://localhost:4000/api/images/")
    .then(function (response) {
      const images = response.data;
      for(let i = 0; i < images.length; i ++){
          console.log(images);
          let imgContainer = document.createElement("div");
          imgContainer.classList.add("img-post-container");
          imgContainer.innerHTML = `<img src="${images[i]}" class="img-post">`;
          container.appendChild(imgContainer);
      }
    });
}

loadUpImages();