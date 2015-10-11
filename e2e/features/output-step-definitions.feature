Feature: Output all step defintions

  @u
  Scenario: Output all step defintions
    Given I run Cucumber with Protractor

  @steps
  Scenario: Form test
    Given I am on the "home" page
    And I fill the form with the following data
      | field           | content     |
      | trip name       | test trip 1 |
      | trip percentage | 12.5        |
    And I click the "add trip" button
    Then I should see "test trip 1" in the "top panel heading" area
    When I click the "show hide" button
    Then I should not see the "people min" field
