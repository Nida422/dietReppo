// Function to toggle display
const toggleDisplay = (element, display) => {
    element.style.display = display;
  };
  
  // Function to set background image
  const setBackgroundImage = (imageElement, image) => {
    imageElement.style.backgroundImage = `url(${image})`;
  };
  
  // Common event handler for warming up and daily exercises
  const setupHoverEffects = (containerId, imageElement) => {
    const container = document.querySelector(containerId);
  
    // Show and hide image on mouseenter and mouseleave
    container.addEventListener("mouseenter", () => toggleDisplay(imageElement, "block"));
    container.addEventListener("mouseleave", () => toggleDisplay(imageElement, "none"));
  
    // Set background image for each exercise
    const items = container.querySelectorAll(".elem, .daily,.elem2,.elem3 ,.elem4,.suga,.bp,.thy"); // Select both exercise types
    items.forEach(item => {
      item.addEventListener("mouseenter", () => {
        const imageUrl = item.getAttribute("data-image");
        setBackgroundImage(imageElement, imageUrl);
      });
    });
  };
  
  // Get the single image element
  const fixedImage = document.querySelector("#image");
  
  // Apply hover effects for both warmup and daily exercises
  setupHoverEffects("#warmup", fixedImage);
  setupHoverEffects("#dailyex", fixedImage);
  setupHoverEffects("#belly", fixedImage);
  setupHoverEffects("#legs", fixedImage);
  setupHoverEffects("#bp", fixedImage);
  setupHoverEffects("#thyroid", fixedImage);
  setupHoverEffects("#sugar", fixedImage);
  
  