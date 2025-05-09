window.app_function_list  = {};
window.app_variable_list  = {};
window.function_name_list = [];
window.dom_class_name_list = [];
window.parameter_name_list = [];
window.constant_name_list  = [];
window.event_name_list     = [];
window.property_name_list  = [];
window.file_name_list      = [];
window.filter_state       = {
    // Identifier type filters
    function_is  : true,
    variable_is  : true,
    class_is     : true,
    parameter_is : true,
    constant_is  : true,
    event_is     : true,
    property_is  : true,
    file_is      : true,
    
    // Search filter
    search_query : ''
};

// Track expanded state of root terms
window.root_expanded_state = {};
window.search_root_previous_state = {};
window.roots_matched_by_search = {};
window.search_timer = null;
window.search_delay_ms = 300; // Time to wait after typing stops

// App functions
const app_event_listener_setup = () => {
    window.app_function_list['app_event_listener_setup'] = app_event_listener_setup;
    // Type filter buttons
    const filter_function_element  = document.getElementById('filter_function');
    const filter_variable_element  = document.getElementById('filter_variable');
    const filter_class_element     = document.getElementById('filter_class');
    const filter_parameter_element = document.getElementById('filter_parameter');
    const filter_constant_element  = document.getElementById('filter_constant');
    const filter_event_element     = document.getElementById('filter_event');
    const filter_property_element  = document.getElementById('filter_property');
    const filter_file_element      = document.getElementById('filter_file');
    
    // Reset button
    const filter_reset_all_element = document.getElementById('filter_reset_all');
    
    // Search elements
    const search_input_element = document.getElementById('name_search_input');
    const search_clear_element = document.getElementById('name_search_clear');
    
    // Set up type filter event listeners
    filter_type_function_event_add(filter_function_element);
    filter_type_variable_event_add(filter_variable_element);
    filter_type_class_event_add(filter_class_element);
    filter_type_event_add(filter_parameter_element, 'parameter');
    filter_type_event_add(filter_constant_element, 'constant');
    filter_type_event_add(filter_event_element, 'event');
    filter_type_event_add(filter_property_element, 'property');
    filter_type_event_add(filter_file_element, 'file');
    
    // Set up reset all filters button
    if (filter_reset_all_element) {
        filter_reset_all_element.addEventListener('click', filter_all_reset);
    }
    
    // Set up root toggle all button
    const root_toggle_all_element = document.getElementById('root_toggle_all');
    
    if (root_toggle_all_element) {
        // Track current state - start with "will expand all" (▶)
        let all_expanded = false;
        
        root_toggle_all_element.addEventListener('click', () => {
            all_expanded = !all_expanded;
            
            if (all_expanded) {
                // Change to "will collapse all" state
                dom_element_text_set(root_toggle_all_element, '▼');
                root_toggle_all_element.title = 'Collapse all roots';
                root_open_all();
            } else {
                // Change to "will expand all" state
                dom_element_text_set(root_toggle_all_element, '▶');
                root_toggle_all_element.title = 'Expand all roots';
                root_close_all();
            }
        });
    }
    
    // Set up search input event listeners
    if (search_input_element) {
        search_input_element.addEventListener('input', () => {
            // Show/hide the clear button based on input
            if (search_input_element.value.length > 0) {
                search_clear_element.classList.add('visible');
            } else {
                search_clear_element.classList.remove('visible');
            }
            
            // Clear any existing timer
            if (window.search_timer) {
                clearTimeout(window.search_timer);
            }
            
            // Set a new timer to apply the search after typing stops
            window.search_timer = setTimeout(() => {
                search_apply(search_input_element.value);
            }, window.search_delay_ms);
        });
        
        // On Enter key, apply the search immediately
        search_input_element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                // Clear any pending debounce timer
                if (window.search_timer) {
                    clearTimeout(window.search_timer);
                }
                search_apply(search_input_element.value);
            }
        });
    }
    
    // Set up search clear button
    if (search_clear_element) {
        search_clear_element.addEventListener('click', () => {
            search_input_element.value = '';
            search_clear_element.classList.remove('visible');
            
            // Clear any pending debounce timer
            if (window.search_timer) {
                clearTimeout(window.search_timer);
            }
            
            // Apply the empty search immediately
            search_apply('');
        });
    }
};
const app_init = () => {
    window.app_function_list['app_init'] = app_init;
    
    app_event_listener_setup();
    name_list_const_set();
    
    // Make sure all filters are active and index is populated on initial load
    filter_all_reset();
    
    setTimeout(() => {
        filter_count_visible_check();
    }, 100);
};

// Array functions
const array_sort_alphabetically = (array_input) => {
    window.app_function_list['array_sort_alphabetically'] = array_sort_alphabetically;
    return [...array_input].sort((a, b) => {
        const a_lower = String(a).toLowerCase();
        const b_lower = String(b).toLowerCase();
        return a_lower.localeCompare(b_lower);
    });
};

