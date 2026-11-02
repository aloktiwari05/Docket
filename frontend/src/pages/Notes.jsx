import { useState, useEffect } from 'react';
import { Plus, Trash2, StickyNote, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

function Notes() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow_notes');
      return saved ? JSON.parse(saved) : [
        {
          id: 1,
          title: "Meeting Preparation",
          content: "Prepare sprint backlog items, review open pull requests, and list upcoming blocker tasks.",
          date: new Date().toLocaleDateString()
        },
        {
          id: 2,
          title: "Idea: Dark Mode Support",
          content: "Look into adding tailwind dark: classes with a system color scheme toggle in settings.",
          date: new Date().toLocaleDateString()
        }
      ];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('taskflow_notes', JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save notes:", e);
    }
  }, [notes]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      toast.warning("Please provide a note title or content");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim() || "Untitled Note",
      content: content.trim(),
      date: new Date().toLocaleDateString()
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setIsAdding(false);
    toast.success("Note saved successfully!");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    toast.info("Note deleted");
  };

  return (
    <div className="flex-1 w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Notes & Ideas
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Capture quick thoughts, agendas, and meeting notes
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4800FF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#4800FF]/25 hover:bg-[#3d00d6] transition self-start sm:self-auto"
        >
          <Plus size={18} />
          <span>{isAdding ? "Cancel" : "New Note"}</span>
        </button>
      </div>

      {/* New Note Form */}
      {isAdding && (
        <form
          onSubmit={handleAddNote}
          className="mb-8 bg-white border border-gray-200/80 rounded-3xl p-5 sm:p-6 shadow-md transition-all animate-in fade-in duration-150"
        >
          <h3 className="text-base font-bold text-gray-900 mb-3">Add Quick Note</h3>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10 mb-3"
          />
          <textarea
            rows={3}
            placeholder="Write your note contents here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10 mb-4 resize-none"
          />
          <div className="flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#4800FF] px-5 py-2 text-xs font-semibold text-white hover:bg-[#3d00d6] transition shadow-xs"
            >
              Save Note
            </button>
          </div>
        </form>
      )}

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100 p-8">
          <StickyNote className="w-12 h-12 text-gray-300 mb-3" />
          <h3 className="text-base font-bold text-gray-800">No notes yet</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-sm">
            Keep track of your quick thoughts, meeting notes, or ideas by creating a note.
          </p>
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="mt-4 rounded-xl bg-[#4800FF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3d00d6]"
          >
            Create first note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-base font-bold text-gray-900 break-words">
                    {note.title}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    aria-label="Delete note"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-wrap break-words leading-relaxed">
                  {note.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Note
                </span>
                <span>{note.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;
