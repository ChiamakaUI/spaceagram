const key = "Ef7jEcQmhYckesMvC9IWzE1MCztSjMFNpYPuWplT";

const displayDetails = (x) => {
  const modalBody = document.querySelector(".modal-body");
  console.log(x);

  const {
    camera: { full_name, id, name, rover_id },
    earth_date,
    img_src,
    rover: { landing_date, launch_date, status },
    sol,
  } = x;

  console.log(full_name, id, name, rover_id, earth_date, id, img_src);

  let text = `<div>
    <img src=${img_src} alt='' class='large'/>
    <p>${earth_date}</p>
  </div>`;
  modalBody.innerHTML = text;
};

const displayAPIResult = (res) => {
  const main = document.querySelector("main");

  const photos = res.photos;

  if (Array.isArray(photos)) {
    for (let i = 0; i < photos.length; i++) {
      const element = photos[i];

      const innerText = `<div>
        <img src=${element.img_src} class="opener" onclick="displayModal('${element}')"  alt='Image Text'/>
        <p>${element.earth_date}</p>
        <p>${element.camera.full_name}</p>
        <p>${element.rover.name}</p>
      </div>`;

      main.innerHTML += innerText;
    }
  }

  // for (const key in res) {
  //   // console.log(key);
  //   // console.log(res[key]);
  //   let val = res[key];
  //   console.log(val);

  //   val.forEach((element) => {
  //     let innerText = `
  //               <div>
  //               <img src=${element.img_src} class="opener" onclick="displayModal('${element}')"  alt='Image Text'/>
  //               <p>${element.earth_date}</p>
  //               <p>${element.camera.full_name}</p>
  //               <p>${element.rover.name}</p>

  //               </div>

  //           `;

  //     main.innerHTML += innerText;
  //     console.log(element);
  //     // displayModal(element)
  //     // onclick="displayModal('${element}')
  //   });
  // }
};

// opener.forEach(element => {

//   element.addEventListener('click', displayModal)

// });

// opener.addEventListener('click', ()=>{
//   window.displayModal(element)
//   console.log('hiya')
// })

const getAPIData = () => {
  axios(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`
  )
    .then((res) => displayAPIResult(res.data))
    .catch((err) => console.log(err));
};

const modal = document.getElementById("my-modal");

const closeBtn = document.querySelector(".close");

function displayModal(element) {
  // const modal = document.getElementById('my-modal')

  modal.style.display = "block";
  console.log("2nd phase");
  console.log(element);

  displayDetails(element);
}

const opener = document.getElementsByClassName("opener");

console.log(opener);

for (let j = 0; j < opener.length; j++) {
  const element = opener[j];
  console.log("hello");
  console.log(element);

  // element.addEventListener('click', displayModal)
}

closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
}

window.addEventListener("DOMContentLoaded", getAPIData);
