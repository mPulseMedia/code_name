# Prompt Introduction

## prompt_intro_01

I am starting a new project called codename2.
This is as introduction to the steps that will be executed in sequence.
Each step has its own detailed prompt that I will share with you one at a time.
Don't execute anything yet. Just use this as an introduction.

Here is the overview of what we need to do for this step:

1. **env** - Set up project environment and structure
   - 1A **env_ui** - Create environment interface elements
   - 1B **env_state** - Manage environment state and persistence
   - 1C **env_core** - Implement environment core functionality
   - 1D **env_rev** - Review environment setup and compliance

2. **data** - Implement index data management system
   - 2A **data_ui** - Create data management interface elements
   - 2B **data_state** - Manage data state and persistence
   - 2C **data_core** - Implement data loading and saving logic
   - 2D **data_rev** - Review data system compliance

3. **index** - Set up the core index structure and display
   - 3A **index_ui** - Create index interface elements
   - 3B **index_state** - Manage index state and persistence
   - 3C **index_core** - Implement index core functionality
   - 3D **index_rev** - Review index system compliance

4. **root** - Implement root index UI operations
   - 4A **root_ui** - Create root interface elements
   - 4B **root_state** - Manage root state and persistence
   - 4C **root_core** - Implement root core functionality
   - 4D **root_rev** - Review root system compliance

5. **filter** - Implement filter system for index items
   - 5A **filter_ui** - Create filter interface elements
   - 5B **filter_state** - Manage filter state and persistence
   - 5C **filter_core** - Implement filter core functionality
   - 5D **filter_rev** - Review filter system compliance

6. **search** - Implement search functionality
   - 6A **search_ui** - Create search interface elements
   - 6B **search_state** - Manage search state and persistence
   - 6C **search_core** - Implement search core functionality
   - 6D **search_rev** - Review search system compliance

7. **error** - Implement error handling system
   - 7A **error_ui** - Create error interface elements
   - 7B **error_state** - Manage error state and persistence
   - 7C **error_core** - Implement error core functionality
   - 7D **error_rev** - Review error system compliance

8. **test** - Test and refine all functionality
   - 8A **test_ui** - Create test interface elements
   - 8B **test_state** - Manage test state and persistence
   - 8C **test_core** - Implement test core functionality
   - 8D **test_rev** - Review test system compliance

---

### Rules

Here are the rules that must be followed for this step:

9. **list_rules** - List formatting rules and standards
   - 9A **format** - Each item must have a number, codename, and description
   - 9B **codename** - Use lowercase snake_case codename (max 15 chars)
   - 9C **parent_indent** - Parent items start at column 1 (no spaces)
   - 9D **parent_num** - Parent items use single number (1, 2, 3)
   - 9E **parent_align** - Parent descriptions start at column 20
   - 9F **sub_indent** - Sub-items indent 2 spaces from parent
   - 9G **sub_num** - Sub-items use parent number + letter (1A, 1B)
   - 9H **sub_align** - Sub descriptions start at column 20
   - 9I **example** - Reference these rules for format example
   - 9J **align_consist** - All descriptions align at column 20

## prompt_intro_02

I'd like to start implementing step 1 (env - Set up project environment and structure). Please create a modern web application with the following technologies:

- Next.js for the frontend framework
- TypeScript for type safety
- Tailwind CSS for styling
- React Context for state management

Please create the application inside the v2/app folder.

Set up the basic project structure with proper configuration files and folder organization. Include essential components for the environment interface as outlined in step 1A.
