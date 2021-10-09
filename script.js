"use strict";

// The model of all features
let features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  // console.log(feature);

  // TODO: Toggle feature in "model"
  if (features[feature]) {
    features[feature] = false;
  } else {
    features[feature] = true;
  }

  // If feature is (now) turned on:
  // X- mark target as chosen (add class "chosen")
  // X- un-hide the feature-layer(s) in the #product-preview;
  // X- create featureElement and append to #selected ul
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

  // Else - if the feature (became) turned off:
  // X- no longer mark target as chosen
  // X- hide the feature-layer(s) in the #product-preview
  // X- find the existing featureElement in #selected ul
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM

  if (features[feature]) {
    // feature added
    // console.log(`Feature ${feature} is turned on!`);
    target.classList.add("chosen");
    document.querySelectorAll(`#product-preview img[data-feature=${feature}]`).forEach((elm) => {
      elm.classList.remove("hide");
    });

    flipOn(feature);
  } else {
    // feature removed
    // console.log(`Feature ${feature} is turned off!`);
    target.classList.remove("chosen");
    document.querySelectorAll(`#product-preview img[data-feature=${feature}]`).forEach((elm) => {
      elm.classList.add("hide");
    });
    flipOff(feature);
    document.querySelector(`#selected img[src= "images/feature_${feature}.png"`).remove();
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}

function flipOn(feature) {
  //flip animation stuff
  const optionIMG = document.querySelector(`.option img[src= "images/feature_${feature}.png"]`);
  const first = optionIMG.getBoundingClientRect();
  console.log(first);

  document.querySelector("#selected ul").append(createFeatureElement(feature));

  const selectedIMG = document.querySelector(`#selected img[src= "images/feature_${feature}.png"]`);
  const last = selectedIMG.getBoundingClientRect();
  console.log(last);

  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;
  const deltaW = first.width / last.width;
  const deltaH = first.height / last.height;

  selectedIMG.animate(
    [
      {
        transformOrigin: "top left",
        transform: `
          translate(${deltaX}px, ${deltaY}px)
          scale(${deltaW}, ${deltaH})
        `,
      },
      {
        transformOrigin: "top left",
        transform: "none",
      },
    ],
    {
      duration: 700,
      easing: "ease-in-out",
      fill: "both",
    }
  );
}

function flipOff(feature) {
  //flip animation stuff
  const optionIMG = document.querySelector(`.option img[src= "images/feature_${feature}.png"]`);
  const selectedIMG = document.querySelector(`#selected img[src= "images/feature_${feature}.png"]`);
  const first = selectedIMG.getBoundingClientRect();
  const last = optionIMG.getBoundingClientRect();
  // console.log(first);
  // console.log(last);

  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;
  const deltaW = first.width / last.width;
  const deltaH = first.height / last.height;

  optionIMG.animate(
    [
      {
        transformOrigin: "top left",
        transform: `
          translate(${deltaX}px, ${deltaY}px)
          scale(${deltaW}, ${deltaH})
        `,
      },
      {
        transformOrigin: "top left",
        transform: "none",
      },
    ],
    {
      duration: 700,
      easing: "ease-in-out",
      fill: "both",
    }
  );
}
