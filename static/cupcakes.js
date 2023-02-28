"use strict";

const $cupcakesList = $("#cupcakes-list");


/*  Get all cupcakes
 *
 *  Returns array of cupcake objects that contain: 
 *  {id, flavor, image, rating, size}
 */ 

async function getAllCupcakes() {
  const cupcakes = [];

  // make request to cupcakes API
  await $.get( `http://127.0.0.1:5000/api/cupcakes`, function( data ) {
    // from the result, add data from each cupcake to the cupcakes array  
    for (let cupcake of data.cupcakes) {
      const {id, flavor, image, rating, size} = cupcake;
      cupcakes.push({id, flavor, image, rating, size});
    }    
  });

  return cupcakes;
}


/* Display cupcakes on DOM
 * 
 * Calls getAllCupcakes() and displays returned information about each cupcake
 * on it's own card
 */

async function displayCupcakes() {

  // Get list of cupcakes from the API
  let cupcakes = await getAllCupcakes();

  // Loop through the array of cupcake objects and create a card to display
  // information about each one on the DOM
  for (let cupcake of cupcakes) {
    const $cupcakeCard = $(
     `<div class="card m-2" style="width: 15rem;">
      <img src="${cupcake.image}" class="card-img-top p-2" alt="${cupcake.flavor} cupcake">
      <div class="card-body">
        <h5 class="card-title">Flavor: ${cupcake.flavor}</h5>
        <p class="card-text">Size: ${cupcake.size}<br>Rating: ${cupcake.rating}</p>
      </div>
      </div>`
    );

    $cupcakesList.append($cupcakeCard);
  }  
}


/* When document has finished loading, execute the display function(s) */

$(function() {
  displayCupcakes();
});


