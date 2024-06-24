const minHeaderTopPosition = 6;
const minWindowWidth = 200;
const minWindowHeight = 230;
let currentMaxZIndex = 1;
let numberOfWindows = 0;

function makeWindow(windowElement) {
    const header = windowElement.getElementsByClassName("window-header")[0];
    const closeButton = windowElement.getElementsByClassName("close")[0];
    const content = windowElement.getElementsByClassName("window-content")[0];

    // Make movable
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        if (windowElement.offsetTop - pos2 > minHeaderTopPosition) {
            windowElement.style.top = (windowElement.offsetTop - pos2) + "px";
        }
        windowElement.style.left = (windowElement.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    // close button
    closeButton.onclick = function() {
        windowElement.style.display = "none";
        numberOfWindows--;
    }

    // resize
    windowElement.onmousedown = function(e) {
        currentMaxZIndex++;
        windowElement.style.zIndex = currentMaxZIndex.toString();
        if (e.target === windowElement) {
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeResizeElement;
            document.onmousemove = resizeElement;
            e.preventDefault();
        }
    }

    function resizeElement(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        if (windowElement.offsetWidth - pos1 > minWindowWidth) {
            windowElement.style.width = (windowElement.offsetWidth - pos1) + "px";
        }
        if (windowElement.offsetHeight - pos2 > minWindowHeight) {
            windowElement.style.height = (windowElement.offsetHeight - pos2) + "px";
        }
    }

    function closeResizeElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    // Change cursor
    windowElement.onmousemove = function(e) {
        if (e.target === windowElement) {
            if (e.offsetX < 10 && e.offsetY < 10) {
                windowElement.style.cursor = "nw-resize";
            } else if (e.offsetX < 10 && e.offsetY > windowElement.offsetHeight - 10) {
                windowElement.style.cursor = "sw-resize";
            } else if (e.offsetX > windowElement.offsetWidth - 10 && e.offsetY < 10) {
                windowElement.style.cursor = "ne-resize";
            } else if (e.offsetX > windowElement.offsetWidth - 10 && e.offsetY > windowElement.offsetHeight - 10) {
                windowElement.style.cursor = "se-resize";
            } else if (e.offsetX < 10) {
                windowElement.style.cursor = "w-resize";
            } else if (e.offsetX > windowElement.offsetWidth - 10) {
                windowElement.style.cursor = "e-resize";
            } else if (e.offsetY < 10) {
                windowElement.style.cursor = "n-resize";
            } else if (e.offsetY > windowElement.offsetHeight - 10) {
                windowElement.style.cursor = "s-resize";
            } else {
                windowElement.style.cursor = "default";
            }
        }
    }
}

function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = "block";
    windowElement.style.top = 50 + numberOfWindows * 5 + "px";
    windowElement.style.left = 50 + numberOfWindows * 5 + "px";
    currentMaxZIndex++;
    windowElement.style.zIndex = currentMaxZIndex.toString();
    numberOfWindows++;
}

function openVirtualWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = "block";
    windowElement.style.top = 50 + numberOfWindows * 5 + "px";
    windowElement.style.left = 50 + numberOfWindows * 5 + "px";
    currentMaxZIndex++;
    windowElement.style.zIndex = currentMaxZIndex.toString();
    numberOfWindows++;
    const content = windowElement.getElementsByClassName("window-content")[0];
    content.innerHTML = mainDiv.innerHTML;

}


document.addEventListener('DOMContentLoaded', function() {
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        makeWindow(window);
        window.style.display = "none";
    });
});