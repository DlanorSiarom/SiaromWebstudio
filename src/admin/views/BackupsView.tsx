import React, { useState } from 'react';
import { 
  DatabaseBackup, 
  Plus, 
  Download, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  X, 
  HardDrive,
  Sparkles
} from 'lucide-react';
import { BackupItem } from '../adminTypes';

interface BackupsViewProps {
  backups: BackupItem[];
  onAddBackup: (backup: BackupItem) => void;
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const BackupsView: React.FC<BackupsViewProps> = ({
  backups,
  onAddBackup,
  onAddToast
}) => {
  const [schedule, setSchedule] = useState<'diario' | 'semanal' | 'mensal'>('diario');
  const [restoreModalFile, setRestoreModalFile] = useState<BackupItem | null>(null);

  const handleCreateManualBackup = () => {
    const newBkp: BackupItem = {
      id: `bkp-${Date.now()}`,
      filename: `siarom_manual_snapshot_${new Date().toISOString().slice(0, 10)}.sql.gz`,
      size: '134.2 MB',
      type: 'manual',
      status: 'concluido',
      checksum: 'sha256:f9104082190a1208a9',
      createdAt: new Date().toLocaleString('pt-BR')
    };

    onAddBackup(newBkp);
    onAddToast('Snapshot manual do banco de dados criado!', 'success');
  };

  const handleConfirmRestore = () => {
    if (!restoreModalFile) return;
    onAddToast(`Restauração do backup ${restoreModalFile.filename} concluída com sucesso!`, 'success');
    setRestoreModalFile(null);
  };

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-black/90 border border-amber-900/50">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2 rounded bg-amber-950 text-amber-400 border border-amber-800">
            <DatabaseBackup className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Gestão de Backups & Snapshots Cloud</h2>
            <p className="text-xs text-neutral-400 font-sans">Snapshots automáticos criptografados com verificação de SHA256.</p>
          </div>
        </div>

        <button
          onClick={handleCreateManualBackup}
          className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Backup Agora</span>
        </button>
      </div>

      {/* Schedule Settings Card */}
      <div className="p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4">
        <h3 className="font-bold text-white text-sm uppercase">Agendamento de Backups Automáticos</h3>
        
        <div className="flex items-center space-x-4 text-xs">
          <label className="text-amber-400 font-bold uppercase">Frequência Automática:</label>
          <select
            value={schedule}
            onChange={(e) => {
              setSchedule(e.target.value as any);
              onAddToast('Frequência de backup alterada', 'info');
            }}
            className="bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white font-bold uppercase"
          >
            <option value="diario">DIÁRIO (AOS 03:00 DA MADRUGADA)</option>
            <option value="semanal">SEMANAL (TODA SEGUNDA-FEIRA)</option>
            <option value="mensal">MENSAL (TODO DIA 1º)</option>
          </select>
        </div>
      </div>

      {/* Backups Table */}
      <div className="bg-black/90 rounded-xl border border-amber-900/50 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-950 border-b border-amber-900/40 text-amber-400 uppercase text-[10px]">
            <tr>
              <th className="p-4">Arquivo Snapshot</th>
              <th className="p-4">Tamanho</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Data / Hora</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-900/30">
            {backups.map(bkp => (
              <tr key={bkp.id} className="hover:bg-neutral-900/60">
                <td className="p-4">
                  <div className="font-bold text-white">{bkp.filename}</div>
                  <div className="text-[9px] text-neutral-500 font-mono">{bkp.checksum}</div>
                </td>

                <td className="p-4 font-bold text-amber-400">{bkp.size}</td>

                <td className="p-4 uppercase text-[10px] font-bold text-neutral-300">{bkp.type}</td>

                <td className="p-4 text-neutral-400">{bkp.createdAt}</td>

                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px] uppercase">
                    {bkp.status}
                  </span>
                </td>

                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onAddToast(`Download do arquivo ${bkp.filename} iniciado`, 'success')}
                      className="p-1.5 rounded bg-neutral-900 hover:bg-amber-950 text-amber-400 border border-amber-900/60"
                      title="Baixar Backup"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setRestoreModalFile(bkp)}
                      className="p-1.5 rounded bg-neutral-900 hover:bg-cyan-950 text-cyan-400 border border-cyan-900/60"
                      title="Restaurar este Snapshot"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirm Restore Modal */}
      {restoreModalFile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-950 border border-amber-500/50 rounded-xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white uppercase flex items-center space-x-2">
              <RotateCcw className="w-5 h-5 text-cyan-400" />
              <span>Confirmar Restauração de Backup</span>
            </h3>

            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Deseja restaurar o banco de dados para o estado de <strong className="text-amber-400">{restoreModalFile.filename}</strong>? 
              Todos os registros subsequentes serão sobrescritos com este snapshot.
            </p>

            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={() => setRestoreModalFile(null)} className="px-4 py-2 bg-neutral-900 text-neutral-300 text-xs">
                Cancelar
              </button>
              <button onClick={handleConfirmRestore} className="px-4 py-2 bg-cyan-500 text-black font-black text-xs uppercase">
                Restaurar Agora
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
