# Codename2 Project

A clean, interactive web app that displays an alphabetically sorted index of code naming patterns and tools for searching, filtering, and revealing codename components.

## Features

- Displays all codenames used in the creation of the app itself, including:
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
- Names are organized by their root terms (first part of the codename)
- Root groups can be collapsed or expanded
- Filter buttons for showing/hiding specific codename types
- Search functionality for finding specific codenames
- Lookup panel that shows code snippets when clicking on a codename
- Each codename has color-coded terms separated by underscores (`_`)
  - **Color-coded** by type (functions, variables, classes, etc.)
  - **Term highlighting** shows which terms are shared between codenames

## How to Run

Start an HTTP server in the project directory:

```
npx http-server -p 8090
```

Then open http://localhost:8090 in your browser.

## Key Components

### Filter Panel
- Toggle buttons for each type of codename
- Search field for filtering codenames
- Root toggle button for expanding/collapsing all root groups
- Reset All button to clear all filters

### Index Panel
- Codenames are organized by their root term (first part before underscore)
- Root groups can be expanded or collapsed
- Click on any codename to copy it to clipboard and view its code snippets

### Lookup Panel
- Shows the selected codename and relevant code snippets
- Displays file paths and line numbers
- Highlights lines where the codename appears

## Usage Tips

- **Click** on a codename to copy it and view code snippets
- **Double-click** on a filter button to show only that type
- Use the search box to filter codenames by text
- Toggle root groups to organize your view
- Click the Reset All button to clear all filters 

## Development Approach

This project is being developed using a structured prompt-based approach:

### Prompt-Based Development

Each phase of development is organized into prompt files located in the `v2/` directory. These files serve both as a development plan and a historical record of the implementation process:

- Each prompt file contains multiple individual prompts (e.g., `prompt_1A_setup`, `prompt_1B_struct`)
- Prompts are executed sequentially, with notes added about implementation details or required changes
- This approach maintains both a forward-looking plan and a historical record of completed work
- Prompts can be revisited, modified, and resubmitted as needed

The prompt naming convention (e.g., `prompt_1B_struct`) allows for systematic management of both the development plan and execution history.

To begin exploring the project development sequence, start with [the environment setup prompts](v2/prompt_2_env.md), followed by [the data structure prompts](v2/prompt_3_data.md). 