// DOM functions
const dom_element_append = (parent_element, child_element) => {
    window.app_function_list['dom_element_append'] = dom_element_append;
    parent_element.appendChild(child_element);
    return parent_element;
};
const dom_element_class_add = (target_element, class_name) => {
    window.app_function_list['dom_element_class_add'] = dom_element_class_add;
    target_element.classList.add(class_name);
    return target_element;
};
const dom_element_create = (element_tag) => {
    window.app_function_list['dom_element_create'] = dom_element_create;
    return document.createElement(element_tag);
};
const dom_element_text_set = (target_element, text_content) => {
    window.app_function_list['dom_element_text_set'] = dom_element_text_set;
    target_element.textContent = text_content;
    return target_element;
};

// Filter functions
const filter_all_reset = () => {
    window.app_function_list['filter_all_reset'] = filter_all_reset;
    
    // Turn on all filters
    for (const filter_type in window.filter_state) {
        // Skip search_query, handle it separately
        if (filter_type === 'search_query') continue;
        
        window.filter_state[filter_type] = true;
        
        // Update button UI
        const filter_id = filter_type.replace('_is', '');
        const button_element = document.getElementById(`filter_${filter_id}`);
        if (button_element) {
            button_element.classList.add('filter_active');
        }
    }
    
    // Clear search query
    window.filter_state.search_query = '';
    const search_input_element = document.getElementById('name_search_input');
    const search_clear_element = document.getElementById('name_search_clear');
    
    if (search_input_element) {
        search_input_element.value = '';
    }
    
    if (search_clear_element) {
        search_clear_element.classList.remove('visible');
    }
    
    // Apply the filter
    filter_name_apply();
    
    // After filter is applied, close all expanded root items
    const expanded_carets = document.querySelectorAll('.root_term_caret.expanded');
    const expanded_contents = document.querySelectorAll('.root_term_content.expanded');
    
    // Remove expanded class from carets and set text to closed state
    expanded_carets.forEach(caret => {
        root_toggle(caret);
    });
    
    // Remove expanded class from content elements
    expanded_contents.forEach(content => {
        content.classList.remove('expanded');
    });
    
    // Clear all saved expanded states
    window.root_expanded_state = {};
    // Also clear search history when resetting filters
    window.roots_matched_by_search = {};
};
const filter_count_visible_check = () => {
    window.app_function_list['filter_count_visible_check'] = filter_count_visible_check;
    
    const name_visible_count = document.querySelectorAll('.name:not(.name_hidden)').length;
    const name_total_count   = document.querySelectorAll('.name').length;
    
    const visible_issue_is = name_visible_count === 0 && name_total_count > 0;
    
    if (visible_issue_is) {
        filter_name_apply();
    }
};
const filter_exclusive_set = (active_filter_type) => {
    window.app_function_list['filter_exclusive_set'] = filter_exclusive_set;
    
    // Turn off all filters
    for (const filter_type in window.filter_state) {
        // Skip search_query, don't change it
        if (filter_type === 'search_query') continue;
        
        window.filter_state[filter_type] = false;
        
        // Update button UI
        const filter_id = filter_type.replace('_is', '');
        const button_element = document.getElementById(`filter_${filter_id}`);
        if (button_element) {
            button_element.classList.remove('filter_active');
        }
    }
    
    // Turn on only the selected filter
    window.filter_state[active_filter_type] = true;
    
    // Update button UI for the selected filter
    const active_filter_id = active_filter_type.replace('_is', '');
    const active_button_element = document.getElementById(`filter_${active_filter_id}`);
    if (active_button_element) {
        active_button_element.classList.add('filter_active');
    }
    
    // Apply the filter
    filter_name_apply();
};
const filter_name_apply = () => {
    window.app_function_list['filter_name_apply'] = filter_name_apply;
    
    const index_element = document.getElementById('index');
    if (!index_element) {
        return;
    }
    
    index_element.innerHTML = '';
    
    const name_list = name_list_order_get();
    
    let name_count = {
        function_is  : 0,
        variable_is  : 0,
        class_is     : 0,
        parameter_is : 0,
        constant_is  : 0,
        event_is     : 0,
        property_is  : 0,
        file_is      : 0,
        count_total  : 0
    };
    
    // First filter the name list based on the search query
    const filtered_name_list = name_list.filter(name_string => {
        return name_filter_visible_is(name_string);
    });
    
    // Group names by root term
    const root_group_map = {};
    
    filtered_name_list.forEach(name_string => {
        const root_name = root_extract(name_string);
        
        if (!root_group_map[root_name]) {
            root_group_map[root_name] = [];
        }
        
        root_group_map[root_name].push(name_string);
        
        // Count the visible names by type
        if (window.function_name_list.includes(name_string)) {
            name_count.function_is++;
        } else if (window.dom_class_name_list.includes(name_string)) {
            name_count.class_is++;
        } else if (window.parameter_name_list.includes(name_string)) {
            name_count.parameter_is++;
        } else if (window.constant_name_list.includes(name_string)) {
            name_count.constant_is++;
        } else if (window.event_name_list.includes(name_string)) {
            name_count.event_is++;
        } else if (window.property_name_list.includes(name_string)) {
            name_count.property_is++;
        } else if (window.file_name_list.includes(name_string)) {
            name_count.file_is++;
        } else {
            name_count.variable_is++;
        }
        name_count.count_total++;
    });
    
    // Render each root term group
    Object.keys(root_group_map).sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }).forEach(root_name => {
        const names_in_group = root_group_map[root_name];
        const group_element = root_group_create(root_name, names_in_group, index_element);
        
        // Update visibility for each type of identifier
        const name_function_element_list  = document.querySelectorAll('.name_function');
        const name_variable_element_list  = document.querySelectorAll('.name_variable');
        const name_class_element_list     = document.querySelectorAll('.name_class');
        const name_parameter_element_list = document.querySelectorAll('.name_parameter');
        const name_constant_element_list  = document.querySelectorAll('.name_constant');
        const name_event_element_list     = document.querySelectorAll('.name_event');
        const name_property_element_list  = document.querySelectorAll('.name_property');
        const name_file_element_list      = document.querySelectorAll('.name_file');
        
        name_function_element_list.forEach(element => {
            if (window.filter_state.function_is) {
                element.classList.remove('name_hidden');
            } else {
                element.classList.add('name_hidden');
            }
        });
        
        name_variable_element_list.forEach(element => {
            if (window.filter_state.variable_is) {
                element.classList.remove('name_hidden');
            } else {
                element.classList.add('name_hidden');
            }
        });
        
        name_class_element_list.forEach(element => {
            if (window.filter_state.class_is) {
                element.classList.remove('name_hidden');
            } else {
                element.classList.add('name_hidden');
            }
        });
        
        name_parameter_element_list.forEach(element => {
            if (window.filter_state.parameter_is) {
                element.classList.remove('name_hidden');
            } else {
                element.classList.add('name_hidden');
            }
        });
        
        name_constant_element_list.forEach(element => {
            if (window.filter_state.constant_is) {
                element.classList.remove('name_hidden');
            } else {
                element.classList.add('name_hidden');
            }
        });
        
        name_event_element_list.forEach(element => {
            if (window.filter_state.event_is) {
                element.classList.remove('name_hidden');
            } else {
                element.classList.add('name_hidden');
            }
        });
        
        name_property_element_list.forEach(element => {
            if (window.filter_state.property_is) {
                element.classList.remove('name_hidden');
            } else {
                element.classList.add('name_hidden');
            }
        });
        
        name_file_element_list.forEach(element => {
            if (window.filter_state.file_is) {
                element.classList.remove('name_hidden');
            } else {
                element.classList.add('name_hidden');
            }
        });
    });
};
const filter_state_toggle = (filter_type) => {
    window.app_function_list['filter_state_toggle'] = filter_state_toggle;
    const filter_property_is = `${filter_type}_is`;
    
    window.filter_state[filter_property_is] = !window.filter_state[filter_property_is];
    
    const button_element = document.getElementById(`filter_${filter_type}`);
    if (window.filter_state[filter_property_is]) {
        button_element.classList.add('filter_active');
    } else {
        button_element.classList.remove('filter_active');
    }
    
    filter_name_apply();
};
const filter_type_class_event_add = (button_element) => {
    window.app_function_list['filter_type_class_event_add'] = filter_type_class_event_add;
    
    // Single click: toggle this filter
    button_element.addEventListener('click', () => {
        filter_state_toggle('class');
    });
    
    // Double click: select only this filter
    button_element.addEventListener('dblclick', (event) => {
        event.preventDefault(); // Prevent text selection
        filter_exclusive_set('class_is');
    });
};
const filter_type_event_add = (button_element, type) => {
    window.app_function_list['filter_type_event_add'] = filter_type_event_add;
    
    // Single click: toggle this filter
    button_element.addEventListener('click', (event) => {
        filter_state_toggle(type);
    });
    
    // Double click: select only this filter
    button_element.addEventListener('dblclick', (event) => {
        event.preventDefault(); // Prevent text selection
        filter_exclusive_set(`${type}_is`);
    });
};
const filter_type_function_event_add = (button_element) => {
    window.app_function_list['filter_type_function_event_add'] = filter_type_function_event_add;
    
    // Single click: toggle this filter
    button_element.addEventListener('click', () => {
        filter_state_toggle('function');
    });
    
    // Double click: select only this filter
    button_element.addEventListener('dblclick', (event) => {
        event.preventDefault(); // Prevent text selection
        filter_exclusive_set('function_is');
    });
};
const filter_type_variable_event_add = (button_element) => {
    window.app_function_list['filter_type_variable_event_add'] = filter_type_variable_event_add;
    
    // Single click: toggle this filter
    button_element.addEventListener('click', () => {
        filter_state_toggle('variable');
    });
    
    // Double click: select only this filter
    button_element.addEventListener('dblclick', (event) => {
        event.preventDefault(); // Prevent text selection
        filter_exclusive_set('variable_is');
    });
};

