Feature: User Authentication tests

  Background:
    Given User navigates to the application
    And User click on the login link

  Scenario: Login should be success
    And User enter the username as "pradeepsingh00791@gmail.com"
    And User enter the password as "test@123456"
    When User click on the LoginIn button
    Then Login should be success

  Scenario: Login should not be success
    Given User enter the username as "pradeepsingh00791@gmail.com"
    Given User enter the password as "test@12345"
    When User click on the LoginIn button
    But Login should fail
