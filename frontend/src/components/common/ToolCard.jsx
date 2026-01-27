import { Link } from 'react-router-dom';

function ToolCard({ tool }) {
    return (
        <Link
            to={tool.path}
            className="tool-card group hover:scale-105 transform transition-all duration-200"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{tool.icon}</div>
                {tool.popular && (
                    <span className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold px-2 py-1 rounded">
                        Popular
                    </span>
                )}
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                {tool.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {tool.description}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-500 uppercase font-medium">
                {tool.category}
            </span>
        </Link>
    );
}

export default ToolCard;
