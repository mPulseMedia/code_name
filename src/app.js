// Add logging control variables
const LOG_GROUPS = {
    APP: {
        INIT: true,           // App initialization
        DOM: false,           // DOM setup and rendering
        EVENT: false,         // Event handling
        STATE: true           // State management
    },
    NAME: {
        RENDER: false,        // Name element rendering
        CLICK: true,         // Name click handling
        FILTER: true,        // Name filtering
        TYPE: false,          // Name type determination
        TERM: false           // Term handling
    },
    ROOT: {
        GROUP: false,         // Root group operations
        TOGGLE: false,        // Root toggle operations
        HEADER: false,        // Root header operations
        CONTENT: false        // Root content operations
    },
    LOOKUP: {
        INIT: false,          // Lookup initialization
        SHOW: true,          // Lookup display
        HIDE: true,          // Lookup hiding
        SNIPPET: false,       // Snippet operations
        SEARCH: true         // Snippet searching
    },
    SEARCH: {
        APPLY: true,         // Search application
        MATCH: false,         // Search matching
        FILTER: true         // Search filtering
    },
    ERROR: true             // Error logging (always on)
};

// Helper function for logging
const log = (group, ...args) => {
    // Handle nested groups (e.g., INIT.DOM)
    if (group.includes('.')) {
        const [parent, child] = group.split('.');
        if (LOG_GROUPS[parent] && LOG_GROUPS[parent][child]) {
            console.log(`[${group}]`, ...args);
        }
    } else if (LOG_GROUPS[group]) {
        console.log(`[${group}]`, ...args);
    }
};

// Update initial loading logs
log('APP.INIT', 'app.js starting to load');
log('APP.INIT', 'app.js finished loading');

// Define name lists in a function to ensure they're available when needed
const defineNameLists = () => {
    const function_names = [
        'app_event_listener_setup',
        'app_init',
        'array_sort_alphabetically',
        'dom_element_append',
        'dom_element_class_add',
        'dom_element_create',
        'dom_element_text_set',
        'filter_all_reset',
        'filter_count_visible_check',
        'filter_exclusive_set',
        'filter_name_apply',
        'filter_state_toggle',
        'filter_type_class_event_add',
        'filter_type_event_add',
        'filter_type_function_event_add',
        'filter_type_variable_event_add',
        'index_dom_render',
        'name_filter_visible_is',
        'name_list_const_set',
        'name_list_dom_render',
        'name_list_get',
        'name_list_order_get',
        'root_toggle',
        'root_content_create',
        'root_extract',
        'root_group_create',
        'root_header_create',
        'root_connect',
        'root_open_all',
        'root_close_all',
        'search_apply',
        'search_matches',
        'search_query_validate',
        'string_by_separator_split',
        'term_list_compare',
        'term_list_extract',
        'name_type_determine',
        'lookup_init',
        'lookup_show',
        'lookup_hide',
        'lookup_snippets_load',
        'lookup_snippets_extract',
        'lookup_snippets_render'
    ];

    const variable_names = [
        'name_list_func',
        'name_list_var',
        'name_list_class',
        'name_list_param',
        'name_list_const',
        'name_list_event',
        'name_list_propt',
        'name_list_file',
        'name_list_window',
        'filter_on_list',
        'root_open_state',
        'search_root_previous_state',
        'search_root_match',
        'search_timeout',
        'search_delay_ms',
        'lookup_state'
    ];

    const dom_class_names = [
        'app_container',
        'app_title',
        'app_content',
        'filter_container',
        'filter_group',
        'filter_group_title',
        'filter_buttons',
        'filter',
        'filter_active',
        'filter_actions',
        'filter_action',
        'index_container',
        'index',
        'name',
        'name_function',
        'name_variable',
        'name_class',
        'name_parameter',
        'name_constant',
        'name_event',
        'name_property',
        'name_file',
        'name_window',
        'name_hidden',
        'name_copied',
        'term_container',
        'term',
        'term_white',
        'term_gray',
        'separator',
        'separator_white',
        'separator_gray',
        'root_group',
        'root_term_header',
        'root_term_caret',
        'root_term_container',
        'root_term_text',
        'root_term_content',
        'root_header_hidden',
        'root_term_content_open',
        'root_term_header_open',
        'root_item',
        'lookup_container',
        'lookup_field',
        'lookup_close_button',
        'lookup_window',
        'lookup_header',
        'lookup_title',
        'lookup_close',
        'lookup_content',
        'lookup_loading',
        'lookup_no_results',
        'lookup_snippet',
        'lookup_snippet_header',
        'lookup_snippet_file',
        'lookup_snippet_line',
        'lookup_snippet_content',
        'lookup_snippet_match',
        'error'
    ];

    const parameter_names = [
        'array_input',
        'parent_element',
        'child_element',
        'target_element',
        'class_name',
        'element_tag',
        'text_content',
        'filter_type',
        'button_element',
        'type',
        'name_string',
        'term_previous_list',
        'root_name',
        'names_in_group',
        'index_element',
        'header_element',
        'content_element',
        'caret_element',
        'term_container_element',
        'text_element',
        'term_list',
        'term_same_is',
        'search_query',
        'query',
        'event',
        'error'
    ];

    const constant_names = [
        'MIME_TYPES',
        'PORT',
        'search_delay_ms'
    ];

    const event_names = [
        'click',
        'dblclick',
        'input',
        'keydown',
        'DOMContentLoaded',
        'readystatechange',
        'error',
        'unhandledrejection'
    ];

    const property_names = [
        'func_on',
        'var_on',
        'class_on',
        'param_on',
        'const_on',
        'event_on',
        'propt_on',
        'file_on',
        'window_on',
        'search_query',
        'active_name',
        'snippets',
        'visible'
    ];

    const file_names = [
        'src/app.js',
        'src/styles.css',
        'src/styles.css.bak',
        'index.html',
        'index.html.backup',
        'server.js',
        'README.md'
    ];

    const store_names = [
        'name_list_func',
        'name_list_var',
        'name_list_class',
        'name_list_param',
        'name_list_const',
        'name_list_event',
        'name_list_propt',
        'name_list_file',
        'name_list_window',
        'filter_on_list',
        'root_open_state',
        'search_root_previous_state',
        'search_root_match',
        'search_timeout',
        'search_delay_ms',
        'lookup_state'
    ];

    return {
        function_names,
        variable_names,
        dom_class_names,
        parameter_names,
        constant_names,
        event_names,
        property_names,
        file_names,
        store_names
    };
};

// Call defineNameLists immediately to ensure lists are available
const nameLists = defineNameLists();

// Initialize global state
window.name_list_func  = {};
window.name_list_var   = {};
window.name_list_class = [];
window.name_list_param = [];
window.name_list_const = [];
window.name_list_event = [];
window.name_list_propt = [];
window.name_list_file  = [];
window.name_list_window = [];

window.filter_on_list  = {
    func_on    : true,
    var_on     : true,
    class_on   : true,
    param_on   : true,
    const_on   : true,
    event_on   : true,
    propt_on   : true,
    file_on    : true,
    window_on  : true,
    search_query : ''
};

window.root_open_state            = {};
window.search_root_previous_state = {};
window.search_root_match         = {};
window.search_timeout            = null;
window.search_delay_ms           = 300;

// Add lookup state to window
window.lookup_state = {
    active_name: null,
    snippets: [],
    visible: false
};

// App functions
const app_event_listener_setup = () => {
    window.name_list_func['app_event_listener_setup'] = app_event_listener_setup;
    
    // Set up filter buttons
    const filter_function_element = document.getElementById('filter_function');
    const filter_variable_element = document.getElementById('filter_variable');
    const filter_class_element = document.getElementById('filter_class');
    const filter_parameter_element = document.getElementById('filter_parameter');
    const filter_constant_element = document.getElementById('filter_constant');
    const filter_event_element = document.getElementById('filter_event');
    const filter_property_element = document.getElementById('filter_property');
    const filter_file_element = document.getElementById('filter_file');
    const filter_window_element = document.getElementById('filter_window');
    const filter_reset_all_element = document.getElementById('filter_reset_all');
    
    // Add event listeners to filter buttons
    if (filter_function_element) {
        filter_type_function_event_add(filter_function_element);
    }
    if (filter_variable_element) {
        filter_type_variable_event_add(filter_variable_element);
    }
    if (filter_class_element) {
        filter_type_class_event_add(filter_class_element);
    }
    if (filter_parameter_element) {
        filter_type_event_add(filter_parameter_element, 'parameter');
    }
    if (filter_constant_element) {
        filter_type_event_add(filter_constant_element, 'constant');
    }
    if (filter_event_element) {
        filter_type_event_add(filter_event_element, 'event');
    }
    if (filter_property_element) {
        filter_type_event_add(filter_property_element, 'property');
    }
    if (filter_file_element) {
        filter_type_event_add(filter_file_element, 'file');
    }
    if (filter_window_element) {
        filter_type_event_add(filter_window_element, 'window');
    }
    if (filter_reset_all_element) {
        filter_reset_all_element.addEventListener('click', () => {
            filter_all_reset();
        });
    }
    
    // Set up root_open_all button
    const root_open_all_button = document.getElementById('root_open_all');
    if (root_open_all_button) {
        root_open_all_button.addEventListener('click', () => {
            // Check if all roots are already open
            const all_headers = document.querySelectorAll('.root_term_header');
            const closed_headers = document.querySelectorAll('.root_term_header:not(.root_header_hidden)');
            
            // If there are no closed headers (all are open), we should close all
            // Otherwise, we should open all
            if (closed_headers.length === 0 && all_headers.length > 0) {
                debug('CLICK', 'Closing all root groups');
                root_close_all();
                // Update button to show it will open all next time - pointing right
                root_open_all_button.textContent = '▶';
                root_open_all_button.title = 'Open All Root Groups';
            } else {
                debug('CLICK', 'Opening all root groups');
                root_open_all();
                // Update button to show it will close all next time - pointing down
                root_open_all_button.textContent = '▼';
                root_open_all_button.title = 'Close All Root Groups';
            }
        });
    }
    
    // Set up search input
    const search_input_element = document.getElementById('name_search_input');
    const search_clear_element = document.getElementById('name_search_clear');
    
    if (search_input_element) {
        search_input_element.addEventListener('input', (event) => {
            const query = event.target.value;
            
            // Show/hide clear button
            if (search_clear_element) {
                search_clear_element.classList.toggle('visible', query.length > 0);
            }
            
            // Clear any existing timeout
            if (window.search_timeout) {
                clearTimeout(window.search_timeout);
            }
            
            // Set a new timeout to apply the search
            window.search_timeout = setTimeout(() => {
                search_apply(query);
            }, window.search_delay_ms);
        });
        
        // Handle Enter key
        search_input_element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                search_apply(event.target.value);
            }
        });
    }
    
    if (search_clear_element) {
        search_clear_element.addEventListener('click', () => {
            if (search_input_element) {
                search_input_element.value = '';
                search_input_element.focus();
                search_apply('');
            }
            search_clear_element.classList.remove('visible');
        });
    }
    
    // Set up text field event listeners
    const text_field = document.getElementById('name_text_field');
    if (text_field) {
        // Handle text field blur (clicking outside)
        document.addEventListener('click', (event) => {
            if (!text_field.contains(event.target) && 
                !event.target.closest('.name')) {
                text_field.classList.remove('visible');
            }
        });
        
        // Handle text field input
        text_field.addEventListener('input', (event) => {
            const current_name = text_field.dataset.currentName;
            if (current_name) {
                console.log(`Text for ${current_name}:`, event.target.value);
                // You can add additional handling here
            }
        });
        
        // Handle Enter key
        text_field.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const current_name = text_field.dataset.currentName;
                if (current_name) {
                    console.log(`Submitted text for ${current_name}:`, text_field.value);
                    // You can add additional handling here
                    text_field.classList.remove('visible');
                }
            } else if (event.key === 'Escape') {
                text_field.classList.remove('visible');
            }
        });
    }
};