// Index functions
const index_dom_render = () => {
    window.app_function_list['index_dom_render'] = index_dom_render;
    filter_name_apply();
};

// Name functions
const name_filter_visible_is = (name_string) => {
    window.app_function_list['name_filter_visible_is'] = name_filter_visible_is;
    
    if (!name_string) {
        return false;
    }
    
    // Check type filters
    const name_type_function_is  = Array.isArray(window.function_name_list) && window.function_name_list.includes(name_string);
    const name_type_class_is     = Array.isArray(window.dom_class_name_list) && window.dom_class_name_list.includes(name_string);
    const name_type_parameter_is = Array.isArray(window.parameter_name_list) && window.parameter_name_list.includes(name_string);
    const name_type_constant_is  = Array.isArray(window.constant_name_list) && window.constant_name_list.includes(name_string);
    const name_type_event_is     = Array.isArray(window.event_name_list) && window.event_name_list.includes(name_string);
    const name_type_property_is  = Array.isArray(window.property_name_list) && window.property_name_list.includes(name_string);
    const name_type_file_is      = Array.isArray(window.file_name_list) && window.file_name_list.includes(name_string);
    const name_type_variable_is  = !name_type_function_is && 
                                   !name_type_class_is && 
                                   !name_type_parameter_is && 
                                   !name_type_constant_is && 
                                   !name_type_event_is && 
                                   !name_type_property_is &&
                                   !name_type_file_is;
    
    if (name_type_function_is && !window.filter_state.function_is) {
        return false;
    }
    
    if (name_type_class_is && !window.filter_state.class_is) {
        return false;
    }
    
    if (name_type_parameter_is && !window.filter_state.parameter_is) {
        return false;
    }
    
    if (name_type_constant_is && !window.filter_state.constant_is) {
        return false;
    }
    
    if (name_type_event_is && !window.filter_state.event_is) {
        return false;
    }
    
    if (name_type_property_is && !window.filter_state.property_is) {
        return false;
    }
    
    if (name_type_file_is && !window.filter_state.file_is) {
        return false;
    }
    
    if (name_type_variable_is && !window.filter_state.variable_is) {
        return false;
    }
    
    // Check search query filter (case insensitive)
    if (window.filter_state.search_query && window.filter_state.search_query.length > 0) {
        const search_lower = window.filter_state.search_query.toLowerCase();
        return search_matches(name_string, search_lower);
    }
    
    return true;
};
const name_list_const_set = () => {
    window.app_function_list['name_list_const_set'] = name_list_const_set;
    
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
        'root_type_determine',
        'root_open_all',
        'root_close_all',
        'search_apply',
        'search_matches',
        'search_query_validate',
        'string_by_separator_split',
        'term_list_compare',
        'term_list_extract',
        'term_style_get'
    ];
    
    const variable_names = [
        'active_button_element',
        'active_filter_id',
        'active_filter_type',
        'app_function_list',
        'app_variable_list',
        'array_input',
        'button_element',
        'child_element',
        'class_is',
        'class_name',
        'count_total',
        'dom_class_name_list',
        'element_tag',
        'filter_class_element',
        'filter_function_element',
        'filter_id',
        'filter_property_is',
        'filter_reset_all_element',
        'filter_state',
        'filter_type',
        'filter_variable_element',
        'function_is',
        'function_name_list',
        'index_element',
        'message',
        'name_class_element_list',
        'name_count',
        'name_element',
        'name_function_element_list',
        'name_list',
        'name_lower',
        'search_clear_element',
        'search_input_element',
        'name_string',
        'name_string_previous',
        'name_total_count',
        'name_type_class_is',
        'name_type_function_is',
        'name_type_list_set',
        'name_type_variable_is',
        'name_variable_element_list',
        'name_visible_count',
        'parent_element',
        'parens_element',
        'result',
        'root_expanded_state',
        'search_root_previous_state',
        'root_group_map',
        'root_name',
        'roots_matched_by_search',
        'search_timer',
        'search_delay_ms',
        'search_query',
        'search_lower',
        'separator',
        'separator_element',
        'string',
        'target_element',
        'term',
        'term_container_element',
        'term_current_match',
        'term_element',
        'term_list',
        'term_list_same_is',
        'term_previous_list',
        'term_previous_list_effective',
        'term_previous_match_all',
        'term_previous_use_is',
        'term_same_is',
        'term_style_class_name',
        'text_content',
        'type_class_name',
        'variable_is',
        'variable_names',
        'visible_issue_is'
    ];
    
    const dom_class_names = [
        'app_container',
        'app_title',
        'filter',
        'filter_active',
        'filter_buttons',
        'filter_container',
        'filter_group',
        'filter_group_title',
        'filter_prefix',
        'index',
        'index_container',
        'name',
        'name_class',
        'name_copied',
        'name_function',
        'name_function_parens',
        'name_hidden',
        'name_variable',
        'separator',
        'separator_gray',
        'separator_white',
        'term',
        'term_container',
        'term_gray',
        'term_white'
    ];
    
    const parameter_names = [
        'array_input',
        'button_element',
        'child_element',
        'class_name',
        'element_tag',
        'filter_type',
        'name_string',
        'parent_element',
        'prefix',
        'separator',
        'target_element',
        'term_list',
        'term_previous_list',
        'term_same_is',
        'text_content',
        'type'
    ];
    
    const constant_names = [
        'DEFAULT_TIMEOUT_MS',
        'MAX_NAME_LENGTH',
        'MIN_TERM_LENGTH',
        'DEFAULT_FILTER_STATE'
    ];
    
    const event_names = [
        'click_event',
        'document_load_event',
        'filter_change_event',
        'key_press_event',
        'mouse_over_event',
        'name_copy_event'
    ];
    
    const property_names = [
        'element_class_list',
        'element_style',
        'filter_active_state',
        'filter_color',
        'filter_is_visible',
        'name_display_text',
        'term_color_value'
    ];
    
    const file_names = [
        // Root project files
        'index.html',
        'README.md',
        'server.js',
        
        // Project folders
        'src/',
        
        // Files in src/ folder
        'src/app.js',
        'src/index.html',
        'src/styles.css',
        'src/styles.css.bak'
    ];
    
    window.function_name_list = function_names;
    window.dom_class_name_list = dom_class_names;
    window.parameter_name_list = parameter_names;
    window.constant_name_list = constant_names;
    window.event_name_list = event_names;
    window.property_name_list = property_names;
    window.file_name_list = file_names;
    
    variable_names.forEach(name => {
        window.app_variable_list[name] = name;
    });
    
    const name_type_list_set = [
        ...function_names, 
        ...variable_names, 
        ...dom_class_names,
        ...parameter_names,
        ...constant_names,
        ...event_names,
        ...property_names,
        ...file_names
    ];
    
    return name_type_list_set;
};
const name_list_dom_render = (name_string, term_previous_list = null) => {
    window.app_function_list['name_list_dom_render'] = name_list_dom_render;
    
    const name_element = dom_element_create('li');
    dom_element_class_add(name_element, 'name');
    
    const name_type_function_is  = Array.isArray(window.function_name_list) && window.function_name_list.includes(name_string);
    const name_type_class_is     = Array.isArray(window.dom_class_name_list) && window.dom_class_name_list.includes(name_string);
    const name_type_parameter_is = Array.isArray(window.parameter_name_list) && window.parameter_name_list.includes(name_string);
    const name_type_constant_is  = Array.isArray(window.constant_name_list) && window.constant_name_list.includes(name_string);
    const name_type_event_is     = Array.isArray(window.event_name_list) && window.event_name_list.includes(name_string);
    const name_type_property_is  = Array.isArray(window.property_name_list) && window.property_name_list.includes(name_string);
    const name_type_file_is      = Array.isArray(window.file_name_list) && window.file_name_list.includes(name_string);
    const name_type_variable_is  = !name_type_function_is && 
                                   !name_type_class_is && 
                                   !name_type_parameter_is && 
                                   !name_type_constant_is && 
                                   !name_type_event_is && 
                                   !name_type_property_is &&
                                   !name_type_file_is;
    
    let type_class_name = 'name_variable';
    if (name_type_function_is) {
        type_class_name = 'name_function';
    } else if (name_type_class_is) {
        type_class_name = 'name_class';
    } else if (name_type_parameter_is) {
        type_class_name = 'name_parameter';
    } else if (name_type_constant_is) {
        type_class_name = 'name_constant';
    } else if (name_type_event_is) {
        type_class_name = 'name_event';
    } else if (name_type_property_is) {
        type_class_name = 'name_property';
    } else if (name_type_file_is) {
        type_class_name = 'name_file';
    }
    
    dom_element_class_add(name_element, type_class_name);
    
    name_element.addEventListener('click', () => {
        navigator.clipboard.writeText(name_string);
        name_element.classList.add('name_copied');
        
        setTimeout(() => {
            name_element.classList.remove('name_copied');
        }, 1000);
    });
    
    const term_list = term_list_extract(name_string);
    const term_list_same_is = term_list_compare(term_list, term_previous_list);
    
    const term_container_element = dom_element_create('div');
    dom_element_class_add(term_container_element, 'term_container');
    
    term_list.forEach((term, index) => {
        // Add term element
        const term_same_is = term_list_same_is[index];
        const term_style_class_name = term_style_get(term_same_is);
        
        const term_element = dom_element_create('span');
        dom_element_class_add(term_element, 'term');
        dom_element_class_add(term_element, term_style_class_name);
        dom_element_text_set(term_element, term);
        dom_element_append(term_container_element, term_element);
        
        // Add separator if not the last term
        if (index < term_list.length - 1) {
            const separator_element = dom_element_create('span');
            dom_element_class_add(separator_element, 'separator');
            dom_element_class_add(separator_element, term_style_class_name.replace('term', 'separator'));
            
            // Choose the right separator based on the name type
            let separator_char = '_';  // Default for most identifiers
            
            // If it's a file path, use / or . as appropriate
            if (name_type_file_is) {
                // Check if term ends with /, indicating it's a directory part
                if (term.endsWith('/')) {
                    separator_char = '';  // No separator needed as / is already in the term
                } else if (index === term_list.length - 2 && !term_list[term_list.length - 1].includes('/')) {
                    separator_char = '.';  // Use . between filename and extension
                } else {
                    separator_char = '/';  // Use / for path elements
                }
            }
            
            dom_element_text_set(separator_element, separator_char);
            dom_element_append(term_container_element, separator_element);
        }
    });
    
    dom_element_append(name_element, term_container_element);
    
    return { 
        name_element : name_element,
        term_list    : term_list 
    };
};
const name_list_get = () => {
    window.app_function_list['name_list_get'] = name_list_get;
    
    if (window.function_name_list.length > 0) {
        return [
            ...window.function_name_list,
            ...Object.keys(window.app_variable_list),
            ...window.dom_class_name_list,
            ...window.parameter_name_list,
            ...window.constant_name_list,
            ...window.event_name_list,
            ...window.property_name_list,
            ...window.file_name_list
        ];
    }
    
    return name_list_const_set();
};
const name_list_order_get = () => {
    window.app_function_list['name_list_order_get'] = name_list_order_get;
    
    const name_list = name_list_get();
    return array_sort_alphabetically(name_list);
};
const search_apply = (search_query) => {
    window.app_function_list['search_apply'] = search_apply;
    
    // Validate and normalize the query
    search_query = search_query_validate(search_query);
    
    // First-time initialization
    if (!window.search_root_previous_state) {
        window.search_root_previous_state = {};
    }
    
    // Entering search mode for the first time
    if (!window.filter_state.search_query && search_query) {
        // Save current state before modifying for search
        window.search_root_previous_state = { ...window.root_expanded_state };
    }
    
    const previous_search = window.filter_state.search_query;
    
    // When starting a new search (either first search or changing search terms)
    if (search_query && search_query !== previous_search) {
        // Reset matched roots for new search
        window.roots_matched_by_search = {};
    }
    
    // Update the filter state with the new search query
    window.filter_state.search_query = search_query;
    
    // If search query is present, find roots with matches
    if (search_query && search_query.length > 0) {
        const search_lower = search_query.toLowerCase();
        const all_names = name_list_get();
        
        // Find all names that match the search
        all_names.forEach(name_string => {
            if (search_matches(name_string, search_lower)) {
                // Get the root term and mark it for expansion
                const root_name = root_extract(name_string);
                window.root_expanded_state[root_name] = true;
                // Remember this root was matched for future reference
                window.roots_matched_by_search[root_name] = true;
            }
        });
    } 
    // When exiting search mode (had search, now cleared)
    else if (previous_search && !search_query) {
        // First restore the state from before search
        window.root_expanded_state = { ...window.search_root_previous_state };
        
        // Then ensure roots that matched search remain open
        Object.keys(window.roots_matched_by_search).forEach(root_name => {
            window.root_expanded_state[root_name] = true;
        });
    }
    
    // Re-apply the filter to show all matching names
    filter_name_apply();
};

