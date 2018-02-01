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
			value: this.props.attributes.title ? this.props.attributes.title : '',
			data: this.props.attributes.content ? this.props.attributes.content : '',
			items: [],
		};

		this.fetchReqLyrics = this.fetchReqLyrics.bind( this );
		this.fetchSuggestion = this.fetchSuggestion.bind( this );
		this.onSelect = this.onSelect.bind( this );
		this.fetchReqSuggestion = debounce( this.fetchReqSuggestion, 500 );
	}

	fetchSuggestion( e ) {
		const term = e.target.value || '';
		this.setState( { value: term } );
		this.fetchReqSuggestion( term );
	}

	fetchReqSuggestion( term ) {
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

	fetchReqLyrics( apiURL ) {
		fetch( apiURL ) // Call the fetch function passing the url of the API as a parameter
			.then( ( response ) => response.json() )
			.then( ( response ) => {
				this.setState( { data: response.lyrics } );
				this.props.setAttributes( { content: response.lyrics } );
			} )
			.catch( ( error ) => {
			// server error ?
			} );
	}

	onSelect( value, item ) {
		this.setState( { value: value } );
		this.props.setAttributes( { title: value } );
		const api = encodeURI( `https://api.lyrics.ovh/v1/${ item.artist.name }/${ value }` );
		this.fetchReqLyrics( api );
	}

	render() {
		const attributes = this.props.attributes;
		const { focus } = this.props;

		let retVal = [];

		if ( focus ) {
			retVal.push( (
				<ReactAutocomplete key={ 'input-autocomplete' }
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
					onChange={ this.fetchSuggestion }
					onSelect={ this.onSelect }
					wrapperStyle={ {} }
				/>
			) );
		}

		if ( attributes.content && attributes.title ) {
			retVal.push( (
				<div className={ this.props.className ? this.props.className : '' }>
					<h3 className="song-lyrics__title">{ attributes.title }</h3>
					<div className="song-lyrics__content"><pre>{ attributes.content }</pre></div>
				</div>
			) );
		}

		return retVal;
	}
}

export default Lyrics;