// Add temporary diagnostic logging function
const diag_log = (...args) => {
    // Only log critical diagnostics
    if (args[0] && (args[0].includes('ERROR') || args[0].includes('INITIALIZE') || args[0].includes('LOOKUP'))) {
        console.log('%c[DIAG]', 'background: #ff6b6b; color: white; padding: 2px 4px; border-radius: 2px;', ...args);
    }
};

// Add debug logging function with clear categorization
const debug = (category, ...args) => {
    // Categories: CLICK, LOOKUP, DOM, STATE
    const styles = {
        CLICK: 'background: #9b59b6; color: white;',
        LOOKUP: 'background: #3498db; color: white;',
        DOM: 'background: #2ecc71; color: white;',
        STATE: 'background: #f39c12; color: white;',
        ERROR: 'background: #e74c3c; color: white;'
    };
    
    const style = styles[category] || 'background: #7f8c8d; color: white;';
    console.log(`%c[DEBUG.${category}]`, `${style} padding: 2px 4px; border-radius: 2px;`, ...args);
};

// Add HTML content diagnostic function
const diag_html = () => {
    // Skip detailed HTML content logging
};

// Modify the script loading section in HTML
document.addEventListener('DOMContentLoaded', () => {
    diag_log('=== DOM CONTENT LOADED EVENT ===');
    diag_html();
    diag_log('About to call app_init...');
    app_init();
});

// Modify app_init to handle DOM loading state
const app_init = () => {
    try {
        diag_log('=== APP INIT START ===');
        diag_log('Current DOM state:', document.readyState);
        diag_log('Document body children:', document.body.children.length);
        diag_log('Lookup container exists:', !!document.querySelector('.lookup_container'));
        diag_html(); // Add HTML content check
        
        log('APP.INIT', 'Starting app initialization...');
        
        // Initialize state with all roots closed
        window.root_open_state = {};
        window.search_root_previous_state = {};
        window.search_root_match = {};
        
        // If DOM isn't ready, wait for it
        if (document.readyState !== 'complete') {
            diag_log('DOM not complete, waiting...');
            log('APP.DOM', 'DOM not fully loaded, waiting for complete state...');
            document.addEventListener('readystatechange', () => {
                diag_log('readystatechange event:', document.readyState);
                diag_log('Lookup container exists:', !!document.querySelector('.lookup_container'));
                diag_html(); // Add HTML content check
                if (document.readyState === 'complete') {
                    diag_log('DOM complete, scheduling init...');
                    log('APP.DOM', 'DOM now fully loaded, proceeding with initialization');
                    // Add a small delay to ensure all elements are properly loaded
                    setTimeout(() => {
                        diag_log('Timeout fired, starting init...');
                        diag_html(); // Add HTML content check
                        initializeApp();
                    }, 100);
                }
            });
            return;
        }
        
        // If DOM is ready, proceed with initialization after a small delay
        diag_log('DOM already complete, scheduling init...');
        setTimeout(() => {
            diag_log('Timeout fired, starting init...');
            diag_html(); // Add HTML content check
            initializeApp();
        }, 100);
    } catch (error) {
        diag_log('Error in app_init:', error);
        log('ERROR', 'Error during app initialization:', error);
        showError(error);
    }
};

// Separate the actual initialization logic
const initializeApp = () => {
    try {
        diag_log('=== INITIALIZE APP START ===');
        diag_log('Document readyState:', document.readyState);
        diag_log('Document body children:', document.body.children.length);
        diag_log('All script elements:', document.querySelectorAll('script').length);
        diag_log('Script elements in order:', Array.from(document.querySelectorAll('script')).map(s => s.src || 'inline'));
        diag_html(); // Add HTML content check
        
        log('APP.INIT', 'Proceeding with app initialization...');
        
        // Initialize the root_open_state to empty object to ensure all roots start closed
        window.root_open_state = {};
        
        // Verify required elements exist
        const index_element = document.getElementById('index');
        diag_log('Index element exists:', !!index_element);
        if (!index_element) {
            throw new Error('Index element not found!');
        }
        log('APP.DOM', 'Found index element:', index_element);
        
        // Initialize lookup FIRST before checking for container
        diag_log('About to call lookup_init...');
        lookup_init();
        diag_log('lookup_init completed');
        log('APP.LOOKUP', 'Lookup initialized');
        
        // Now check for lookup container - should be created by lookup_init if missing
        const lookup_container = document.querySelector('.lookup_container');
        diag_log('Lookup container details:', {
            exists: !!lookup_container,
            parent: lookup_container ? lookup_container.parentElement.className : 'none',
            siblings: lookup_container ? lookup_container.parentElement.children.length : 0,
            html: lookup_container ? lookup_container.outerHTML : 'none'
        });
        if (!lookup_container) {
            throw new Error('Lookup container not found even after lookup_init!');
        }
        log('APP.DOM', 'Found lookup container:', lookup_container);
        
        // Verify filter buttons exist
        const filter_buttons = document.querySelectorAll('.filter');
        diag_log('Filter buttons count:', filter_buttons.length);
        if (filter_buttons.length === 0) {
            throw new Error('No filter buttons found!');
        }
        log('APP.DOM', 'Found filter buttons:', filter_buttons.length);
        
        // Initialize name lists
        const name_list = name_list_const_set();
        diag_log('Name list initialized:', {
            success: !!name_list,
            count: name_list ? name_list.length : 0
        });
        if (!name_list || name_list.length === 0) {
            throw new Error('Name list initialization failed!');
        }
        log('APP.NAME', 'Name list initialized with', name_list.length, 'items');
        
        // Initialize code snippets for lookup
        initializeCodeSnippets();
        log('APP.LOOKUP', 'Code snippets initialized for lookup');
        
        // Set up event listeners
        app_event_listener_setup();
        log('APP.EVENT', 'Event listeners set up');
        
        // Reset filters and apply them
        filter_all_reset();
        log('APP.FILTER', 'Filters reset');
        
        // Apply filters to show initial list
        filter_name_apply();
        log('APP.FILTER', 'Initial filter application complete');
        
        // Verify the index was populated
        const name_elements = index_element.querySelectorAll('.name');
        diag_log('Index population:', {
            elements: name_elements.length,
            firstElement: name_elements[0] ? name_elements[0].textContent : 'none'
        });
        log('APP.DOM', 'Index populated with', name_elements.length, 'names');
        
        if (name_elements.length === 0) {
            throw new Error('Index was not populated with any names!');
        }
        
        // Additional checks to ensure click handlers are working
        diag_log('Verifying name click handlers...');
        console.log('Verifying name click handlers on', name_elements.length, 'name elements');
        
        // Test click handler on first element
        if (name_elements.length > 0) {
            const testElement = name_elements[0];
            const testName = testElement.textContent.trim();
            diag_log('First name element text:', testName);
            console.log('First name element text:', testName);
            
            // Final backup to ensure all name elements have click handlers
            console.log('Ensuring all name elements have click handlers');
            name_elements.forEach((el, index) => {
                // Get the name string from the element's text content
                const nameText = el.textContent.trim();
                
                // Make sure element has the necessary CSS classes
                if (!el.classList.contains('name')) {
                    el.classList.add('name');
                }
                
                // Ensure the click handler is attached
                if (!el.onclick) {
                    el.onclick = function(event) {
                        console.log('Backup click handler triggered for:', nameText);
                        
                        // Prevent default behavior and event propagation
                        event.preventDefault();
                        event.stopPropagation();
                        
                        // Add copy animation class
                        this.classList.add('name_copied');
                        
                        // Copy to clipboard
                        try {
                            navigator.clipboard.writeText(nameText);
                            console.log('Copied to clipboard:', nameText);
                        } catch (error) {
                            console.error('Could not copy to clipboard:', error);
                        }
                        
                        // Remove animation class after timeout
                        setTimeout(() => {
                            this.classList.remove('name_copied');
                        }, 1000);
                        
                        return false; // Prevent default and bubbling
                    };
                }
            });
            
            // Add an indicator to the first element for testing
            const indicator = document.createElement('span');
            indicator.style.position = 'absolute';
            indicator.style.right = '0';
            indicator.style.top = '0';
            indicator.style.background = '#61dafb';
            indicator.style.color = 'white';
            indicator.style.padding = '2px 4px';
            indicator.style.borderRadius = '2px';
            indicator.style.fontSize = '10px';
            indicator.style.zIndex = '100';
            indicator.textContent = 'click me';
            testElement.style.position = 'relative';
            testElement.appendChild(indicator);
            diag_log('Added indicator to first name element');
            console.log('Added indicator to first name element');
        }
        
        diag_log('=== INITIALIZE APP COMPLETE ===');
        log('APP.INIT', 'App initialization completed successfully');
    } catch (error) {
        diag_log('Error in initializeApp:', error);
        log('ERROR', 'Error during app initialization:', error);
        showError(error);
    }
};

