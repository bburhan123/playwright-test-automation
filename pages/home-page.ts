import {Page, Locator} from '@playwright/test';

export class HomePage {

    readonly page: Page;

    readonly menuNavigationLink: Locator;
    readonly phonesLink: Locator;
    readonly monitorsLink: Locator;
    readonly addToCartButton: Locator;

    constructor(page:Page) {
        this.page = page;
        this.phonesLink = page.getByRole('link', { name: 'Phones' });    
        this.monitorsLink = page.getByRole('link', { name: 'Monitors' });
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });  
    }

    async navigateMenu(menu: string) {
        await this.page.getByRole('link', { name: menu , exact: true}).click();
    }

    async clickMonitors() {
        await this.monitorsLink.click();
    }

    async clickPhones() {
        await this.phonesLink.click();
    }

    async clickProduct(productName: string) {
        await this.page.getByRole('link', { name: productName }).click();
    }

    async clickAddToCartButton() {
        await this.addToCartButton.click();
    }
}