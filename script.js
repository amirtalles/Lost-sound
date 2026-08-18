const artists=[
 {name:"AmirTalles",role:"Music Producer",number:"01",image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=85"},
 {name:"Ravan",role:"Artist",number:"02",image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=700&q=85"},
 {name:"Nova",role:"Producer",number:"03",image:"https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=700&q=85"},
 {name:"Niloo",role:"Vocalist",number:"04",image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=85"},
 {name:"Noir",role:"Composer",number:"05",image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=700&q=85"}
];

const list=document.getElementById("artistList");
const artistPage=document.getElementById("artistPage");
const profilePhoto=document.getElementById("profilePhoto");
const profileName=document.getElementById("profileName");
const profileRole=document.getElementById("profileRole");
const profileNumber=document.getElementById("profileNumber");

artists.forEach((a,i)=>{
 const card=document.createElement("article");
 card.className="artist-card";
 card.innerHTML=`<div class="portrait" style="background-image:url('${a.image}')"></div><span class="num">${a.number}</span><div class="name">${a.name}</div>`;
 list.appendChild(card);

 card.addEventListener("click",()=>{
   document.querySelectorAll(".artist-card").forEach(x=>x.classList.remove("selected"));
   card.classList.add("selected");

   /* selected artist grows first */
   setTimeout(()=>{
     profilePhoto.style.backgroundImage=`url('${a.image}')`;
     profileName.textContent=a.name;
     profileRole.textContent=a.role;
     profileNumber.textContent=a.number;
     artistPage.classList.add("open");
   },220);
 });
});

document.getElementById("pageBack").onclick=()=>{
 artistPage.classList.remove("open");
 setTimeout(()=>document.querySelectorAll(".artist-card").forEach(x=>x.classList.remove("selected")),500);
};

/* Upload page */
const uploadPage=document.getElementById("uploadPage");
document.getElementById("uploadNav").onclick=()=>uploadPage.classList.add("open");
document.getElementById("uploadBack").onclick=()=>uploadPage.classList.remove("open");

/* Cover preview */
document.getElementById("coverInput").addEventListener("change",e=>{
 const file=e.target.files[0];
 if(!file)return;
 const url=URL.createObjectURL(file);
 const preview=document.getElementById("coverPreview");
 preview.parentElement.classList.add("has-image");
 preview.style.backgroundImage=`url('${url}')`;
});

/* Fake upload transition */
document.getElementById("uploadSubmit").onclick=()=>{
 const btn=document.getElementById("uploadSubmit");
 btn.textContent="UPLOADING...";
 btn.disabled=true;
 setTimeout(()=>{
   btn.textContent="UPLOAD COMPLETE ✓";
 },1200);
};
