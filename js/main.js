var $image = document.querySelector('.image');
var $imageLink = document.querySelector('.image-link');
var $journalEntry = document.querySelector('form');
var $newEntryContainer = document.querySelector('.new-entries');
var $entriesContainer = document.querySelector('.entries');
var $body = document.querySelector('body');

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

}

// view entries

function renderEntry(entry) {
  var li = document.createElement('li');

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
}

document.addEventListener('DOMContentLoaded', renderEvent);

// viewswapping
$body.addEventListener('click', viewSwap);

function viewSwap(event) {
  var $view = document.querySelectorAll('[data-view]');
  for (var i = 0; i < $view.length; i++) {
    if ($view[i] === $entriesContainer) {
      $newEntryContainer.className = 'container new-entries hidden';
      $entriesContainer.className = 'container entries';
    } else {
      $entriesContainer.className = 'container entries hidden';
      $newEntryContainer.className = 'container new-entries';
    }
  }
  // if (event.target.matches('.save') || event.target.matches('.entries-link')) {
  //   $newEntryContainer.className = 'container new-entries hidden';
  //   $entriesContainer.className = 'container entries';
  // } else {
  //   $entriesContainer.className = 'container entries hidden';
  //   $newEntryContainer.className = 'container new-entries';
  // }

}
