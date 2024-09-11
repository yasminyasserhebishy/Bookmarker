var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var closeBtn = document.getElementById("closeBtn");

var websitesContainer=[];
if (localStorage.getItem("websites") == null) {
  websitesContainer = [];
} else {
  websitesContainer = JSON.parse(localStorage.getItem("websites"));
 displayWebsite();
}

function addWebsite() {
  var websites = {
    siteName: siteName.value,
    siteUrl : siteUrl.value,
  }
  if (
    siteName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")
  ) {
      websitesContainer.push(websites);
      localStorage.setItem("websites", JSON.stringify(websitesContainer));
      displayWebsite();
    clearWebsite();
     siteName.classList.remove("is-valid");
     siteUrl.classList.remove("is-valid");
  } else {
     boxModal.classList.remove("d-none");
  }
     
}


function clearWebsite() {
  siteName.value = null;
  siteUrl.value = null;
}

function displayWebsite() {
  var cartona = "";
  for (var i = 0; i < websitesContainer.length; i++) {
    cartona += `
  <tr>
      <th scope="row">${i + 1}</th>
      <td>${websitesContainer[i].siteName}</td>
      <td> <a href="${
        websitesContainer[i].siteUrl
      }" target="_blank" class="btn btn-success"><i class="me-2 fa-solid fa-eye"></i>Visit</td>
      <td><button onclick="deleteWebsite(${i})" class="btn btn-danger"><i class="me-2 fa-solid fa-trash"></i>Delete</button></td>
    </tr>`;
  }

  document.getElementById("tableContent").innerHTML = cartona;
}

function deleteWebsite(index) {
  websitesContainer.splice(index, 1);
  localStorage.setItem('websites',JSON.stringify(websitesContainer))
  displayWebsite()
}


function validation(element) {
  var regex = {
    siteName : /^\w{3,}(\s+\w+)*$/,
   siteUrl : /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function closeModal() {
  boxModal.classList.add("d-none");
}
closeBtn.addEventListener("click", closeModal);
