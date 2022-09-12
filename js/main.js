var $image = document.querySelector('.image');
var $imageLink = document.querySelector('.image-link');
var $journalEntry = document.querySelector('form');
var $title = document.querySelector('.title-text');
var $notes = document.querySelector('.notes-text');
var newObject = {};

$imageLink.addEventListener('input', updateImage);

function updateImage(event) {
  $image.src = event.target.value;
}

$journalEntry.addEventListener('submit', newEntry);

function newEntry(event) {
  event.preventDefault();
  newObject.title = $title.value;
  newObject.image = $imageLink.value;
  newObject.notes = $notes.value;
  newObject.id = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newObject);
  $image.src = 'images/placeholder-image-square.jpg';
  $journalEntry.reset();
}