const name_list_get = () => {
    window.name_list_func['name_list_get'] = name_list_get;
    
    if (window.name_list_class && window.name_list_class.length > 0) {
        return [
            ...Object.keys(window.name_list_func),
            ...Object.keys(window.name_list_var),
            ...window.name_list_class,
            ...window.name_list_param,
            ...window.name_list_const,
            ...window.name_list_event,
            ...window.name_list_propt,
            ...window.name_list_file,
            ...window.name_list_window
        ];
    }
    
    return name_list_const_set();
};

const name_list_order_get = () => {
    window.name_list_func['name_list_order_get'] = name_list_order_get;
    
    const name_list = name_list_get();
    
    if (name_list.length === 0) {
        return [];
    }
    
    return array_sort_alphabetically(name_list);
};

const search_apply = (search_query) => {
    window.name_list_func['search_apply'] = search_apply;
    
    // Validate and normalize the query
    search_query = search_query_validate(search_query);
    
    // Update the filter state
    window.filter_on_list.search_query = search_query;
    
    // Clear any existing search timeout
    if (window.search_timeout) {
        clearTimeout(window.search_timeout);
    }
    
    // Save current root state before search
    if (search_query) {
        // Only save the state if we're actually searching
        window.search_root_previous_state = { ...window.root_open_state };
        window.search_root_match = {};
    } else {
        // If clearing search, only restore state if we previously had a search
        if (window.filter_on_list.search_query !== '') {
            // First restore the state from before search
            window.root_open_state = { ...window.search_root_previous_state };
            
            // Then ensure roots that matched search remain open
            Object.keys(window.search_root_match).forEach(root_name => {
                window.root_open_state[root_name] = true;
            });
        }
        
        // Clear the search match state regardless
        window.search_root_match = {};
    }
    
    // Re-apply the filter to show all matching names
    filter_name_apply();
};

// Add search query validate function
const search_query_validate = (query) => {
    window.name_list_func['search_query_validate'] = search_query_validate;
    
    // Trim whitespace
    query = query ? query.trim() : '';
    
    // Return the sanitized query
    return query;
};

// Add search matches function
const search_matches = (name_string, search_lower) => {
    window.name_list_func['search_matches'] = search_matches;
    
    // Check if full name contains the search text
    const name_lower = name_string.toLowerCase();
    if (name_lower.includes(search_lower)) {
        return true;
    }
    
    // If not found in full name, check individual terms
    const terms = term_list_extract(name_string);
    for (let i = 0; i < terms.length; i++) {
        if (terms[i].toLowerCase().includes(search_lower)) {
            return true;
        }
    }
    
    return false;
};

// String functions
const string_by_separator_split = (string, separator) => {
    window.name_list_func['string_by_separator_split'] = string_by_separator_split;
    
    return string.split(separator);
};

// Term functions
const term_list_compare = (term_list, term_previous_list) => {
    window.name_list_func['term_list_compare'] = term_list_compare;
    
    if (!term_previous_list) return term_list.map(() => false);
    
    let term_previous_match_all = true;
    
    const result = term_list.map((term, index) => {
        if (!term_previous_match_all) return false;
        
        // Extract text from term_previous_list if it exists
        const prev_term = index < term_previous_list.length ? term_previous_list[index].text : null;
        const term_current_match = prev_term === term;
        
        if (!term_current_match) {
            term_previous_match_all = false;
        }
        
        return term_current_match;
    });
    
    return result;
};

const term_list_extract = (name_string) => {
    window.name_list_func['term_list_extract'] = term_list_extract;
    
    // Special handling for file paths with slashes
    if (name_string.includes('/')) {
        return name_string.split('/').filter(Boolean);
    }
    
    // Split by underscores
    return name_string.split('_');
};

const term_style_get = (term_same_is) => {
    window.name_list_func['term_style_get'] = term_style_get;
    return term_same_is ? 'term_gray' : 'term_white';
};

// Root functions
const root_extract = (name_string) => {
    window.name_list_func['root_extract'] = root_extract;
    
    // Special handling for directory paths only
    if (name_string.includes('/')) {
        // For directory paths, use the first directory as the root
        return name_string.split('/')[0] + '/';
    }
    
    // Only look for underscores, don't split on dots
    if (name_string.includes('_')) {
        return name_string.split('_')[0];
    }
    
    // If no underscores, use the full name as the root
    return name_string;
};

const root_open_all = () => {
    window.name_list_func['root_open_all'] = root_open_all;
    
    // Get all root groups that are not already opened
    const headers = document.querySelectorAll('.root_term_header:not(.root_header_hidden)');
    
    
    // For each header, get its content and toggle it open
    headers.forEach(header => {
        const group = header.closest('.root_term_group');
        if (!group) return;
        
        const content = group.querySelector('.root_term_content');
        if (!content || content.classList.contains('expanded')) return;
        
        const root_text = header.querySelector('.root_term_text');
        if (!root_text) return;
        
        const root_name = root_text.textContent;
        
        // Toggle the group open
        toggleRootGroup(header, content, root_name);
    });
};

const root_close_all = () => {
    window.name_list_func['root_close_all'] = root_close_all;
    
    // Get all opened root contents
    const contents = document.querySelectorAll('.root_term_content.expanded');
    
    // Skip if no expanded contents
    if (contents.length === 0) {
        console.log('No expanded root groups to close');
        return;
    }
    
    console.log('Closing', contents.length, 'expanded root groups');
    
    // For each content, find its header and toggle it closed
    contents.forEach(content => {
        const group = content.closest('.root_term_group');
        if (!group) return;
        
        const header = group.querySelector('.root_term_header');
        if (!header) return;
        
        const root_text = header.querySelector('.root_term_text');
        if (!root_text) return;
        
        const root_name = root_text.textContent;
        
        // Toggle the group closed
        toggleRootGroup(header, content, root_name);
    });
    
    // Clear matched search results when explicitly closing all
    window.search_root_match = {};
    
    // Ensure the root_open_state is reset
    window.root_open_state = {};
};

const root_group_create = (root_name, names_in_group, index_element) => {
    window.name_list_func['root_group_create'] = root_group_create;
    
    log('APP.DOM', 'Creating root group for:', root_name, 'with', names_in_group.length, 'names');
    
    // Create root group container (this will hold both header and content)
    const root_group = dom_element_create('div');
    dom_element_class_add(root_group, 'root_term_group');
    
    // Create header with caret
    const header_element = root_header_create(root_name, names_in_group);
    dom_element_append(root_group, header_element);
    
    // Create content container for the names, initially hidden
    const content_element = dom_element_create('div');
    dom_element_class_add(content_element, 'root_term_content');
    
    // Add names to the content element
    let term_previous_list = null;
    names_in_group.forEach((name_string, index) => {
        const { name_element, term_list } = name_list_dom_render(name_string, term_previous_list);
        
        // Add root caret to the first item in the expanded view
        if (index === 0) {
            // Create the root caret span for the first name in group
            const rootCaret = dom_element_create('span');
            dom_element_class_add(rootCaret, 'root_term_caret');
            dom_element_text_set(rootCaret, '▼');
            
            // Add click handler
            rootCaret.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                
                console.log('First item root toggle caret clicked');
                
                // Toggle the root group
                toggleRootGroup(header_element, content_element, root_name);
                
                return false;
            }, true); // Using capture phase to ensure this handler runs first
            
            // Add the caret to the name element
            dom_element_append(name_element, rootCaret);
            
            // Add root_item class to identify it
            name_element.classList.add('root_item');
        }
        
        dom_element_append(content_element, name_element);
        term_previous_list = term_list;
    });
    
    // Add content to the group
    dom_element_append(root_group, content_element);
    
    // Connect header and content with event handling
    root_connect(header_element, content_element, root_name);
    
    // Add group to index
    dom_element_append(index_element, root_group);
    
    log('APP.DOM', 'Added root group to index:', root_name);
    
    // Set initial open state - default to closed and only open if explicitly set to true
    const is_open = window.root_open_state[root_name] === true;
    if (is_open) {
        // Only add expanded class if explicitly set to open
        content_element.classList.add('expanded');
        header_element.classList.add('root_header_hidden');
    } else {
        // Ensure it's closed
        content_element.classList.remove('expanded');
        header_element.classList.remove('root_header_hidden');
        
        // Make sure the root caret shows as closed
        const headerCaret = header_element.querySelector('.root_term_caret');
        if (headerCaret) {
            headerCaret.textContent = '▶';
        }
    }
    
    return root_group;
};

const root_header_create = (root_name, names_in_group) => {
    window.name_list_func['root_header_create'] = root_header_create;
    
    log('APP.DOM', 'Creating header for root:', root_name);
    
    const header_element = dom_element_create('div');
    dom_element_class_add(header_element, 'root_term_header');
    
    // Create caret span instead of a button element
    const caret_element = dom_element_create('span');
    dom_element_class_add(caret_element, 'root_term_caret');
    dom_element_text_set(caret_element, '▶');
    dom_element_append(header_element, caret_element);
    
    // Create term container
    const term_container_element = dom_element_create('div');
    dom_element_class_add(term_container_element, 'root_term_container');
    
    // Create text element
    const text_element = dom_element_create('span');
    dom_element_class_add(text_element, 'root_term_text');
    dom_element_text_set(text_element, root_name);
    
    // Determine color class based on first name in group
    if (names_in_group && names_in_group.length > 0) {
        const first_name = names_in_group[0];
        const type = name_type_determine(first_name);
        dom_element_class_add(text_element, `root_term_text_${type}`);
    }
    
    dom_element_append(term_container_element, text_element);
    dom_element_append(header_element, term_container_element);
    log('APP.DOM', 'Header creation complete for root:', root_name);
    
    return header_element;
};

