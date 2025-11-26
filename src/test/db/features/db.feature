Feature: Supabase and Postgres DB Operations
  Validate database operations using Supabase API and direct Postgres queries

  @db
  Scenario: Insert a new user into Supabase
    Given I have a Supabase client
    When I insert a user into Supabase with name "John Doe" and email "john@example.com" and validate the user with email

  # @db
  # Scenario: Insert a new user directly into Postgres
  #   Given I have a Postgres connection
  #   When I insert a user into Postgres with name "Jane Doe" and email "jane@example.com"
  #   Then the user should exist in the database
