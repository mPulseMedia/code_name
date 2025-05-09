// Global registry of functions and variables
window.app_functions  = {};
window.app_variables  = {};
window.function_names = [];
window.dom_class_names = [];
window.filter_state   = {
    function: true,
    variable: false,
    class:    false
};

// Setup event listeners
const app_event_listener_setup = () => {
    // Register this function
    window.app_functions['app_event_listener_setup'] = app_event_listener_setup;
    
    // Add event listeners for filter buttons
    const filter_button_function = document.getElementById('filter_button_function');
    const filter_button_variable = document.getElementById('filter_button_variable');
    const filter_button_class    = document.getElementById('filter_button_class');
    
    // Set up event listeners for filter buttons
    filter_button_function.addEventListener('click', () => {
        filter_toggle('function');
    });
    
    filter_button_variable.addEventListener('click', () => {
        filter_toggle('variable');
    });
    
    filter_button_class.addEventListener('click', () => {
        filter_toggle('class');
    });
};

// Toggle a filter state and update display
const filter_toggle = (filter_type) => {
    // Register this function
    window.app_functions['filter_toggle'] = filter_toggle;
    
    // Toggle the filter state
    window.filter_state[filter_type] = !window.filter_state[filter_type];
    
    // Update the button appearance
    const button = document.getElementById(`filter_button_${filter_type}`);
    if (window.filter_state[filter_type]) {
        button.classList.add('filter_active');
    } else {
        button.classList.remove('filter_active');
    }
    
    // Apply filtering to the name list
    filter_apply();
};

// Apply current filter settings to the name list
const filter_apply = () => {
    // Register this function
    window.app_functions['filter_apply'] = filter_apply;
    
    console.log('filter_apply_start', window.filter_state);
    
    // Re-render the entire list to ensure proper term graying based on visibility
    const index_ele = document.getElementById('index');
    if (index_ele) {
        // Clear existing content
        index_ele.innerHTML = '';
        
        // Re-render with filter-aware term graying
        const name_list          = name_list_order_get();
        console.log('filter_apply_name_list_length', name_list.length);
        
        let term_previous_list   = null;
        let name_previous_string = null;
        
        // Process each name in the list
        name_list.forEach(name_string => {
            // Only consider previous terms if the previous name will be visible
            const should_use_previous   = name_previous_string && name_filter_is_visible(name_previous_string);
            const effective_previous_list = should_use_previous ? term_previous_list : null;
            
            const { name_ele, term_list } = name_list_dom_render(name_string, effective_previous_list);
            dom_append(index_ele, name_ele);
            
            // Only update previous terms if this name will be visible after filtering
            if (name_filter_is_visible(name_string)) {
                term_previous_list  = term_list;
                name_previous_string = name_string;
            }
        });
    }
    
    // Apply visibility based on filter state
    const name_function_elements = document.querySelectorAll('.name_function');
    const name_variable_elements = document.querySelectorAll('.name_variable');
    const name_class_elements    = document.querySelectorAll('.name_class');
    
    // Apply filter state to each category
    name_function_elements.forEach(element => {
        if (window.filter_state.function) {
            element.classList.remove('name_hidden');
        } else {
            element.classList.add('name_hidden');
        }
    });
    
    name_variable_elements.forEach(element => {
        if (window.filter_state.variable) {
            element.classList.remove('name_hidden');
        } else {
            element.classList.add('name_hidden');
        }
    });
    
    name_class_elements.forEach(element => {
        if (window.filter_state.class) {
            element.classList.remove('name_hidden');
        } else {
            element.classList.add('name_hidden');
        }
    });
};

// Initialize the app
const app_initialize = () => {
    // Register this function in our global registry
    window.app_functions['app_initialize'] = app_initialize;
    
    console.log('app_initialize_start');
    
    // First set up event listeners
    app_event_listener_setup();
    
    // Then extract the names and render the index
    name_list_extract(); // Ensure names are extracted before rendering
    index_dom_render();
    
    console.log('filter_state_initial', window.filter_state);
};

// Sort an array alphabetically
const array_sort_alphabetically = (array) => {
    // Register this function
    window.app_functions['array_sort_alphabetically'] = array_sort_alphabetically;
    
    return [...array].sort();
};

// Append a child element to a parent element
const dom_append = (parent, child) => {
    // Register this function
    window.app_functions['dom_append'] = dom_append;
    
    parent.appendChild(child);
    return parent;
};

// Add a class to a DOM element
const dom_class_add = (element, class_name) => {
    // Register this function
    window.app_functions['dom_class_add'] = dom_class_add;
    
    element.classList.add(class_name);
    return element;
};

// Create a DOM element
const dom_create = (tag) => {
    // Register this function
    window.app_functions['dom_create'] = dom_create;
    
    return document.createElement(tag);
};

// Set text content of a DOM element
const dom_text_set = (element, text) => {
    // Register this function
    window.app_functions['dom_text_set'] = dom_text_set;
    
    element.textContent = text;
    return element;
};

