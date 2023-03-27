<script>

export let products;

let money = 0;
$: {
    if(products) money = Math.floor(products.reduce(function (acc, obj) { return acc + (obj.price * obj.count * ( 1 + obj.moms )); }, 0));
}

export let setScreen;

export let payment;
let choosePayment = (type) => {
  payment.type = type
  setScreen(2)
}
  
</script>

<div class="p-3 mt-5">
  <div class="rounded-lg bg-base-200 brightness-95 w-full h-40 flex flex-col items-center justify-center">
    <span class="">Totalt</span>
    <span class="text-5xl font-bold">{money.toFixed(2)} kr</span>
  </div>
</div>

<div class="w-full text-center mt-10 font-semibold text-lg">
  Välj betalsätt
</div>

<div class="h-screen w-screen p-3 grid grid-cols-2 gap-4">

  <div class="w-full aspect-square">
    <button on:click={() => {choosePayment("Swish")}} class="btn btn-outline h-full w-full flex-col">
      <svg class="w-20 h-20" viewBox="0 0 420 566" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs> <radialGradient cx="73.5273017%" cy="1.73676075%" fx="73.5273017%" fy="1.73676075%" r="154.185228%" gradientTransform="translate(0.735273,0.017368),scale(1.000000,0.810464),rotate(110.053486),translate(-0.735273,-0.017368)" id="radialGradient-1"> <stop stop-color="#BCBCBC" offset="0%"/> <stop stop-color="#292828" offset="100%"/> </radialGradient> <radialGradient cx="64.2744087%" cy="-5.66595776%" fx="64.2744087%" fy="-5.66595776%" r="163.643922%" gradientTransform="translate(0.642744,-0.056660),scale(1.000000,0.912290),rotate(128.939149),translate(-0.642744,0.056660)" id="radialGradient-2"> <stop stop-color="#E9E9E9" offset="0%"/> <stop stop-color="#676767" offset="100%"/> </radialGradient> <radialGradient cx="26.6238664%" cy="100%" fx="26.6238664%" fy="100%" r="153.281134%" gradientTransform="translate(0.266239,1.000000),scale(1.000000,0.810463),rotate(90.000000),scale(1.000000,0.527817),translate(-0.266239,-1.000000)" id="radialGradient-3"> <stop stop-color="#CDCDCD" offset="0%"/> <stop stop-color="#464545" offset="100%"/> </radialGradient> <radialGradient cx="68.2894988%" cy="67.879769%" fx="68.2894988%" fy="67.879769%" r="91.5708592%" gradientTransform="translate(0.682895,0.678798),scale(1.000000,0.912290),rotate(90.000000),scale(1.000000,1.009719),translate(-0.682895,-0.678798)" id="radialGradient-4"> <stop stop-color="#FFFFFF" offset="0%"/> <stop stop-color="#292828" offset="100%"/> </radialGradient> </defs> <g id="01-Primary-(Vertical)/Grayscale/Light-background/Swish_Logo_Primary_Grayscale_Light-BG" stroke-width="1" fill="none" fill-rule="evenodd" stroke="none"> <g id="Symbol/Silver/Light_background"> <g id="Right-Swirl" transform="translate(119.332186, 49.114212)"> <path d="M0,350.04439 C84.2884683,390.356195 188.31202,370.40599 251.156312,295.526341 C325.643824,206.7744 314.074361,74.4625171 225.315044,-5.68434189e-14 L166.309346,70.306361 C235.651961,128.480254 244.690771,231.848605 186.49762,301.186302 C140.096429,356.473463 63.6990439,374.933385 0,350.04439" id="Base-Shape" fill="url(#radialGradient-1)" fill-rule="nonzero"/> <path id="Light-Cast" fill="url(#radialGradient-2)" fill-rule="nonzero" d="M1.13686838e-13,350.04439 C84.2884683,390.356195 188.31202,370.40599 251.156312,295.526341 C258.852761,286.356 265.627668,276.719766 271.496605,266.731141 C281.420898,205.05998 259.596059,139.875161 208.256898,96.8056976 C195.213132,85.8627512 181.092937,77.0468488 166.318361,70.3145561 C235.65278,128.489678 244.687902,231.851883 186.49762,301.186302 C140.096429,356.473463 63.6990439,374.933385 1.13686838e-13,350.04439"/> </g> <g id="Left-Swirl"> <path d="M300.254951,20.4289088 C215.966893,-19.8828961 111.943342,0.0668990353 49.0990489,74.9465478 C-25.3884633,163.698899 -13.8189999,296.010782 74.9399074,370.473299 L133.946015,300.166938 C64.6029903,241.993045 55.5645903,138.624694 113.757742,69.2865868 C160.158932,13.9994259 236.556317,-4.46049609 300.254951,20.4289088" id="Base-shape" fill="url(#radialGradient-3)" fill-rule="nonzero"/> <path d="M300.254951,20.4289088 C215.966893,-19.8828961 111.943342,0.0668990353 49.0990489,74.9465478 C41.4021903,84.117299 34.627283,93.7535332 28.7587562,103.742158 C18.8340538,165.413319 40.6593025,230.597728 91.9984635,273.667601 C105.042229,284.610138 119.162424,293.42645 133.93659,300.158333 C64.6025806,241.983621 55.5670489,138.621416 113.757742,69.2865868 C160.158932,13.9994259 236.556317,-4.46049609 300.254951,20.4289088" id="Shadow" fill="url(#radialGradient-4)" fill-rule="nonzero"/> </g> </g> </g> </svg>
      Swish
    </button>
  </div>

  <div class="w-full aspect-square">
    <button on:click={() => {choosePayment("Kontant")}} class="btn btn-outline h-full w-full flex-col">
      <img class="w-16 h-16 m-4 -mt-1" src="https://cdn-icons-png.flaticon.com/512/2454/2454282.png" alt="Kontant">
      <span class="mt-1">Kontant</span>
    </button>
  </div>

</div>