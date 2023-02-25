"use strict";

const $cupcakesList = $("#cupcakes-list");


/*  Get all cupcakes
 *
 *  Returns array of cupcake objects that contain: 
 *  {id, flavor, image, rating, size}
 */ 

async function getAllCupcakes() {
  const cupcakes = [];
  console.log('hello');

  // make request to cupcakes API
  await $.get( `http://127.0.0.1:5000/api/cupcakes`, function( data ) {
    // from the result, add data from each cupcake to the cupcakes array  
    for (let cupcake of data.cupcakes) {
      const {id, flavor, image, rating, size} = cupcake;
      cupcakes.push({id, flavor, image, rating, size});
    }    
  });
  
  console.log('Array of cupcakes:');
  for (let i of cupcakes) {
    console.log(i);
  }

  return cupcakes;
}


/* Display cupcakes on DOM
 * 
 * Takes an array of cupcake objects and displays information about each 
 * cupcake on it's own card
 */




$(function() {
  console.log( "ready!" );
  getAllCupcakes();
});


