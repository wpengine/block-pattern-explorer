/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { _n, sprintf } from '@wordpress/i18n';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { useAsyncList, useDebounce } from '@wordpress/compose';
import { speak } from '@wordpress/a11y';

/**
 * Internal dependencies
 */
import PreviewHeader from './header';
import PreviewPatternList from './pattern-list';

const INITIAL_INSERTER_RESULTS = 3;

/**
 * Renders the grid of block pattern previews.
 *
 * @since 0.1.0
 * @param {Object} props All the props passed to this function
 * @return {string}      Return the rendered JSX
 */
export default function PatternExplorerPreview( props ) {
	const {
		allPatterns,
		patternCategories,
		selectedCategory,
		searchValue,
	} = props;
	const [ viewportWidth, setViewportWidth ] = useState( 1300 );
	const [ isGrid, setIsGrid ] = useState( true );

	const debouncedSpeak = useDebounce( speak, 500 );

	const registeredPatternCategories = useMemo(
		() =>
			patternCategories.map(
				( patternCategory ) => patternCategory.name
			),
		[ patternCategories ]
	);

	const filteredPatterns = useMemo( () => {
		let results = [];

		// Only start searching after the user has typed 2+ letters.
		const isSearching = searchValue && searchValue.length > 1;

		if ( isSearching ) {
			results = allPatterns.filter( ( pattern ) => {
				const input = searchValue.toLowerCase();
				const title = pattern.title.toLowerCase();

				// First check if the title matches.
				if ( title.includes( input ) ) {
					return true;
				}

				// Then check if any keywords match.
				if ( pattern?.keywords && ! isEmpty( pattern?.keywords ) ) {
					const keywordMatches = pattern.keywords.filter(
						( keyword ) => keyword.includes( input )
					);

					return ! isEmpty( keywordMatches );
				}

				return false;
			} );
		}

		// Filter the pattern associated with the current category.
		if ( ! isSearching ) {
			results = allPatterns.filter( ( pattern ) => {
				// If the selected category is uncategorized, return all block
				// patterns without assigned categories.
				if ( selectedCategory === 'uncategorized' ) {
					return (
						! pattern.categories?.length ||
						pattern.categories.every(
							( category ) =>
								! registeredPatternCategories.includes(
									category
								)
						)
					);
				}
				return pattern.categories?.includes( selectedCategory );
			} );
		}

		return results;
	}, [ searchValue, selectedCategory, allPatterns ] );

	const shownPatterns = useAsyncList( filteredPatterns, {
		step: INITIAL_INSERTER_RESULTS,
	} );

	// Are patterns still being loaded?
	const isLoading = shownPatterns.length < filteredPatterns.length;

	// Announce search results on change and only when loading is finished.
	// TODO: This needs work, not updating when search field is cleared.
	useEffect( () => {
		if ( ! searchValue || isLoading ) {
			return;
		}
		const count = filteredPatterns.length;
		const resultsFoundMessage = sprintf(
			/* translators: %d: number of patterns found. */
			_n(
				'%d pattern found.',
				'%d patterns found.',
				count,
				'block-pattern-explorer'
			),
			count
		);
		debouncedSpeak( resultsFoundMessage );
	}, [ searchValue, debouncedSpeak ] );

	const baseClassName = 'block-pattern-explorer__preview';

	return (
		<div className={ baseClassName }>
			<PreviewHeader
				viewportWidth={ viewportWidth }
				setViewportWidth={ setViewportWidth }
				isGrid={ isGrid }
				setIsGrid={ setIsGrid }
				shownPatterns={ shownPatterns }
				searchValue={ searchValue }
				isLoading={ isLoading }
			/>
			<PreviewPatternList
				viewportWidth={ viewportWidth }
				isGrid={ isGrid }
				shownPatterns={ shownPatterns }
				searchValue={ searchValue }
				isLoading={ isLoading }
			/>
		</div>
	);
}
