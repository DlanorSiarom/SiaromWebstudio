import React, { useState } from 'react';
import { 
  Image, 
  UploadCloud, 
  Search, 
  Folder, 
  Trash2, 
  Eye, 
  FileText, 
  Download, 
  Sparkles, 
  X, 
  CheckCircle2, 
  RotateCcw,
  HardDrive
} from 'lucide-react';
import { MediaFile } from '../adminTypes';

interface MediaViewProps {
  mediaFiles: MediaFile[];
  onAddMediaFile: (file: MediaFile) => void;
  onDeleteMediaFile: (id: string) => void;
  onRestoreMediaFile: (id: string) => void;
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const MediaView: React.FC<MediaViewProps> = ({
  mediaFiles,
  onAddMediaFile,
  onDeleteMediaFile,
  onRestoreMediaFile,
  onAddToast
}) => {
  const [activeFolder, setActiveFolder] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
  const [showTrash, setShowTrash] = useState(false);

  const folders = ['todos', 'Banners', 'Portfólio', 'Documentos'];

  const filtered = mediaFiles.filter(f => {
    const isTrashed = Boolean(f.trashed);
    if (showTrash && !isTrashed) return false;
    if (!showTrash && isTrashed) return false;

    const matchesFolder = activeFolder === 'todos' || f.folder === activeFolder;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newMedia: MediaFile = {
        id: `med-${Date.now()}`,
        name: file.name.toLowerCase().replace(/\s+/g, '_'),
        type: file.type.startsWith('image') ? 'image' : 'document',
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024).toFixed(0)} KB`,
        folder: activeFolder === 'todos' ? 'Portfólio' : activeFolder,
        compressed: true,
        compressionSavings: '58% reduzido (WebP)',
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      onAddMediaFile(newMedia);
      onAddToast('Arquivo enviado e comprimido para WebP!', 'success');
    }
  };

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-black/90 border border-amber-900/50">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2 rounded bg-amber-950 text-amber-400 border border-amber-800">
            <Image className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Biblioteca de Mídias Cloud</h2>
            <p className="text-xs text-neutral-400 font-sans">Upload com otimização e compressão WebP/AVIF automática.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => setShowTrash(!showTrash)}
            className={`px-3 py-2 rounded-lg text-xs font-bold uppercase flex items-center space-x-1.5 transition-colors border ${
              showTrash 
                ? 'bg-rose-950 text-rose-300 border-rose-800' 
                : 'bg-neutral-900 text-neutral-400 border-amber-900/50 hover:text-white'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Lixeira</span>
          </button>

          <label className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer">
            <UploadCloud className="w-4 h-4" />
            <span>Fazer Upload</span>
            <input type="file" onChange={handleSimulatedUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Drag & Drop Zone Banner */}
      <div className="p-6 rounded-xl bg-neutral-950 border-2 border-dashed border-amber-900/60 text-center space-y-2 relative hover:border-amber-400 transition-colors cursor-pointer group">
        <UploadCloud className="w-8 h-8 text-amber-400 mx-auto group-hover:scale-110 transition-transform" />
        <h4 className="font-bold text-white uppercase text-xs">Arraste e solte arquivos aqui para otimização automática</h4>
        <p className="text-[11px] text-neutral-500 font-sans">Suporta PNG, JPG, WebP, SVG, PDF e MP4 até 50MB.</p>
      </div>

      {/* Folders & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Folders */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {folders.map(f => (
            <button
              key={f}
              onClick={() => setActiveFolder(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center space-x-1.5 transition-all ${
                activeFolder === f
                  ? 'bg-amber-400 text-black'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-amber-900/40'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>{f}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-amber-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar mídia..."
            className="w-full bg-neutral-950 border border-amber-900/60 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 uppercase"
          />
        </div>

      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-neutral-500 bg-neutral-950 rounded-xl border border-amber-900/40">
            {showTrash ? 'A lixeira está vazia.' : 'Nenhuma mídia encontrada na pasta selecionada.'}
          </div>
        ) : (
          filtered.map(media => (
            <div 
              key={media.id}
              className="p-3 rounded-xl bg-black border border-amber-900/50 hover:border-amber-400 transition-all space-y-2 group relative shadow-lg"
            >
              {/* Media Preview Box */}
              <div className="w-full h-32 rounded-lg bg-neutral-950 overflow-hidden flex items-center justify-center relative border border-neutral-900">
                {media.type === 'image' ? (
                  <img src={media.url} alt={media.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <FileText className="w-10 h-10 text-amber-400" />
                )}

                {media.compressed && (
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 border border-emerald-500 text-[9px] font-extrabold text-emerald-400 uppercase">
                    {media.compressionSavings}
                  </span>
                )}
              </div>

              {/* Title & Specs */}
              <div className="space-y-0.5">
                <span className="font-bold text-xs text-white uppercase block truncate">{media.name}</span>
                <div className="flex items-center justify-between text-[10px] text-neutral-500">
                  <span>{media.size}</span>
                  <span>{media.folder}</span>
                </div>
              </div>

              {/* Actions Overlay / Bar */}
              <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-xs">
                {!showTrash ? (
                  <>
                    <button
                      onClick={() => setPreviewFile(media)}
                      className="p-1.5 rounded hover:bg-neutral-900 text-amber-400 flex items-center space-x-1"
                      title="Visualizar Mídia"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase font-bold">Ver</span>
                    </button>

                    <button
                      onClick={() => {
                        onDeleteMediaFile(media.id);
                        onAddToast('Mídia movida para a Lixeira', 'warning');
                      }}
                      className="p-1.5 rounded hover:bg-rose-950 text-rose-400"
                      title="Mover para Lixeira"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onRestoreMediaFile(media.id);
                      onAddToast('Mídia restaurada com sucesso!', 'success');
                    }}
                    className="w-full py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px] uppercase flex items-center justify-center space-x-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restaurar</span>
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {/* Lightbox Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-neutral-950 border border-amber-500/50 rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-amber-900/40">
              <span className="font-bold text-white uppercase text-xs">{previewFile.name}</span>
              <button onClick={() => setPreviewFile(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-hidden rounded-lg bg-black flex items-center justify-center border border-neutral-800">
              {previewFile.type === 'image' ? (
                <img src={previewFile.url} alt={previewFile.name} className="max-h-96 object-contain" />
              ) : (
                <div className="p-12 text-center text-amber-400">
                  <FileText className="w-16 h-16 mx-auto mb-2" />
                  <span className="font-bold text-sm block">{previewFile.name}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-xs text-neutral-400">
              <span>Tamanho: <strong className="text-white">{previewFile.size}</strong></span>
              <span>Compressão: <strong className="text-emerald-400">{previewFile.compressionSavings}</strong></span>
              <button 
                onClick={() => onAddToast('Download iniciado', 'success')}
                className="px-4 py-2 bg-amber-400 text-black font-black uppercase text-xs rounded"
              >
                Download Arquivo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
