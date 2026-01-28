import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { FiSearch, FiClock, FiStar, FiTool } from 'react-icons/fi';
import { toolsList } from '../../utils/toolsList';
import './CommandPalette.css';

function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [recentTools, setRecentTools] = useState([]);
    const navigate = useNavigate();

    // Load recent tools from localStorage
    useEffect(() => {
        const recent = JSON.parse(localStorage.getItem('recentlyUsed') || '[]');
        setRecentTools(recent.slice(0, 5));
    }, [open]);

    // Keyboard shortcut handler
    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    // Handle tool selection
    const handleSelect = useCallback((toolPath) => {
        setOpen(false);
        setSearch('');
        navigate(toolPath);
    }, [navigate]);

    // Close on escape
    useEffect(() => {
        if (!open) {
            setSearch('');
        }
    }, [open]);

    // Get popular tools
    const popularTools = toolsList.filter(tool => tool.popular);

    // Filter tools based on search
    const filteredTools = search
        ? toolsList.filter(tool =>
            tool.name.toLowerCase().includes(search.toLowerCase()) ||
            tool.description.toLowerCase().includes(search.toLowerCase()) ||
            tool.category.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-300 dark:border-gray-700"
                aria-label="Open command palette"
            >
                <FiSearch size={14} />
                <span>Search tools...</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">
                    ⌘K
                </kbd>
            </button>

            {/* Mobile Search Button */}
            <button
                onClick={() => setOpen(true)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Open search"
            >
                <FiSearch size={20} />
            </button>

            {/* Command Palette Dialog */}
            <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label="Command Palette"
                className="command-dialog"
            >
                <div className="command-container">
                    {/* Search Input */}
                    <div className="command-input-wrapper">
                        <FiSearch className="command-search-icon" size={18} />
                        <Command.Input
                            value={search}
                            onValueChange={setSearch}
                            placeholder="Search for tools..."
                            className="command-input"
                            autoFocus
                        />
                    </div>

                    {/* Results List */}
                    <Command.List className="command-list">
                        <Command.Empty className="command-empty">
                            <div className="text-center py-8">
                                <div className="text-4xl mb-2">🔍</div>
                                <p className="text-gray-500 dark:text-gray-400">No tools found</p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                                    Try a different search term
                                </p>
                            </div>
                        </Command.Empty>

                        {/* Recent Tools - Show when no search */}
                        {!search && recentTools.length > 0 && (
                            <Command.Group heading="Recent" className="command-group">
                                {recentTools.map((tool) => (
                                    <Command.Item
                                        key={tool.id}
                                        value={tool.name}
                                        onSelect={() => handleSelect(tool.path)}
                                        className="command-item"
                                    >
                                        <FiClock className="command-item-icon" size={16} />
                                        <div className="flex-1">
                                            <div className="command-item-title">{tool.name}</div>
                                            <div className="command-item-description">{tool.description}</div>
                                        </div>
                                        <span className="command-item-badge">{tool.icon}</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        )}

                        {/* Popular Tools - Show when no search */}
                        {!search && (
                            <Command.Group heading="Popular Tools" className="command-group">
                                {popularTools.slice(0, 8).map((tool) => (
                                    <Command.Item
                                        key={tool.id}
                                        value={tool.name}
                                        onSelect={() => handleSelect(tool.path)}
                                        className="command-item"
                                    >
                                        <FiStar className="command-item-icon text-primary-500" size={16} />
                                        <div className="flex-1">
                                            <div className="command-item-title">{tool.name}</div>
                                            <div className="command-item-description">{tool.description}</div>
                                        </div>
                                        <span className="command-item-badge">{tool.icon}</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        )}

                        {/* Search Results */}
                        {search && filteredTools.length > 0 && (
                            <Command.Group heading="Tools" className="command-group">
                                {filteredTools.map((tool) => (
                                    <Command.Item
                                        key={tool.id}
                                        value={tool.name}
                                        onSelect={() => handleSelect(tool.path)}
                                        className="command-item"
                                    >
                                        <FiTool className="command-item-icon" size={16} />
                                        <div className="flex-1">
                                            <div className="command-item-title">{tool.name}</div>
                                            <div className="command-item-description">{tool.description}</div>
                                        </div>
                                        <span className="command-item-badge">{tool.icon}</span>
                                        <span className="command-item-category">{tool.category}</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        )}
                    </Command.List>

                    {/* Footer with keyboard hints */}
                    <div className="command-footer">
                        <div className="command-footer-hint">
                            <kbd>↑↓</kbd> Navigate
                        </div>
                        <div className="command-footer-hint">
                            <kbd>↵</kbd> Select
                        </div>
                        <div className="command-footer-hint">
                            <kbd>ESC</kbd> Close
                        </div>
                    </div>
                </div>
            </Command.Dialog>
        </>
    );
}

export default CommandPalette;
