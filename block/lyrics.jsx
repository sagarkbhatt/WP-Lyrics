import ReactAutocomplete from 'react-autocomplete';
import { debounce } from 'lodash';

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
		fetch( api, { method: 'GET',
			headers: new Headers( {
				'Content-Type': 'application/json',
			} ),
		} ) // Call the fetch function passing the url of the API as a parameter
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
					<div className={ `item ${ isHighlighted ? 'item-highlighted' : '' }` } key={ item.id }>
						{ item.title }
					</div>
				) }
				value={ this.state.value }
				onChange={ this.findLyrics }
				onSelect={ this.onSelect }
			/>
		);
	}
}

export default Lyrics;
