// Variables
const iconsContainerSizeX = 100;
const ipadContainer = document.querySelector('.ipad_container');
const ipadScreen = document.querySelector('.ipad_screen');
const ipad = document.querySelector('.ipad');
let iconsContainer = document.querySelector('.icons_container');
const draggables = iconsContainer.querySelectorAll('.draggable');

// Append a drag listener to all "draggable" images.
draggables.forEach(function(draggable) {
    draggable.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
});

// Allow user to drag image in the ipad.
ipad.addEventListener('dragover', function(event) {
    event.preventDefault();
});

// Clone image node into the ipad.
ipad.addEventListener('drop', function(event) {
    event.preventDefault();

    let id = event.dataTransfer.getData('text');
    let draggedElement = document.getElementById(id);
    let clone = draggedElement.cloneNode(false);
    clone.removeAttribute("id");

    let ipadScreenRect = ipadScreen.getBoundingClientRect();
    let ipadScreenLeft = ipadScreenRect.left;

    let rect = event.currentTarget.getBoundingClientRect();
    let x = event.clientX - ipadContainer.clientLeft - ipadScreenLeft - parseInt(getComputedStyle(ipad).getPropertyValue('padding-left')) - parseInt(getComputedStyle(ipad).getPropertyValue('margin-left'));
    let y = event.clientY - rect.top - ipadContainer.clientTop;
    x = Math.abs(x)

    clone.style.position = 'absolute';
    clone.style.left = `${x}px`;
    clone.style.top = `${y}px`;

    ipad.appendChild(clone);  
});
