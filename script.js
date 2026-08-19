const artists = [


{
name:"The Weeknd",
bio:"Singer / Artist",

image:
"https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b"

},


{
name:"Travis Scott",
bio:"Hip Hop Artist",

image:
"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"

},


{
name:"Billie Eilish",
bio:"Alternative Artist",

image:
"https://images.unsplash.com/photo-1516280440614-37939bbacd81"

},


{
name:"Drake",
bio:"Rapper",

image:
"https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b"

},


{
name:"Lost Artist",
bio:"New Creator",

image:
"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"

}


];





const list =
document.getElementById("artistList");



artists.forEach((artist,index)=>{


let card =
document.createElement("div");


card.className="artist";



card.innerHTML=`

<div class="photo"

style="background-image:url(${artist.image})">

</div>


<div class="number">

0${index+1}

</div>


<div class="name">

${artist.name}

</div>


`;



card.onclick=()=>{


document
.getElementById("profileImage")
.src=
artist.image;



document
.getElementById("profileName")
.innerHTML=
artist.name;



document
.getElementById("profileBio")
.innerHTML=
artist.bio;



document
.getElementById("profilePage")
.classList.add("active");



};



list.appendChild(card);


});





document
.getElementById("close")
.onclick=()=>{


document
.getElementById("profilePage")
.classList.remove("active");


};
