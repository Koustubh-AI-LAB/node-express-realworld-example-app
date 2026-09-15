import { test, expect } from '@playwright/test';
import { apiClient } from '../client/apiClient';

export const criterionId = "C-REGISTER-USER";

test("register a new user", async () => {
  const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const requestBody = {
    "user": {
      "username": `spec2test_${uniqueSuffix}`,
      "email": `spec2test_${uniqueSuffix}@spec2test.dev`,
      "password": "Spec2Test!1",
    },
  };
  const { status, body } = await apiClient.request("POST", "/api/users", { body: requestBody, auth: "none" });

  await test.step("assertion: status_201", async () => {
    expect(status === 201).toBeTruthy();
  });
  await test.step("assertion: has_token", async () => {
    expect(body.user.token).toBeTruthy();
  });
});
