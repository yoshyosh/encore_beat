/** @jsx React.DOM */

var InfinitePagination = React.createClass({
  getInitialState: function () {
    return {current_page: 1, total_pages: this.props.total_pages};
  },

  handleClick: function (e) {
    e.preventDefault();
    var page = this.state.current_page + 1;
    var self = this;

    $('#paginate-trigger').toggle();
    $('.spinner').toggle();

    $.ajax({
      url: '/',
      type: 'GET',
      data: {page: page},
      complete: function ( data ) {
        $('.spinner').toggle();
        $('#load-more-container').append(data.responseText);
        $('#paginate-trigger').toggle();
        self.setState({current_page: page});
      }
    });
  },

  render: function () {
    var spinner = (
      <div className='spinner js-spinner'>
        <div className='rect1'></div>
        <div className='rect2'></div>
        <div className='rect3'></div>
        <div className='rect4'></div>
        <div className='rect5'></div>
      </div>)

    if (this.state.current_page === this.state.total_pages) {
      var paginationTrigger = (<span/>);
    }
    else {
      var paginationTrigger = (<a href='#' id='paginate-trigger' onClick={ this.handleClick }>Load more songs</a>);
    }

    return (
      <div className='paginate-trigger-wrapper'>
        { paginationTrigger }
        { spinner }
      </div>
    );
  }
});