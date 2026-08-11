import { expect } from "chai";
import sinon from "sinon";
import * as noteService from "../../services/notes.service";
import {
  handleCreateNote,
  handleFetchNotes,
} from "../../controllers/notes.controller";
import { AppError } from "../../utils/error";

function makeRes() {
  return { sendResponse: sinon.spy() } as any;
}

describe("notes.controller", () => {
  afterEach(() => sinon.restore());

  it("handleCreateNote sends 201 with created note", async () => {
    const fakeNote = { id: "n1", title: "t", content: "c", userId: "u1" };
    sinon.stub(noteService, "createNote").resolves(fakeNote as any);

    const req = {
      body: { title: "t", content: "c" },
      user: { id: "u1" },
    } as any;
    const res = makeRes();

    await handleCreateNote(req, res);

    const [statusCode, payload] = res.sendResponse.firstCall.args;
    expect(statusCode).to.equal(201);
    expect(payload.data).to.deep.equal(fakeNote);
  });

  it("handleCreateNote sends error response when service throws AppError", async () => {
    sinon
      .stub(noteService, "createNote")
      .rejects(new AppError(409, "duplicate"));

    const req = {
      body: { title: "t", content: "c" },
      user: { id: "u1" },
    } as any;
    const res = makeRes();

    await handleCreateNote(req, res);

    const [statusCode, payload] = res.sendResponse.firstCall.args;
    expect(statusCode).to.equal(409);
    expect(payload.success).to.be.false;
  });

  it("handleFetchNotes sends 200 with user's notes", async () => {
    const fakeNotes = [{ id: "n1", userId: "u1" }];
    sinon.stub(noteService, "fetchNotes").resolves(fakeNotes as any);

    const req = { user: { id: "u1" } } as any;
    const res = makeRes();

    await handleFetchNotes(req, res);

    const [statusCode, payload] = res.sendResponse.firstCall.args;
    expect(statusCode).to.equal(200);
    expect(payload.data).to.deep.equal(fakeNotes);
  });
});