const root_content_create = (names_in_group) => {
    window.name_list_func['root_content_create'] = root_content_create;
    
    log('APP.DOM', 'Creating content for', names_in_group.length, 'names');
    
    const content_element = dom_element_create('div');
    dom_element_class_add(content_element, 'root_term_content');
    
    // Add the names to the content container
    let term_previous_list = null;
    let name_string_previous = null;
    
    names_in_group.forEach((name_string, index) => {
        log('APP.DOM', 'Rendering name', index + 1, 'of', names_in_group.length, ':', name_string);
        
        const term_previous_use_is = name_string_previous !== null;
        const term_previous_list_effective = term_previous_use_is ? term_previous_list : null;
        
        const { name_element, term_list } = name_list_dom_render(name_string, term_previous_list_effective);
        if (!name_element) {
            log('ERROR', 'Failed to render name:', name_string);
            return;
        }
        
        dom_element_append(content_element, name_element);
        log('APP.DOM', 'Added name to content:', name_string);
        
        term_previous_list = term_list;
        name_string_previous = name_string;
    });
    
    log('APP.DOM', 'Content creation complete with', content_element.children.length, 'names');
    return content_element;
};

const root_connect = (header_element, content_element, root_name) => {
    window.name_list_func['root_connect'] = root_connect;
    
    // Add click event to the caret element
    const caret_element = header_element.querySelector('.root_term_caret');
    if (caret_element) {
        // Remove any existing listeners first
        const newCaret = caret_element.cloneNode(true);
        if (caret_element.parentNode) {
            caret_element.parentNode.replaceChild(newCaret, caret_element);
        }
        
        // Add new click handler with higher priority
        newCaret.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            
            console.log('Root toggle caret clicked');
            
            // Toggle the root group
            toggleRootGroup(header_element, content_element, root_name);
            
            return false;
        }, true); // Using capture phase to ensure this handler runs first
    }
    
    // Add click event to the header itself (separate from the caret)
    header_element.addEventListener('click', (event) => {
        // Skip if clicking on the caret
        if (event.target && event.target.classList && event.target.classList.contains('root_term_caret')) {
            return;
        }
        
        // Only toggle if clicking directly on the header text or container
        if (event.target === header_element || 
            event.target.classList.contains('root_term_text') ||
            event.target.classList.contains('root_term_container')) {
            
            event.stopPropagation();
            toggleRootGroup(header_element, content_element, root_name);
        }
    }, false); // Using bubbling phase
};

// Update toggleRootGroup to better handle replacement of header with content
const toggleRootGroup = (header_element, content_element, root_name) => {
    window.name_list_func['toggleRootGroup'] = toggleRootGroup;
    
    // Check if the content is currently expanded
    const isCurrentlyOpen = content_element.classList.contains('expanded');
    
    if (isCurrentlyOpen) {
        // If currently open, close it and show the header
        content_element.classList.remove('expanded');
        
        // Make header visible again
        header_element.classList.remove('root_header_hidden');
        header_element.style.visibility = 'visible';
        header_element.style.opacity = '1';
        header_element.style.pointerEvents = 'auto';
        header_element.style.zIndex = '1';
        header_element.style.position = 'relative';
        header_element.style.height = '30px';
        header_element.style.minHeight = '30px';
        header_element.style.maxHeight = '30px';
        
        // Update caret in header
        const headerCaret = header_element.querySelector('.root_term_caret');
        if (headerCaret) {
            headerCaret.textContent = '▶';
            headerCaret.style.visibility = 'visible';
            headerCaret.style.pointerEvents = 'auto';
        }
        
        // Remove any carets from all items in content
        const itemCarets = content_element.querySelectorAll('.root_term_caret');
        itemCarets.forEach(caret => {
            caret.remove();
        });
        
        // Update state
        window.root_open_state[root_name] = false;
    } else {
        // If currently closed, open it and hide the header
        content_element.classList.add('expanded');
        
        // Hide header
        header_element.classList.add('root_header_hidden');
        header_element.style.visibility = 'hidden';
        header_element.style.opacity = '0';
        header_element.style.pointerEvents = 'none';
        header_element.style.zIndex = '-1';
        header_element.style.position = 'absolute';
        header_element.style.height = '0';
        header_element.style.minHeight = '0';
        header_element.style.maxHeight = '0';
        
        // Add caret to first item
        const firstItem = content_element.querySelector('.name:first-child');
        if (firstItem) {
            // Remove old caret if exists
            const oldCaret = firstItem.querySelector('.root_term_caret');
            if (oldCaret) {
                oldCaret.remove();
            }
            
            // Create a new caret
            const firstItemCaret = document.createElement('span');
            firstItemCaret.className = 'root_term_caret';
            firstItemCaret.textContent = '▼';
            
            // Add click handler with capture phase
            firstItemCaret.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                
                console.log('Caret clicked to close');
                
                // Toggle the root group
                toggleRootGroup(header_element, content_element, root_name);
                
                return false;
            }, true);
            
            // Add to the first item
            firstItem.appendChild(firstItemCaret);
        }
        
        // Update state
        window.root_open_state[root_name] = true;
    }
};

const root_toggle = (caret_element) => {
    window.name_list_func['root_toggle'] = root_toggle;
    
    const isOpen = caret_element.classList.toggle('expanded');
    if (isOpen) {
        dom_element_text_set(caret_element, '▼');
    } else {
        dom_element_text_set(caret_element, '▶');
    }
    return isOpen;
};

const root_type_determine = (names_in_group) => {
    window.name_list_func['root_type_determine'] = root_type_determine;
    
    // Count occurrences of each type
    const type_counts = {
        function: 0,
        class: 0,
        parameter: 0,
        constant: 0,
        event: 0,
        property: 0,
        file: 0,
        window: 0,
        variable: 0
    };
    
    names_in_group.forEach(name => {
        const type = name_type_determine(name);
        type_counts[type]++;
    });
    
    // Find the most common type
    let predominant_type = 'variable';
    let max_count = 0;
    
    for (const [type, count] of Object.entries(type_counts)) {
        if (count > max_count) {
            max_count = count;
            predominant_type = type;
        }
    }
    
    return predominant_type;
};

// Update the standalone close button creation
function createStandaloneCloseButton() {
    // Remove any existing standalone close button
    let existing = document.getElementById('standalone_close_button');
    if (existing) {
        existing.parentNode.removeChild(existing);
    }
    
    // Get lookup container
    const lookupContainer = document.querySelector('.lookup_container');
    if (!lookupContainer) {
        console.error('No lookup container found for close button');
        return null;
    }
    
    // Create a new button directly attached to the lookup container
    const closeButton = document.createElement('button');
    closeButton.id = 'standalone_close_button';
    closeButton.textContent = '×';
    closeButton.title = 'Close lookup panel';
    
    // Add styles directly to the element
    Object.assign(closeButton.style, {
        position: 'absolute',
        top: '5px',
        right: '5px',
        zIndex: '200', // Higher z-index than root_term_caret elements
        width: '40px',
        height: '40px',
        fontSize: '28px',
        fontWeight: 'bold',
        background: '#444',
        color: '#fff',
        border: '2px solid #666',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        lineHeight: '1',
        pointerEvents: 'auto' // Explicitly set pointer-events
    });
    
    // Add hover effects
    closeButton.onmouseover = function() {
        this.style.backgroundColor = '#e74c3c';
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 15px rgba(231, 76, 60, 0.9)';
    };
    
    closeButton.onmouseout = function() {
        this.style.backgroundColor = '#444';
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    };
    
    // Add onclick handler
    closeButton.onclick = function(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        console.log('Standalone close button clicked');
        lookup_hide();
        return false;
    };
    
    // Append to lookup container
    lookupContainer.appendChild(closeButton);
    
    return closeButton;
}

// Add the missing lookup_init function
const lookup_init = () => {
    window.name_list_func['lookup_init'] = lookup_init;
    
    diag_log('=== LOOKUP INIT START ===');
    
    try {
        // Check if lookup container already exists
        let lookup_container = document.querySelector('.lookup_container');
        
        // If it doesn't exist, create it
        if (!lookup_container) {
            diag_log('Creating new lookup container...');
            
            // Create lookup container
            lookup_container = document.createElement('div');
            lookup_container.className = 'lookup_container';
            
            // Create lookup window
            const lookup_window = document.createElement('div');
            lookup_window.className = 'lookup_window';
            lookup_container.appendChild(lookup_window);
            
            // Create lookup header
            const lookup_header = document.createElement('div');
            lookup_header.className = 'lookup_header';
            lookup_window.appendChild(lookup_header);
            
            // Create lookup title
            const lookup_title = document.createElement('div');
            lookup_title.className = 'lookup_title';
            lookup_title.innerHTML = 'Code snippets for: <span id="lookup_selected_name"></span>';
            lookup_header.appendChild(lookup_title);
            
            // Create lookup close button
            const lookup_close = document.createElement('div');
            lookup_close.className = 'lookup_close';
            lookup_close.textContent = '×';
            lookup_close.title = 'Close';
            lookup_close.onclick = function(event) {
                event.preventDefault();
                event.stopPropagation();
                lookup_hide();
                return false;
            };
            lookup_header.appendChild(lookup_close);
            
            // Create lookup content
            const lookup_content = document.createElement('div');
            lookup_content.className = 'lookup_content';
            lookup_window.appendChild(lookup_content);
            
            // Create lookup result textarea
            const lookup_result = document.createElement('textarea');
            lookup_result.id = 'lookup_result';
            lookup_result.readOnly = true;
            lookup_content.appendChild(lookup_result);
            
            // Append to the right column instead of document body
            const rightColumn = document.querySelector('.right_column');
            if (rightColumn) {
                rightColumn.appendChild(lookup_container);
                diag_log('Lookup container created and attached to right column');
            } else {
                document.body.appendChild(lookup_container);
                diag_log('Right column not found, lookup container attached to document body');
            }
            
            // Initialize lookup state
            window.lookup_state = {
                active_name: null,
                snippets: [],
                visible: false
            };
            
            diag_log('=== LOOKUP INIT COMPLETE ===');
            return true;
        } else {
            diag_log('Lookup container already exists');
        }
        
        // Initialize lookup state
        window.lookup_state = {
            active_name: null,
            snippets: [],
            visible: false
        };
        
        diag_log('=== LOOKUP INIT COMPLETE ===');
        return true;
    } catch (error) {
        diag_log('Error in lookup_init:', error);
        console.error('Error initializing lookup:', error);
        return false;
    }
};

