// global cart variable
// TODO: replace global variable with cloud database later
var cart = [];


// get navbar
$.get('./components/header.html', function(response) {
  $("#nav").html(response);
});

// call back function to show products.json
function showProducts(response) {
  // console.log(response);
  // define local variables for headers and html
  // let headers = Object.keys(response.products[0]);
  let products = response.products;
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
    `;
    // close row after three products have been added
    // because 0,1,2 is a row, use i+1 to check if your are at the end of the row
    if ((i + 1) % 3 == 0) {
      html += '</div>';
    }
  }
  // inject html string into products using the html variable we created above
  $("#products").html(html);
}

// use jquery to pull product info

$.get('./assets/products.json', showProducts);


function addToCart(id) {
  console.log(id);
  $.get('./assets/products.json', function(res) {
    let products = res.products; // array from json file
    // loop thorugh product array to find correct id
    for (let i=0; i<products.length; i++) {
      // check current product id to id parameter passed from above function
      if (products[i].id == id) {
        //add product to global cart
        cart.push(products[i]);
        break; // don't keep looking if you found it...

      }
    }

  });
  // call showCart to update table
  // Delay for a bit to allow the above function to complete before the show cart function - if you don't, it won't display because the progrma is trying to do two fucntions nearly simuilataneouosly
  sleep(50).then(() => {
      // Do something after the sleep!
    showCart();
  })

}

function showCart() {
  // console.log(cart);
  // define html variable to be inseeted inot tbody
  let html = "";
  // loop thorugh all products in Cart
  // TODO change total to be qty * price
  for (let i=0; i<cart.length; i++) {
    html += `
    <tr>
      <td>1</td>
      <td>${cart[i].title}</td>
      <td>$${cart[i].price}</td>
      <td>$${cart[i].price}</td>
    </tr>
    `;
  }
  // iject html variabel into table-tbody
  $("#table-body").html(html);
}

// https://zeit.co/blog/async-and-await
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