// Helper function to validate and normalize a search query
const search_query_validate = (query) => {
    window.app_function_list['search_query_validate'] = search_query_validate;
    
    // Trim whitespace
    query = query ? query.trim() : '';
    
    // Return the sanitized query
    return query;
};

// Helper function to determine if a name matches the search
const search_matches = (name_string, search_lower) => {
    window.app_function_list['search_matches'] = search_matches;
    
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
    window.app_function_list['string_by_separator_split'] = string_by_separator_split;
    
    return string.split(separator);
};

// Term functions
const term_list_compare = (term_list, term_previous_list) => {
    window.app_function_list['term_list_compare'] = term_list_compare;
    
    if (!term_previous_list) return term_list.map(() => false);
    
    let term_previous_match_all = true;
    
    const result = term_list.map((term, index) => {
        if (!term_previous_match_all) return false;
        
        const term_current_match = index < term_previous_list.length && term_previous_list[index] === term;
        
        if (!term_current_match) {
            term_previous_match_all = false;
        }
        
        return term_current_match;
    });
    
    return result;
};
const term_list_extract = (name_string) => {
    window.app_function_list['term_list_extract'] = term_list_extract;
    
    // Special handling for file paths
    if (name_string.includes('/') || name_string.includes('.')) {
        if (name_string.includes('/')) {
            // For paths, split by '/' but keep the structure
            return name_string.split('/').filter(Boolean);
        } else if (name_string.includes('.')) {
            // For files, separate the name from extension
            const parts = name_string.split('.');
            if (parts.length > 1) {
                const extension = parts.pop();
                const filename = parts.join('.');
                return [filename, extension];
            }
        }
    }
    
    // Default behavior for underscore-separated names
    return string_by_separator_split(name_string, '_');
};
const term_style_get = (term_same_is) => {
    window.app_function_list['term_style_get'] = term_style_get;
    
    return term_same_is ? 'term_gray' : 'term_white';
};

