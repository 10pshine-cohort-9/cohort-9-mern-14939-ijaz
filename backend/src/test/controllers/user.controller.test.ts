import { expect } from "chai";
import sinon from "sinon";
import * as userService from "../../services/user.service";
import {
  handleUserRegister,
  handleUserLogin,
  handleGetMe,
  handleUserLogout,
} from "../../controllers/user.controller";

function makeRes() {
  return { sendResponse: sinon.spy(), cookie: sinon.spy(), clearCookie: sinon.spy() } as any;
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

  it("handleUserLogin sets a token cookie and sends 200 with user only", async () => {
    const fakeResult = {
      token: "jwt.token",
      user: { id: "u1", email: "a@a.com" },
    };
    sinon.stub(userService, "loginUser").resolves(fakeResult as any);

    const req = { body: { email: "a@a.com", password: "correct" } } as any;
    const res = makeRes();

    await handleUserLogin(req, res);

    expect(res.cookie.calledOnce).to.be.true;
    const [cookieName, cookieValue] = res.cookie.firstCall.args;
    expect(cookieName).to.equal("token");
    expect(cookieValue).to.equal("jwt.token");

    const [statusCode, payload] = res.sendResponse.firstCall.args;
    expect(statusCode).to.equal(200);
    expect(payload.data).to.deep.equal({ user: fakeResult.user });
  });

  it("handleGetMe sends 200 with current user", async () => {
    const fakeUser = { id: "u1", email: "a@a.com" };
    sinon.stub(userService, "getCurrentUser").resolves(fakeUser as any);

    const req = { user: { id: "u1" } } as any;
    const res = makeRes();

    await handleGetMe(req, res);

    const [statusCode, payload] = res.sendResponse.firstCall.args;
    expect(statusCode).to.equal(200);
    expect(payload.data).to.deep.equal({ user: fakeUser });
  });

  it("handleUserLogout clears the token cookie and sends 200", async () => {
    const req = {} as any;
    const res = makeRes();

    await handleUserLogout(req, res);

    expect(res.clearCookie.calledOnce).to.be.true;
    expect(res.clearCookie.firstCall.args[0]).to.equal("token");

    const [statusCode, payload] = res.sendResponse.firstCall.args;
    expect(statusCode).to.equal(200);
    expect(payload.success).to.be.true;
  });
});
