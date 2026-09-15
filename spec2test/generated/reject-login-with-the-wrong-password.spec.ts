import { test, expect } from '@playwright/test';
import { apiClient } from '../client/apiClient';

export const criterionId = "C-LOGIN-WRONG-PASSWORD";

test("reject login with the wrong password", async () => {
  const requestBody = {
    "user": {
      "email": "spec2test_login_fixture@spec2test.dev",
      "password": "WrongPassword!",
    },
  };
  const { status, body } = await apiClient.request("POST", "/api/users/login", { body: requestBody, auth: "none" });

  // assertion: status_403
  expect(status === 403).toBeTruthy();
  // assertion: has_error
  expect(body.errors).toBeTruthy();
});