// Execute the app
document.addEventListener('DOMContentLoaded', app_init);

// Root functions
const root_extract = (name_string) => {
    window.app_function_list['root_extract'] = root_extract;
    
    // Check if this is a file path (contains / or .)
    if (name_string.includes('/') || name_string.includes('.')) {
        // For files with paths, use directory or extension as the grouping
        if (name_string.includes('/')) {
            // For directory paths, use the first directory as the root
            return name_string.split('/')[0] + '/';
        } else {
            // For files with extensions but no path, use the extension
            const parts = name_string.split('.');
            if (parts.length > 1) {
                return '.' + parts[parts.length - 1]; // Use extension with dot prefix
            }
        }
    }
    
    // Default to the first underscore-separated term
    const term_list = term_list_extract(name_string);
    return term_list[0];
};

const root_open_all = () => {
    window.app_function_list['root_open_all'] = root_open_all;
    
    // Get all root groups that are not already expanded
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
    window.app_function_list['root_close_all'] = root_close_all;
    
    // Get all expanded root contents
    const contents = document.querySelectorAll('.root_term_content.expanded');
    
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
    window.roots_matched_by_search = {};
};

const root_group_create = (root_name, names_in_group, index_element) => {
    window.app_function_list['root_group_create'] = root_group_create;
    
    if (names_in_group.length === 0) return null;
    
    // Sort the names in the group case-insensitively
    names_in_group.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    
    // Determine the predominant type for styling
    let predominant_type = root_type_determine(names_in_group);
    
    // Create the root term group container
    const group_element = dom_element_create('div');
    dom_element_class_add(group_element, 'root_term_group');
    
    // Create header with contents
    const header_element = root_header_create(root_name, predominant_type);
    
    // Create content container for names
    const content_element = root_content_create(names_in_group);
    
    // Connect header click to toggle content visibility
    root_connect(header_element, content_element, root_name);
    
    // Add the group to the index
    dom_element_append(group_element, header_element);
    dom_element_append(group_element, content_element);
    dom_element_append(index_element, group_element);
    
    return group_element;
};

