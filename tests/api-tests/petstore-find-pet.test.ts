import { test, expect, request} from '@playwright/test';
import { log } from 'console';

test.describe('Petstore API Tests - Find pet by ID',() => {

    const baseURL = 'https://petstore.swagger.io/v2';
    const apiKey  = 'special-key';

    //let petId: number;

    test.beforeAll(async ({request}) => {
      const newPet = {
        id: 9876543219,
        category: { id: 1, name: 'cats' },
        name: 'test pet',
        photoUrls: ['https://petstore.com/cat1.jpg'],
        status: 'available',
      };

      const response = await request.post(`${baseURL}/pet`, {
        headers: {
          Authorization: apiKey,
        },
        data: newPet,
      });

      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      console.log(responseBody);
      //petId = responseBody.petId
    });

    test('Should find pet by valid ID', async ({ request }) => {
      const petId = 9876543219;
  
      const response = await request.get(`${baseURL}/pet/${petId}`, {
        headers: {
          Authorization: apiKey,
        },
      });
  
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      console.log(responseBody);
      expect(responseBody.id).toBe(petId);
      expect(responseBody.name).toBe('test pet');
    });

    test('Should return 404 for non-existing ID', async ({ request }) => {
      const petId = 98765432198765;
  
      const response = await request.get(`${baseURL}/pet/${petId}`, {
        headers: {
          Authorization: apiKey,
        },
      });
  
      expect(response.status()).toBe(404);
    });
});