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

  // assertion: status_201
  expect(status === 201).toBeTruthy();
  // assertion: has_token
  expect(body.user.token).toBeTruthy();
});