const root_header_create = (root_name, predominant_type) => {
    window.app_function_list['root_header_create'] = root_header_create;
    
    const header_element = dom_element_create('div');
    dom_element_class_add(header_element, 'root_term_header');
    dom_element_class_add(header_element, `root_term_${predominant_type}`);
    
    const caret_element = dom_element_create('span');
    dom_element_class_add(caret_element, 'root_term_caret');
    dom_element_text_set(caret_element, '▶');
    dom_element_append(header_element, caret_element);
    
    // For a more consistent look with regular names, add a term container
    const term_container_element = dom_element_create('div');
    dom_element_class_add(term_container_element, 'term_container');
    
    // Modify how we create the text element for root terms
    const text_element = dom_element_create('span');
    dom_element_class_add(text_element, 'root_term_text');
    dom_element_text_set(text_element, root_name);
    dom_element_append(term_container_element, text_element);
    
    dom_element_append(header_element, term_container_element);
    
    return header_element;
};

const root_content_create = (names_in_group) => {
    window.app_function_list['root_content_create'] = root_content_create;
    
    const content_element = dom_element_create('div');
    dom_element_class_add(content_element, 'root_term_content');
    
    // Add the names to the content container
    let term_previous_list = null;
    let name_string_previous = null;
    
    names_in_group.forEach(name_string => {
        const term_previous_use_is = name_string_previous !== null;
        const term_previous_list_effective = term_previous_use_is ? term_previous_list : null;
        
        const { name_element, term_list } = name_list_dom_render(name_string, term_previous_list_effective);
        dom_element_append(content_element, name_element);
        
        // Update the previous terms and name for the next iteration
        term_previous_list = term_list;
        name_string_previous = name_string;
    });
    
    return content_element;
};

