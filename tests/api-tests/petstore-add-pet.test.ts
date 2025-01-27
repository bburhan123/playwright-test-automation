import { test, expect, request} from '@playwright/test';
import { log } from 'console';

test.describe('Petstore API Tests - Add a new pet to the store',() => {

    const baseURL = 'https://petstore.swagger.io/v2';
    const apiKey  = 'special-key';

    test('Should add a pet with all valid fields', async({request}) => {
        const newPet = {
          id: 9876543211,
          category: { id: 1, name: 'cats' },
          name: 'test pet 1',
          photoUrls: ['https://petstore.com/cat1.jpg'],
          tags: [{ id: 1, name: 'tag1' }],
          status: 'available'
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
        expect(responseBody).toEqual(expect.objectContaining(newPet));
    });

    test('Should add a pet with only required fields', async({request}) => {
      const newPet = {
        name: 'test pet 2',
        photoUrls: ['https://petstore.com/cat2.jpg']
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
      expect(responseBody.name).toBe(newPet.name);
  });

  //this is still returining 200 even without required fields. as per spec 405 shoud be returned for invalid input
  test.skip('Should return 405 eror with invalid fields', async({request}) => {
    const newPet = {
      status: 'na',
    };

    const response = await request.post(`${baseURL}/pet`, {
      headers: {
        Authorization: apiKey,
      },
      data: newPet,
    });

    expect(response.status()).toBe(405);
  
  });

  //this is still working for any invalid api key
  test.skip('Should return unauthorised 401 error with invalid api key', async({request}) => {
    const newPet = {
      name: 'test pet 2',
      photoUrls: ['https://petstore.com/cat2.jpg']
    };

    const response = await request.post(`${baseURL}/pet`, {
      headers: {
        Authorization: 'test-key',
      },
      data: newPet,
    });

    expect(response.status()).toBe(401);
  });
});