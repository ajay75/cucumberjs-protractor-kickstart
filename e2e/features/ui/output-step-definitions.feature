Feature: Output all step defintions

  @steps
  Scenario: Form test
    Given I am on the home page
    And I fill the form with the following data
      | field           | content     |
      | trip name       | test trip 1 |
      | trip percentage | 12.5        |
    And I click the add trip button
    Then I should see test in the top panel heading area
    When I click the delete trip button
    Then I should not see the top panel heading area


  @steps
  Scenario: Form test 2
    Given I am on the home page
    And I fill the form with the following data
      | field           | content     |
      | trip name       | test trip 1 |
      | trip percentage | 1           |
    And I click the add trip button
    Then I should see Profit -1% commission in the trip commission heading area
    When I click the delete trip button
    Then I should not see the top panel heading area


  @steps
  Scenario: Form test 2
    Given I am on the home page
    And I fill the form with the following data
      | field           | content     |
      | trip name       | test trip 1 |
      | trip percentage | 1           |
    And I click the add trip button
    When I click the delete trip button
    Then I should not see the top panel heading area