Feature: Add products to cart

  Background:
    Given User navigates to the application
    And User click on the login link

  @add
  Scenario Outline: Authenticated Users - Add to cart
    And User enter the username as "<username>"
    And User enter the password as "<password>"
    And User click on the LoginIn button
    When user search for a "<book>"
    And user add the book to the cart
    Then the cart badge should get updated

    Examples:
      | username                    | password    | book               |
      | pradeepsingh00791@gmail.com | test@123456 | The King In Yellow |
      | pradeepsingh00791@gmail.com | test@123456 | Outlive            |
