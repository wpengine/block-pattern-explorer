/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import PatternExplorerSidebar from './sidebar';
import PatternExplorerPreview from './preview';

/**
 * Render the block pattern inserter.
 *
 * @since 0.1.0
 * @param {Object} props All the props passed to this function
 * @return {string}      Return the rendered JSX
 */
export default function PatternExplorer( props ) {
	const {
		allPatterns,
		initialCategory,
		patternCategories,
		patternCategoryTypes,
	} = props;
	const [ selectedCategory, setSelectedCategory ] = useState(
		initialCategory?.name
	);
	const [ searchValue, setSearchValue ] = useState( '' );

	return (
		<div className="block-pattern-explorer">
			<PatternExplorerSidebar
				patternCategories={ patternCategories }
				patternCategoryTypes={ patternCategoryTypes }
				selectedCategory={ selectedCategory }
				setSelectedCategory={ setSelectedCategory }
				searchValue={ searchValue }
				setSearchValue={ setSearchValue }
			/>
			<PatternExplorerPreview
				allPatterns={ allPatterns }
				patternCategories={ patternCategories }
				selectedCategory={ selectedCategory }
				searchValue={ searchValue }
			/>
		</div>
	);
}
