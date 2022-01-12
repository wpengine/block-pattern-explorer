/**
 * WordPress dependencies
 */
import { __unstableUseCompositeState as useCompositeState } from '@wordpress/components'; // eslint-disable-line

/**
 * Internal dependencies
 */
import InserterListboxContext from './context';

function InserterListbox( { children } ) {
	const compositeState = useCompositeState( {
		shift: true,
		wrap: 'horizontal',
	} );
	return (
		<InserterListboxContext.Provider value={ compositeState }>
			{ children }
		</InserterListboxContext.Provider>
	);
}

export default InserterListbox;
