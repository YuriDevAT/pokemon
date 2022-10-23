import { test, expect } from '@playwright/test';

test('pokedex has bulbasaur in list and go to details link linking to bulbasaurs details', async ({ page }) => {
  // await page.goto('/');

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveText(/bulbasaur/);

  // create a locator
  const getDetails = page.getByText('bulbasaur');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getDetails).toHaveAttribute('href', '/pokemon/1');

  // Click the get started link.
  await getDetails.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.:id/);
});
