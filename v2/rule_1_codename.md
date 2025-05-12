rule_1_codename

This file defines the codename conventions and code appearance rules for the codename2 project.

================================================================================

rule_name: rule_1A_word

1A word_choice      - Rules for selecting words and terms in codename identifiers

1A1 case            - All codenames in snake_case (variables, functions, CSS, 
                      constants, parameters, file names, event names, properties, 
                      element IDs; use user_name not userName)

1A2 boolean         - End with _is (example: visible_is, active_is, valid_is)

1A3 plural          - Use singular+_list, never pluralize (name_list NOT names)

1A4 verb_form       - Use present tense base verbs without modifiers
                      - Use simple form (enable, not enabled)
                      - Avoid -ing forms (load, not loading; create, not creating)
                      - Examples: filter_apply (not filter_applying or filter_applied)
                                 data_save (not data_saving or data_saved)
                                 user_authenticate (not user_authenticating)

1A5 abr             - Abbreviate terms that are long when there is a commonly 
                      understood abbreviation (ex: config, param)
                      preferred abbreviations:
                      - ele       : element
                      - prev      : previous
                      - str       : string
                      - var       : variable
                      - msg       : message

1A6 term_length     - Keep individual terms in codenames to 8 characters or less
                      - Long terms reduce readability and search effectiveness
                      - Use abbreviations when appropriate (config, not configuration)
                      - Break compound concepts into separate terms
                      - Examples: data_save (not data_persistence)
                                 user_add (not user_registration)

================================================================================

rule_name: rule_1B_structure

1B structural       - Rules for hierarchical structure of codenames

1B1 consistent      - Use consistent terms throughout the codebase, minimize 
                      different terms that refer to the same thing (ex: item vs 
                      element, get vs retrieve)

1B2 hierarchy       - Structure as objroot_objsub_attr_verb with objects/concepts first, 
                      verbs last (ex: user_profile_name_get not 
                      get_user_profile_name)

1B3 root            - Use approved general roots (prefixes) to organize code by domain:
                      - app       : entire application
                      - env       : environment
                      - dom       : DOM operations
                      - ui        : user interface components
                      - util      : utility functions
                      - data      : data operations
                      - auth      : authentication related
                      - error     : error handling

1B4 root_new        - When a codename becomes too long (4 or more terms) then consider
                      introducing a new root term. Each new root becomes its own
                      semantic concept that can be referenced. For example:
                      filter_search_button_clear → clear

1B5 project_roots   - Use these codename2 project-specific prefixes:
                      - index     : codename index functionality
                      - codename  : specific "term of art" for functions and variables, etc throughout project files
                      - term      : term components within a codename
                      - root      : first term of a codename operations
                      - search    : search-related functionality
                      - filter    : filtering functionality
                      - lookup    : code snippet retrieval
                      - reveal    : HTML & CSS codename reveal functions
                      - prompt_name : identifier for prompt sections
                      - rule_name   : identifier for rule sections

================================================================================

rule_name: rule_1C_format

1C format           - Rules for code and documentation formatting

1C1 naming          - Codename conventions and code appearance rules

1C2 align           - Align symbols (=, :) in sequences for readability if not 
                      breaking code (ex: align assignments in related variable 
                      declarations)

1C3 order           - Sort the codenames in .js files by their name, 
                      alphabetically (ex: group by domain prefix, then 
                      alphabetically)

1C4 compact         - In js files, no blank lines between functions, but blank 
                      lines within function is ok.
                      In css files, no blank spaces between class definitions.

1C5 format          - Maintain consistent formatting in documentation files:
                      - Use single-digit rule numbers (1, 2, 3, etc.)
                      - Align rule titles at column 13
                      - Align colons at column 18
                      - Indent wrapped lines to align with text (19 spaces)
                      - Indent sublists consistently (add 1 level/19 spaces)

================================================================================ 