const root_connect = (header_element, content_element, root_name) => {
    window.app_function_list['root_connect'] = root_connect;
    
    const caret_element = header_element.querySelector('.root_term_caret');
    const root_text_element = header_element.querySelector('.root_term_text');
    
    if (!caret_element || !root_text_element) return;
    
    // Add click handler for the root text to copy the root name
    root_text_element.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent toggle
        navigator.clipboard.writeText(root_name);
        
        // Add a brief animation/feedback for the copy
        root_text_element.classList.add('name_copied');
        setTimeout(() => {
            root_text_element.classList.remove('name_copied');
        }, 1000);
    });
    
    // Apply saved expanded state if it exists
    if (window.root_expanded_state[root_name]) {
        // Expand the content
        content_element.classList.add('expanded');
        
        // Hide the header
        header_element.classList.add('root_header_hidden');
    }
    
    // Add click event to toggle the group (but only when clicking on the header, not the text)
    header_element.addEventListener('click', (event) => {
        // Make sure we're not clicking on the root_text_element
        if (event.target !== root_text_element) {
            toggleRootGroup(header_element, content_element, root_name);
        }
    });
    
    // Add click event to the first child's caret (when header is hidden)
    content_element.addEventListener('click', (event) => {
        // Only process clicks when content is expanded
        if (!content_element.classList.contains('expanded')) return;
        
        const firstChild = content_element.querySelector('.name:first-child');
        if (!firstChild) return;
        
        // Check if click was in the caret area (30px to the left of the first child)
        const firstChildRect = firstChild.getBoundingClientRect();
        const isInCaretArea = (event.clientX < firstChildRect.left - 5) && 
                             (event.clientX > firstChildRect.left - 35) &&
                             (event.clientY >= firstChildRect.top) &&
                             (event.clientY <= firstChildRect.bottom);
                             
        if (isInCaretArea) {
            event.preventDefault();
            event.stopPropagation();
            toggleRootGroup(header_element, content_element, root_name);
        }
    });
};

