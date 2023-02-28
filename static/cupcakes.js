"use strict";

const $cupcakesList = $('#cupcakes-list');
const $form = $('#add-cupcake-form');

/**********************************************************************************
 *  Get all cupcakes
 *
 *  Returns array of cupcake objects that contain: 
 *  {id, flavor, image, rating, size}
 **********************************************************************************/
async function getAllCupcakes() {
  const cupcakes = [];

  // make GET request to cupcakes API
  await $.get( `http://127.0.0.1:5000/api/cupcakes`, function( data ) {
    // from the result, add data from each cupcake to the cupcakes array  
    for (let cupcake of data.cupcakes) {
      const {id, flavor, image, rating, size} = cupcake;
      cupcakes.push({id, flavor, image, rating, size});
    }    
  });

  return cupcakes;
}


/**********************************************************************************
 * Display cupcakes on DOM
 * 
 * Calls getAllCupcakes() and displays returned information about each cupcake
 * on it's own card
 **********************************************************************************/
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


/**********************************************************************************
 * Handle New Cupcake form submission: make a request to the API to add a cupcake
 * Returns new cupcake as object
 **********************************************************************************/
async function addCupcake() {
  // Collect field values from form
  const flavor = $('#flavor').val();
  const image = $('#image').val();
  const rating = $('#rating').val();
  const size = $('#size').val();

  // Create cupcake object from form data
  const cupcake = {
      flavor: flavor,
      image: image,
      rating: rating,
      size: size
  };
  
  // Make POST request to cupcakes API
  await axios({
    url: 'http://127.0.0.1:5000/api/cupcakes', 
    method: 'POST', 
    data: cupcake
  });
  
  // Reset the form
  $form.trigger('reset');

  return cupcake;
}


/**********************************************************************************
 * When New Cupcake form is submitted, call function to handle event and add new
 * cupcake to DOM
 **********************************************************************************/
$form.on('submit', async function(evt) {
  evt.preventDefault();
  await addCupcake();
});


/**********************************************************************************
 * When document has finished loading, execute the display function 
 **********************************************************************************/
$(function() {
  displayCupcakes();
});


