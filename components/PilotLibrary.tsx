/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState } from "react";
import { PILOTS_LIBRARY_DATA } from '../data/pilots_de_chasse_2025';
import type { PilotScene } from '../data/pilots_de_chasse_2025';
import { useLanguage } from "../contexts/LanguageContext";
import { IconClipboard, IconPrinter } from "@tabler/icons-react";

const PilotLibrary = () => {
    const { t } = useLanguage();
    const [scenes, setScenes] = useState<PilotScene[]>([]);
    const [query, setQuery] = useState("");
    const [tagFilter, setTagFilter] = useState("");
    const [selected, setSelected] = useState<PilotScene | null>(null);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const data = PILOTS_LIBRARY_DATA;
        setScenes(data.scenes || []);
        const allTags = Array.from(
            new Set((data.scenes || []).flatMap(s => s.tags || []))
        ).sort();
        setTags(allTags);
        if (data.scenes?.length > 0) {
            setSelected(data.scenes[0]);
        }
    }, []);

    const results = scenes.filter(s => {
        const q = query.trim().toLowerCase();
        const byQuery = !q || s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q) || (s.description && s.description.toLowerCase().includes(q));
        const byTag = !tagFilter || (s.tags || []).includes(tagFilter);
        return byQuery && byTag;
    });

    const resetFilters = () => {
        setQuery('');
        setTagFilter('');
        setSelected(results.length > 0 ? results[0] : null);
    };

    return (
        <div className="w-full h-full text-white">
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
                <input
                    className="flex-1 p-2 bg-neutral-800 border border-neutral-700 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Recherche (ex: pre-vol, mecanos...)"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <select
                    className="p-2 bg-neutral-800 border border-neutral-700 rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={tagFilter}
                    onChange={e => setTagFilter(e.target.value)}
                >
                    <option value="">Filtrer par tag — Tous</option>
                    {tags.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                <button
                    className="p-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-md w-full sm:w-auto"
                    onClick={resetFilters}
                >
                    Réinitialiser
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-60px)]">
                <div className="md:col-span-1 space-y-2 overflow-y-auto pr-2">
                    {results.map(scene => (
                        <article
                            key={scene.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${selected?.id === scene.id ? 'bg-amber-500/20 border-amber-500' : 'border-neutral-700 hover:bg-neutral-800'}`}
                            onClick={() => setSelected(scene)}
                        >
                            <h3 className="font-semibold text-amber-400">{scene.title}</h3>
                            <p className="text-sm text-neutral-300 mt-1">{scene.summary}</p>
                            <div className="mt-2 text-xs text-neutral-400 flex gap-1.5 flex-wrap">
                                {(scene.tags || []).map(t => <span key={t} className="px-2 py-0.5 bg-neutral-700 rounded-full">{t}</span>)}
                            </div>
                        </article>
                    ))}
                    {results.length === 0 && (
                        <div className="p-4 text-neutral-500">Aucun résultat.</div>
                    )}
                </div>

                <aside className="md:col-span-2 p-4 bg-black rounded-lg h-full overflow-y-auto">
                    {selected ? (
                        <>
                            <h3 className="font-bold text-xl text-amber-500">{selected.title}</h3>
                            <p className="text-base text-neutral-200 mt-3 whitespace-pre-wrap">{selected.description}</p>

                            {selected.lines && (
                                <div className="mt-4">
                                    <h4 className="font-medium text-neutral-400 uppercase text-xs tracking-wider">Dialogues</h4>
                                    <div className="mt-1 text-sm text-neutral-300 italic space-y-1">
                                        {selected.lines.map((c, i) => <p key={i}>"{c}"</p>)}
                                    </div>
                                </div>
                            )}

                             {selected.camera && (
                                <div className="mt-4">
                                    <h4 className="font-medium text-neutral-400 uppercase text-xs tracking-wider">Suggestions Caméra</h4>
                                    <ul className="list-disc ml-5 mt-1 text-sm text-neutral-300 space-y-1">
                                        {selected.camera.map((c, i) => <li key={i}><span className="font-bold capitalize">{c.type}:</span> {c.note}</li>)}
                                    </ul>
                                </div>
                            )}

                             {selected.checklist && (
                                <div className="mt-4">
                                    <h4 className="font-medium text-neutral-400 uppercase text-xs tracking-wider">Checklist Technique</h4>
                                    <ul className="list-disc ml-5 mt-1 text-sm text-neutral-300">
                                        {selected.checklist.map((c, i) => <li key={i}>{c}</li>)}
                                    </ul>
                                </div>
                            )}

                            <div className="mt-6 flex gap-3 border-t border-neutral-800 pt-4">
                                <button className="px-3 py-2 bg-neutral-800 text-white rounded-md flex items-center gap-2 hover:bg-neutral-700" onClick={() => window.print()}>
                                    <IconPrinter size={18} /> Imprimer
                                </button>
                                <button className="px-3 py-2 border border-neutral-700 rounded-md flex items-center gap-2 hover:bg-neutral-800" onClick={() => {
                                    navigator.clipboard.writeText(JSON.stringify(selected, null, 2));
                                }}>
                                    <IconClipboard size={18} /> Copier JSON
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-neutral-500 h-full flex items-center justify-center">Sélectionnez une scène pour voir les détails.</div>
                    )}
                </aside>
            </div>
        </div>
    );
};
export default PilotLibrary;
