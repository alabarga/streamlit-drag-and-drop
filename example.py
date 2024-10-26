import streamlit as st
from st_drag_drop import st_drag_drop

# Example draggable and droppable lists
draggable_items = {
    "item1": "Item 1",
    "item2": "Item 2",
    "item3": "Item 3",
}

droppable_items = {
    "zone1": "Drop Zone 1",
    "zone2": "Drop Zone 2",
    "zone3": "Drop Zone 3",
}

# Use the custom component in Streamlit
st.title("Drag and Drop Component")

# Call the drag-drop component and retrieve the drop connections
connections = st_drag_drop(draggable_items, droppable_items)

# Display the connections (items dropped into each zone)
st.write("Drop connections:", connections)