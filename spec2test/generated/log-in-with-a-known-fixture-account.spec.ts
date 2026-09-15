import { test, expect } from '@playwright/test';
import { apiClient } from '../client/apiClient';

export const criterionId = "C-LOGIN-USER";

test("log in with a known fixture account", async () => {
  const requestBody = {
    "user": {
      "email": "spec2test_login_fixture@spec2test.dev",
      "password": "Spec2Test!1",
    },
  };
  const { status, body } = await apiClient.request("POST", "/api/users/login", { body: requestBody, auth: "none" });

  // assertion: status_200
  expect(status === 200).toBeTruthy();
  // assertion: has_token
  expect(body.user.token).toBeTruthy();
  // assertion: correct_email
  expect(body.user.email === 'spec2test_login_fixture@spec2test.dev').toBeTruthy();
});
