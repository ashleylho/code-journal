var $image = document.querySelector('.image');
var $imageLink = document.querySelector('.image-link');
var $journalEntry = document.querySelector('form');
var $title = document.querySelector('.title-text');
var $notes = document.querySelector('.notes-text');
var newObject = {};
var dataJSON;

$imageLink.addEventListener('input', updateImage);

function updateImage(event) {
  $image.src = event.target.value;
}

$journalEntry.addEventListener('submit', newEntry);

function newEntry(event) {
  event.preventDefault();
  newObject = {
    title: $title.value,
    image: $imageLink.value,
    notes: $notes.value,
    id: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(newObject);
  $image.src = 'images/placeholder-image-square.jpg';

  dataJSON = JSON.stringify(data);
  window.localStorage.setItem('data-model', dataJSON);

  $journalEntry.reset();

}
