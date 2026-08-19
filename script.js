/* =========================================================
   LOST SOUND
========================================================= */

const ARTISTS = [

  {
    id:"amir",
    name:"AmirTalles",
    role:"Music Producer",
    photo:"https://i.pravatar.cc/400?img=13",
    tracks:[
      ["Lost In The Echo","02:45"],
      ["Dark Days","03:10"],
      ["After Midnight","02:58"]
    ]
  },

  {
    id:"kaiden",
    name:"Kaiden Rho",
    role:"Beatmaker",
    photo:"https://i.pravatar.cc/400?img=12",
    tracks:[
      ["Static Bloom","03:22"],
      ["Low Orbit","02:39"],
      ["Nightcrawl","04:01"]
    ]
  },

  {
    id:"noel",
    name:"Noel Vance",
    role:"Vocalist",
    photo:"https://i.pravatar.cc/400?img=47",
    tracks:[
      ["Glass House","03:05"],
      ["Paper Moon","02:51"],
      ["Slow Fade","03:47"]
    ]
  },

  {
    id:"wren",
    name:"Wren Oaks",
    role:"Songwriter",
    photo:"https://i.pravatar.cc/400?img=45",
    tracks:[
      ["Desert Line","03:18"],
      ["Amber Room","02:44"],
      ["Halfway Home","03:33"]
    ]
  },

  {
    id:"silas",
    name:"Silas Crane",
    role:"Sound Designer",
    photo:"https://i.pravatar.cc/400?img=15",
    tracks:[
      ["Signal Loss","04:12"],
      ["Tape Hiss","02:27"],
      ["Undertow","03:56"]
    ]
  }

];


const artistList =
  document.getElementById("artistList");


/* =========================================================
   BUILD ARTISTS
========================================================= */

function buildArtists(){

  artistList.innerHTML = "";

  ARTISTS.forEach((artist,index)=>{

    const button =
      document.createElement("button");

    button.className = "artist";

    button.dataset.id = artist.id;

    button.innerHTML = `

      <div class="artist-photo">

        <img
          src="${artist.photo}"
          alt="${artist.name}"
        >

      </div>

      <div class="artist-number">
        ${String(index+1).padStart(2,"0")}
      </div>

      <div class="artist-name">
        ${artist.name}
      </div>

      <div class="artist-role">
        ${artist.role}
      </div>

    `;


    button.addEventListener(
      "click",
      ()=>openArtist(artist.id)
    );


    artistList.appendChild(button);

  });

}


/* =========================================================
   ENTRANCE
========================================================= */

function playEntrance(){

  const artists =
    document.querySelectorAll(".artist");


  artists.forEach((artist,index)=>{

    setTimeout(()=>{

      artist.classList.add("enter");

    },300 + index * 150);

  });

}


/* =========================================================
   SCREEN
========================================================= */

const screens = {

  home:
    document.getElementById("homeScreen"),

  artist:
    document.getElementById("artistScreen"),

  upload:
    document.getElementById("uploadScreen"),

  uploading:
    document.getElementById("uploadingScreen"),

  mysound:
    document.getElementById("mysoundScreen"),

  profile:
    document.getElementById("profileScreen")

};


function showScreen(name){

  Object.values(screens).forEach(screen=>{

    screen.classList.remove("active");

  });


  screens[name].classList.add("active");


  window.scrollTo({

    top:0,

    behavior:"instant"

  });


  document
    .querySelectorAll(".nav-item")
    .forEach(item=>{

      item.classList.remove("active");

    });

}


/* =========================================================
   HOME
========================================================= */

function goHome(){

  showScreen("home");

}


/* =========================================================
   ARTIST
========================================================= */

function openArtist(id){

  const artist =
    ARTISTS.find(
      item=>item.id === id
    );


  if(!artist)return;


  const photo =
    document.getElementById("artistPhoto");


  const name =
    document.getElementById("artistName");


  const role =
    document.getElementById("artistRole");


  const trackList =
    document.getElementById("trackList");


  photo.src =
    artist.photo;


  photo.alt =
    artist.name;


  name.textContent =
    artist.name;


  role.textContent =
    artist.role;


  trackList.innerHTML = "";


  artist.tracks.forEach(
    (track,index)=>{

      const item =
        document.createElement("div");


      item.className =
        "track";


      item.innerHTML = `

        <img
          src="${artist.photo}"
          alt=""
        >

        <div class="track-info">

          <strong>
            ${track[0]}
          </strong>

          <span>
            ${artist.name}
          </span>

        </div>

        <span class="track-time">
          ${track[1]}
        </span>

        <span>
          •••
        </span>

      `;


      trackList.appendChild(item);

    }
  );


  showScreen("artist");


  /* Morph-like zoom */

  requestAnimationFrame(()=>{

    const photoBox =
      document.querySelector(
        ".large-artist-photo"
      );


    photoBox.animate(

      [

        {
          transform:"scale(.72)",
          opacity:0
        },

        {
          transform:"scale(1.08)",
          opacity:1
        },

        {
          transform:"scale(1)",
          opacity:1
        }

      ],

      {

        duration:650,

        easing:"cubic-bezier(.16,1.3,.3,1)"

      }

    );

  });

}


/* =========================================================
   PROFILE
========================================================= */

function openProfile(){

  showScreen("profile");

}


/* =========================================================
   UPLOAD
========================================================= */

function goUpload(){

  showScreen("upload");

}


/* =========================================================
   MY SOUND
========================================================= */

function goMySound(){

  showScreen("mysound");

}


/* =========================================================
   AUDIO FILE
========================================================= */

const audioFile =
  document.getElementById("audioFile");


if(audioFile){

  audioFile.addEventListener(
    "change",
    ()=>{

      const file =
        audioFile.files[0];


      if(file){

        document.getElementById(
          "audioName"
        ).textContent =
          file.name;

      }

    }
  );

}


/* =========================================================
   UPLOAD
========================================================= */

const uploadForm =
  document.getElementById("uploadForm");


let uploadInterval = null;


uploadForm.addEventListener(
  "submit",
  event=>{

    event.preventDefault();


    showScreen("uploading");


    startUpload();

  }
);


function startUpload(){

  let progress = 0;


  const circle =
    document.getElementById(
      "progressCircle"
    );


  const number =
    document.getElementById(
      "progressNumber"
    );


  const circumference =
    2 * Math.PI * 86;


  circle.style.strokeDasharray =
    circumference;


  circle.style.strokeDashoffset =
    circumference;


  clearInterval(uploadInterval);


  uploadInterval =
    setInterval(()=>{

      progress +=
        Math.random() * 7 + 3;


      if(progress >= 100){

        progress = 100;

        clearInterval(
          uploadInterval
        );

      }


      const offset =
        circumference *
        (1 - progress / 100);


      circle.style.strokeDashoffset =
        offset;


      number.textContent =
        Math.round(progress) + "%";


    },180);

}


/* =========================================================
   CANCEL
========================================================= */

function cancelUpload(){

  clearInterval(
    uploadInterval
  );

  showScreen("upload");

}


/* =========================================================
   MENU
========================================================= */

function toggleMenu(){

  const list =
    document.querySelector(
      ".artist-list"
    );


  list.animate(

    [

      {
        transform:"translateX(0)"
      },

      {
        transform:"translateX(-8px)"
      },

      {
        transform:"translateX(8px)"
      },

      {
        transform:"translateX(0)"
      }

    ],

    {

      duration:350

    }

  );

}


/* =========================================================
   START
========================================================= */

buildArtists();


window.addEventListener(
  "load",
  ()=>{

    setTimeout(
      playEntrance,
      50
    );

  }
);