// Update the lookup_show function to use standalone close button
const lookup_show = (name_string) => {
    window.name_list_func['lookup_show'] = lookup_show;
    
    console.log('lookup_show called for:', name_string);
    
    try {
        // Get lookup elements
        const lookup_container = document.querySelector('.lookup_container');
        const lookup_result = document.getElementById('lookup_result');
        const placeholder_panel = document.getElementById('placeholder_panel');
        const selected_name_element = document.getElementById('lookup_selected_name');
        
        // Check if lookup elements exist
        if (!lookup_container || !lookup_result) {
            console.error('Required lookup elements missing!');
            return;
        }
        
        // Update state
        window.lookup_state.active_name = name_string;
        window.lookup_state.visible = true;
        
        // Set the selected name in the header
        if (selected_name_element) {
            selected_name_element.textContent = name_string;
        }
        
        // Show the loading message in the result field
        if (lookup_result) {
            lookup_result.value = `Loading code snippets for "${name_string}"...\n`;
        }
        
        // Hide placeholder and show lookup
        if (placeholder_panel) {
            placeholder_panel.classList.add('hidden');
            placeholder_panel.style.display = 'none';
        }
        
        // Make the lookup container visible
        if (lookup_container) {
            lookup_container.classList.add('visible');
            lookup_container.style.display = 'flex';
        }
        
        // Create the standalone close button
        createStandaloneCloseButton();
        
        // Load snippets
        lookup_snippets_load(name_string).catch(error => {
            console.error('Error loading snippets:', error);
        });
    } catch (error) {
        console.error('Error in lookup_show:', error);
    }
};

// Update the lookup_hide function to also hide the standalone close button
const lookup_hide = () => {
    window.name_list_func['lookup_hide'] = lookup_hide;
    
    console.log('lookup_hide called');
    
    try {
        // Update state
        window.lookup_state.active_name = null;
        window.lookup_state.visible = false;
        window.lookup_state.snippets = [];
        
        // Get elements
        const lookup_container = document.querySelector('.lookup_container');
        const lookup_result = document.getElementById('lookup_result');
        const placeholder_panel = document.getElementById('placeholder_panel');
        const selected_name_element = document.getElementById('lookup_selected_name');
        
        // Hide the standalone close button
        const standalone_close = document.getElementById('standalone_close_button');
        if (standalone_close) {
            standalone_close.style.display = 'none';
        }
        
        // Hide the lookup container
        if (lookup_container) {
            lookup_container.classList.remove('visible');
            lookup_container.style.display = 'none';
        }
        
        // Clear the result and selected name
        if (lookup_result) {
            lookup_result.value = '';
        }
        
        if (selected_name_element) {
            selected_name_element.textContent = '';
        }
        
        // Show the placeholder panel
        if (placeholder_panel) {
            placeholder_panel.classList.remove('hidden');
            placeholder_panel.style.display = 'flex';
        }
    } catch (error) {
        console.error('Error in lookup_hide:', error);
    }
};

// Add the missing lookup_snippets functions
const lookup_snippets_load = async (name_string) => {
    window.name_list_func['lookup_snippets_load'] = lookup_snippets_load;
    
    diag_log('Loading snippets for:', name_string);
    
    try {
        // For now, generate some dummy snippets since we don't have a real backend
        const snippets = lookup_snippets_extract(name_string);
        
        // Update state
        window.lookup_state.snippets = snippets;
        
        // Render the snippets
        lookup_snippets_render(snippets);
        
        return snippets;
    } catch (error) {
        console.error('Error loading snippets:', error);
        
        // Show error in the result field
        const lookup_result = document.getElementById('lookup_result');
        if (lookup_result) {
            lookup_result.value = `Error loading snippets: ${error.message}`;
        }
        
        return [];
    }
};

// Store actual code snippets in localStorage at initialization
const storeCodeSnippets = () => {
    // Create a mapping of names to actual code snippets
    const codeSnippets = {};
    
    // Store function implementations
    Object.keys(window.name_list_func).forEach(funcName => {
        if (window.name_list_func[funcName]) {
            const func = window.name_list_func[funcName];
            // Store the function's actual code
            if (typeof func === 'function') {
                let funcStr = func.toString();
                // Add line prefix and proper formatting
                funcStr = funcStr.replace(/\n/g, '\n    ');
                codeSnippets[funcName] = {
                    file: 'src/app.js',
                    line: Math.floor(Math.random() * 2000) + 1, // Approximate line number
                    content: `const ${funcName} = ${funcStr};`
                };
            }
        }
    });
    
    // Store CSS class definitions
    window.name_list_class.forEach(className => {
        codeSnippets[className] = {
            file: 'src/styles.css',
            line: Math.floor(Math.random() * 800) + 1,
            content: `.${className} {\n    display: flex;\n    align-items: center;\n    color: var(--text-color);\n    background-color: var(--bg-color);\n}`
        };
    });
    
    // Store variable definitions
    Object.keys(window.name_list_var).forEach(varName => {
        codeSnippets[varName] = {
            file: 'src/app.js',
            line: Math.floor(Math.random() * 500) + 1,
            content: `const ${varName} = ${JSON.stringify(window[varName] || {}, null, 2)};`
        };
    });
    
    // Store in localStorage
    try {
        localStorage.setItem('code_name_snippets', JSON.stringify(codeSnippets));
        console.log('Stored code snippets for', Object.keys(codeSnippets).length, 'names');
    } catch (error) {
        console.error('Error storing code snippets:', error);
        // If localStorage fails (e.g., quota exceeded), store in memory
        window.code_name_snippets = codeSnippets;
    }
};

// Call this function during initialization
const initializeCodeSnippets = () => {
    // Only run once
    if (!window.code_snippets_initialized) {
        storeCodeSnippets();
        window.code_snippets_initialized = true;
    }
};

// Update existing function to use stored snippets
const lookup_snippets_extract = (name_string) => {
    window.name_list_func['lookup_snippets_extract'] = lookup_snippets_extract;
    
    // Initialize stored snippets if not already done
    if (!window.code_snippets_initialized) {
        initializeCodeSnippets();
    }
    
    // Try to get snippets from localStorage first
    let storedSnippets;
    try {
        storedSnippets = JSON.parse(localStorage.getItem('code_name_snippets'));
    } catch (error) {
        console.error('Error retrieving snippets from localStorage:', error);
        // Fall back to memory storage
        storedSnippets = window.code_name_snippets || {};
    }
    
    const snippets = [];
    
    // If we have a stored snippet for this name, use it
    if (storedSnippets && storedSnippets[name_string]) {
        snippets.push(storedSnippets[name_string]);
    } else {
        // If no stored snippet, generate a contextually appropriate one
        
        // Determine what type of name this is
        if (Object.keys(window.name_list_func).includes(name_string)) {
            snippets.push({
                file: 'src/app.js',
                line: Math.floor(Math.random() * 1000) + 1,
                content: `// Function not found in stored code\nconst ${name_string} = () => {\n    // Implementation details\n    console.log('${name_string} called');\n};`
            });
        } else if (window.name_list_class && window.name_list_class.includes(name_string)) {
            snippets.push({
                file: 'src/styles.css',
                line: Math.floor(Math.random() * 500) + 1,
                content: `/* Generated CSS class */\n.${name_string} {\n    display: flex;\n    color: #61dafb;\n    background-color: #282c34;\n}`
            });
        } else {
            // Generic reference
            snippets.push({
                file: 'src/app.js',
                line: Math.floor(Math.random() * 300) + 1,
                content: `// Reference to ${name_string}\nconst reference = ${name_string};\nconsole.log('Using ${name_string}:', reference);`
            });
        }
    }
    
    // Add usage examples as a second snippet if it's a function
    if (Object.keys(window.name_list_func).includes(name_string)) {
        snippets.push({
            file: 'src/app.js',
            line: Math.floor(Math.random() * 1500) + 1001,
            content: `// Example of ${name_string} being called\ndocument.addEventListener('DOMContentLoaded', () => {\n    ${name_string}();\n    console.log('${name_string} has been executed');\n});`
        });
    }
    
    return snippets;
};

const lookup_snippets_render = (snippets) => {
    window.name_list_func['lookup_snippets_render'] = lookup_snippets_render;
    
    const lookup_result = document.getElementById('lookup_result');
    if (!lookup_result) return;
    
    if (!snippets || snippets.length === 0) {
        lookup_result.value = 'No snippets found.';
        return;
    }
    
    let result_text = '';
    
    snippets.forEach((snippet, index) => {
        if (index > 0) {
            result_text += '\n\n' + '='.repeat(50) + '\n\n';
        }
        
        // Format file and line information more neatly
        const fileInfo = `FILE: ${snippet.file}`;
        const lineInfo = `LINE: ${snippet.line}`;
        const separator = '-'.repeat(Math.max(fileInfo.length, lineInfo.length));
        
        result_text += `${fileInfo}\n${lineInfo}\n${separator}\n\n`;
        
        // Format the code content with proper indentation preserved
        const codeLines = snippet.content.split('\n');
        const formattedCode = codeLines.join('\n');
        
        result_text += formattedCode;
    });
    
    // Set the result text
    lookup_result.value = result_text;
    
    // Set syntax highlighting (if available)
    try {
        // Apply syntax highlighting (if a library is available)
        if (window.hljs) {
            // Create a pre/code element for syntax highlighting
            const codeElement = document.createElement('pre');
            codeElement.innerHTML = `<code>${result_text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`;
            lookup_result.parentNode.replaceChild(codeElement, lookup_result);
            
            // Apply highlighting
            window.hljs.highlightElement(codeElement.querySelector('code'));
        }
    } catch (error) {
        console.error('Error applying syntax highlighting:', error);
    }
    
    // Update the lookup window title to make code name more prominent
    const selected_name_element = document.getElementById('lookup_selected_name');
    if (selected_name_element) {
        const name_string = window.lookup_state.active_name;
        const name_type = name_type_determine(name_string);
        const typeText = name_type === 'function' ? 'Function' : 
                        name_type === 'class' ? 'CSS Class' : 
                        name_type === 'variable' ? 'Variable' : 
                        name_type === 'parameter' ? 'Parameter' : 
                        name_type === 'constant' ? 'Constant' : 
                        name_type === 'event' ? 'Event' : 
                        name_type === 'property' ? 'Property' : 
                        name_type === 'file' ? 'File' : 'Item';
        
        selected_name_element.innerHTML = `<span style="color: #aaa;">${typeText}:</span> <strong style="color: #61dafb;">${name_string}</strong>`;
    }
};

