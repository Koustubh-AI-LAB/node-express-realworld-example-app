import { test, expect } from '@playwright/test';
import { apiClient } from '../client/apiClient';

export const criterionId = "C-BRITTLE-LOGIN-SNAPSHOT";

test("brittle full-user snapshot on login (deliberately bad, for the Immunity check)", async () => {
  const requestBody = {
    "user": {
      "email": "spec2test_login_fixture@spec2test.dev",
      "password": "Spec2Test!1",
    },
  };
  const { status, body } = await apiClient.request("POST", "/api/users/login", { body: requestBody, auth: "none" });

  await test.step("assertion: exact_snapshot", async () => {
    expect(JSON.stringify((() => { const { token, ...rest } = body.user; return rest; })()) === '{"email":"spec2test_login_fixture@spec2test.dev","username":"spec2test_login_fixture","bio":null,"image":"https://api.realworld.io/images/smiley-cyrus.jpeg"}').toBeTruthy();
  });
});