// Render the names list
const index_dom_render = () => {
    // Register this function
    window.app_functions['index_dom_render'] = index_dom_render;
    
    console.log('index_dom_render_start');
    
    // Check if the index element exists
    const index_ele = document.getElementById('index');
    if (!index_ele) {
        console.error('index_element_not_found');
        return;
    }
    
    const name_list = name_list_order_get();
    console.log('name_list_render_prepare', name_list);
    
    if (!name_list || name_list.length === 0) {
        const message = document.createElement('li');
        message.textContent = 'No names found. Check console for details.';
        index_ele.appendChild(message);
        return;
    }
    
    // Apply filtering, which will handle the rendering with filter-awareness
    if (window.app_functions['filter_apply']) {
        filter_apply();
    }
};

// Create a DOM element for a name with styled terms
const name_list_dom_render = (name_string, term_previous_list = null) => {
    // Register this function
    window.app_functions['name_list_dom_render'] = name_list_dom_render;
    
    // Create the main list item element to hold the name
    const name_div = dom_create('li');
    dom_class_add(name_div, 'name');
    
    // Determine the type of name (function, variable, or CSS class)
    const name_type_function = window.function_names.includes(name_string);
    const name_type_class    = window.dom_class_names.includes(name_string);
    const name_type_variable = !name_type_function && !name_type_class;
    
    // Add class based on name type
    if (name_type_function) {
        dom_class_add(name_div, 'name_function');
    } else if (name_type_class) {
        dom_class_add(name_div, 'name_class');
    } else {
        dom_class_add(name_div, 'name_variable');
    }
    
    // Add click event for copying to clipboard
    name_div.addEventListener('click', () => {
        // Copy the name to clipboard
        navigator.clipboard.writeText(name_string)
            .then(() => {
                // Add the copied class to trigger the animation
                dom_class_add(name_div, 'copied');
                
                // Remove the class after animation completes
                setTimeout(() => {
                    name_div.classList.remove('copied');
                }, 1000);
            })
            .catch(err => {
                console.error('copy_to_clipboard_error', err);
            });
    });
    
    // Add title attribute for tooltip
    let type_text = name_type_function ? 'function' : (name_type_class ? 'CSS class' : 'variable');
    name_div.setAttribute('title', `Click to copy (${type_text})`);
    
    // Create a container to hold all terms and separators without unwanted spacing
    const term_dom_container = dom_create('div');
    dom_class_add(term_dom_container, 'term_container');
    dom_append(name_div, term_dom_container);
    
    // Extract individual terms from the name by splitting on underscores
    const term_list = term_list_extract(name_string);
    
    // Compare each term with the corresponding term from the previous name
    // This determines which terms should be gray (repeated) or white (new/different)
    const term_list_same_is = term_list_compare(term_list, term_previous_list);
    
    // Process each term in the name
    term_list.forEach((term, index) => {
        // Check if this term is the same as in the previous name
        const term_same_is      = term_list_same_is[index];
        
        // Determine the style (gray or white) based on whether the term is repeated
        const term_style_string = term_style_get(term_same_is);
        
        // Create an element for this term
        const term_ele          = dom_create('span');
        dom_class_add(term_ele, 'term');
        dom_class_add(term_ele, `term_${term_style_string}`); // Add style-specific class
        dom_text_set(term_ele, term); // Set the text content
        dom_append(term_dom_container, term_ele); // Add to the container
        
        // If this isn't the last term, add a separator (_)
        if (index < term_list.length - 1) {
            // Create separator with the same style as its preceding term
            const separator_ele = dom_create('span');
            dom_class_add(separator_ele, 'separator');
            dom_class_add(separator_ele, `separator_${term_style_string}`);
            dom_text_set(separator_ele, '_');
            dom_append(term_dom_container, separator_ele);
        }
    });
    
    // Add parentheses to function names
    if (name_type_function) {
        const parens = dom_create('span');
        dom_class_add(parens, 'function_parens');
        dom_text_set(parens, '()');
        dom_append(term_dom_container, parens);
    }
    
    // Return both the created DOM element and the terms for the next name to compare against
    return { name_ele: name_div, term_list };
};

