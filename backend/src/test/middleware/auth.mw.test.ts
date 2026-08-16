import { expect } from "chai";
import sinon from "sinon";
import * as tokenUtil from "../../utils/token";
import { authMiddleware } from "../../middleware/auth.mw";
import { AppError } from "../../utils/error";

describe("auth middleware", () => {
  afterEach(() => sinon.restore());

  it("calls next() with 401 when no token cookie is present", () => {
    const req = { cookies: {} } as any;
    const next = sinon.spy();

    authMiddleware(req, {} as any, next);

    const errArg = next.firstCall.args[0];
    expect(errArg).to.be.instanceOf(AppError);
    expect(errArg.statusCode).to.equal(401);
  });

  it("attaches req.user and calls next() when token cookie is valid", () => {
    sinon.stub(tokenUtil, "verifyToken").returns({ sub: "u1", iat: 1, exp: 2 });

    const req = { cookies: { token: "validtoken" } } as any;
    const next = sinon.spy();

    authMiddleware(req, {} as any, next);

    expect(req.user).to.deep.equal({ id: "u1" });
    expect(next.calledOnceWith()).to.be.true;
  });

  it("calls next() with 401 when token cookie is invalid", () => {
    sinon.stub(tokenUtil, "verifyToken").throws(new Error("bad token"));

    const req = { cookies: { token: "badtoken" } } as any;
    const next = sinon.spy();

    authMiddleware(req, {} as any, next);

    expect(next.firstCall.args[0].statusCode).to.equal(401);
  });
});