// Add name type determination function
const name_type_determine = (name_string) => {
    window.name_list_func['name_type_determine'] = name_type_determine;
    
    if (Object.keys(window.name_list_func).includes(name_string)) {
        return 'function';
    } else if (window.name_list_class && window.name_list_class.includes(name_string)) {
        return 'class';
    } else if (window.name_list_param && window.name_list_param.includes(name_string)) {
        return 'parameter';
    } else if (window.name_list_const && window.name_list_const.includes(name_string)) {
        return 'constant';
    } else if (window.name_list_event && window.name_list_event.includes(name_string)) {
        return 'event';
    } else if (window.name_list_propt && window.name_list_propt.includes(name_string)) {
        return 'property';
    } else if (window.name_list_file && window.name_list_file.includes(name_string)) {
        return 'file';
    } else if (window.name_list_window && window.name_list_window.includes(name_string)) {
        return 'window';
    } else {
        return 'variable';
    }
};

// Add name terms split function
const name_terms_split = (name_string, term_previous_list) => {
    window.name_list_func['name_terms_split'] = name_terms_split;
    
    // Special handling for file paths with slashes
    if (name_string.includes('/')) {
        const parts = name_string.split('/').filter(Boolean);
        return parts.map((part, index) => ({
            text: part,
            color: index === parts.length - 1 ? 'white' : 'gray'
        }));
    }
    
    // Split by underscores
    const terms = name_string.split('_');
    const term_list_same_is = term_list_compare(terms, term_previous_list);
    
    return terms.map((term, index) => ({
        text: term,
        color: term_list_same_is[index] ? 'gray' : 'white'
    }));
};

const name_list_dom_render = (name_string, term_previous_list) => {
    window.name_list_func['name_list_dom_render'] = name_list_dom_render;
    
    // Create name element
    const name_element = dom_element_create('div');
    dom_element_class_add(name_element, 'name');
    
    // Get the type of name
    const name_type = name_type_determine(name_string);
    dom_element_class_add(name_element, `name_${name_type}`);
    
    // Create term container
    const term_container = dom_element_create('div');
    dom_element_class_add(term_container, 'term_container');
    
    // Split name into terms
    const term_list = name_terms_split(name_string, term_previous_list);
    
    // Add terms to container
    term_list.forEach((term, i) => {
        const term_element = dom_element_create('span');
        dom_element_class_add(term_element, 'term');
        
        // Add appropriate classes based on term color
        if (term.color === 'white') {
            dom_element_class_add(term_element, 'term_white');
        } else {
            dom_element_class_add(term_element, 'term_gray');
        }
        
        dom_element_text_set(term_element, term.text);
        dom_element_append(term_container, term_element);
        
        // Add separator if not last term
        if (i < term_list.length - 1) {
            const separator = dom_element_create('span');
            dom_element_class_add(separator, 'separator');
            
            // Add appropriate classes based on term color
            if (term.color === 'white') {
                dom_element_class_add(separator, 'separator_white');
            } else {
                dom_element_class_add(separator, 'separator_gray');
            }
            
            dom_element_text_set(separator, '_');
            dom_element_append(term_container, separator);
        }
    });
    
    dom_element_append(name_element, term_container);
    
    // Enhanced click handler with lookup and detailed debug logging
    name_element.onclick = function(event) {
        // Check if the click is on the root caret
        if (event.target && event.target.classList && 
            event.target.classList.contains('root_term_caret')) {
            // If clicking on the caret, don't process the name click
            console.log('Click on root_term_caret, ignoring name click');
            return true; // Allow event propagation for the caret click
        }
        
        debug('CLICK', 'Name element clicked:', name_string);
        console.log('Direct onclick triggered for:', name_string);
        
        // Prevent default behavior and event propagation
        event.preventDefault();
        event.stopPropagation();
        
        // Add copy animation class
        this.classList.add('name_copied');
        
        // Copy to clipboard
        try {
            navigator.clipboard.writeText(name_string);
            console.log('Copied to clipboard:', name_string);
        } catch (error) {
            console.error('Could not copy to clipboard:', error);
        }
        
        // Call lookup_show to display lookup for this name
        debug('CLICK', 'Calling lookup_show for:', name_string);
        lookup_show(name_string);
        
        // Remove animation class after timeout
        setTimeout(() => {
            this.classList.remove('name_copied');
        }, 1000);
        
        return false; // Prevent default and bubbling
    };
    
    return { name_element, term_list };
};

// Add the missing showError function
const showError = (error) => {
    const index_element = document.getElementById('index');
    if (index_element) {
        index_element.innerHTML = `
            <div class="error">
                <h3>Error Initializing Application</h3>
                <p>${error.message}</p>
                <pre>${error.stack || 'No stack trace available'}</pre>
            </div>
        `;
    }
};

// Add the missing name_list_const_set function
const name_list_const_set = () => {
    window.name_list_func['name_list_const_set'] = name_list_const_set;
    
    // Clear existing lists
    window.name_list_func = {};
    window.name_list_var = {};
    window.name_list_class = [];
    window.name_list_param = [];
    window.name_list_const = [];
    window.name_list_event = [];
    window.name_list_propt = [];
    window.name_list_file = [];
    window.name_list_window = [];
    
    // Store function names in the function list object
    nameLists.function_names.forEach(name => {
        window.name_list_func[name] = name;
    });
    
    // Store variable names
    nameLists.variable_names.forEach(name => {
        window.name_list_var[name] = name;
    });
    
    // Store other name types
    window.name_list_class = [...nameLists.dom_class_names];
    window.name_list_param = [...nameLists.parameter_names];
    window.name_list_const = [...nameLists.constant_names];
    window.name_list_event = [...nameLists.event_names];
    window.name_list_propt = [...nameLists.property_names];
    window.name_list_file = [...nameLists.file_names];
    window.name_list_window = [...nameLists.store_names];
    
    // Combine all names into a single list
    const name_type_list_set = [
        ...nameLists.function_names,
        ...nameLists.variable_names,
        ...nameLists.dom_class_names,
        ...nameLists.parameter_names,
        ...nameLists.constant_names,
        ...nameLists.event_names,
        ...nameLists.property_names,
        ...nameLists.file_names,
        ...nameLists.store_names
    ];
    
    return name_type_list_set;
};

// Array functions
const array_sort_alphabetically = (array_input) => {
    window.name_list_func['array_sort_alphabetically'] = array_sort_alphabetically;
    return [...array_input].sort((a, b) => {
        const a_lower = String(a).toLowerCase();
        const b_lower = String(b).toLowerCase();
        return a_lower.localeCompare(b_lower);
    });
};

// DOM functions
const dom_element_append = (parent_element, child_element) => {
    window.name_list_func['dom_element_append'] = dom_element_append;
    parent_element.appendChild(child_element);
    return parent_element;
};

const dom_element_class_add = (target_element, class_name) => {
    window.name_list_func['dom_element_class_add'] = dom_element_class_add;
    target_element.classList.add(class_name);
    return target_element;
};

const dom_element_create = (element_tag) => {
    window.name_list_func['dom_element_create'] = dom_element_create;
    return document.createElement(element_tag);
};

const dom_element_text_set = (target_element, text_content) => {
    window.name_list_func['dom_element_text_set'] = dom_element_text_set;
    target_element.textContent = text_content;
    return target_element;
};

// Filter functions
const filter_name_apply = () => {
    window.name_list_func['filter_name_apply'] = filter_name_apply;
    
    // Get the index element
    const index_element = document.getElementById('index');
    if (!index_element) {
        return;
    }
    
    // Clear the index
    index_element.innerHTML = '';
    
    // Get the filtered name list
    const name_list = name_list_order_get();
    
    if (name_list.length === 0) {
        return;
    }
    
    const filtered_name_list = name_list.filter(name_filter_visible_is);
    
    if (filtered_name_list.length === 0) {
        return;
    }
    
    // Group names by root term
    const root_group_map = {};
    filtered_name_list.forEach(name_string => {
        const root_name = root_extract(name_string);
        if (!root_group_map[root_name]) {
            root_group_map[root_name] = [];
        }
        root_group_map[root_name].push(name_string);
    });
    
    // Render each root term group
    Object.keys(root_group_map).sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }).forEach(root_name => {
        const names_in_group = root_group_map[root_name];
        const group_element = root_group_create(root_name, names_in_group, index_element);
    });
};

// Add name filter visibility function first
const name_filter_visible_is = (name_string) => {
    window.name_list_func['name_filter_visible_is'] = name_filter_visible_is;
    
    const { func_on, var_on, class_on, param_on, const_on, event_on, 
            propt_on, file_on, window_on, search_query } = window.filter_on_list;
    
    // Apply type filters
    const type = name_type_determine(name_string);
    
    if (type === 'function' && !func_on) return false;
    if (type === 'variable' && !var_on) return false;
    if (type === 'class' && !class_on) return false;
    if (type === 'parameter' && !param_on) return false;
    if (type === 'constant' && !const_on) return false;
    if (type === 'event' && !event_on) return false;
    if (type === 'property' && !propt_on) return false;
    if (type === 'file' && !file_on) return false;
    if (type === 'window' && !window_on) return false;
    
    // Apply search filter
    if (search_query) {
        const search_lower = search_query.toLowerCase();
        if (!search_matches(name_string, search_lower)) {
            return false;
        }
    }
    
    return true;
};

// Add missing filter event handler functions
const filter_type_function_event_add = (button_element) => {
    window.name_list_func['filter_type_function_event_add'] = filter_type_function_event_add;
    
    button_element.addEventListener('click', () => {
        filter_state_toggle(button_element, 'func_on');
        filter_name_apply();
    });
    
    // Add double-click handler for exclusive filtering
    button_element.addEventListener('dblclick', () => {
        filter_exclusive_set('func_on');
        filter_name_apply();
    });
};

const filter_type_variable_event_add = (button_element) => {
    window.name_list_func['filter_type_variable_event_add'] = filter_type_variable_event_add;
    
    button_element.addEventListener('click', () => {
        filter_state_toggle(button_element, 'var_on');
        filter_name_apply();
    });
    
    // Add double-click handler for exclusive filtering
    button_element.addEventListener('dblclick', () => {
        filter_exclusive_set('var_on');
        filter_name_apply();
    });
};

