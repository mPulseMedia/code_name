# Code Name V2 - Naming Conventions

## Global Storage Objects
1. Function Registry
   - Object: `window.function_registry`
   - Type: Object
   - Purpose: Stores all function names
   - Example: `window.function_registry['setup_event_listeners']`

2. Variable Registry
   - Object: `window.variable_registry`
   - Type: Object
   - Purpose: Stores all variable names
   - Example: `window.variable_registry['active_filter_button']`

3. Style Registry
   - Object: `window.style_registry`
   - Type: Array
   - Purpose: Stores all CSS class names
   - Example: `window.style_registry = ['app_container', 'filter_active']`

4. Parameter Registry
   - Object: `window.parameter_registry`
   - Type: Array
   - Purpose: Stores all parameter names
   - Example: `window.parameter_registry = ['input_array', 'button_element']`

5. Constant Registry
   - Object: `window.constant_registry`
   - Type: Array
   - Purpose: Stores all constant names
   - Example: `window.constant_registry = ['DEFAULT_TIMEOUT_MS']`

6. Event Registry
   - Object: `window.event_registry`
   - Type: Array
   - Purpose: Stores all event names
   - Example: `window.event_registry = ['click_event', 'document_load_event']`

7. Property Registry
   - Object: `window.property_registry`
   - Type: Array
   - Purpose: Stores all property names
   - Example: `window.property_registry = ['element_class_list', 'filter_active_state']`

8. File Registry
   - Object: `window.file_registry`
   - Type: Array
   - Purpose: Stores all file names
   - Example: `window.file_registry = ['index.html', 'src/app.js']`

9. Global Registry
   - Object: `window.global_registry`
   - Type: Array
   - Purpose: Stores all window-level variable names
   - Example: `window.global_registry = ['filter_state', 'root_state']`

## State Management
1. Filter State
   - Object: `window.filter_state`
   - Type: Object
   - Properties:
     - `functions_enabled`: boolean
     - `variables_enabled`: boolean
     - `styles_enabled`: boolean
     - `parameters_enabled`: boolean
     - `constants_enabled`: boolean
     - `events_enabled`: boolean
     - `properties_enabled`: boolean
     - `files_enabled`: boolean
     - `globals_enabled`: boolean
     - `search_text`: string

2. Root State
   - Object: `window.root_state`
   - Type: Object
   - Purpose: Tracks open/closed state of root terms
   - Example: `window.root_state['root_name'] = true`

3. Search State
   - Objects:
     - `window.search_previous_state`: Object
     - `window.search_matches`: Object
     - `window.search_timeout`: number
     - `window.search_delay`: number (300)

## Function Naming Patterns
1. App Functions
   - Prefix: `app_`
   - Example: `app_setup_event_listeners`, `app_initialize`

2. Filter Functions
   - Prefix: `filter_`
   - Example: `filter_apply`, `filter_toggle_state`

3. DOM Functions
   - Prefix: `dom_`
   - Example: `dom_append`, `dom_create`

4. Registry Functions
   - Prefix: `registry_`
   - Example: `registry_get`, `registry_order_get`

5. Root Functions
   - Prefix: `root_`
   - Example: `root_extract`, `root_toggle`

6. Search Functions
   - Prefix: `search_`
   - Example: `search_apply`, `search_matches`

7. String Functions
   - Prefix: `string_`
   - Example: `string_split_by_separator`

8. Term Functions
   - Prefix: `term_`
   - Example: `term_extract_list`, `term_get_style`

## CSS Class Naming Patterns
1. Component Classes
   - Prefix: Component name
   - Example: `app_container`, `filter_container`

2. State Classes
   - Suffix: State description
   - Example: `filter_active`, `item_hidden`

3. Type Classes
   - Prefix: `item_`
   - Example: `item_function`, `item_variable`

4. Element Classes
   - Descriptive of element purpose
   - Example: `separator_light`, `term_container` 