Feature: Output all step defintions

  @steps
  Scenario: Output all step defintions
    Given I run Cucumber with Protractor

    @steps
  Scenario:
    Given I am on the "home" page
    And I click the "add trip" button
    And I fill the form with the following data
      | field           | content     |
      | trip name       | test trip 1 |
      | trip percentage | 12.5        |