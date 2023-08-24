'use strict';

const accessToken = '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';
const apiUrl = 'https://api.github.com';

async function getGitUsers(user) {
  fetch(`https://api.github.com/users/${user}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.message == 'Not Found') {
        errorGettingUser();
      } else {
        renderGitUser(data);
      }
    });
}

const divUser = document.getElementById('divUser');
const inpUser = document.getElementById('inpUser');
const btnPretrazi = document.getElementById('btnPretrazi');
function renderGitUser(data) {
  const el = document.createElement('div');
  el.innerHTML = `
 <br>
<div class="container">
 
<div class="row container">

<div class="col-4 ">
<br>
<img id="imgClear"  class="img-fluid avatar" src="${data.avatar_url}" alt="">

</div>

<div class="col-8 card">
<h1 class="text-center form-control bg-warning text-white"> <strong>${
    data.login
  }</strong>  </h1>
<h5>Profile Link  <a target="_blank" href="${data.html_url}">${
    data.html_url
  }</a></h5>
<h5> Repos <a target="_blank" href="${data.html_url}?tab=repositories">${
    data.html_url
  }?tab=repositories</a></h5>
<h5>Broj Repo: <span class="text-danger">Private: ${
    data.total_private_repos ?? '0'
  }</span>   <span class="text-success">Public:${
    data.public_repos ?? '0'
  }</span></h5>
<h5>Folowing: ${data.following}</h5>
<h5>Folowers: ${data.followers}</h5>
<h5>Email: ${data.email ?? 'None'}</h5>
<h5>Account Created: ${dateFormat(data.created_at)}</h5>
</div>
</div>

</div>



`;

  if (!divUser.innerHTML == '') {
    divUser.innerHTML = '';
    divUser.appendChild(el);
  } else if (divUser.innerHTML == '') {
    divUser.appendChild(el);
  }
}

btnPretrazi.addEventListener('click', function (e) {
  e.preventDefault();

  getGitUsers(inpUser.value);
});

const divInput = document.getElementById('divInput');

function errorGettingUser() {
  let errorAlert = document.createElement('div');
  errorAlert.innerHTML = `
     <br>
 <div style="margin-left:1em" id="divError" class="alert alert-warning alert-dismissible fade show w-50" role="alert">
  <strong>Ne postoji takav korisnik!</strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
 
 

`;
  divError.appendChild(errorAlert);
}

function dateFormat(datum) {
  const dat = new Date(datum);
  const godina = dat.getFullYear();
  const mjesec = dat.getMonth() + 1;
  const dan = dat.getDate() - 1;
  const result = `${dan}.${mjesec}.${godina}`;
  return result;
}

//Github Search
const searhFiles = document.getElementById('searchFiles');
const btnSearchGit = document.getElementById('btnSearchGit');
const divSearch = document.getElementById('divSearch');
const imgUser=document.getElementById('imgUser'); 
const gitUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(
  searhFiles
)}`;

function searchGitFiles(files) {
  fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(files)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      renderSearchGit(data);

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
btnSearchGit.addEventListener('click', function (e) {
  e.preventDefault();

  searchGitFiles(searhFiles.value);
  
});



//Filter
// const testObj = {
//   osobe: [
//     {
//       ime: 'javascript crud',
//       drzava: 'Srbija',
//     },
//     {
//       ime: 'javascript',
//       drzava: 'Hrvatska',
//     },
//     {
//       ime: 'C#',
//       drzava: 'Bosna',
//     },
//     {
//       ime: 'javascript',
//       drzava: 'Makedonija',
//     },
//     {
//       ime: 'java',
//       drzava: 'Slovenija',
//     },
//   ],
// };
// //console.log(testObj.osobe)
// console.log(testObj.osobe)
// const osb=testObj.osobe
// const rez= osb.filter(val=>val.ime.includes('javascript'))
// console.log(rez)pointerr

function renderSearchGit(data) {
  const items = Object.values(data.items);
  const linkOwner='https://github.com/' 
  items.forEach(el => {

   
    const elm = document.createElement('div');
    elm.innerHTML = `


<br>




<div class="row " >
<div class="col-3 ">
<br>
<img style="cursor:pointer"  id="imgUser" onclick="(function(){
  window.open('${linkOwner}${el.owner.login}');
  
})()"
 src="${el.owner.avatar_url})()" class="avatar card-img-sm-left" >
</div>

<div class="col-9 card boja ">
<div  class="card-body">

    <h4  class="card-title h4-sm text-center text-danger">${el.name}</h4>
    <p  class="card-text"><span class="text-success">Description:</span> ${el.description}</p>
    <p  class="card-text"><span class="text-info">Link:</span> <a href="${el.html_url}" target="_blank"> ${el.html_url }</a></p>
    <p  class="card-text"><span class="text-danger">Language:</span>${el.language}</p>
    <p  class="card-text"><span class="text-warning"><strong>Owner: </strong></span>${(el.owner.login)}</p>
    
    
  </div>

</div>


</div>



`;

    divSearch.appendChild(elm);
  });
  
}

