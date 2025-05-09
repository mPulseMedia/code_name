window.app_function_list  = {};
window.app_variable_list  = {};
window.function_name_list = [];
window.dom_class_names = [];
window.filter_state   = {
    function: true,
    variable: true,
    class:    true
};

const app_event_listener_setup = () => {
    window.app_function_list['app_event_listener_setup'] = app_event_listener_setup;
    
    const filter_function = document.getElementById('filter_function');
    const filter_variable = document.getElementById('filter_variable');
    const filter_class    = document.getElementById('filter_class');
    
    filter_function_event_add(filter_function);
    filter_variable_event_add(filter_variable);
    filter_class_event_add(filter_class);
};

const app_initialize = () => {
    window.app_function_list['app_initialize'] = app_initialize;
    
    console.log('app_initialize_start');
    
    app_event_listener_setup();
    
    name_list_const_set();
    
    console.log('filter_state_pre_render', window.filter_state);
    
    index_dom_render();
    
    setTimeout(() => {
        console.log('post_render_filter_check');
        
        const visible_items = document.querySelectorAll('.name:not(.name_hidden)').length;
        const total_items = document.querySelectorAll('.name').length;
        
        console.log('visibility_check', {
            visible: visible_items,
            total: total_items,
            filter_state: { ...window.filter_state }
        });
        
        if (visible_items === 0 && total_items > 0) {
            console.log('fixing_visibility_issue');
            filter_apply();
        }
    }, 100);
    
    console.log('filter_state_initial', window.filter_state);
};

const array_sort_alphabetically = (array) => {
    window.app_function_list['array_sort_alphabetically'] = array_sort_alphabetically;
    
    return [...array].sort();
};

const dom_append = (parent, child) => {
    window.app_function_list['dom_append'] = dom_append;
    
    parent.appendChild(child);
    return parent;
};

const dom_class_add = (element, class_name) => {
    window.app_function_list['dom_class_add'] = dom_class_add;
    
    element.classList.add(class_name);
    return element;
};

const dom_create = (tag) => {
    window.app_function_list['dom_create'] = dom_create;
    
    return document.createElement(tag);
};

const dom_text_set = (element, text) => {
    window.app_function_list['dom_text_set'] = dom_text_set;
    
    element.textContent = text;
    return element;
};

const filter_apply = () => {
    window.app_function_list['filter_apply'] = filter_apply;
    
    console.log('filter_apply_start', window.filter_state);
    
    const index_ele = document.getElementById('index');
    if (!index_ele) {
        console.error('index_element_not_found_in_filter_apply');
        return;
    }
    
    index_ele.innerHTML = '';
    
    const name_list = name_list_order_get();
    console.log('filter_apply_name_list_length', name_list.length);
    
    let visible_count = {
        function: 0,
        variable: 0,
        class: 0,
        total: 0
    };
    
    let term_previous_list   = null;
    let name_string_previous = null;
    
    name_list.forEach(name_string => {
        const term_previous_use_is   = name_string_previous && name_filter_visible_is(name_string_previous);
        const term_previous_list_effective = term_previous_use_is ? term_previous_list : null;
        
        const { name_ele, term_list } = name_list_dom_render(name_string, term_previous_list_effective);
        dom_append(index_ele, name_ele);
        
        if (name_filter_visible_is(name_string)) {
            term_previous_list  = term_list;
            name_string_previous = name_string;
            
            if (window.function_name_list.includes(name_string)) {
                visible_count.function++;
            } else if (window.dom_class_names.includes(name_string)) {
                visible_count.class++;
            } else {
                visible_count.variable++;
            }
            visible_count.total++;
        }
    });
    
    const name_function_elements = document.querySelectorAll('.name_function');
    const name_variable_elements = document.querySelectorAll('.name_variable');
    const name_class_elements    = document.querySelectorAll('.name_class');
    
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
    
    console.log('filter_apply_complete', {
        visible: visible_count,
        filter_state: { ...window.filter_state }
    });
};

const filter_class_event_add = (button) => {
    window.app_function_list['filter_class_event_add'] = filter_class_event_add;
    
    button.addEventListener('click', () => {
        filter_toggle('class');
    });
};

const filter_function_event_add = (button) => {
    window.app_function_list['filter_function_event_add'] = filter_function_event_add;
    
    button.addEventListener('click', () => {
        filter_toggle('function');
    });
};

const filter_toggle = (filter_type) => {
    window.app_function_list['filter_toggle'] = filter_toggle;
    
    window.filter_state[filter_type] = !window.filter_state[filter_type];
    
    const button = document.getElementById(`filter_${filter_type}`);
    if (window.filter_state[filter_type]) {
        button.classList.add('filter_active');
    } else {
        button.classList.remove('filter_active');
    }
    
    filter_apply();
};

const filter_variable_event_add = (button) => {
    window.app_function_list['filter_variable_event_add'] = filter_variable_event_add;
    
    button.addEventListener('click', () => {
        filter_toggle('variable');
    });
};

