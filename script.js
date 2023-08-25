const productId = new URLSearchParams(window.location.search).get("eventId");
const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

window.onload = () => {
  const ul = document.getElementById("products");
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NWVlYmMwMzRmZjAwMTQwM2Y1MjIiLCJpYXQiOjE2OTI5NTAyNTEsImV4cCI6MTY5NDE1OTg1MX0.E1Svd7YXBZeVnBT0433spXutrd7I1MqGs38wXvu-uaw",
    },
  })
    .then((resp) => resp.json())
    .then((productsArr) => {
      console.log(productsArr);

      productsArr.forEach((product) => {
        ul.innerHTML += `<div class="card">
<img src="${product.imageUrl}" class="card-img-top size" alt="...">
<div class="card-body">
<h5 class="card-title">${product.name} - ${product.brand}</h5>
<p class="card-text">${product.price}€</p>
<a href="./details.html" class="btn btn-primary">Details</a>
</div>
</div>`;
      });
    });
};
const nameProd = document.getElementById("name");
console.log(nameProd);
const descriptionProd = document.getElementById("description");
console.log(descriptionProd);
const brandProd = document.getElementById("brand");
console.log(brandProd);
const imageProd = document.getElementById("image");
console.log(imageProd);
const priceProd = document.getElementById("price");
console.log(priceProd);

window.onload = async () => {
  const pageName = document.getElementById("pageName");
  const mainBtn = document.querySelector("button[type= 'submit']");
  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.onclick = handleDelete;
  if (eventId) {
    console.log(deleteBtn);
    pageName.innerText = "-modify your product";
    const resp = await fetch(URL);
    if (resp.ok) {
      const { name, description, brand, imageUrl, price } = await resp.json();
      nameProd.value = name;
      descriptionProd.value = description;
      brandProd.value = brand;
      imageProd.value = imageUrl;
      priceProd.value = price;
      mainBtn.innerText = "Modify product";
      deleteBtn.classList.remove("d-none");
    }
  } else {
    pageName.innerText = "Add your product";
  }
};
const handleSubmit = async (event) => {
  event.preventDefault();
  const publish = {
    name: nameProd.value,
    description: descriptionProd.value,
    brand: brandProd.value,
    imageUrl: imageProd.value,
    price: priceProd.value,
  };
  try {
    const resp = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: productId ? "PUT" : "POST",
      body: JSON.stringify(publish),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NWVlYmMwMzRmZjAwMTQwM2Y1MjIiLCJpYXQiOjE2OTI5NTAyNTEsImV4cCI6MTY5NDE1OTg1MX0.E1Svd7YXBZeVnBT0433spXutrd7I1MqGs38wXvu-uaw",
      },
    });
    if (resp.ok) {
      const newProductObj = await resp.json();
      console.log(newProductObj);

      if (productId) {
        alert("The product: " + newProductObj._id + "is modified");
      } else {
        alert("Product created, product id: " + newProductObj._id);
        nameProd.value = "";
        descriptionProd.value = "";
        brandProd.value = "";
        imageProd.value = "";
        priceProd.value = "";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const handleDelete = async () => {
  const accept = confirm("Are you sure?");
  if (accept) {
    const resp = await fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NWVlYmMwMzRmZjAwMTQwM2Y1MjIiLCJpYXQiOjE2OTI5NTAyNTEsImV4cCI6MTY5NDE1OTg1MX0.E1Svd7YXBZeVnBT0433spXutrd7I1MqGs38wXvu-uaw",
      },
    });
    const deleteProd = await resp.json();
    alert("You've eliminated " + deleteProd.name);
    window.location.assign("./index.html");
  } else {
    alert("Canceled");
  }
};
