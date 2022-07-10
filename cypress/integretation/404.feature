Feature: Page not found

    Check error messages are displayed

    Scenario: Error 404 page
        Given I open "404" page
        And I see "Pokemon escaped" text in section "main"
        And I do not see "bulbasaur" text in section "main"