// New helper function to toggle root groups
const toggleRootGroup = (header_element, content_element, root_name) => {
    window.app_function_list['toggleRootGroup'] = toggleRootGroup;
    
    const isExpanded = !content_element.classList.contains('expanded');
    
    // Toggle content visibility
    content_element.classList.toggle('expanded');
    
    // Toggle header visibility
    if (isExpanded) {
        header_element.classList.add('root_header_hidden');
        
        // Add root indicator class to first item
        const firstItem = content_element.querySelector('.name:first-child');
        if (firstItem) {
            firstItem.classList.add('root_item');
        }
    } else {
        header_element.classList.remove('root_header_hidden');
        
        // Remove root indicator class from all items
        const rootItems = content_element.querySelectorAll('.root_item');
        rootItems.forEach(item => {
            item.classList.remove('root_item');
        });
    }
    
    // Save the expanded state for this root term
    window.root_expanded_state[root_name] = isExpanded;
};

const root_toggle = (caret_element) => {
    window.app_function_list['root_toggle'] = root_toggle;
    
    const isExpanded = caret_element.classList.toggle('expanded');
    if (isExpanded) {
        dom_element_text_set(caret_element, '▼');
    } else {
        dom_element_text_set(caret_element, '▶');
    }
    return isExpanded;
};

const root_type_determine = (names_in_group) => {
    window.app_function_list['root_type_determine'] = root_type_determine;
    
    const type_counts = {
        function: 0,
        variable: 0,
        class: 0,
        parameter: 0,
        constant: 0,
        event: 0,
        property: 0
    };
    
    names_in_group.forEach(name => {
        if (window.function_name_list.includes(name)) type_counts.function++;
        else if (window.dom_class_name_list.includes(name)) type_counts.class++;
        else if (window.parameter_name_list.includes(name)) type_counts.parameter++;
        else if (window.constant_name_list.includes(name)) type_counts.constant++;
        else if (window.event_name_list.includes(name)) type_counts.event++;
        else if (window.property_name_list.includes(name)) type_counts.property++;
        else type_counts.variable++;
    });
    
    // Find the type with highest count
    let max_count = 0;
    let predominant_type = 'variable'; // Default
    
    Object.entries(type_counts).forEach(([type, count]) => {
        if (count > max_count) {
            max_count = count;
            predominant_type = type;
        }
    });
    
    return predominant_type;
};
