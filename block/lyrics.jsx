import ReactAutocomplete from 'react-autocomplete';
import { debounce } from 'lodash';

const { Component } = wp.element;

class Lyrics extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			value: '',
			items: {},
		};

		this.findLyrics = this.findLyrics.bind( this );
		this.fetchReq = debounce( this.fetchReq, 500 );
	}

	findLyrics( e ) {
		const term = e.target.value || '';
		this.fetchReq( term );
	}

	fetchReq( term ) {
		const _this = this;
		const api = `https://api.lyrics.ovh/suggest/${ term }`;
		// call to api.
		fetch( api ) // Call the fetch function passing the url of the API as a parameter
			.then( ( res ) => {
				_this.setState( { items: res.data ? res.data : {} } );
			} )
			.catch( ( error ) => {
				// server error ?
			} );
	}

	render() {
		return (
			<ReactAutocomplete
				items={ this.state.items }
				getItemValue={ item => item.label }
				renderItem={ ( item ) =>
					<div key={ item.id }>
						{ item.title }
					</div>
				}
				value={ this.state.value }
				onChange={ this.findLyrics }
				onSelect={ value => this.setState( { value } ) }
			/>
		);
	}
}

export default Lyrics;