const index_dom_render = () => {
    window.app_function_list['index_dom_render'] = index_dom_render;
    
    console.log('index_dom_render_start');
    
    const index_ele = document.getElementById('index');
    if (!index_ele) {
        console.error('index_element_not_found');
        return;
    }
    
    const name_list = name_list_order_get();
    console.log('name_list_render_prepare', name_list.length, 'names');
    
    if (!name_list || name_list.length === 0) {
        const message = document.createElement('li');
        message.textContent = 'No names found. Check console for details.';
        index_ele.appendChild(message);
        return;
    }
    
    console.log('applying_filters_during_render');
    filter_apply();
};

const name_filter_visible_is = (name_string) => {
    window.app_function_list['name_filter_visible_is'] = name_filter_visible_is;
    
    if (!window.filter_state) {
        console.error('filter_state_missing');
        window.filter_state = {
            function: true,
            variable: true,
            class: true
        };
    }
    
    if (!name_string) {
        console.warn('name_string_empty');
        return true;
    }
    
    const name_type_function = Array.isArray(window.function_name_list) && window.function_name_list.includes(name_string);
    const name_type_class    = Array.isArray(window.dom_class_names) && window.dom_class_names.includes(name_string);
    const name_type_variable = !name_type_function && !name_type_class;
    
    if (name_string.startsWith('app_')) {
        console.log('visibility_check', {
            name: name_string,
            function_is: name_type_function,
            class_is: name_type_class,
            variable_is: name_type_variable,
            filter_state: { ...window.filter_state }
        });
    }
    
    if (name_type_function) {
        return !!window.filter_state.function;
    } else if (name_type_class) {
        return !!window.filter_state.class;
    } else {
        return !!window.filter_state.variable;
    }
};

const name_list_dom_render = (name_string, term_previous_list = null) => {
    window.app_function_list['name_list_dom_render'] = name_list_dom_render;
    
    const name_div = dom_create('li');
    dom_class_add(name_div, 'name');
    
    const name_type_function = window.function_name_list.includes(name_string);
    const name_type_class    = window.dom_class_names.includes(name_string);
    const name_type_variable = !name_type_function && !name_type_class;
    
    if (name_type_function) {
        dom_class_add(name_div, 'name_function');
    } else if (name_type_class) {
        dom_class_add(name_div, 'name_class');
    } else {
        dom_class_add(name_div, 'name_variable');
    }
    
    name_div.addEventListener('click', () => {
        navigator.clipboard.writeText(name_string)
            .then(() => {
                dom_class_add(name_div, 'name_copied');
                
                setTimeout(() => {
                    name_div.classList.remove('name_copied');
                }, 1000);
            })
            .catch(err => {
                console.error('copy_to_clipboard_error', err);
            });
    });
    
    let type_text = name_type_function ? 'function' : (name_type_class ? 'CSS class' : 'variable');
    name_div.setAttribute('title', `Click to copy (${type_text})`);
    
    const term_dom_container = dom_create('div');
    dom_class_add(term_dom_container, 'term_container');
    dom_append(name_div, term_dom_container);
    
    const term_list = term_list_extract(name_string);
    
    const term_list_same_is = term_list_compare(term_list, term_previous_list);
    
    term_list.forEach((term, index) => {
        const term_same_is      = term_list_same_is[index];
        
        const term_style_string = term_style_get(term_same_is);
        
        const term_ele          = dom_create('span');
        dom_class_add(term_ele, 'term');
        dom_class_add(term_ele, `term_${term_style_string}`);
        dom_text_set(term_ele, term);
        dom_append(term_dom_container, term_ele);
        
        if (index < term_list.length - 1) {
            const separator_ele = dom_create('span');
            dom_class_add(separator_ele, 'separator');
            dom_class_add(separator_ele, `separator_${term_style_string}`);
            dom_text_set(separator_ele, '_');
            dom_append(term_dom_container, separator_ele);
        }
    });
    
    if (name_type_function) {
        const parens = dom_create('span');
        dom_class_add(parens, 'name_function_parens');
        dom_text_set(parens, '()');
        dom_append(term_dom_container, parens);
    }
    
    return { name_ele: name_div, term_list };
};