// Extract function and variable names from the script
const name_list_extract = () => {
    // Register this function
    window.app_functions['name_list_extract'] = name_list_extract;
    
    console.log('name_list_extract_start');
    
    // Function names in alphabetical order
    const function_names = [
        'app_event_listener_setup',
        'app_initialize',
        'array_sort_alphabetically',
        'dom_append',
        'dom_class_add',
        'dom_create',
        'dom_text_set',
        'filter_apply',
        'filter_toggle',
        'index_dom_render',
        'name_filter_is_visible',
        'name_list_dom_render',
        'name_list_extract',
        'name_list_get',
        'name_list_order_get',
        'string_by_separator_split',
        'term_list_compare',
        'term_list_extract',
        'term_style_get'
    ];
    
    // Variable names in order of appearance
    const variable_names = [
        'app_functions',
        'app_variables',
        'array',
        'child',
        'class_name',
        'dom_class_names',
        'element',
        'filter_button_class',
        'filter_button_function',
        'filter_button_variable',
        'filter_state',
        'function_names',
        'index_ele',
        'message',
        'name_div',
        'name_ele',
        'name_is_class',
        'name_is_function',
        'name_list',
        'name_string',
        'name_type_list_set',
        'parent',
        'parens',
        'separator',
        'separator_ele',
        'string',
        'tag',
        'term',
        'term_dom_container',
        'term_ele',
        'term_list',
        'term_list_same_is',
        'term_previous_list',
        'term_same_is',
        'term_style_string',
        'text',
        'type_text',
        'variable_names'
    ];
    
    // DOM class names in alphabetical order
    const dom_class_names = [
        'app_container',
        'app_title',
        'copied',
        'function_parens',
        'index',
        'index_container',
        'name',
        'name_class',
        'name_function',
        'name_variable',
        'separator',
        'separator_gray',
        'separator_white',
        'term',
        'term_container',
        'term_gray',
        'term_white'
    ];
    
    // Store function and class names globally for reference
    window.function_names = function_names;
    window.dom_class_names = dom_class_names;
    
    // Log the counts to ensure they're populated
    console.log('name_list_extract_counts', {
        functions: window.function_names.length,
        classes: window.dom_class_names.length,
        variables: Object.keys(window.app_variables).length
    });
    
    // Combine all names
    const name_type_list_set = [...function_names, ...variable_names, ...dom_class_names];
    
    // Register all variable names for reference
    variable_names.forEach(name => {
        window.app_variables[name] = name;
    });
    
    return name_type_list_set;
};

// Collection of names from the code
const name_list_get = () => {
    // Register this function
    window.app_functions['name_list_get'] = name_list_get;
    
    console.log('name_list_get_start');
    
    // If we already have function names extracted, don't re-extract them
    if (window.function_names.length > 0) {
        console.log('using_existing_name_list', window.function_names.length);
        return [...window.function_names, ...Object.keys(window.app_variables), ...window.dom_class_names];
    }
    
    // Get all the names by extraction
    return name_list_extract();
};

// Get the ordered list of names (functions and variables)
const name_list_order_get = () => {
    // Register this function
    window.app_functions['name_list_order_get'] = name_list_order_get;
    
    console.log('name_list_order_get_start');
    const name_list = name_list_get();
    // Sort the names alphabetically
    return array_sort_alphabetically(name_list);
};

// Split a string by a separator
const string_by_separator_split = (string, separator) => {
    // Register this function
    window.app_functions['string_by_separator_split'] = string_by_separator_split;
    
    return string.split(separator);
};

// Compare terms between current and previous function
const term_list_compare = (term_list, term_previous_list) => {
    // Register this function
    window.app_functions['term_list_compare'] = term_list_compare;
    
    if (!term_previous_list) return term_list.map(() => false);
    return term_list.map((term, index) => {
        return term_previous_list[index] === term;
    });
};

// Extract terms from a name
const term_list_extract = (name_string) => {
    // Register this function
    window.app_functions['term_list_extract'] = term_list_extract;
    
    return string_by_separator_split(name_string, '_');
};

// Determine the style for a term based on comparison
const term_style_get = (term_same_is) => {
    // Register this function
    window.app_functions['term_style_get'] = term_style_get;
    
    return term_same_is ? 'gray' : 'white';
};

// Check if a name should be visible based on filter state
const name_filter_is_visible = (name_string) => {
    // Register this function
    window.app_functions['name_filter_is_visible'] = name_filter_is_visible;
    
    const name_type_function = window.function_names.includes(name_string);
    const name_type_class    = window.dom_class_names.includes(name_string);
    const name_type_variable = !name_type_function && !name_type_class;
    
    // Add debug logging for troubleshooting
    if (name_string.startsWith('app_')) {
        console.log('visibility_check', {
            name: name_string,
            is_function: name_type_function,
            is_class: name_type_class,
            is_variable: name_type_variable,
            filter_state: { ...window.filter_state }
        });
    }
    
    if (name_type_function) {
        return window.filter_state.function;
    } else if (name_type_class) {
        return window.filter_state.class;
    } else {
        return window.filter_state.variable;
    }
};

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('dom_content_loaded');
    
    // Log all functions and variables that have been registered
    console.log('function_list_pre_init', Object.keys(window.app_functions));
    console.log('variable_list_pre_init', Object.keys(window.app_variables));
    
    // Initialize the app
    app_initialize();
    
    // Log all functions and variables after initialization
    console.log('function_list_post_init', Object.keys(window.app_functions));
    console.log('variable_list_post_init', Object.keys(window.app_variables));
    
    // For debug purposes, make lists of all names available globally
    window.getAllFunctionNames = () => {
        return Object.keys(window.app_functions);
    };
    
    window.getAllVariableNames = () => {
        return Object.keys(window.app_variables);
    };
    
    window.getAllNames = () => {
        return [...Object.keys(window.app_functions), ...Object.keys(window.app_variables)];
    };
});