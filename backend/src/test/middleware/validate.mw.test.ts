import { expect } from "chai";
import sinon from "sinon";
import { z } from "zod";
import { validate } from "../../middleware/validate.mw";
import { AppError } from "../../utils/error";

describe("validate middleware", () => {
  const schema = z.object({ name: z.string().min(1) });

  it("calls next() with no error when body is valid", () => {
    const req = { body: { name: "abc" } } as any;
    const next = sinon.spy();

    validate(schema)(req, {} as any, next);

    expect(next.calledOnceWith()).to.be.true;
    expect(req.body).to.deep.equal({ name: "abc" });
  });

  it("calls next() with AppError(400) when body is invalid", () => {
    const req = { body: {} } as any;
    const next = sinon.spy();

    validate(schema)(req, {} as any, next);

    const errArg = next.firstCall.args[0];
    expect(errArg).to.be.instanceOf(AppError);
    expect(errArg.statusCode).to.equal(400);
  });
});