const name_list_const_set = () => {
    window.app_function_list['name_list_const_set'] = name_list_const_set;
    
    console.log('name_list_extract_start');
    
    const function_names = [
        'app_event_listener_setup',
        'app_initialize',
        'array_sort_alphabetically',
        'dom_append',
        'dom_class_add',
        'dom_create',
        'dom_text_set',
        'filter_apply',
        'filter_class_event_add',
        'filter_function_event_add',
        'filter_toggle',
        'filter_variable_event_add',
        'index_dom_render',
        'name_filter_visible_is',
        'name_list_dom_render',
        'name_list_const_set',
        'name_list_get',
        'name_list_order_get',
        'string_by_separator_split',
        'term_list_compare',
        'term_list_extract',
        'term_style_get'
    ];
    
    const variable_names = [
        'app_function_list',
        'app_variable_list',
        'array',
        'button',
        'child',
        'class_is',
        'class_name',
        'term_current_match',
        'debug_enabled_is',
        'debug_name_is',
        'dom_class_names',
        'element',
        'filter_class',
        'filter_function',
        'filter_state',
        'filter_variable',
        'function_is',
        'function_name_list',
        'index_ele',
        'message',
        'name_div',
        'name_ele',
        'name_list',
        'name_string',
        'name_type_class',
        'name_type_function',
        'name_type_list_set',
        'name_type_variable',
        'parent',
        'parens',
        'result',
        'separator',
        'separator_ele',
        'string',
        'tag',
        'term',
        'term_dom_container',
        'term_ele',
        'term_list',
        'term_list_same_is',
        'term_previous_match_all',
        'term_previous_list',
        'term_same_is',
        'term_style_string',
        'text',
        'total_items',
        'type_text',
        'variable_is',
        'variable_names',
        'visible_count',
        'visible_items'
    ];
    
    const dom_class_names = [
        'app_container',
        'app_title',
        'filter',
        'filter_active',
        'filter_container',
        'name_function_parens',
        'index',
        'index_container',
        'name',
        'name_class',
        'name_copied',
        'name_function',
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
    
    window.function_name_list = function_names;
    window.dom_class_names = dom_class_names;
    
    console.log('name_list_extract_counts', {
        functions: window.function_name_list.length,
        classes: window.dom_class_names.length,
        variables: Object.keys(window.app_variable_list).length
    });
    
    const name_type_list_set = [...function_names, ...variable_names, ...dom_class_names];
    
    variable_names.forEach(name => {
        window.app_variable_list[name] = name;
    });
    
    return name_type_list_set;
};

const name_list_get = () => {
    window.app_function_list['name_list_get'] = name_list_get;
    
    console.log('name_list_get_start');
    
    if (window.function_name_list.length > 0) {
        console.log('using_existing_name_list', window.function_name_list.length);
        return [...window.function_name_list, ...Object.keys(window.app_variable_list), ...window.dom_class_names];
    }
    
    return name_list_const_set();
};

const name_list_order_get = () => {
    window.app_function_list['name_list_order_get'] = name_list_order_get;
    
    console.log('name_list_order_get_start');
    const name_list = name_list_get();
    return array_sort_alphabetically(name_list);
};

const string_by_separator_split = (string, separator) => {
    window.app_function_list['string_by_separator_split'] = string_by_separator_split;
    
    return string.split(separator);
};

const term_list_compare = (term_list, term_previous_list) => {
    window.app_function_list['term_list_compare'] = term_list_compare;
    
    if (!term_previous_list) return term_list.map(() => false);
    
    const debug_enabled_is = false;
    const debug_name_is = term_list.join('_').includes('dom_append');
    
    if (debug_enabled_is && debug_name_is) {
        console.log('Term comparison:', {
            current: term_list.join('_'),
            previous: term_previous_list.join('_')
        });
    }
    
    let term_previous_match_all = true;
    
    const result = term_list.map((term, index) => {
        if (!term_previous_match_all) return false;
        
        const term_current_match = index < term_previous_list.length && term_previous_list[index] === term;
        
        if (!term_current_match) {
            term_previous_match_all = false;
        }
        
        if (debug_enabled_is && debug_name_is) {
            console.log(`Term ${index}: "${term}" ${term_current_match ? 'matches' : 'differs'}, term_previous_match_all=${term_previous_match_all}`);
        }
        
        return term_current_match;
    });
    
    if (debug_enabled_is && debug_name_is) {
        console.log('Result:', result);
    }
    
    return result;
};

const term_list_extract = (name_string) => {
    window.app_function_list['term_list_extract'] = term_list_extract;
    
    return string_by_separator_split(name_string, '_');
};

const term_style_get = (term_same_is) => {
    window.app_function_list['term_style_get'] = term_style_get;
    
    return term_same_is ? 'gray' : 'white';
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('dom_content_loaded');
    
    console.log('function_list_pre_init', Object.keys(window.app_function_list));
    console.log('variable_list_pre_init', Object.keys(window.app_variable_list));
    
    app_initialize();
    
    console.log('function_list_post_init', Object.keys(window.app_function_list));
    console.log('variable_list_post_init', Object.keys(window.app_variable_list));
    
    window.app_function_list_obj = () => {
        return Object.keys(window.app_function_list);
    };
    
    window.app_variable_list_obj = () => {
        return Object.keys(window.app_variable_list);
    };
    
    window.app_name_list_obj = () => {
        return [...Object.keys(window.app_function_list), ...Object.keys(window.app_variable_list)];
    };
});
