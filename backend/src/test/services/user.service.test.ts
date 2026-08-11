import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";
import * as userRepo from "../../repositories/user.repository";
import * as tokenUtil from "../../utils/token";
import { registerUser, loginUser } from "../../services/user.service";
import { AppError } from "../../utils/error";

describe("user.service", () => {
  afterEach(() => sinon.restore());

  describe("registerUser", () => {
    it("throws 409 if email already exists", async () => {
      sinon.stub(userRepo, "findByEmail").resolves({
        id: "u1",
        email: "a@a.com",
        passwordHash: "x",
        username: "a",
      } as any);

      try {
        await registerUser({
          email: "a@a.com",
          password: "123456",
          username: "a",
        });
        expect.fail("should have thrown");
      } catch (err) {
        expect((err as AppError).statusCode).to.equal(409);
      }
    });

    it("creates user and strips passwordHash from result", async () => {
      sinon.stub(userRepo, "findByEmail").resolves(null);
      sinon.stub(bcrypt, "hash").resolves("hashedpw" as never);
      sinon.stub(userRepo, "createUser").resolves({
        id: "u1",
        email: "a@a.com",
        passwordHash: "hashedpw",
        username: "a",
      } as any);

      const result = await registerUser({
        email: "a@a.com",
        password: "123456",
        username: "a",
      });

      expect(result).to.not.have.property("passwordHash");
    });
  });

  describe("loginUser", () => {
    it("throws 401 when user not found", async () => {
      sinon.stub(userRepo, "findByEmail").resolves(null);

      try {
        await loginUser({ email: "x@x.com", password: "wrong" });
        expect.fail("should have thrown");
      } catch (err) {
        expect((err as AppError).statusCode).to.equal(401);
      }
    });

    it("throws 401 when password is wrong", async () => {
      sinon.stub(userRepo, "findByEmail").resolves({
        id: "u1",
        email: "a@a.com",
        passwordHash: "hashed",
        username: "a",
      } as any);
      sinon.stub(bcrypt, "compare").resolves(false as never);

      try {
        await loginUser({ email: "a@a.com", password: "wrong" });
        expect.fail("should have thrown");
      } catch (err) {
        expect((err as AppError).statusCode).to.equal(401);
      }
    });

    it("returns token and user without passwordHash on success", async () => {
      sinon.stub(userRepo, "findByEmail").resolves({
        id: "u1",
        email: "a@a.com",
        passwordHash: "hashed",
        username: "a",
      } as any);
      sinon.stub(bcrypt, "compare").resolves(true as never);
      sinon.stub(tokenUtil, "signToken").returns("fake.jwt.token");

      const result = await loginUser({ email: "a@a.com", password: "correct" });

      expect(result.token).to.equal("fake.jwt.token");
      expect(result.user).to.not.have.property("passwordHash");
    });
  });
});
