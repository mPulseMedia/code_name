// Initialize the app
const app_initialize = () => {
    index_render();
    app_event_listener_setup();
};
// Setup event listeners
const app_event_listener_setup = () => {
    // Could add event listeners for interactivity here
};
// Render the names list
const index_render = () => {
    const index_ele = document.getElementById('index');
    const name_list = index_sort();
    let term_previous_list = null;
    
    name_list.forEach(name_string => {
        const { name_ele, term_list } = name_create(name_string, term_previous_list);
        dom_ele_append(index_ele, name_ele);
        term_previous_list = term_list;
    });
};
// Sort/process the names list
const index_sort = () => {
    const name_list = index_get();
    // Return the list as is, without sorting, to maintain the order by which functions appear
    return name_list;
};
// Collection of names from the code
const index_get = () => {
    return [
        'app_initialize',
        'app_event_listener_setup',
        'index_render',
        'index_sort',
        'index_get',
        'index_ele',
        'name_create',
        'name_div',
        'term_dom_container',
        'name_ele',
        'name_string',
        'term_list',
        'term_previous_list',
        'term_list_same_is',
        'term_same_is',
        'term_style_string',
        'term_ele',
        'separator_ele',
        'dom_ele_append',
        'dom_ele_create',
        'dom_ele_class_add',
        'dom_ele_text_set',
        'term_list_extract',
        'term_list_compare',
        'term_style_determine',
        'string_split_separator',
        'array_sort_alphabetically'
    ];
};
// Create a name element
const name_create = (name_string, term_previous_list = null) => {
    // Create the main list item element to hold the name
    const name_div = dom_ele_create('li');
    dom_ele_class_add(name_div, 'name');
    
    // Create a container to hold all terms and separators without unwanted spacing
    const term_dom_container = dom_ele_create('div');
    dom_ele_class_add(term_dom_container, 'term_container');
    dom_ele_append(name_div, term_dom_container);
    
    // Extract individual terms from the name by splitting on underscores
    const term_list = term_list_extract(name_string);
    
    // Compare each term with the corresponding term from the previous name
    // This determines which terms should be gray (repeated) or white (new/different)
    const term_list_same_is = term_list_compare(term_list, term_previous_list);
    
    // Process each term in the name
    term_list.forEach((term, index) => {
        // Check if this term is the same as in the previous name
        const term_same_is = term_list_same_is[index];
        
        // Determine the style (gray or white) based on whether the term is repeated
        const term_style_string = term_style_determine(term_same_is);
        
        // Create an element for this term
        const term_ele = dom_ele_create('span');
        dom_ele_class_add(term_ele, 'term');
        dom_ele_class_add(term_ele, `term_${term_style_string}`); // Add style-specific class
        dom_ele_text_set(term_ele, term); // Set the text content
        dom_ele_append(term_dom_container, term_ele); // Add to the container
        
        // If this isn't the last term, add a separator (_)
        if (index < term_list.length - 1) {
            // Create separator with the same style as its preceding term
            const separator_ele = dom_ele_create('span');
            dom_ele_class_add(separator_ele, 'separator');
            dom_ele_class_add(separator_ele, `separator_${term_style_string}`);
            dom_ele_text_set(separator_ele, '_');
            dom_ele_append(term_dom_container, separator_ele);
        }
    });
    
    // Return both the created DOM element and the terms for the next name to compare against
    return { name_ele: name_div, term_list: term_list };
};
// Append a child element to a parent element
const dom_ele_append = (parent, child) => {
    parent.appendChild(child);
    return parent;
};
// Create a DOM element
const dom_ele_create = (tag) => {
    return document.createElement(tag);
};
// Add a class to a DOM element
const dom_ele_class_add = (element, class_name) => {
    element.classList.add(class_name);
    return element;
};
// Set text content of a DOM element
const dom_ele_text_set = (element, text) => {
    element.textContent = text;
    return element;
};
// Extract terms from a name
const term_list_extract = (name_string) => {
    return string_split_separator(name_string, '_');
};
// Compare terms between current and previous function
const term_list_compare = (term_list, term_previous_list) => {
    if (!term_previous_list) return term_list.map(() => false);
    return term_list.map((term, index) => {
        return term_previous_list[index] === term;
    });
};
// Determine the style for a term based on comparison
const term_style_determine = (term_same_is) => {
    return term_same_is ? 'gray' : 'white';
};
// Split a string by a separator
const string_split_separator = (string, separator) => {
    return string.split(separator);
};
// Sort an array alphabetically
const array_sort_alphabetically = (array) => {
    return [...array].sort();
};
// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', app_initialize); 
