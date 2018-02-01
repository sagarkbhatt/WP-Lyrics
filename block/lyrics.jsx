import ReactAutocomplete from 'react-autocomplete';
import { debounce } from 'lodash';

/**
 * External dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

class Lyrics extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			value: props.attributes.title ? props.attributes.title : '',
			items: [],
		};

		this.findLyrics = this.findLyrics.bind( this );
		this.onSelect = this.onSelect.bind( this );
		this.fetchReq = debounce( this.fetchReq, 500 );
	}

	findLyrics( e ) {
		const term = e.target.value || '';
		this.setState( { value: term } );
		this.fetchReq( term );
	}

	fetchReq( term ) {
		const _this = this;
		const api = `https://api.lyrics.ovh/suggest/${ term }`;
		// call to api.
		fetch( api ) // Call the fetch function passing the url of the API as a parameter
			.then( ( response ) => response.json() )
			.then( ( response ) => {
				_this.setState( { items: response.data ? response.data : [] } );
			} )
			.catch( ( error ) => {
				// server error ?
			} );
	}

	onSelect( value ) {
		this.setState( { value: value } );
		this.props.setAttributes( { title: value } );
	}

	render() {
		return (
			<ReactAutocomplete
				items={ this.state.items }
				getItemValue={ item => item.title }
				renderItem={ ( item, isHighlighted ) => (
					<div style={ { background: isHighlighted ? 'lightgray' : 'white' } } key={ item.id }>
						{ item.title }
					</div>
				) }
				menuStyle={ {
					zIndex: 9999999900,
					cursor: 'pointer',
					borderRadius: '0px',
					boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
					background: 'rgba(255, 255, 255, 0.9)',
					padding: '2px 0',
					fontSize: '1rem',
					position: 'fixed',
					overflow: 'auto',
					maxHeight: '50%',
				} }
				inputProps={ { placeholder: __( 'Type the song you want the lyrics' ),
					style: {
						width: '100%',
						border: 'none',
						height: '50px',
						outline: 'none',
						boxShadow: 'none',
					},
				} }
				value={ this.state.value }
				onChange={ this.findLyrics }
				onSelect={ this.onSelect }
				wrapperStyle={ {} }
			/>
		);
	}
}

export default Lyrics;
