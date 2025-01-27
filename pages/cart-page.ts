import {Page, Locator, expect} from '@playwright/test';

export class CartPage {

    readonly page: Page;
    
    readonly addToCartButton: Locator;
    readonly totalPriceText: Locator;
    readonly placeOrderButton: Locator;

    readonly nameInput: Locator;
    readonly creditCardInput: Locator;
    readonly purchaseButton: Locator;
    readonly thankYouMessage: Locator;
    readonly okButton: Locator;

    constructor(page:Page) {
        this.page = page;
        
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });  
        this.totalPriceText = page.locator('id=totalp');  
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });  
        this.nameInput = page.locator('id=name');  
        this.creditCardInput = page.locator('id=card'); 
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
        this.okButton = page.getByRole('button', { name: 'OK' });
        this.thankYouMessage = page.getByRole('heading', { name: 'Thank you for your purchase!' });
    }

    async verifyTotalPrice(totalPrice : string) {
        await expect(this.totalPriceText).toHaveText(totalPrice);
    }

    async placeOrder(name:string,creditCard:string) {
        await this.placeOrderButton.click();
        await this.nameInput.fill(name);
        await this.creditCardInput.fill(creditCard);
        await this.purchaseButton.click();
    }

    async verifyThankYouMessage() {
        await expect(this.thankYouMessage).toHaveText('Thank you for your purchase!');
    }
}