rule_2_prompt

This file defines the conventions and formatting rules for prompt and rule files in the codename2 project.

================================================================================

rule_name: rule_2A_convention

2A convention      - Conventions for using prompts in the development process

2A1 intro_format   - Start each prompt file with a brief sentence explaining
                     the purpose followed by an overview of sections

2A2 exec_flow      - Execute prompts sequentially, documenting implementation
                     notes and required changes after each execution

2A3 name_rule      - Use consistent identifiers (e.g., prompt_1B_struct)
                     that serve as both plan references and execution history

2A4 prompt_reuse   - Prompts may be revisited, modified, and resubmitted as
                     needed throughout development

2A5 impl           - When executing a prompt, submit only that specific prompt
                     section, not the entire file

2A6 docs           - After execution, add implementation notes directly below
                     the prompt or in a designated notes section

2A7 version        - When modifying a previously executed prompt, indicate the
                     version change and reason for modification

2A8 prog_mark      - Use a "you are here" marker at the beginning of the file
                     to indicate current execution progress
                     - Move the marker down after each prompt is executed
                     - This provides a visual indication of which prompts have
                       been completed and which are pending execution
                     - Example: "# YOU ARE HERE" placed before the next prompt
                       to be executed

================================================================================

rule_name: rule_2B_format

2B format          - Formatting rules for all prompt files in the project

2B1 format_parts   - Components of prompt files in visual order (top to bottom)
                     - separator       : horizontal line of equals signs (====)
                     - prompt_section  : area between separator lines
                     - prompt_name     : identifier with format: prompt_name: prompt_#X_name
                     - outline_num     : hierarchical identifier (e.g., 1A2)
                     - keyword         : short word after outline number (e.g., "env")
                     - desc            : text to right of dash after keyword
                     - sub_bullet      : indented points under main description

2B2 numbering      - Use number without period for main sections (1 env)

2B3 subsection     - Use letters for subsections (1A setup)

2B4 id             - Use descriptive one-word identifiers for each line

2B5 align          - Align descriptions with consistent indentation

2B6 wrapping       - Wrap long descriptions before or at 80 chars to maintain
                     alignment

2B7 spacing        - Maintain consistent spacing between elements

2B8 separator      - Use 80-character separator lines (================) between
                     major sections

2B9 bullets        - Indent bullet points consistently under their parent items

2B10 file_name     - Use descriptive file names with format: type_#_name.md

2B11 desc_length   - Keep prompt descriptions concise, ideally fitting on one line
                     - For complex concepts, break into multiple steps
                     - Use sub-bullet points for detail, keeping each point short
                     - Ensure all descriptions are clear and scannable

2B12 align_symbol  - Apply symbol alignment rules from rule_1_codename.md
                     - Align colons and equals signs in lists for readability
                     - In documentation lists, align colons at column 18
                     - In code examples, align assignment operators
                     - Maintain consistent alignment within related sections

2B13 prompt_id     - Include prompt_name identifier at the start of each prompt section
                     - Format: prompt_name: prompt_#X_name
                     - Use same identifier as the section header
                     - This identifies the prompt for reference and execution
                     - Enables tracking and history of prompt execution

================================================================================

rule_name: rule_2C_comm

2C chat_comm       - Rules for chat communication about prompts

2C1 use_code       - Reference established codenames in chat updates
                     - ex: applied rule_2_prompt 2B12_align_symbol to file prompt_1_intro

2C2 concise        - Keep chat updates brief and to the point
                     - Use bullet points for multiple changes
                     - Minimize explanatory text
                     - Focus on what changed, not why

================================================================================ 