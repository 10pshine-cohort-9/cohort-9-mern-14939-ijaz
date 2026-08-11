import { expect } from "chai";
import sinon from "sinon";
import * as noteRepo from "../../repositories/notes.repository";
import {
  createNote,
  fetchNotes,
  fetchSingleNote,
  deleteNote,
  updateNote,
} from "../../services/notes.service";
import { AppError } from "../../utils/error";

describe("notes.service", () => {
  afterEach(() => sinon.restore());

  it("createNote calls repository with correct data", async () => {
    const fakeNote = { id: "n1", title: "t", content: "c", userId: "u1" };
    const stub = sinon.stub(noteRepo, "createNote").resolves(fakeNote as any);

    const result = await createNote({ title: "t", content: "c", userId: "u1" });

    expect(stub.calledOnceWith({ title: "t", content: "c", userId: "u1" })).to
      .be.true;
    expect(result).to.deep.equal(fakeNote);
  });

  it("fetchNotes returns notes scoped to userId", async () => {
    const fakeNotes = [{ id: "n1", userId: "u1" }];
    sinon.stub(noteRepo, "fetchNotesByUserId").resolves(fakeNotes as any);

    const result = await fetchNotes("u1");

    expect(result).to.deep.equal(fakeNotes);
  });

  describe("fetchSingleNote", () => {
    it("returns the note when it belongs to the user", async () => {
      const fakeNote = { id: "n1", userId: "u1" };
      sinon.stub(noteRepo, "fetchNote").resolves(fakeNote as any);

      const result = await fetchSingleNote("n1", "u1");

      expect(result).to.deep.equal(fakeNote);
    });

    it("throws 404 when note does not exist", async () => {
      sinon.stub(noteRepo, "fetchNote").resolves(null);

      try {
        await fetchSingleNote("n1", "u1");
        expect.fail("should have thrown");
      } catch (err) {
        expect((err as AppError).statusCode).to.equal(404);
      }
    });

    it("throws 403 when note belongs to a different user", async () => {
      sinon
        .stub(noteRepo, "fetchNote")
        .resolves({ id: "n1", userId: "otherUser" } as any);

      try {
        await fetchSingleNote("n1", "u1");
        expect.fail("should have thrown");
      } catch (err) {
        expect((err as AppError).statusCode).to.equal(403);
      }
    });
  });

  describe("deleteNote", () => {
    it("deletes when note belongs to the user", async () => {
      sinon
        .stub(noteRepo, "fetchNote")
        .resolves({ id: "n1", userId: "u1" } as any);
      const delStub = sinon
        .stub(noteRepo, "deleteNote")
        .resolves({ id: "n1" } as any);

      await deleteNote("n1", "u1");

      expect(delStub.calledOnceWith("n1")).to.be.true;
    });

    it("throws 403 when note belongs to a different user", async () => {
      sinon
        .stub(noteRepo, "fetchNote")
        .resolves({ id: "n1", userId: "otherUser" } as any);

      try {
        await deleteNote("n1", "u1");
        expect.fail("should have thrown");
      } catch (err) {
        expect((err as AppError).statusCode).to.equal(403);
      }
    });
  });

  describe("updateNote", () => {
    it("updates when note belongs to the user", async () => {
      sinon
        .stub(noteRepo, "fetchNote")
        .resolves({ id: "n1", userId: "u1" } as any);
      const updStub = sinon
        .stub(noteRepo, "updateNote")
        .resolves({ id: "n1", title: "new" } as any);

      await updateNote("n1", { title: "new" }, "u1");

      expect(updStub.calledOnceWith("n1", { title: "new" })).to.be.true;
    });

    it("throws 403 when note belongs to a different user", async () => {
      sinon
        .stub(noteRepo, "fetchNote")
        .resolves({ id: "n1", userId: "otherUser" } as any);

      try {
        await updateNote("n1", { title: "new" }, "u1");
        expect.fail("should have thrown");
      } catch (err) {
        expect((err as AppError).statusCode).to.equal(403);
      }
    });
  });
});
