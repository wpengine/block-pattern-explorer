/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, blockDefault } from '@wordpress/icons';

function InserterNoResults( { icon, label } ) {
	return (
		<div className="block-editor-inserter__no-results">
			<div>
				<Icon
					className="block-editor-inserter__no-results-icon"
					icon={ icon ? icon : blockDefault }
				/>
				<p>
					{ label
						? label
						: __( 'No results found.', 'block-pattern-explorer' ) }
				</p>
			</div>
		</div>
	);
}

export default InserterNoResults;
