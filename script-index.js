window.onload = () => {
  const spinner = document.getElementById("spinner");
  console.log(spinner);
  const row = document.getElementById("cards");
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
        row.innerHTML += `
          <div class="col-sm-12 col-md-6 col-lg-4 gy-3"> 
            <div class="card">
              <img src="${product.imageUrl}" class="size card-img-top " alt="card">
              <div class="card-body m-0"> 
                <h5 class="ellipsis card-title">${product.name} - ${product.brand}</h5>
                <p class="card-text">${product.price}€</p>
                <p class="ellipsis  card-text">${product.description}</p>
                <a href="./details.html?productId=${product._id}" class="btn btn-primary mb-2">Find out more</a>
                <a href="./back-office.html?productId=${product._id}" class="btn btn-success">Modify</a>
                
                </div>
                </div>
                </div>`;
      });
      spinner.remove();
    });
};

const handleLink = () => {
  window.location.assign("./back-office.html?productId=" + productId);
};
