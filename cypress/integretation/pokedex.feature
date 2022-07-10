Feature: Pokedex

    Loading all pokemon

    Scenario: Opening the pokedex
        Given I open "pokedex" page
        And I see "bulbasaur" text in section "main"