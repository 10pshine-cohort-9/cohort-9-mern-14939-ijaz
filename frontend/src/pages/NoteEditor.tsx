import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Card from "../components/Card";
import Button from "../components/Button";
import RichTextEditor from "../components/RichTextEditor";
import { fetchSingleNote, createNote, updateNote } from "../api/notes";
import type { ApiError } from "../api/apiError";

function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    let active = true;
    setLoading(true);

    fetchSingleNote(id)
      .then((res) => {
        if (!active) return;
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        if (!active) return;
        setError((err as ApiError).message);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      if (isEditing && id) {
        await updateNote(id, title, content);
        toast.success("Note updated!");
      } else {
        await createNote(title, content);
        toast.success("Note created!");
      }
      navigate("/dashboard");
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-paper p-6 lg:p-10">
      <Card>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full font-display text-2xl mb-4 outline-none"
        />
        <RichTextEditor content={content} onChange={setContent} />
        {error && <p className="text-sm text-clay mt-3">{error}</p>}
        <div className="flex gap-3 mt-6">
          <Button onClick={handleSave} disabled={saving || !title || !content}>
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default NoteEditor;
