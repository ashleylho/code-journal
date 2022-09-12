var $image = document.querySelector('.image');
var $imageLink = document.querySelector('.image-link');

$imageLink.addEventListener('input', updateImage);

function updateImage(event) {
  $image.src = event.target.value;
}
