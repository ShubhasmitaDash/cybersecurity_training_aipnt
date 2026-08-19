import React, { useState } from 'react';
import { useTrainer } from '../../context/TrainerContext';
import { Settings, Save, X, Building, User, Award, Shield } from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  const { trainerConfig, updateConfig } = useTrainer();

  const [formData, setFormData] = useState({
    orgName: trainerConfig.orgName,
    trainingTitle: trainerConfig.trainingTitle,
    trainerName: trainerConfig.trainerName,
    trainerTitle: trainerConfig.trainerTitle,
    passingScore: trainerConfig.passingScore,
    championScore: trainerConfig.championScore
  });

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gov-surface border border-gov-border rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gov-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-blue/30 text-brand-cyan border border-brand-cyan/40">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Trainer Administrative Configuration</h3>
              <p className="text-xs text-slate-400">Customize organization details, trainer info &amp; scoring thresholds</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gov-card hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSave} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Host Government Organization / Office:</span>
            </label>
            <input
              type="text"
              value={formData.orgName}
              onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-gov-dark border border-gov-border text-white text-sm focus:border-brand-cyan outline-none"
              placeholder="e.g. Sub-Collectorate Office, Khordha"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Program Training Title:</span>
            </label>
            <input
              type="text"
              value={formData.trainingTitle}
              onChange={(e) => setFormData({ ...formData, trainingTitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-gov-dark border border-gov-border text-white text-sm focus:border-brand-cyan outline-none"
              placeholder="e.g. Cyber-Smart Administration: Securing the Sub-Collectorate"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Trainer / Signatory Name:</span>
              </label>
              <input
                type="text"
                value={formData.trainerName}
                onChange={(e) => setFormData({ ...formData, trainerName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gov-dark border border-gov-border text-white text-sm focus:border-brand-cyan outline-none"
                placeholder="e.g. District Cyber Trainer / DIO"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Trainer Designation:</span>
              </label>
              <input
                type="text"
                value={formData.trainerTitle}
                onChange={(e) => setFormData({ ...formData, trainerTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gov-dark border border-gov-border text-white text-sm focus:border-brand-cyan outline-none"
                placeholder="e.g. District Informatics Officer"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">
                Passing Score Threshold (%):
              </label>
              <input
                type="number"
                value={formData.passingScore}
                onChange={(e) => setFormData({ ...formData, passingScore: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-gov-dark border border-gov-border text-white text-sm focus:border-brand-cyan outline-none"
                min={50}
                max={95}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">
                Champion Threshold (%):
              </label>
              <input
                type="number"
                value={formData.championScore}
                onChange={(e) => setFormData({ ...formData, championScore: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-gov-dark border border-gov-border text-white text-sm focus:border-brand-cyan outline-none"
                min={75}
                max={100}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gov-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-gov-card hover:bg-slate-700 border border-gov-border text-slate-300 text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-royal text-white font-bold text-sm shadow-glow-cyan"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
