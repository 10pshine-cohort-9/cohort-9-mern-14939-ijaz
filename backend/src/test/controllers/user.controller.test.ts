import { expect } from "chai";
import sinon from "sinon";
import * as userService from "../../services/user.service";
import {
  handleUserRegister,
  handleUserLogin,
} from "../../controllers/user.controller";

function makeRes() {
  return { sendResponse: sinon.spy() } as any;
}

describe("user.controller", () => {
  afterEach(() => sinon.restore());

  it("handleUserRegister sends 201 with created user", async () => {
    const fakeUser = { id: "u1", email: "a@a.com", username: "a" };
    sinon.stub(userService, "registerUser").resolves(fakeUser as any);

    const req = {
      body: { email: "a@a.com", password: "123456", username: "a" },
    } as any;
    const res = makeRes();

    await handleUserRegister(req, res);

    const [statusCode, payload] = res.sendResponse.firstCall.args;
    expect(statusCode).to.equal(201);
    expect(payload.data).to.deep.equal(fakeUser);
  });

  it("handleUserLogin sends 200 with token and user", async () => {
    const fakeResult = {
      token: "jwt.token",
      user: { id: "u1", email: "a@a.com" },
    };
    sinon.stub(userService, "loginUser").resolves(fakeResult as any);

    const req = { body: { email: "a@a.com", password: "correct" } } as any;
    const res = makeRes();

    await handleUserLogin(req, res);

    const [statusCode, payload] = res.sendResponse.firstCall.args;
    expect(statusCode).to.equal(200);
    expect(payload.data).to.deep.equal(fakeResult);
  });
});
