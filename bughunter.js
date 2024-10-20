const toggleDisplay = (element, display) => { 
  element.style.display = display;
};

const setBackgroundImage = (imageElement, image) => {
  imageElement.style.backgroundImage = `url(${image})`;
};


const setupHoverEffects = (containerId, imageElement) => {
  const container = document.querySelector(containerId);


  container.addEventListener("mouseenter", () => toggleDisplay(imageElement, "block"));
  container.addEventListener("mouseleave", () => toggleDisplay(imageElement, "none"));


  const items = container.querySelectorAll(".elem,.daily,.elem2,.elem3 ,.elem4,.suga,.bp ,.thy");
  items.forEach(item => {

      item.addEventListener("mouseenter", () => {
          const imageUrl = item.getAttribute("data-image");
          setBackgroundImage(imageElement, imageUrl);
      });
  });
};

const fixedImage = document.querySelector("#image");

setupHoverEffects("#warmup",fixedImage);
setupHoverEffects("#daily",fixedImage);
setupHoverEffects("#belly",fixedImage);
setupHoverEffects("#legs",fixedImage);
setupHoverEffects("#bp",fixedImage);
setupHoverEffects("#sugar",fixedImage);
setupHoverEffects("#thyroid",fixedImage);