import React, { useState, useEffect } from 'react';
import { X, Save, Tag } from 'lucide-react';

interface ChatInterfaceProps {
  consultant?: {
    name: string;
    specialty: string;
    image: string;
  };
  onClose?: () => void;
}

const defaultConsultant = {
  name: "Alex Chen",
  specialty: "AI Business Strategist",
  image: "/api/placeholder/48/48"
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  consultant = defaultConsultant,
  onClose = () => {}
}) => {
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [showNotes] = useState(true);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.id = 'audio_iframe';
    iframe.allow = 'microphone';
    iframe.width = '100%';
    iframe.height = '110%'; // Set height to full
    iframe.style.border = 'none';

    // Set iframe src based on the consultant's name
    if (consultant.name === "Alex Chen") {
      iframe.src = 'https://widget.synthflow.ai/widget/v2/1730787406161x657150138977701000/1730787406045x117561845545545170';
    } else if (consultant.name === "Sarah Miller") {
      iframe.src = 'https://widget.synthflow.ai/widget/v2/1730831086044x797022574297205900/1730831085885x528378541025444200';
    } else if (consultant.name === "Marcus Johnson") {
      iframe.src = 'https://widget.synthflow.ai/widget/v2/1730832265961x618712349104065400/1730832265703x160025178942585950';
    }

    const iframeContainer = document.getElementById('iframe-container');
    if (iframeContainer) {
      iframeContainer.appendChild(iframe);
    }

    return () => {
      const existingIframe = document.getElementById('audio_iframe');
      if (existingIframe) {
        existingIframe.remove();
      }
    };
  }, [consultant]);

  const saveNote = () => {
    if (currentNote.trim()) {
      setNotes([...notes, currentNote]);
      setCurrentNote('');
    }
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex">
      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col p-6">
        <div className="bg-gray-800 w-full h-full rounded-lg shadow-lg flex flex-col"> {/* Full height and width */}
          {/* Header */}
          <div className="flex flex-row items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src={consultant.image}
                alt={consultant.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{consultant.name}</h2>
                <p className="text-gray-400">{consultant.specialty}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {/* Content */}
          <div className="flex-grow p-6 overflow-hidden"> {/* Made content area flexible */}
            <div id="iframe-container" className="w-full h-full bg-gray-800 rounded-lg overflow-hidden" />
          </div>
        </div>
      </div>

      {/* Notes Panel */}
      <div
        className={`w-96 bg-gray-800 transform transition-transform duration-300 ${
          showNotes ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <h3 className="text-xl font-bold">Session Notes</h3>

          <div className="space-y-4 mt-6">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-grow bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={saveNote}
                className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Save className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-3 flex items-start space-x-2"
                >
                  <Tag className="w-4 h-4 mt-1 flex-shrink-0" />
                  <p className="text-sm flex-grow">{note}</p>
                  <button
                    onClick={() => deleteNote(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
