var $image = document.querySelector('.image');
var $imageLink = document.querySelector('.image-link');
var $journalEntry = document.querySelector('form');
var $titleInput = document.querySelector('.title-text');
var $notes = document.querySelector('.notes-text');

// create entry

$imageLink.addEventListener('input', updateImage);

function updateImage(event) {
  $image.src = event.target.value;
}

$journalEntry.addEventListener('submit', newEntry);

function newEntry(event) {
  event.preventDefault();
  var $title = document.querySelector('.title-text');
  var $notes = document.querySelector('.notes-text');
  var newObject = {
    title: $title.value,
    image: $imageLink.value,
    notes: $notes.value,
    id: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(newObject);
  $image.src = 'images/placeholder-image-square.jpg';
  $journalEntry.reset();
  prepend();
}

// view entries

function renderEntry(entry) {
  var li = document.createElement('li');
  // each rendered entry is given data-entry-id
  li.setAttribute('data-entry-id', entry.id);

  var rowDiv = document.createElement('div');
  rowDiv.className = 'row entry';
  li.appendChild(rowDiv);

  var columnDiv = document.createElement('div');
  columnDiv.className = 'column-full column-half';
  rowDiv.appendChild(columnDiv);

  var img = document.createElement('img');
  img.className = 'image';
  img.setAttribute('src', entry.image);
  columnDiv.appendChild(img);

  var columnDiv2 = document.createElement('div');
  columnDiv2.className = 'column-full column-half';
  rowDiv.appendChild(columnDiv2);

  var h2 = document.createElement('h2');
  var h2Text = document.createTextNode(entry.title);
  h2.className = 'entry-title';
  h2.appendChild(h2Text);
  columnDiv2.appendChild(h2);

  // update function to include edit icon for each rendered entry
  var icon = document.createElement('i');
  icon.className = 'fas fa-pen';
  columnDiv2.appendChild(icon);

  var p = document.createElement('p');
  var p2Text = document.createTextNode(entry.notes);
  p.appendChild(p2Text);
  columnDiv2.appendChild(p);
  return li;
}

var $entryList = document.querySelector('ul');

function renderEvent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
  if (data.view === 'entry-form') {
    data.view = 'entry-form';
    $entries.className = 'container entries';
    $form.className = 'container new-entries hidden';
  } else if (data.view === 'entries') {
    data.view = 'entries';
    $form.className = 'container new-entries';
    $entries.className = 'container entries hidden';
  }
}

document.addEventListener('DOMContentLoaded', renderEvent);

function prepend(event) {
  $entryList.prepend(renderEntry(data.entries[0]));
  $form.className = 'container new-entries';
  $entries.className = 'container entries hidden';
}

// viewswapping

var $form = document.querySelector('.entries');
var $entriesLink = document.querySelector('.entries-link');
var $entries = document.querySelector('.new-entries');
var $new = document.querySelector('.new');
var $save = document.querySelector('.save');

$save.addEventListener('click', entriesView);
$entriesLink.addEventListener('click', entriesView);
$new.addEventListener('click', formView);

function entriesView(event) {
  if (event.target.matches('.entries-link')) {
    $form.className = 'container new-entries';
    $entries.className = 'container entries hidden';
  }
  data.view = 'entries';
}

function formView(event) {
  // updated to show the entry form if an edit icon was clicked
  if (event.target.matches('.new')) {
    $entries.className = 'container entries';
    $form.className = 'container new-entries hidden';
    $journalEntry.reset();
    $image.src = 'images/placeholder-image-square.jpg';
  } else if (event.target.matches('i')) {
    $entries.className = 'container entries';
    $form.className = 'container new-entries hidden';
  }
  data.view = 'entry-form';
}

// listen for clicks on parent element of all rendered entries
$entryList.addEventListener('click', edit);

function edit(event) {
  formView(event);
  // find the matching entry object in the data model & assign it to the data model's editing property
  var $li = document.querySelectorAll('[data-entry-id]');
  var closestId = event.target.closest('[data-entry-id]');
  for (var i = 0; i < $li.length; i++) {
    if (closestId === $li[i]) {
      data.editing = data.entries[i];
      // pre-populate the entry form with the clicked entry's values from the object found in the data model
      $imageLink.value = data.entries[i].image;
      $titleInput.value = data.entries[i].title;
      $notes.value = data.entries[i].notes;
      $image.src = data.entries[i].image;
    }
  }

}
