from pathlib import Path
from typing import Optional

import streamlit as st
import streamlit.components.v1 as components

from jinja2 import Environment, FileSystemLoader
import os 

# Tell streamlit that there is a component called st_drag_drop,
# and that the code to display that component is in the "frontend" folder
frontend_dir = (Path(__file__).parent / "frontend").absolute()
_component_func = components.declare_component(
	"st_drag_drop", path=str(frontend_dir)
)

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
env = Environment(loader=FileSystemLoader(template_dir))

def render_drag_drop_template(draggable_items, droppable_items):
    """Render the Jinja2 template with draggable and droppable items."""
    template = env.get_template('drag_drop_template.html')
    return template.render(draggable_items=draggable_items, droppable_items=droppable_items)


# Create the python function that will be called
def st_drag_drop(
    draggable_items, 
    droppable_items, 
    key: Optional[str] = None,
):

    """Main function to use the drag-drop component in Streamlit."""
    # Render the HTML from the Jinja2 template
    rendered_html = render_drag_drop_template(draggable_items, droppable_items)

    print(rendered_html)
    
    # Pass the rendered HTML to the frontend as an argument
    component_value = _component_func(html_content=rendered_html, key=key, default={})
    
    return component_value

