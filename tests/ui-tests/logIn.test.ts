import { test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { HomePage } from '../../pages/home-page';

test.describe('LogIn tests',() => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await page.goto('https://www.demoblaze.com/');
    });

    test('should login successfully with valid credentials', async({page}) => {
        const homePage = new HomePage(page);

        await homePage.navigateMenu('Log in');
        await loginPage.login('test', 'test');

        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
        await expect(page.locator('#nameofuser')).toHaveText('Welcome test');
    });

    test('should display an error alert for non existing user', async({page}) => {
        const homePage = new HomePage(page);

        await homePage.navigateMenu('Log in');
        await loginPage.login('test9876543210123', 'test');

        const dialog = await page.waitForEvent('dialog');
        await expect(dialog.message()).toBe('User does not exist.');
        await dialog.accept();        
    });

    test('should display an error alert for wrong password', async({page}) => {
        const homePage = new HomePage(page);

        await homePage.navigateMenu('Log in');
        await loginPage.login('test', 'test1');

        const dialog = await page.waitForEvent('dialog');
        await expect(dialog.message()).toBe('Wrong password.');
        await dialog.accept();        
    });

    test('should logout successfully', async({page}) => {
        const homePage = new HomePage(page);

        await homePage.navigateMenu('Log in');
        await loginPage.login('test', 'test');

        await homePage.navigateMenu('Log out');
        await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
    });
});