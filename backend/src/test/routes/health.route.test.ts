import { expect } from "chai";
import request from "supertest";
import app from "../../app";

describe("GET /api/health", () => {
  it("returns 200 with healthy status", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
  });
});

describe("Unknown route", () => {
  it("returns 404 via the catch-all handler", async () => {
    const res = await request(app).get("/api/does-not-exist");

    expect(res.status).to.equal(404);
  });
});
