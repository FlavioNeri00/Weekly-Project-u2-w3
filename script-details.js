const URL = "https://striveschool-api.herokuapp.com/api/product/";
const productId = new URLSearchParams(window.location.search).get("productId");
console.log(productId);

window.onload = async () => {
  const resp = await fetch(URL + productId, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NWVlYmMwMzRmZjAwMTQwM2Y1MjIiLCJpYXQiOjE2OTI5NTAyNTEsImV4cCI6MTY5NDE1OTg1MX0.E1Svd7YXBZeVnBT0433spXutrd7I1MqGs38wXvu-uaw",
    },
  });
  const productObj = await resp.json();
  const { name, description, brand, imageUrl, price, _id, userId, createdAt, updatedAt } = productObj;
  const date = new Date(createdAt);
  const completeDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  const date2 = new Date(updatedAt);
  const completeDate2 = date2.toLocaleDateString() + " " + date2.toLocaleTimeString();

  const myData = document.getElementById("productDetails");
  myData.innerHTML += `<h2 class="text-center mt-5">${name} - ${brand}</h2>
 <div class="text-center "><img class="detailsImg" src="${imageUrl}" alt="details" /></div>
<p class="text-center  fs-3"><strong>Description</strong>: ${description}</p>

<p class="text-center fs-3 "><strong>Price</strong>: ${price}€</p>
<p class="text-center fs-3 "><strong>Product ID</strong>: ${_id}</p>
<p class="text-center fs-3 "><strong>User ID</strong>: ${userId}</p>
<p class="text-center fs-3 "><strong>CreatedAt</strong>: ${completeDate}</p>
<p class="text-center fs-3 "><strong>UpdatedAt</strong>: ${completeDate2}</p>
`;
};
