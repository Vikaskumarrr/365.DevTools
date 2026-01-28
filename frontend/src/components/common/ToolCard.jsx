import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import GlareHover from '../effects/GlareHover';

function ToolCard({ tool, onClick }) {
    return (
        <Link
            to={tool.path}
            onClick={onClick}
            className="block focus:outline-none"
        >
            <GlareHover
                glareColor="#EF6E76"
                glareOpacity={0.15}
                glareAngle={-30}
                glareSize={250}
                transitionDuration={600}
                playOnce={false}
            >
                <article 
                    className="group h-full p-6 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl transition-all duration-300 hover:border-primary-500 dark:hover:border-primary-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10"
                    aria-labelledby={`tool-${tool.id}-title`}
                    aria-describedby={`tool-${tool.id}-desc`}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div 
                            className="text-3xl group-hover:scale-110 transition-transform duration-300"
                            aria-hidden="true"
                        >
                            {tool.icon}
                        </div>
                        {tool.popular && (
                            <span 
                                className="flex items-center space-x-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform duration-300"
                                aria-label="Popular tool"
                            >
                                <FiStar size={12} aria-hidden="true" />
                                <span>Popular</span>
                            </span>
                        )}
                    </div>
                    <h3 
                        id={`tool-${tool.id}-title`}
                        className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300"
                    >
                        {tool.name}
                    </h3>
                    <p 
                        id={`tool-${tool.id}-desc`}
                        className="text-gray-600 dark:text-gray-400 text-sm mb-3"
                    >
                        {tool.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                            {tool.category}
                        </span>
                        <span 
                            className="text-primary-500 text-2xl group-hover:translate-x-2 transition-all duration-300 font-bold"
                            aria-hidden="true"
                        >
                            →
                        </span>
                    </div>
                </article>
            </GlareHover>
        </Link>
    );
}

export default ToolCard;
