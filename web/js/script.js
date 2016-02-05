/**
 * Created by Ankanitti on 05/02/16.
 */

var blocks = document.querySelectorAll('.block-draggable');

function handleDragStart(e) {
    console.log('Dragging an object...');  // this / e.target is the source node.
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    // See the section on the DataTransfer object.

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    console.log(this+" dropped...");

    [].forEach.call(blocks, function (block) {
        block.classList.remove('over');
    });
}

[].forEach.call(blocks, function(block) {
    block.addEventListener('dragstart', handleDragStart, false);
    block.addEventListener('dragenter', handleDragEnter, false);
    block.addEventListener('dragover', handleDragOver, false);
    block.addEventListener('dragleave', handleDragLeave, false);
    block.addEventListener('drop', handleDrop, false);
    block.addEventListener('dragend', handleDragEnd, false);
});