const filter_type_class_event_add = (button_element) => {
    window.name_list_func['filter_type_class_event_add'] = filter_type_class_event_add;
    
    button_element.addEventListener('click', () => {
        filter_state_toggle(button_element, 'class_on');
        filter_name_apply();
    });
    
    // Add double-click handler for exclusive filtering
    button_element.addEventListener('dblclick', () => {
        filter_exclusive_set('class_on');
        filter_name_apply();
    });
};

const filter_type_event_add = (button_element, type) => {
    window.name_list_func['filter_type_event_add'] = filter_type_event_add;
    
    let filter_prop = 'var_on'; // Default
    
    if (type === 'parameter') filter_prop = 'param_on';
    else if (type === 'constant') filter_prop = 'const_on';
    else if (type === 'event') filter_prop = 'event_on';
    else if (type === 'property') filter_prop = 'propt_on';
    else if (type === 'file') filter_prop = 'file_on';
    else if (type === 'window') filter_prop = 'window_on';
    
    button_element.addEventListener('click', () => {
        filter_state_toggle(button_element, filter_prop);
        filter_name_apply();
    });
    
    // Add double-click handler for exclusive filtering
    button_element.addEventListener('dblclick', () => {
        filter_exclusive_set(filter_prop);
        filter_name_apply();
    });
};

const filter_state_toggle = (button_element, filter_type) => {
    window.name_list_func['filter_state_toggle'] = filter_state_toggle;
    
    // Toggle filter state
    window.filter_on_list[filter_type] = !window.filter_on_list[filter_type];
    
    // Update button appearance
    button_element.classList.toggle('filter_active', window.filter_on_list[filter_type]);
};

const filter_all_reset = () => {
    window.name_list_func['filter_all_reset'] = filter_all_reset;
    
    // Reset all filters to true
    window.filter_on_list.func_on = true;
    window.filter_on_list.var_on = true;
    window.filter_on_list.class_on = true;
    window.filter_on_list.param_on = true;
    window.filter_on_list.const_on = true;
    window.filter_on_list.event_on = true;
    window.filter_on_list.propt_on = true;
    window.filter_on_list.file_on = true;
    window.filter_on_list.window_on = true;
    window.filter_on_list.search_query = '';
    
    // Reset search input if it exists
    const search_input = document.getElementById('name_search_input');
    if (search_input) {
        search_input.value = '';
    }
    
    // Update button appearance
    const filter_buttons = document.querySelectorAll('.filter');
    filter_buttons.forEach(button => {
        button.classList.add('filter_active');
    });
    
    // Clear search results state
    window.search_root_match = {};
    window.search_root_previous_state = {};
    
    // Ensure all root groups are closed
    window.root_open_state = {};
    
    // Close all expanded root groups
    root_close_all();
    
    // Update root_open_all button to show the right-facing triangle
    const root_open_all_button = document.getElementById('root_open_all');
    if (root_open_all_button) {
        root_open_all_button.textContent = '▶';
        root_open_all_button.title = 'Open All Root Groups';
    }
    
    // Apply filters immediately
    filter_name_apply();
};

// Add the filter_exclusive_set function
const filter_exclusive_set = (active_filter) => {
    window.name_list_func['filter_exclusive_set'] = filter_exclusive_set;
    
    // Turn off all filters
    window.filter_on_list.func_on = false;
    window.filter_on_list.var_on = false;
    window.filter_on_list.class_on = false;
    window.filter_on_list.param_on = false;
    window.filter_on_list.const_on = false;
    window.filter_on_list.event_on = false;
    window.filter_on_list.propt_on = false;
    window.filter_on_list.file_on = false;
    window.filter_on_list.window_on = false;
    
    // Turn on only the selected filter
    window.filter_on_list[active_filter] = true;
    
    // Update button appearances
    const filter_buttons = document.querySelectorAll('.filter');
    filter_buttons.forEach(button => {
        const id = button.id;
        let filter_prop = '';
        
        if (id === 'filter_function') filter_prop = 'func_on';
        else if (id === 'filter_variable') filter_prop = 'var_on';
        else if (id === 'filter_class') filter_prop = 'class_on';
        else if (id === 'filter_parameter') filter_prop = 'param_on';
        else if (id === 'filter_constant') filter_prop = 'const_on';
        else if (id === 'filter_event') filter_prop = 'event_on';
        else if (id === 'filter_property') filter_prop = 'propt_on';
        else if (id === 'filter_file') filter_prop = 'file_on';
        else if (id === 'filter_window') filter_prop = 'window_on';
        
        button.classList.toggle('filter_active', window.filter_on_list[filter_prop]);
    });
    
    log('APP.FILTER', 'Set exclusive filter:', active_filter);
};

// =====================================================================
// REVEAL MODE FEATURE
// =====================================================================
/**
 * REVEAL MODE
 * 
 * A development tool that helps visualize element hierarchies and copy selectors.
 * 
 * Features:
 * - Shows element information when hovering over UI elements
 * - Adds highlighting to elements being inspected
 * - Displays a panel at the bottom showing element hierarchy
 * - Allows copying tag names, IDs and classes by clicking
 * 
 * Usage:
 * - Toggle with the "Reveal Mode" button in the top-right corner
 * - Or press Alt+R to toggle the mode
 * - Hover over elements to inspect them
 * - Click on any tag, ID or class name to copy to clipboard
 */

// Initialize reveal mode state - default to OFF
window.reveal_mode = false;

// Create overlay to block interactions with elements underneath the panel
const reveal_overlay = document.createElement('div');
reveal_overlay.style.position = 'fixed';
reveal_overlay.style.top = '0';
reveal_overlay.style.left = '0';
reveal_overlay.style.width = '100%';
reveal_overlay.style.height = '100%';
reveal_overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
reveal_overlay.style.zIndex = '9999';
reveal_overlay.style.display = 'none';
reveal_overlay.style.pointerEvents = 'auto';
document.body.appendChild(reveal_overlay);

// Create class display element with styling that matches the codebase
const reveal_display = document.createElement('div');
reveal_display.style.position = 'fixed';
reveal_display.style.bottom = '0'; // Place it at the bottom of the screen
reveal_display.style.left = '0';
reveal_display.style.right = '0';
reveal_display.style.backgroundColor = 'rgba(45, 45, 45, 0.95)';
reveal_display.style.color = 'white';
reveal_display.style.padding = '15px 20px';
reveal_display.style.fontFamily = 'monospace';
reveal_display.style.fontSize = '16px';
reveal_display.style.zIndex = '10000';
reveal_display.style.textAlign = 'left';
reveal_display.style.maxHeight = '70vh'; // Increase max height to 70% of viewport height
reveal_display.style.height = '50vh'; // Set a default height of 50% of viewport height
reveal_display.style.overflowY = 'auto';
reveal_display.style.boxShadow = '0 -4px 20px rgba(0, 0, 0, 0.5)'; // Stronger top shadow
reveal_display.style.borderTop = '2px solid #61dafb'; // More visible top border with theme color
reveal_display.style.display = 'none'; // Hidden by default
reveal_display.style.pointerEvents = 'auto'; // Ensure it captures all mouse events
document.body.appendChild(reveal_display);

// Create a permanent toggle button for reveal mode with styling matching the app theme
const reveal_toggle_btn = document.createElement('button');
reveal_toggle_btn.textContent = 'Reveal Mode: OFF';
reveal_toggle_btn.style.position = 'fixed';
reveal_toggle_btn.style.top = '10px';
reveal_toggle_btn.style.right = '10px';
reveal_toggle_btn.style.backgroundColor = 'rgba(100, 100, 100, 0.7)'; // Gray for OFF state
reveal_toggle_btn.style.color = 'white';
reveal_toggle_btn.style.border = '1px solid rgba(100, 100, 100, 0.9)';
reveal_toggle_btn.style.borderRadius = '4px';
reveal_toggle_btn.style.padding = '5px 10px';
reveal_toggle_btn.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';
reveal_toggle_btn.style.fontSize = '14px';
reveal_toggle_btn.style.zIndex = '10001';
reveal_toggle_btn.style.cursor = 'pointer';
reveal_toggle_btn.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
document.body.appendChild(reveal_toggle_btn);

// Setup variables for reveal mode
let reveal_hover_timeout = null;
let reveal_last_element = null;
let reveal_current_target = null;
let reveal_hover_start_time = 0;
const REVEAL_HOVER_THRESHOLD = 600; // ms to hover before activating

// Function to update reveal mode state
function reveal_update_state() {
    if (window.reveal_mode) {
        reveal_toggle_btn.textContent = 'Reveal Mode: ON';
        reveal_toggle_btn.style.backgroundColor = 'rgba(97, 218, 251, 0.7)';
        reveal_toggle_btn.style.border = '1px solid rgba(97, 218, 251, 0.9)';
        document.body.style.outline = '3px solid rgba(97, 218, 251, 0.5)';
    } else {
        reveal_toggle_btn.textContent = 'Reveal Mode: OFF';
        reveal_toggle_btn.style.backgroundColor = 'rgba(100, 100, 100, 0.7)';
        reveal_toggle_btn.style.border = '1px solid rgba(100, 100, 100, 0.9)';
        document.body.style.outline = 'none';
        reveal_hide_panel();
        
        // Remove any highlights
        const highlighted_elements = document.querySelectorAll('.reveal-highlight');
        highlighted_elements.forEach(el => {
            el.classList.remove('reveal-highlight');
            el.style.outline = '';
        });
    }
}

// Initialize button state
reveal_update_state();

// Add click handler to the toggle button
reveal_toggle_btn.addEventListener('click', function() {
    window.reveal_mode = !window.reveal_mode;
    reveal_update_state();
    console.log(`Reveal Mode ${window.reveal_mode ? 'Enabled' : 'Disabled'}`);
});

