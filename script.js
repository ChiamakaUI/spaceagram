const key = "Ef7jEcQmhYckesMvC9IWzE1MCztSjMFNpYPuWplT";
const modal = document.getElementById("my-modal");

const displayDetails = (element) => {
  const modalBody = document.querySelector(".modal-body");
  modal.style.display = "block";
  console.log(element);
  // console.log(typeof element)
  // let testin = JSON.parse(element)
  // console.log(testin);

  // const {id, sol, camera: { id: cameraID, name: cameraName,rover_id,full_name: cameraFullName }, img_src, earth_date, rover: { id: roverID, name: roverName, landing_date, launch_date,status }} = element
  // console.log(sol, id,cameraID );

  let text = `
        <div class='imgDetails'>
        <img src=${element.img_src} alt='' class='large'/>
        <div>
        <p>Earth Date: ${element.earth_date}</p>
        <p>${element.camera.name}</p>
        </div>
       
        </div>
        `;
  modalBody.innerHTML = text;
};

const likeImage = (e) =>{
  console.log('heyy')
  console.log(e);
}

const displayAPIResult = (res) => {
  let main = document.querySelector("main");
  const likeBtn = document.querySelectorAll('.likeBtn')
console.log(likeBtn);

  for (const key in res) {
    let val = res[key];

    val.forEach((element, i) => {
      // const onClick = () => console.log('clicked.....');
      // const e = JSON.stringify(JSON.stringify(element))
      // console.log(e);

      let innerText = `
                  <div>
                  <img src=${element.img_src} class="opener" data-key="${key}" data-id="${i}" alt='Image Text'/>
                  <p>${element.earth_date}</p>
                  <p>${element.camera.full_name}</p>
                  <p>${element.rover.name}</p>
                  <button class='likeBtn'>Like <p class='hide'>${element.id}</p></button>
                  
                  </div>
              
              `;

      main.innerHTML += innerText;
      // console.log(element);
    });
  }

  main.addEventListener("click", (e) => {
    const img = e.target.closest(".opener");
    const clicked = e.target.contains(img);

    if (clicked && img) {
      const { key, id } = img.dataset;

      const value = res[key][id];
      displayDetails(value);
    }
  });

  likeBtn.forEach(btn => {
    btn.addEventListener('click', (e) =>{
      console.log(e);
      console.log('hey');
    })
  })


};






const getAPIData = () => {
  axios(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`
  )
    // .then(res=> console.log(res.data))
    .then((res) => displayAPIResult(res.data))
    .catch((err) => console.log(err));
};


const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
}

window.addEventListener("DOMContentLoaded", getAPIData);
