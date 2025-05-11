# Code Name Index

A clean, interactive web app that displays an alphabetically sorted index of its own function names, variable names, class names and more, organized by their root terms.

## Features

- Displays all code names used in the creation of the app itself, including:
  - Functions
  - Variables
  - CSS Classes
  - Parameters
  - Constants
  - Events
  - Properties
  - Files
  - Window objects
- Two-column layout with filter controls at the top
- Names are organized by their root terms (first part of the name)
- Root groups can be collapsed or expanded
- Filter buttons for showing/hiding specific name types
- Search functionality for finding specific names
- Lookup panel that shows code snippets when clicking on a name
- Each name has color-coded terms separated by underscores (`_`)
  - **Color-coded** by type (functions, variables, classes, etc.)
  - **Term highlighting** shows which terms are shared between names

## How to Run

Start an HTTP server in the project directory:

```
npx http-server -p 8090
```

Then open http://localhost:8090 in your browser.

## Key Components

### Filter Panel
- Toggle buttons for each type of code name
- Search field for filtering names
- Root toggle button for expanding/collapsing all root groups
- Reset All button to clear all filters

### Index Panel
- Names are organized by their root term (first part before underscore)
- Root groups can be expanded or collapsed
- Click on any name to copy it to clipboard and view its code snippets

### Lookup Panel
- Shows the selected name and relevant code snippets
- Displays file paths and line numbers
- Highlights lines where the name appears

## Usage Tips

- **Click** on a name to copy it and view code snippets
- **Double-click** on a filter button to show only that type
- Use the search box to filter names by text
- Toggle root groups to organize your view
- Click the Reset All button to clear all filters 