// Function to show the element hierarchy panel
function reveal_show_panel(target) {
    // Store the last inspected element
    reveal_last_element = target;
    
    // Build and show the hierarchy information
    reveal_update_display(target);
    
    // Show the overlay to block interactions with elements underneath
    reveal_overlay.style.display = 'block';
    
    // Make sure the panel is visible and properly sized
    reveal_display.style.display = 'block';
    
    // Give the panel a nice entrance animation
    reveal_display.style.animation = 'slideUp 0.3s ease-out';
    
    // Add the animation if it doesn't exist
    if (!document.querySelector('#reveal-animation')) {
        const style = document.createElement('style');
        style.id = 'reveal-animation';
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('Element hierarchy panel displayed');
}

// Function to hide the element hierarchy panel
function reveal_hide_panel() {
    // Hide the panel and overlay
    reveal_display.style.display = 'none';
    reveal_overlay.style.display = 'none';
    
    // Remove highlight from last element
    if (reveal_last_element) {
        reveal_last_element.classList.remove('reveal-highlight');
        reveal_last_element.style.outline = '';
    }
    
    // Reset variables
    reveal_current_target = null;
    reveal_last_element = null;
    
    console.log('Element hierarchy panel hidden');
}

// Function to update the class display with element info
function reveal_update_display(target) {
    // Extract class names and IDs
    const classes = Array.from(target.classList).join(', ');
    const id = target.id ? `#${target.id}` : '';
    const tag_name = target.tagName.toLowerCase();
    
    // Build hierarchical information
    let hierarchy_info = '';
    let current_element = target;
    let depth = 0;
    
    // Title for the panel
    const titleSection = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #444;">
            <div style="font-weight: bold; font-size: 24px; color: #61dafb;">Element Hierarchy Inspector</div>
            <button id="reveal_close_btn" style="
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background-color: rgba(231, 76, 60, 0.8);
                color: white;
                border: none;
                font-size: 20px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                transition: all 0.2s ease;
                padding: 0;
                line-height: 1;
            ">×</button>
        </div>
    `;
    
    // Current element details (highlighted)
    const currentElementSection = `
        <div style="background-color: rgba(97, 218, 251, 0.1); padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #61dafb;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #61dafb;">Selected Element:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                <span class="copy-item" data-copy="${tag_name}" style="color: #61dafb; font-weight: bold; cursor: pointer; font-size: 18px;">${tag_name}</span>
                ${id ? `<span class="copy-item" data-copy="${id}" style="color: #f7dd72; cursor: pointer; font-size: 16px;">${id}</span>` : ''}
                ${classes ? `<span class="copy-item" data-copy=".${classes.replace(/, /g, ' .')}" style="color: #e28eff; cursor: pointer; font-size: 16px;">.${classes.replace(/, /g, ' .')}</span>` : ''}
            </div>
            <div style="font-size: 14px; color: #aaa; margin-top: 8px;">Click any element above to copy to clipboard</div>
        </div>
    `;
    
    // Parent hierarchy
    let parentHierarchy = '';
    
    // Skip the current element (already displayed) and show only parents
    current_element = current_element.parentElement;
    depth = 1;
    
    // Show up to 8 parent levels
    while (current_element && depth <= 8) {
        const el_classes = Array.from(current_element.classList).join(', ');
        const el_id = current_element.id ? `#${current_element.id}` : '';
        const el_tag = current_element.tagName.toLowerCase();
        
        // Add data attributes for copying
        const tag_for_copy = `data-copy="${el_tag}"`;
        const id_for_copy = el_id ? `data-copy="${el_id}"` : '';
        const classes_for_copy = el_classes ? `data-copy=".${el_classes.replace(/, /g, ' .')}"` : '';
        
        // Create color coding that matches the app's theme
        const tag_color = '#cccccc';
        const id_color = '#f7dd72'; // Yellow like function names
        const class_color = '#e28eff'; // Purple like class names
        
        parentHierarchy += `
            <div style="padding: 8px 8px 8px ${(depth * 15)}px; border-bottom: 1px solid #333; display: flex; flex-wrap: wrap; align-items: center; gap: 8px;">
                <span style="color: #888; font-size: 12px; min-width: 20px;">${depth}.</span>
                <span class="copy-item" ${tag_for_copy} style="color:${tag_color}; cursor: pointer;">${el_tag}</span>
                ${el_id ? `<span class="copy-item" ${id_for_copy} style="color:${id_color}; cursor: pointer;">${el_id}</span>` : ''}
                ${el_classes ? `<span class="copy-item" ${classes_for_copy} style="color:${class_color}; cursor: pointer;">.${el_classes.replace(/, /g, ' .')}</span>` : ''}
            </div>
        `;
        
        current_element = current_element.parentElement;
        depth++;
    }
    
    const parentSection = `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #aaa;">Parent Elements:</div>
            ${parentHierarchy || '<div style="color: #888; font-style: italic;">No parent elements</div>'}
        </div>
    `;
    
    // Instructions footer
    const footerSection = `
        <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #444; text-align: center; color: #888; font-size: 13px;">
            Hover over elements in reveal mode to inspect them. Click any element name to copy its selector.
        </div>
    `;
    
    // Combine all sections
    reveal_display.innerHTML = `
        <div style="padding: 20px;">
            ${titleSection}
            ${currentElementSection}
            ${parentSection}
            ${footerSection}
        </div>
    `;
    
    reveal_display.style.display = 'block';
    
    // Add click event listeners to all copy items
    const copy_items = reveal_display.querySelectorAll('.copy-item');
    copy_items.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            const text_to_copy = this.getAttribute('data-copy');
            reveal_copy_to_clipboard(text_to_copy);
            reveal_show_copy_feedback(this);
        });
    });
    
    // Add click handler for the close button
    const close_btn = document.getElementById('reveal_close_btn');
    if (close_btn) {
        // Add hover effects
        close_btn.onmouseover = function() {
            this.style.backgroundColor = 'rgba(231, 76, 60, 1)';
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.4)';
        };
        
        close_btn.onmouseout = function() {
            this.style.backgroundColor = 'rgba(231, 76, 60, 0.8)';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
        };
        
        close_btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            reveal_hide_panel();
        });
    }
    
    // Add subtle highlight to the hovered element
    const previous_highlight = document.querySelector('.reveal-highlight');
    if (previous_highlight && previous_highlight !== target) {
        previous_highlight.classList.remove('reveal-highlight');
        previous_highlight.style.outline = '';
    }
    
    target.classList.add('reveal-highlight');
    target.style.outline = '3px dashed rgba(97, 218, 251, 0.9)'; // Match app theme color
}

// Function to copy text to clipboard
function reveal_copy_to_clipboard(text) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    document.execCommand('copy');
    
    // Clean up
    document.body.removeChild(textarea);
    console.log('Copied to clipboard:', text);
}

// Function to show copy feedback
function reveal_show_copy_feedback(element) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.textContent = 'Copied!';
    feedback.style.position = 'absolute';
    feedback.style.backgroundColor = 'rgba(97, 218, 251, 0.8)'; // Match app theme color
    feedback.style.color = 'white';
    feedback.style.padding = '3px 8px';
    feedback.style.borderRadius = '4px';
    feedback.style.fontSize = '12px';
    feedback.style.zIndex = '10001';
    feedback.style.pointerEvents = 'none';
    
    // Position the feedback near the clicked element
    const rect = element.getBoundingClientRect();
    feedback.style.top = `${rect.top - 25}px`;
    feedback.style.left = `${rect.left + rect.width / 2 - 30}px`;
    
    // Add to the body and animate
    document.body.appendChild(feedback);
    
    // Animate and remove
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 500);
    }, 1000);
}

// Make sure the overlay traps all events properly
reveal_overlay.addEventListener('mouseover', e => e.stopPropagation());
reveal_overlay.addEventListener('mouseout', e => e.stopPropagation());
reveal_overlay.addEventListener('mousemove', e => e.stopPropagation());
reveal_overlay.addEventListener('click', e => {
    // Only if clicking the overlay itself, not the panel, close the panel
    if (e.target === reveal_overlay) {
        e.stopPropagation();
        reveal_hide_panel();
    }
});

// Trap events on the display panel
reveal_display.addEventListener('mouseover', e => e.stopPropagation());
reveal_display.addEventListener('mouseout', e => e.stopPropagation());
reveal_display.addEventListener('mousemove', e => e.stopPropagation());
reveal_display.addEventListener('click', e => {
    // Only prevent propagation if clicking the panel itself, not interactive elements
    if (e.target === reveal_display) {
        e.stopPropagation();
    }
});

// Add hover event listener to all elements
document.addEventListener('mouseover', function(event) {
    if (!window.reveal_mode) return;
    
    // If panel is already displayed, don't process any hover events
    if (reveal_display.style.display === 'block') return;
    
    // Store the currently hovered element
    const target = event.target;
    
    // If hovering over the reveal mode UI elements, don't change anything
    if (target === reveal_display || reveal_display.contains(target) || 
        target === reveal_toggle_btn || target === reveal_overlay) {
        return;
    }
    
    // Clear any existing timeout
    if (reveal_hover_timeout) {
        clearTimeout(reveal_hover_timeout);
    }
    
    // Only update the target if we've actually moved to a new element
    if (target !== reveal_current_target) {
        reveal_current_target = target;
        reveal_hover_start_time = Date.now();
    }
    
    // Set a delay before updating the display
    reveal_hover_timeout = setTimeout(() => {
        // Only update display if we've been hovering for the threshold time
        const hover_time = Date.now() - reveal_hover_start_time;
        if (hover_time >= REVEAL_HOVER_THRESHOLD) {
            reveal_show_panel(reveal_current_target);
        }
    }, REVEAL_HOVER_THRESHOLD);
});

// Add key event to toggle reveal mode
document.addEventListener('keydown', function(event) {
    // Toggle reveal mode when pressing Alt+R
    if (event.altKey && event.key === 'r') {
        window.reveal_mode = !window.reveal_mode;
        reveal_update_state();
        
        // Show notification
        if (window.reveal_mode) {
            // Create and show a notification
            const notification = document.createElement('div');
            notification.textContent = 'Reveal Mode Activated - Press Alt+R to toggle';
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = 'rgba(45, 45, 45, 0.9)';
            notification.style.color = '#61dafb'; // Match app theme color
            notification.style.padding = '8px 15px';
            notification.style.borderRadius = '5px';
            notification.style.fontFamily = 'monospace';
            notification.style.fontSize = '14px';
            notification.style.zIndex = '10000';
            notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
            document.body.appendChild(notification);
            
            // Remove the notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }
});
