# Function Name Index

A simple interactive web app that displays an alphabetically sorted index of its own function names in snake_case format.

## Features

- Displays all functions used in the creation of the app itself
- Each function name consists of terms separated by underscores (`_`)
- Each term is colored:
  - **White** if the term is different from the term directly above it
  - **Gray** if the term is the same as the term directly above it
- Follows the `obj_subobj_attr_verb` naming convention (e.g., functions end with `_get`, `_is`, etc.)

## How to Run

Simply open the `index.html` file in any modern web browser.

## How It Works

1. The app collects all function names used in its creation
2. The names are sorted alphabetically and displayed as an index
3. Each name is split into terms (parts separated by underscores)
4. Each term is compared with the term in the same position in the previous function name
5. Terms are colored white or gray based on this comparison

## Function Naming Convention

The app follows the `obj_subobj_attr_verb` structure for function naming:
- Objects (app, function, dom, etc.)
- Sub-objects if applicable
- Attributes if applicable
- Verbs (get, create, set, etc.) 