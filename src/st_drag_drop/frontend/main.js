// The `Streamlit` object exists because our html file includes
// `streamlit-component-lib.js`.
// If you get an error about "Streamlit" not being defined, that
// means you're missing that file.

let dropConnections = {};

function sendValue(value) {
  Streamlit.setComponentValue(value)
}

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event) {
  // Only run the render code the first time the component is loaded.
  if (!window.rendered) {

        console.log(event.detail);
        // Get the passed HTML content from the Python backend
        const htmlContent = event.detail.args.html_content;
        
        
        // const {htmlContent, } = event.detail.args;
        
        // Inject the passed HTML content into the "app" div
        document.getElementById("app").innerHTML = htmlContent;

        console.log("Injected HTML content:", htmlContent);
     
// Add event listeners for drag-and-drop functionality
const draggables = document.querySelectorAll('.draggable');
const droppables = document.querySelectorAll('.droppable');

// Handle drag start event
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text', draggable.id);
  });
});

// Handle drag over event
droppables.forEach(droppable => {
  droppable.addEventListener('dragover', (event) => {
    event.preventDefault();
    droppable.classList.add('over');
  });

  // Handle drag leave event
  droppable.addEventListener('dragleave', () => {
    droppable.classList.remove('over');
  });

  // Handle drop event
  droppable.addEventListener('drop', (event) => {
    event.preventDefault();
    droppable.classList.remove('over');

    // Get the dropped item's id
    const droppedItemId = event.dataTransfer.getData('text');
    const droppedItem = document.getElementById(droppedItemId).textContent;

    // Get the zone's id (the droppable area)
    const zoneId = droppable.id;

    // Initialize the dropped items list for this zone if not already initialized
    if (!dropConnections[zoneId]) {
      dropConnections[zoneId] = [];
    }

    // Check if the item has already been dropped in this zone
    if (dropConnections[zoneId].includes(droppedItem)) {
      alert(`${droppedItem} has already been dropped in ${zoneId}!`);
      return;  // Prevent adding the same item again
    }

    dropConnections[zoneId].push(droppedItem);

    // Find or create a container to show dropped items within the zone
    let droppedItemsContainer = droppable.querySelector('.dropped-items');
    if (!droppedItemsContainer) {
      droppedItemsContainer = document.createElement('div');
      droppedItemsContainer.classList.add('dropped-items');
      droppable.appendChild(droppedItemsContainer);
    }

    // Update the dropped items container without removing the title
    droppedItemsContainer.innerHTML = dropConnections[zoneId]
      .map(item => `<p>${item}</p>`)
      .join('');

    // Optionally, log the updated drop connections
    console.log("Drop connections:", dropConnections);

            // Send the updated dropConnections to Python backend
            const streamlitMsg = {
              type: 'drop-event',
              data: dropConnections
            };
            sendValue(streamlitMsg);
          });
        });

    window.rendered = true
  }
}

// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady()
// Render with the correct height, if this is a fixed-height component
Streamlit.setFrameHeight(500)