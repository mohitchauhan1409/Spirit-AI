import React, { useState, useEffect } from 'react';
import { X, Save, Tag, MessageSquare } from 'lucide-react';

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
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.id = 'audio_iframe';
    iframe.allow = 'microphone';
    iframe.width = '100%';
    iframe.height = '100%';
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

      // Create and inject CSS to hide "Powered by Synthflow"
      const style = document.createElement('style');
      style.textContent! = `
        #audio_iframe {
          position: relative;
        }
        #audio_iframe::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30px;
          background: #1f2937;
          z-index: 1000;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const existingIframe = document.getElementById('audio_iframe');
      if (existingIframe) {
        existingIframe.remove();
      }
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent?.includes('#audio_iframe')) {
          style.remove();
        }
      });
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

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex">
      {/* Main Chat Area */}
      <div className={`flex-grow flex flex-col transition-all duration-300 ${
        showNotes ? 'md:mr-96' : ''
      }`}>
        <div className="bg-gray-800 w-full h-full shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={consultant.image}
                alt={consultant.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold text-white">{consultant.name}</h2>
                <p className="text-sm text-gray-400">{consultant.specialty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleNotes}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors relative"
              >
                {notes.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs flex items-center justify-center">
                    {notes.length}
                  </span>
                )}
                <MessageSquare className="w-6 h-6" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          {/* Content */}
          <div className="flex-grow overflow-hidden">
            <div id="iframe-container" className="w-full h-full bg-gray-800" />
          </div>
        </div>
      </div>

      {/* Notes Panel */}
      {showNotes && (
        <div className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-gray-800 border-l border-gray-700 transition-transform duration-300 transform translate-x-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-lg font-bold">Session Notes</h3>
            <button
              onClick={toggleNotes}
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
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
      )}
    </div>
  );
};

export default ChatInterface;
