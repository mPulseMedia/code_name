# Codename2 Project

This project helps developers maintain consistent naming conventions in their code. It provides an interactive index of code naming patterns and tools for searching, filtering, and revealing code name components.

## Project-Specific Codenames

The following prefixes (root terms) are used throughout the codebase to organize functionality by domain:

| Prefix | Description | Example |
|--------|-------------|---------|
| `index` | Codename index functionality | `index_display`, `index_sort` |
| `codename` | Identifier functions and variables | `name_parse`, `name_validate` |
| `term` | Term components within a codename | `term_extract`, `term_count` |
| `root` | First term of a codename operations | `root_identify`, `root_check` |
| `search` | Search-related functionality | `search_execute`, `search_index` |
| `filter` | Filtering functionality | `filter_apply`, `filter_clear` |
| `lookup` | Code snippet retrieval | `lookup_find`, `lookup_display` |
| `reveal` | HTML & CSS codename reveal functions | `reveal_toggle`, `reveal_highlight` |
| `prompt_name` | Identifier for prompt sections | `prompt_name: prompt_1_intro` |
| `rule_name` | Identifier for rule sections | `rule_name: rule_1A_word` |

## Documentation Structure

The project uses two types of documentation files:

1. **Prompt Files**: Sequential instructions for developing the application
   - Format: `prompt_#_name.md` (e.g., `prompt_1_intro.md`)
   - Contains step-by-step development tasks

2. **Rule Files**: Conventions and standards for the codebase
   - Format: `rule_#_name.md` (e.g., `rule_1_codename.md`)
   - Contains codename conventions and formatting rules

See `rule_1_codename.md` and `rule_2_prompt.md` for the complete set of rules and conventions used in this project.

## Development Sections

The development process is broken down into these major sections:

1. Project overview and approach
2. Environment setup (Next.js + TypeScript + Tailwind)
3. Data structures and persistence
4. Logging system
5. UI components and layouts
6. Index viewing feature
7. Filtering capability
8. Search functionality
9. Lookup functionality
10. Reveal features
11. Error handling
12. Performance optimization
13. Documentation

For the complete development process, refer to `prompt_1_intro.md`. 