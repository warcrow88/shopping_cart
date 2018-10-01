// get navbar
$.get('./components/header.html', function(response) {
  $("#nav").html(response);
});

// call back function to show products.json
function showProducts(response) {
  // console.log(response);
  // define local variables for headers and html
  // let headers = Object.keys(response.products[0]);
  let products = response.products
  // id, title, price, desc are all the same for all the showProducts
  let html = "";
  // loop through products and create card for each
  for (let i=0; i<products.length; i++) {
    // open row for each third product
    if (i % 3 == 0) {
      html += '<div class="row">'
    }
    html += `
    <div class="card col-md-4">
      <div class="card-img-top">
        <img src="http://placehold.it/1x1" alt="Placeholder" class="card-img" />
      </div>
      <div class="card-title">${products[i].title}</div>
      <div class="card-subtitle">$${products[i].price}</div>
      <div class="card-text">${products[i].description}</div>
      <button onclick="addToCart(${products[i].id})" class="btn btn-primary">Add To Cart</button>
    </div> <!-- End of card -->
    `
    // close row after three products have been added
    // because 0,1,2 is a row, use i+1 to check if your are at the end of the row
    if ((i + 1) % 3 == 0) {
      html += '</div>'
    }
  }
  // inject html string into products using the html variable we created above
  $("#products").html(html);
}

// use jquery to pull product info

$.get('./assets/products.json', showProducts);

// TODO: add functionality later
function addToCart(id) {
  console.log(id);
}
