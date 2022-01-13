/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	MenuGroup,
	MenuItem,
	SearchControl,
	VisuallyHidden,
} from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Renders the block pattern category sidebar control.
 *
 * @since 0.1.0
 * @param {Object} props All the props passed to this function
 * @return {string}      Return the rendered JSX
 */
export default function PatternExplorerSidebar( props ) {
	const {
		patternCategories,
		patternCategoryTypes,
		selectedCategory,
		setSelectedCategory,
		searchValue,
		setSearchValue,
	} = props;

	function onClickCategory( category ) {
		setSelectedCategory( category );
		setSearchValue( '' );
	}

	const registeredCategoryTypes = useMemo(
		() =>
			patternCategoryTypes.map(
				( patternCategoryType ) => patternCategoryType.name
			),
		[ patternCategoryTypes ]
	);

	const baseClassName = 'block-pattern-explorer__sidebar';

	return (
		<div className={ baseClassName }>
			<div className={ `${ baseClassName }__search` }>
				<SearchControl
					value={ searchValue }
					onChange={ setSearchValue }
					label={ __( 'Search patterns', 'block-pattern-explorer' ) }
				/>
			</div>
			{ patternCategoryTypes.map( ( categoryType ) => {
				const categoriesOfType = patternCategories.filter(
					( category ) => {
						// If the selected category is uncategorized, return all
						// pattern categories without assigned category types.
						if ( categoryType.name === 'uncategorized' ) {
							return (
								! category?.categoryTypes ||
								category.categoryTypes.every(
									( type ) =>
										! registeredCategoryTypes.includes(
											type
										)
								)
							);
						}
						return category.categoryTypes?.includes(
							categoryType.name
						);
					}
				);

				// If there are no categories in the current type, bail.
				if ( ! categoriesOfType.length ) {
					return null;
				}

				return (
					<div
						key={ categoryType }
						className={ `${ baseClassName }__category-type` }
					>
						{ categoryType?.hideLabelFromVision ? (
							<VisuallyHidden as="h2">
								{ categoryType.label }
							</VisuallyHidden>
						) : (
							<h2
								className={ `${ baseClassName }__category-type__title` }
							>
								{ categoryType.label }
							</h2>
						) }
						<div
							className={ `${ baseClassName }__category-type__categories` }
						>
							<MenuGroup
								className={ `${ baseClassName }__categories-list` }
							>
								{ categoriesOfType.map( ( category ) => {
									return (
										<MenuItem
											key={ category.name }
											label={ category.label }
											className={ `${ baseClassName }__categories-list__item` }
											isPressed={
												! searchValue &&
												category.name ===
													selectedCategory
											}
											onClick={ () =>
												onClickCategory( category.name )
											}
										>
											{ category.label }
										</MenuItem>
									);
								} ) }
							</MenuGroup>
						</div>
					</div>
				);
			} ) }
		</div>
	);
}
