import { Link } from 'react-router-dom';

function ToolCard({ tool }) {
    return (
        <Link
            to={tool.path}
            className="tool-card group hover:scale-105 transform transition-all duration-300"
        >
            <div className="relative overflow-hidden h-full p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl transition-all duration-500 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-500/20 hover:-translate-y-1">
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                        {tool.popular && (
                            <span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold px-2 py-1 rounded group-hover:scale-105 transition-transform duration-300">
                                Popular
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-500 transition-colors duration-300">
                        {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {tool.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500 uppercase font-medium">
                            {tool.category}
                        </span>
                        <span className="text-primary-500 text-xl group-hover:translate-x-2 transition-all duration-300 font-bold">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ToolCard;
