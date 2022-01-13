/**
 * External dependencies.
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { render, useState, useMemo, useCallback } from '@wordpress/element';
import { dispatch, subscribe } from '@wordpress/data';
import { Button, Modal } from '@wordpress/components';
import { layout } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import PatternExplorer from './pattern-explorer';
import usePatternsState from './core-hooks/use-patterns-state';

/**
 * Render the header toolbar button and the accompanying pattern explorer modal.
 *
 * @since 0.1.0
 * @return {string} Return the rendered JSX for the Pattern Explorer Button
 */
function HeaderToolbarButton() {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ allPatterns, allCategories, allCategoryTypes ] = usePatternsState();

	const fetchedCategoryTypes =
		allCategoryTypes === 'fetching' ? [] : allCategoryTypes;

	// Check if a pattern has an assigned pattern category.
	const hasRegisteredCategory = useCallback(
		( pattern ) => {
			if ( ! pattern.categories || ! pattern.categories.length ) {
				return false;
			}

			return pattern.categories.some( ( cat ) =>
				allCategories.some( ( category ) => category.name === cat )
			);
		},
		[ allCategories ]
	);

	// Check if a pattern category has an assigned pattern category type.
	const hasRegisteredCategoryType = useCallback(
		( category ) => {
			if ( ! category.categoryTypes || ! category.categoryTypes.length ) {
				return false;
			}

			return category.categoryTypes.some( ( type ) =>
				fetchedCategoryTypes.some(
					( categoryType ) => categoryType.name === type
				)
			);
		},
		[ fetchedCategoryTypes ]
	);

	// Remove any categories without patterns.
	const populatedCategories = useMemo( () => {
		const categories = allCategories
			.filter( ( category ) =>
				allPatterns.some( ( pattern ) =>
					pattern.categories?.includes( category.name )
				)
			)
			.sort( ( { name: currentName }, { name: nextName } ) => {
				if ( ! [ currentName, nextName ].includes( 'featured' ) ) {
					return 0;
				}
				return currentName === 'featured' ? -1 : 1;
			} );

		// If there are patterns without categories, create Uncategorized.
		if (
			allPatterns.some(
				( pattern ) => ! hasRegisteredCategory( pattern )
			) &&
			! categories.find(
				( category ) => category.name === 'uncategorized'
			)
		) {
			categories.push( {
				name: 'uncategorized',
				label: __( 'Uncategorized', 'block-pattern-explorer' ),
			} );
		}

		return categories;
	}, [ allPatterns, allCategories ] );

	// Remove any pattern category type without populated pattern categories.
	const populatedCategoryTypes = useMemo( () => {
		const categoryTypes = fetchedCategoryTypes.filter( ( type ) =>
			populatedCategories.some( ( category ) =>
				category.categoryTypes?.includes( type.name )
			)
		);

		// If there are categories without types, create the Uncategorized type.
		if (
			populatedCategories.some(
				( category ) => ! hasRegisteredCategoryType( category )
			) &&
			! categoryTypes.find( ( type ) => type.name === 'uncategorized' )
		) {
			categoryTypes.unshift( {
				name: 'uncategorized',
				label: __( 'Uncategorized', 'block-pattern-explorer' ),
				hideLabelFromVision: true,
			} );
		}

		return categoryTypes;
	}, [ populatedCategories, fetchedCategoryTypes ] );

	// Could expand on this in the future, i.e. allow for a configurable
	// initial category. For now the initial category is the first category in
	// the first category type.
	const initialCategory = populatedCategories.filter( ( category ) => {
		// If the first category type is 'uncategorized', filter all categories
		// without types and all categories with the type 'uncategorized'.
		if ( populatedCategoryTypes[ 0 ].name === 'uncategorized' ) {
			return (
				! category.categoryTypes ||
				! category.categoryTypes.length ||
				category.categoryTypes?.includes( 'uncategorized' )
			);
		}

		// If the first type is not 'uncategorized', filter all the categories in the
		// first type.
		return category.categoryTypes?.includes(
			populatedCategoryTypes[ 0 ].name
		);
	} )[ 0 ];

	// If there are no patterns, do not display the pattern explorer button.
	if ( isEmpty( allPatterns ) ) {
		return null;
	}

	return (
		<>
			<Button
				icon={ layout }
				label={ __( 'Explore Patterns', 'block-pattern-explorer' ) }
				onClick={ () => setIsModalOpen( true ) }
			/>
			{ isModalOpen && (
				<Modal
					title={ __( 'Patterns', 'block-pattern-explorer' ) }
					closeLabel={ __( 'Close', 'block-pattern-explorer' ) }
					onRequestClose={ () => setIsModalOpen( false ) }
					className="block-pattern-explorer__modal"
					isFullScreen
				>
					<PatternExplorer
						allPatterns={ allPatterns }
						initialCategory={ initialCategory }
						patternCategories={ populatedCategories }
						patternCategoryTypes={ populatedCategoryTypes }
						categoryTypes
					/>
				</Modal>
			) }
		</>
	);
}

/**
 * Add the header toolbar button to the block editor.
 */
subscribe( () => {
	const inserter = document.querySelector( '#block-pattern-explorer' );

	// If the inserter already exists, bail.
	if ( inserter ) {
		return;
	}

	wp.domReady( () => {
		const toolbar = document.querySelector(
			'.edit-post-header-toolbar__left'
		);

		// If no toolbar can be found at all, bail.
		if ( ! toolbar ) {
			return;
		}

		const buttonContainer = document.createElement( 'div' );
		buttonContainer.id = 'block-pattern-explorer';

		toolbar.appendChild( buttonContainer );

		render(
			<HeaderToolbarButton />,
			document.getElementById( 'block-pattern-explorer' )
		);
	} );
} );

/**
 * (Experimental) Add support for the pattern category type setting.
 *
 * @param {Array} settings All editor settings
 * @since 0.2.0
 */
// function addCategoryTypeSupport( settings ) {
// 	settings.push( '__experimentalBlockPatternCategoryTypes' );
//
// 	return settings;
// }
// addFilter(
// 	'editor.SupportedEditorSettings',
// 	'block-pattern-explorer/add-category-type-support',
// 	addCategoryTypeSupport
// );

/**
 * Add our custom entities for retrieving external data in the Block Editor.
 *
 * @since 0.2.0
 */
dispatch( 'core' ).addEntities( [
	{
		label: __( 'Pattern Category Types', 'block-pattern-explorer' ),
		kind: 'block-pattern-explorer/v1',
		name: 'patternCategoryTypes',
		baseURL: '/block-pattern-explorer/v1/pattern-category-types',
	},
] );
