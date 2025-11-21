Feature: API Testing with Hooks

  @api
  Scenario: Validate GET request
    When I send a GET request to "https://jsonplaceholder.typicode.com/posts/1"
    Then the response status should be 200
    And the response should contain "userId"

  @api
  Scenario: Validate POST request
    When I send a POST request to "https://jsonplaceholder.typicode.com/posts" with body:
      """
      {
        "title": "foo",
        "body": "bar",
        "userId": 1
      }
      """
    Then the response status should be 201
    And the response should contain "id"

  @api
  Scenario: Validate PUT request
    When I send a PUT request to "https://jsonplaceholder.typicode.com/posts/1" with body:
      """
      {
        "id": 1,
        "title": "updated title",
        "body": "updated body",
        "userId": 1
      }
      """
    Then the response status should be 200
    And the response should contain "title"

  @api
  Scenario: Validate DELETE request
    When I send a DELETE request to "https://jsonplaceholder.typicode.com/posts/1"
    Then the response status should be 200
