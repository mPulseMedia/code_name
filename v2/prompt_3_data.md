================================================================================

prompt_name: prompt_3_data

This overview previews the key phases of designing the data structures and persistence layer that will be detailed in subsequent prompts.

3 data            - Design core data structures and persistence
3A schema         - Define TypeScript interfaces for all data entities
3B storage        - Implement local storage persistence layer
3C access         - Create data access hooks and context providers
3D review         - Review and refine data model and codename conventions

================================================================================

prompt_name: prompt_3A_schema

3A1 entity        - Define core data entities
                     - Create TypeScript interfaces for primary data structures
                     - Define relationships between different entities
                     - Establish property types and validation rules
                     - Document the schema design decisions

3A2 types         - Create shared type definitions
                     - Define common types used across multiple components
                     - Create utility types for generic operations
                     - Implement strict typing for all data structures
                     - Ensure type safety across the application

3A3 validate      - Implement data validation
                     - Define validation rules for each entity
                     - Create validation utilities for form inputs
                     - Implement runtime type checking where needed
                     - Document validation requirements for each entity

3A4 schema_review - Review data schema design
                     - Validate schema against application requirements
                     - Check for consistency across all entity definitions
                     - Ensure proper type safety throughout
                     - Document schema design patterns for future reference

================================================================================

prompt_name: prompt_3B_storage

3B1 local_store   - Implement localStorage persistence
                     - Create utilities for saving data to localStorage
                     - Implement data serialization and deserialization
                     - Add versioning for schema compatibility
                     - Handle storage limits and fallbacks

3B2 state_sync    - Synchronize state with storage
                     - Create utilities to sync React state with storage
                     - Implement optimistic updates for better UX
                     - Handle storage events for multi-tab support
                     - Add error handling for storage operations

3B3 cache         - Implement caching mechanisms
                     - Create in-memory cache for frequently accessed data
                     - Implement cache invalidation strategies
                     - Add TTL (time-to-live) for cached items
                     - Optimize performance through strategic caching

3B4 store_test    - Test storage functionality
                     - Verify data persistence across page refreshes
                     - Test storage limit handling
                     - Validate storage sync mechanisms
                     - Measure performance of storage operations

================================================================================

prompt_name: prompt_3C_access

3C1 hooks         - Create data access hooks
                     - Implement custom hooks for each data entity
                     - Create hooks for common data operations
                     - Add loading and error states to hooks
                     - Ensure consistent API across all data hooks

3C2 context       - Implement React Context for data access
                     - Create data context providers
                     - Implement selectors for optimized renders
                     - Add memoization for performance
                     - Provide global data access patterns

3C3 mutation      - Create data mutation utilities
                     - Implement CRUD operations for all entities
                     - Add optimistic updates for UI responsiveness
                     - Create undo/redo functionality
                     - Implement data validation before mutations

3C4 selector      - Optimize data selection
                     - Create selectors for derived data
                     - Implement memoization for expensive computations
                     - Establish patterns for component-specific data filtering
                     - Document selector usage patterns

================================================================================

prompt_name: prompt_3D_review

3D1 api_review    - Review data access API design
                     - Ensure consistent API patterns across all data utilities
                     - Verify proper error handling throughout
                     - Check performance of data operations
                     - Document API design patterns

3D2 data_check    - Verify data integrity
                     - Test data persistence across different scenarios
                     - Verify data consistency across components
                     - Check for potential data corruption issues
                     - Implement data recovery mechanisms

3D3 perform       - Optimize data performance
                     - Measure and optimize data operation performance
                     - Implement performance monitoring
                     - Add benchmarks for critical data operations
                     - Document performance best practices

3D4 docs          - Complete data system documentation
                     - Document all data entities and their properties
                     - Create usage examples for data hooks and utilities
                     - Document data flow throughout the application
                     - Create diagrams for data relationships

================================================================================
