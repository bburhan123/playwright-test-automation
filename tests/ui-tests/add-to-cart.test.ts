import { test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { HomePage } from '../../pages/home-page';
import { CartPage } from '../../pages/cart-page';

test.describe('Add to cart functionality',() => {

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await page.goto('https://www.demoblaze.com/');
    });

    test('should allow the user to add a product with more than 1 quantity to the cart', async({page}) => { 
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        await homePage.clickMonitors();
        await homePage.clickProduct('Apple monitor 24');
        await  homePage.clickAddToCartButton();
        (await page.waitForEvent('dialog')).accept();

        await  homePage.clickAddToCartButton();
        (await page.waitForEvent('dialog')).accept();

        await homePage.navigateMenu('Cart');

        await expect(page.getByRole('cell', { name: 'Apple monitor 24' })).toHaveCount(2);
        await cartPage.verifyTotalPrice('800');
    });

    test('should allow the user to add multiple products to the cart', async({page}) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        await homePage.clickPhones();
        await homePage.clickProduct('Nexus 6');
        await homePage.clickAddToCartButton();
        (await page.waitForEvent('dialog')).accept();
        
        await homePage.navigateMenu('Home (current)');

        await homePage.clickMonitors();
        await homePage.clickProduct('Apple monitor 24');
        await  homePage.clickAddToCartButton();
        (await page.waitForEvent('dialog')).accept();

        await homePage.navigateMenu('Cart');

        await expect(page.getByRole('cell', { name: 'Nexus 6' })).toHaveCount(1);
        await expect(page.getByRole('cell', { name: 'Apple monitor 24' })).toHaveCount(1);
        await cartPage.verifyTotalPrice('1050');
    });

    test('should allow the user to remove a product from the cart', async({page}) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        await homePage.clickPhones();
        await homePage.clickProduct('Nexus 6');
        await homePage.clickAddToCartButton();
        (await page.waitForEvent('dialog')).accept();

        await homePage.navigateMenu('Home (current)');

        await homePage.clickMonitors();
        await homePage.clickProduct('Apple monitor 24');
        await  homePage.clickAddToCartButton();
        (await page.waitForEvent('dialog')).accept();

        await homePage.navigateMenu('Cart');

        await expect(page.getByRole('cell', { name: 'Nexus 6' })).toHaveCount(1);
        await expect(page.getByRole('cell', { name: 'Apple monitor 24' })).toHaveCount(1);

        await page.locator('tr:has-text("Nexus 6") >> a:has-text("Delete")').click();

        await expect(page.getByRole('cell', { name: 'Nexus 6' })).toHaveCount(0);
        await expect(page.getByRole('cell', { name: 'Apple monitor 24' })).toHaveCount(1);
        await cartPage.verifyTotalPrice('400');
    });

    test('should allow the user to place the order', async({page}) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        await homePage.clickPhones();
        await homePage.clickProduct('Nexus 6');
        await homePage.clickAddToCartButton();
        (await page.waitForEvent('dialog')).accept();

        await homePage.navigateMenu('Home (current)');

        await homePage.clickMonitors();
        await homePage.clickProduct('Apple monitor 24');
        await  homePage.clickAddToCartButton();
        (await page.waitForEvent('dialog')).accept();

        await homePage.navigateMenu('Cart');

        await expect(page.getByRole('cell', { name: 'Nexus 6' })).toHaveCount(1);
        await expect(page.getByRole('cell', { name: 'Apple monitor 24' })).toHaveCount(1);
        await cartPage.verifyTotalPrice('1050');

        await cartPage.placeOrder('test','testcard');
        await cartPage.verifyThankYouMessage();
    });
});