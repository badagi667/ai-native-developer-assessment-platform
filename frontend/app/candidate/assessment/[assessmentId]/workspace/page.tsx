"use client";

export default function CandidateWorkspacePage() {
  return (
    <main className="h-screen w-screen bg-slate-950">
      <iframe
        src="http://localhost:3001"
        className="h-full w-full border-0"
        title="OpenVSCode Workspace"
      />
    </main>
  );
}