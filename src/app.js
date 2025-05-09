window.app_function_list  = {};
window.app_variable_list  = {};
window.function_name_list = [];
window.dom_class_name_list = [];
window.parameter_name_list = [];
window.constant_name_list  = [];
window.event_name_list     = [];
window.property_name_list  = [];
window.filter_state       = {
    // Identifier type filters
    function_is  : true,
    variable_is  : true,
    class_is     : true,
    parameter_is : true,
    constant_is  : true,
    event_is     : true,
    property_is  : true,
    
    // Search filter
    search_filter_text  : ''
};

// Track expanded state of root terms
window.root_expanded_state = {};

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
    
    // Reset button
    const filter_reset_all_element = document.getElementById('filter_reset_all');
    
    // Search elements
    const name_search_input_element = document.getElementById('name_search_input');
    const name_search_clear_element = document.getElementById('name_search_clear');
    
    // Set up type filter event listeners
    filter_type_function_event_add(filter_function_element);
    filter_type_variable_event_add(filter_variable_element);
    filter_type_class_event_add(filter_class_element);
    filter_type_event_add(filter_parameter_element, 'parameter');
    filter_type_event_add(filter_constant_element, 'constant');
    filter_type_event_add(filter_event_element, 'event');
    filter_type_event_add(filter_property_element, 'property');
    
    // Set up reset all filters button
    if (filter_reset_all_element) {
        filter_reset_all_element.addEventListener('click', filter_all_reset);
    }
    
    // Set up search input event listeners
    if (name_search_input_element) {
        name_search_input_element.addEventListener('input', () => {
            search_filter_apply(name_search_input_element.value);
            
            // Show/hide the clear button based on input
            if (name_search_input_element.value.length > 0) {
                name_search_clear_element.classList.add('visible');
            } else {
                name_search_clear_element.classList.remove('visible');
            }
        });
        
        // On Enter key, apply the search
        name_search_input_element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                search_filter_apply(name_search_input_element.value);
            }
        });
    }
    
    // Set up search clear button
    if (name_search_clear_element) {
        name_search_clear_element.addEventListener('click', () => {
            name_search_input_element.value = '';
            name_search_clear_element.classList.remove('visible');
            search_filter_apply('');
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
        // Skip search_filter_text, handle it separately
        if (filter_type === 'search_filter_text') continue;
        
        window.filter_state[filter_type] = true;
        
        // Update button UI
        const filter_id = filter_type.replace('_is', '');
        const button_element = document.getElementById(`filter_${filter_id}`);
        if (button_element) {
            button_element.classList.add('filter_active');
        }
    }
    
    // Clear search text
    window.filter_state.search_filter_text = '';
    const name_search_input_element = document.getElementById('name_search_input');
    const name_search_clear_element = document.getElementById('name_search_clear');
    
    if (name_search_input_element) {
        name_search_input_element.value = '';
    }
    
    if (name_search_clear_element) {
        name_search_clear_element.classList.remove('visible');
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
        // Skip search_filter_text, don't change it
        if (filter_type === 'search_filter_text') continue;
        
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
        count_total  : 0
    };
    
    // First filter the name list based on the search filter
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
    const name_type_function_is  = window.function_name_list.includes(name_string);
    const name_type_class_is     = window.dom_class_name_list.includes(name_string);
    const name_type_parameter_is = window.parameter_name_list.includes(name_string);
    const name_type_constant_is  = window.constant_name_list.includes(name_string);
    const name_type_event_is     = window.event_name_list.includes(name_string);
    const name_type_property_is  = window.property_name_list.includes(name_string);
    const name_type_variable_is  = !name_type_function_is && 
                                   !name_type_class_is && 
                                   !name_type_parameter_is && 
                                   !name_type_constant_is && 
                                   !name_type_event_is && 
                                   !name_type_property_is;
    
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
    
    if (name_type_variable_is && !window.filter_state.variable_is) {
        return false;
    }
    
    // Check search text filter (case insensitive)
    if (window.filter_state.search_filter_text && window.filter_state.search_filter_text.length > 0) {
        const name_lower = name_string.toLowerCase();
        const search_lower = window.filter_state.search_filter_text.toLowerCase();
        
        // First check if the full name contains the search text
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
        
        // No matches found
        return false;
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
        'search_filter_apply',
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
        'name_search_clear_element',
        'name_search_input_element',
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
        'root_group_map',
        'root_name',
        'search_filter_text',
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
    
    window.function_name_list = function_names;
    window.dom_class_name_list = dom_class_names;
    window.parameter_name_list = parameter_names;
    window.constant_name_list = constant_names;
    window.event_name_list = event_names;
    window.property_name_list = property_names;
    
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
        ...property_names
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
    const name_type_variable_is  = !name_type_function_is && 
                                   !name_type_class_is && 
                                   !name_type_parameter_is && 
                                   !name_type_constant_is && 
                                   !name_type_event_is && 
                                   !name_type_property_is;
    
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
            dom_element_text_set(separator_element, '_');
            dom_element_append(term_container_element, separator_element);
        }
    });
    
    // Add function parens if needed
    if (name_type_function_is) {
        const parens_element = dom_element_create('span');
        dom_element_class_add(parens_element, 'name_function_parens');
        dom_element_text_set(parens_element, '()');
        dom_element_append(term_container_element, parens_element);
    }
    
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
            ...window.property_name_list
        ];
    }
    
    return name_list_const_set();
};
const name_list_order_get = () => {
    window.app_function_list['name_list_order_get'] = name_list_order_get;
    
    const name_list = name_list_get();
    return array_sort_alphabetically(name_list);
};
const search_filter_apply = (search_text) => {
    window.app_function_list['search_filter_apply'] = search_filter_apply;
    
    // Update the filter state with the new search text
    window.filter_state.search_filter_text = search_text;
    
    // Re-apply the filter to show only matching names
    filter_name_apply();
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
    const term_list = term_list_extract(name_string);
    return term_list[0]; // The first term is the root
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
    if (!caret_element) return;
    
    // Apply saved expanded state if it exists
    if (window.root_expanded_state[root_name]) {
        caret_element.classList.add('expanded');
        dom_element_text_set(caret_element, '▼');
        content_element.classList.add('expanded');
    }
    
    // Add click event to toggle the group
    header_element.addEventListener('click', () => {
        const isExpanded = root_toggle(caret_element);
        content_element.classList.toggle('expanded');
        
        // Save the expanded state for this root term
        window.root_expanded_state[root_name] = isExpanded;
    });
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
