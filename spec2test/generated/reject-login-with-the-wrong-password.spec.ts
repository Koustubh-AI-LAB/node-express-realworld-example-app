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

  await test.step("assertion: status_403", async () => {
    expect(status === 403).toBeTruthy();
  });
  await test.step("assertion: has_error", async () => {
    expect(body.errors).toBeTruthy();
  });
});
