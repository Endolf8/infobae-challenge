import React from 'react';

interface EditorAssistantPanelProps {
  history: string[];
  customPrompt: string;
  setCustomPrompt: (value: string) => void;
  handlePromptSubmit: () => void;
}
const EditorAssistantPanel = ({
  history,
  customPrompt,
  setCustomPrompt,
  handlePromptSubmit,
}: EditorAssistantPanelProps) => {
  return (
    <div className="h-full flex-1 relative w-full flex flex-col">
      <div className="px-xl">
        <h2 className="text-xl font-semibold">Asistente de edición</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.map((msg, index) => (
          <div key={index} className="flex relative w-full justify-end">
            <div className="relative bg-n0  border border-p1 text-n4  text-sm px-4 py-2 w-full rounded-lg ">
              {msg}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full p-4  bg-sharp-gradient  flex flex-col gap-2 rounded-br-lg z-10 ">
        <label
          htmlFor="prompt"
          className="block mb-2 text-n10 font-medium text-sm"
        >
          ¿Querés hacer un cambio?
        </label>
        <textarea
          id="prompt"
          placeholder="Ej: Redactalo en tono más informal"
          className="w-full  shadow-e1 text-sm p-3 text-n10  rounded-md placeholder:text-n3 resize-none bg-n0 focus:outline-none focus:ring-1 focus:shadow-e4 focus:ring-n-p1 border border-p1"
          rows={3}
          style={{ minHeight: '60px', maxHeight: '160px' }}
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handlePromptSubmit();
            }
          }}
        />
      </div>
    </div>
  );
};

export default EditorAssistantPanel;
